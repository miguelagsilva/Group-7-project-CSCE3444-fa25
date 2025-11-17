// validate-challenge.ts
import { Challenge } from '../api/data';

export interface TestCaseResult {
  testNumber: number;
  passed: boolean;
  input?: string;
  expectedOutput: string;
  actualOutput: string;
  description?: string;
}

export interface ChallengeValidationResult {
  passed: boolean;
  score: number;
  maxScore: number;
  testResults: TestCaseResult[];
  message: string;
  feedback: string;
}

export interface RunnerResult {
  testOutputs?: string[]; // preferred
  stdout?: string;        // fallback
  error?: string | null;  // runtime error info
  exitCode?: number;
}

// CONFIG: if your runner prints outputs separated by a marker, set this to true
const runnerProvidesTestOutputs = true;
// if false, grader will split stdout by marker below
const TEST_OUTPUT_SEPARATOR = '__TEST_SEP__';

// Numeric tolerance for float comparisons
const FLOAT_EPS = 1e-6;

/** Extract potential runner error in a safer way */
function runnerHasError(runner: RunnerResult): boolean {
  if (!runner) return true;
  if (runner.error) return true;
  // fallback: check exitCode (non-zero often indicates error)
  if (typeof runner.exitCode === 'number' && runner.exitCode !== 0) return true;
  // last resort: check stdout for tracebacks (language-specific)
  if (runner.stdout) {
    const s = runner.stdout;
    const tracebackSignatures = ['Traceback (most recent call last)', 'Error:', 'Exception:', 'Traceback', 'SyntaxError', 'NameError', 'TypeError', 'IndentationError'];
    for (const sig of tracebackSignatures) {
      if (s.includes(sig)) return true;
    }
  }
  return false;
}

/** Normalize a single output string for comparison.
 *  Options:
 *   - preserveCase: if true do not lowercase (useful for strict comparisons)
 *   - collapseWhitespaceInsideLines: collapse runs of spaces into one within lines
 */
function normalizeOutput(text: string, preserveCase = false): string {
  if (text == null) return '';
  // Normalize line endings and trim each line of trailing spaces
  const lines = text.replace(/\r/g, '').split('\n').map(l => l.replace(/\s+$/u, ''));
  // Remove empty lines at start/end
  while (lines.length && lines[0].trim() === '') lines.shift();
  while (lines.length && lines[lines.length - 1].trim() === '') lines.pop();

  // collapse multiple spaces inside each line to single space
  const processed = lines.map(l => l.replace(/\s+/g, ' ').trim());

  const joined = processed.join('\n');
  return preserveCase ? joined : joined.toLowerCase();
}

/** Try to compare numbers if both strings look numeric */
function numericCompare(a: string, b: string): boolean {
  const an = parseFloat(a);
  const bn = parseFloat(b);
  if (Number.isNaN(an) || Number.isNaN(bn)) return false;
  return Math.abs(an - bn) <= FLOAT_EPS;
}

/** Compare two outputs with flexible rules:
 *  - If both look like JSON, parse and compare deeply (stringify canonical)
 *  - If both numeric, compare with epsilon
 *  - Otherwise, compare normalized strings
 */
function outputsMatch(actualRaw: string, expectedRaw: string): boolean {
  const actual = actualRaw ?? '';
  const expected = expectedRaw ?? '';

  // Quick exact match first
  if (actual === expected) return true;

  // Try JSON compare
  try {
    const aJSON = JSON.parse(actual);
    const eJSON = JSON.parse(expected);
    // Simple deep compare via JSON.stringify on canonical form
    return JSON.stringify(aJSON) === JSON.stringify(eJSON);
  } catch (e) {
    // not JSON — fallthrough
  }

  // Numeric compare
  const aTrim = actual.trim();
  const eTrim = expected.trim();
  if (!isNaN(Number(aTrim)) && !isNaN(Number(eTrim))) {
    return numericCompare(aTrim, eTrim);
  }

  // Normalize and compare (case-insensitive)
  const normA = normalizeOutput(actual, false);
  const normE = normalizeOutput(expected, false);
  return normA === normE;
}

/**
 * Validate a challenge using a RunnerResult (output-per-test preferred)
 * @param runner RunnerResult - result returned by code execution harness
 * @param challenge Challenge - challenge definition, including testCases and points
 */
