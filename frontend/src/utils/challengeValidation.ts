// Challenge validation system with test case execution
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

/**
 * Extract the actual printed output from Pyodide output
 * (removes "✅ Success!" prefix and other decorations)
 */
function extractPrintedOutput(output: string): string {
  // Remove the "✅ Success!" prefix if present
  let cleaned = output.replace(/^✅ Success!\s*/m, '');
  
  // Remove "⚠️ Errors:" section and everything after it
  const errorIndex = cleaned.indexOf('⚠️ Errors:');
  if (errorIndex !== -1) {
    cleaned = cleaned.substring(0, errorIndex);
  }
  
  // Trim whitespace
  return cleaned.trim();
}

/**
 * Normalize output for comparison
 */
function normalizeOutput(text: string): string {
  return text
    .trim()
    .replace(/\s+/g, ' ')  // Multiple spaces to single space
    .replace(/\s*([!,.])\s*/g, '$1')  // Remove spaces around punctuation
    .toLowerCase();
}

/**
 * Check if two outputs match
 */
function outputsMatch(actual: string, expected: string): boolean {
  // Extract the printed output (remove decorations)
  const cleanActual = extractPrintedOutput(actual);
  
  // Normalize both for comparison
  const normalizedActual = normalizeOutput(cleanActual);
  const normalizedExpected = normalizeOutput(expected);
  
  // Direct comparison
  return normalizedActual === normalizedExpected;
}

/**
 * Validate challenge submission
 */
export function validateChallenge(
  output: string, 
  challenge: Challenge
): ChallengeValidationResult {
  const testCases = challenge.testCases || [];
  const testResults: TestCaseResult[] = [];
  
  // Check for Python errors first
  const hasError = output.includes('Error:') || 
                   output.includes('SyntaxError') || 
                   output.includes('NameError') ||
                   output.includes('TypeError') ||
                   output.includes('ValueError') ||
                   output.includes('IndentationError') ||
                   output.includes('❌') ||
                   output.includes('⚠️ Errors:');
  
  if (hasError) {
    return {
      passed: false,
      score: 0,
      maxScore: challenge.points || 100,
      testResults: [],
      message: '❌ Error in Code',
      feedback: 'Fix the error in your code and try again. Check the error message in the output panel.'
    };
  }
  
  // If no test cases defined, just check if there's output
  if (testCases.length === 0) {
    const hasOutput = output.trim().length > 0;
    
    return {
      passed: hasOutput,
      score: hasOutput ? challenge.points || 100 : 0,
      maxScore: challenge.points || 100,
      testResults: [],
      message: hasOutput ? '✅ Challenge Complete!' : '❌ No Output',
      feedback: hasOutput 
        ? 'Great work! Your code produced output successfully!' 
        : 'Your code didn\'t produce any output. Try adding print statements.'
    };
  }
  
  // Process each test case
  let passedCount = 0;
  testCases.forEach((testCase, index) => {
    const expectedOutput = testCase.expectedOutput.replace(/\\n/g, '\n');
    const passed = outputsMatch(output, expectedOutput);
    
    if (passed) {
      passedCount++;
    }
    
    testResults.push({
      testNumber: index + 1,
      passed,
      input: testCase.input,
      expectedOutput: expectedOutput,
      actualOutput: output,
      description: testCase.description
    });
  });
  
  // Calculate score
  const allPassed = passedCount === testCases.length;
  const partialPassed = passedCount > 0 && passedCount < testCases.length;
  const maxScore = challenge.points || 100;
  const scorePerTest = maxScore / testCases.length;
  const score = Math.floor(passedCount * scorePerTest);
  
  // Generate message and feedback
  let message: string;
  let feedback: string;
  
  if (allPassed) {
    message = '✅ All Tests Passed!';
    feedback = `Perfect! You passed all ${testCases.length} test case${testCases.length > 1 ? 's' : ''}! 🎉`;
  } else if (partialPassed) {
    message = '⚠️ Some Tests Failed';
    feedback = `You passed ${passedCount} out of ${testCases.length} test cases. Review the failed tests and try again!`;
  } else {
    message = '❌ All Tests Failed';
    feedback = 'None of the test cases passed. Check your code logic and compare your output with the expected output.';
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

/**
 * Get a detailed feedback message for the test results
 */
export function getDetailedFeedback(result: ChallengeValidationResult): string {
  if (result.testResults.length === 0) {
    return result.feedback;
  }
  
  const failedTests = result.testResults.filter(t => !t.passed);
  
  if (failedTests.length === 0) {
    return `🎉 Amazing work! All test cases passed!\n\n${result.feedback}`;
  }
  
  let feedback = `${result.feedback}\n\n`;
  feedback += `Failed Test Cases:\n`;
  
  failedTests.forEach(test => {
    feedback += `\nTest ${test.testNumber}:\n`;
    if (test.description) {
      feedback += `  Description: ${test.description}\n`;
    }
    if (test.input) {
      feedback += `  Input: ${test.input}\n`;
    }
    feedback += `  Expected: ${test.expectedOutput}\n`;
    feedback += `  Your Output: ${test.actualOutput}\n`;
  });
  
  return feedback;
}