export function validateChallengeFromRunner(
  runner: RunnerResult,
  challenge: Challenge
): ChallengeValidationResult {
  const testCases = challenge.testCases || [];
  const testResults: TestCaseResult[] = [];
  const maxScore = challenge.points || 100;

  // If the runner reports an error, short-circuit and surface that to the student
  if (runnerHasError(runner)) {
    // Provide the runner error output if available
    const errMsg = runner.error ?? runner.stdout ?? 'Runtime error occurred';

    return {
      passed: false,
      score: 0,
      maxScore,
      testResults: [],
      message: '❌ Error in Code',
      feedback: `Fix the error in your code and try again. Error details:\n\n${errMsg}`
    };
  }

  // Gather outputs per test
  let outputsPerTest: string[] = [];

  if (runnerProvidesTestOutputs && Array.isArray(runner.testOutputs) && runner.testOutputs.length > 0) {
    outputsPerTest = runner.testOutputs;
  } else if (typeof runner.stdout === 'string') {
    // Fallback: split by separator
    outputsPerTest = runner.stdout.split(TEST_OUTPUT_SEPARATOR).map(s => s.trim()).filter(s => s.length > 0);
  } else {
    // No outputs at all
    outputsPerTest = [];
  }

  // If we have no structured outputs and multiple test cases, warn and try a best-effort match
  if (outputsPerTest.length === 0 && testCases.length > 0) {
    // If no outputs, all fail
    const testResultsEmpty = testCases.map((tc, idx) => ({
      testNumber: idx + 1,
      passed: false,
      input: tc.input,
      expectedOutput: tc.expectedOutput.replace(/\\n/g, '\n'),
      actualOutput: ''
    }));
    return {
      passed: false,
      score: 0,
      maxScore,
      testResults: testResultsEmpty,
      message: '❌ No Output',
      feedback: 'Your program produced no output. Make sure your program prints result for each test case.'
    };
  }

  // Map outputs to testcases — use the first N outputs if lengths differ
  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];
    const expected = tc.expectedOutput.replace(/\\n/g, '\n');
    const actual = outputsPerTest[i] ?? outputsPerTest[0] ?? ''; // fallback: use single output

    const passed = outputsMatch(actual, expected);

    testResults.push({
      testNumber: i + 1,
      passed,
      input: tc.input,
      expectedOutput: expected,
      actualOutput: actual,
      description: (tc as any).description // maintain compatibility
    });
  }

  const passedCount = testResults.filter(t => t.passed).length;
  const allPassed = passedCount === testResults.length;

  // Score: distribute evenly; allow fractional points; round to nearest integer
  const rawScore = (passedCount / Math.max(1, testResults.length)) * maxScore;
  const score = Math.round(rawScore);

  let message = '';
  let feedback = '';

  if (allPassed) {
    message = '✅ All Tests Passed!';
    feedback = `Perfect! You passed all ${testResults.length} tests! 🎉`;
  } else if (passedCount > 0) {
    message = '⚠️ Some Tests Failed';
    feedback = `You passed ${passedCount} out of ${testResults.length} tests. Review the failed tests and try again!`;
  } else {
    message = '❌ All Tests Failed';
    feedback = 'None of the test cases passed. Check your code logic and compare your output with the expected outputs.';
  }

  return {
    passed: allPassed,
    score,
    maxScore,
    testResults,
    message,
    feedback
  };
}

/** Small helper to build human readable detailed feedback */
export function getDetailedFeedback(result: ChallengeValidationResult): string {
  if (!result.testResults || result.testResults.length === 0) {
    return result.feedback;
  }

  const failed = result.testResults.filter(t => !t.passed);
  if (failed.length === 0) {
    return `🎉 Amazing work! All tests passed!\n\n${result.feedback}`;
  }

  let out = `${result.feedback}\n\nFailed Tests:\n`;
  for (const t of failed) {
    out += `\nTest ${t.testNumber}:\n`;
    if (t.description) out += `  Description: ${t.description}\n`;
    if (t.input) out += `  Input: ${t.input}\n`;
    out += `  Expected: ${t.expectedOutput}\n`;
    out += `  Your Output: ${t.actualOutput}\n`;
  }
  return out;
}
