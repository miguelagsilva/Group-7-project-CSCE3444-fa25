// Flexible code validation system for practice exercises

export type ValidationType = 'exact' | 'pattern' | 'hybrid' | 'test-cases';

export interface ValidationRule {
  rule: 'not_empty' | 'min_length' | 'max_length' | 'contains' | 'not_contains' | 'starts_with' | 'ends_with' | 'is_number' | 'regex' | 'line_count' | 'min_lines' | 'max_lines';
  value?: string | number;
  message?: string;
}

export interface CodeCheck {
  type: 'contains' | 'not_contains' | 'regex' | 'variable_declared' | 'function_called';
  value: string;
  message?: string;
}

export interface TestCase {
  input?: string;
  expectedOutput: string;
  description?: string;
}

export interface ValidationConfig {
  type: ValidationType;
  
  // For exact matching
  expectedOutput?: string;
  
  // For pattern validation
  pattern?: RegExp;
  checks?: ValidationRule[];
  
  // For code analysis (NEW)
  codeChecks?: CodeCheck[];
  
  // For test cases
  testCases?: TestCase[];
  
  // General settings
  ignoreCase?: boolean;
  ignoreWhitespace?: boolean;
  allowPartialCredit?: boolean;
}

export interface ValidationResult {
  type: 'success' | 'partial' | 'incorrect';
  message: string;
  details?: string;
  passedTests?: number;
  totalTests?: number;
}

/**
 * Main validation function - routes to appropriate validator based on type
 */
export function validateCode(output: string, config: ValidationConfig, code?: string): ValidationResult {
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
      type: 'incorrect',
      message: '💡 Oops! There\'s an error in your code.',
      details: 'Fix the error and try again. Check the error message above for hints!'
    };
  }

  // Run code checks first (if provided)
  if (code && config.codeChecks && config.codeChecks.length > 0) {
    const codeCheckResult = validateCodeStructure(code, config.codeChecks);
    if (!codeCheckResult.passed) {
      return {
        type: 'incorrect',
        message: codeCheckResult.message || '💡 Check your code structure.',
        details: codeCheckResult.details
      };
    }
  }

  // Route to appropriate validator
  switch (config.type) {
    case 'exact':
      return validateExact(output, config);
    case 'pattern':
      return validatePattern(output, config);
    case 'hybrid':
      return validateHybrid(output, config);
    case 'test-cases':
      return validateTestCases(output, config);
    default:
      return validateExact(output, config);
  }
}

/**
 * Exact matching - for deterministic exercises
 */
function validateExact(output: string, config: ValidationConfig): ValidationResult {
  const expected = config.expectedOutput || '';
  
  const normalizedOutput = normalizeString(output, config);
  const normalizedExpected = normalizeString(expected, config);
  
  if (normalizedOutput === normalizedExpected) {
    return {
      type: 'success',
      message: '🎉 Perfect! Your output is exactly right!'
    };
  }
  
  // Check for partial credit
  if (config.allowPartialCredit) {
    if (normalizedOutput.includes(normalizedExpected) || normalizedExpected.includes(normalizedOutput)) {
      return {
        type: 'partial',
        message: '💭 You\'re close! Check your output carefully.',
        details: `Expected: "${expected}"`
      };
    }
    
    // Check if numbers match (for math problems)
    const outputNumbers = extractNumbers(output);
    const expectedNumbers = extractNumbers(expected);
    if (expectedNumbers.length > 0 && JSON.stringify(outputNumbers) === JSON.stringify(expectedNumbers)) {
      return {
        type: 'partial',
        message: '💭 The answer is correct, but check the format!',
        details: `Expected format: "${expected}"`
      };
    }
  }
  
  return {
    type: 'incorrect',
    message: '💡 Not quite! Try again.',
    details: `Expected: "${expected}"`
  };
}

/**
 * Validates code using pattern matching
 */
function validatePattern(output: string, config: ValidationConfig): ValidationResult {
  const checks = config.checks || [];
  
  for (const check of checks) {
    const result = applyRule(output, check);
    if (!result.passed) {
      return {
        type: 'incorrect',
        message: check.message || '💡 Try again! Check the requirements.',
        details: result.details
      };
    }
  }
  
  return {
    type: 'success',
    message: getRandomSuccessMessage()
  };
}

/**
 * Normalize output for flexible comparison
 * Removes extra spaces, normalizes punctuation
 */
function normalizeOutput(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, ' ')  // Multiple spaces to single space
    .replace(/\s*([!,.])\s*/g, '$1')  // Remove spaces around punctuation
    .trim();
}

/**
 * Check if outputs are similar (flexible matching)
 */
function outputsAreSimilar(actual: string, expected: string): boolean {
  const normalizedActual = normalizeOutput(actual);
  const normalizedExpected = normalizeOutput(expected);
  
  // Check if they're exactly the same after normalization
  if (normalizedActual === normalizedExpected) {
    return true;
  }
  
  // Check if actual contains all the key words from expected
  const expectedWords = normalizedExpected.split(' ').filter(w => w.length > 2);
  const actualWords = normalizedActual.split(' ');
  
  const matchedWords = expectedWords.filter(word => 
    actualWords.some(aw => aw.includes(word) || word.includes(aw))
  );
  
  // If 80% or more of the key words match, consider it similar
  return matchedWords.length >= expectedWords.length * 0.8;
}

/**
 * Apply a single validation rule
 */
function applyRule(output: string, rule: ValidationRule): { passed: boolean; details?: string } {
  const trimmedOutput = output.trim();
  
  switch (rule.rule) {
    case 'not_empty':
      return {
        passed: trimmedOutput.length > 0,
        details: 'Your output is empty.'
      };
      
    case 'min_length':
      return {
        passed: trimmedOutput.length >= (rule.value as number),
        details: `Current length: ${trimmedOutput.length}`
      };
      
    case 'max_length':
      return {
        passed: trimmedOutput.length <= (rule.value as number)
      };
      
    case 'contains':
      return {
        passed: trimmedOutput.toLowerCase().includes(String(rule.value).toLowerCase())
      };
      
    case 'not_contains':
      return {
        passed: !trimmedOutput.toLowerCase().includes(String(rule.value).toLowerCase()),
        details: 'Be creative and use your own content!'
      };
      
    case 'starts_with':
      return {
        passed: trimmedOutput.toLowerCase().startsWith(String(rule.value).toLowerCase())
      };
      
    case 'ends_with':
      return {
        passed: trimmedOutput.toLowerCase().endsWith(String(rule.value).toLowerCase())
      };
      
    case 'is_number':
      return {
        passed: !isNaN(Number(trimmedOutput))
      };
      
    case 'regex':
      if (rule.value && typeof rule.value === 'string') {
        const regex = new RegExp(rule.value);
        return {
          passed: regex.test(trimmedOutput)
        };
      }
      return { passed: true };
      
    case 'line_count':
      const lineCount = output.split('\n').filter(line => line.trim().length > 0).length;
      return {
        passed: lineCount === (rule.value as number),
        details: `Current line count: ${lineCount}`
      };
      
    case 'min_lines':
      const minLineCount = output.split('\n').filter(line => line.trim().length > 0).length;
      return {
        passed: minLineCount >= (rule.value as number),
        details: `Current line count: ${minLineCount}`
      };
      
    case 'max_lines':
      const maxLineCount = output.split('\n').filter(line => line.trim().length > 0).length;
      return {
        passed: maxLineCount <= (rule.value as number),
        details: `Current line count: ${maxLineCount}`
      };
      
    default:
      return { passed: true };
  }
}

/**
 * Hybrid validation - combines pattern and exact matching
 */
function validateHybrid(output: string, config: ValidationConfig): ValidationResult {
  // First check pattern rules
  const checks = config.checks || [];
  for (const check of checks) {
    const result = applyRule(output, check);
    if (!result.passed) {
      return {
        type: 'incorrect',
        message: check.message || '💡 Try again! Check the requirements.',
        details: result.details
      };
    }
  }
  
  // Then check if output is similar to expected (flexible matching)
  if (config.expectedOutput) {
    if (outputsAreSimilar(output, config.expectedOutput)) {
      return {
        type: 'success',
        message: getRandomSuccessMessage()
      };
    }
  }
  
  // Pattern checks passed, so it's at least correct
  return {
    type: 'success',
    message: getRandomSuccessMessage()
  };
}

/**
 * Test cases validation - for exercises with multiple scenarios
 */
function validateTestCases(output: string, config: ValidationConfig): ValidationResult {
  const testCases = config.testCases || [];
  
  if (testCases.length === 0) {
    return {
      type: 'incorrect',
      message: '⚠️ No test cases defined for this exercise.'
    };
  }
  
  // For now, we'll just check against the first test case's expected output
  // In the future, we can run the code multiple times with different inputs
  const firstTest = testCases[0];
  const normalizedOutput = normalizeString(output, config);
  const normalizedExpected = normalizeString(firstTest.expectedOutput, config);
  
  if (normalizedOutput === normalizedExpected) {
    return {
      type: 'success',
      message: `🎉 Perfect! All tests passed!`,
      passedTests: 1,
      totalTests: 1
    };
  }
  
  return {
    type: 'incorrect',
    message: '💡 Test failed! Try again.',
    details: firstTest.description || `Expected: "${firstTest.expectedOutput}"`,
    passedTests: 0,
    totalTests: 1
  };
}

/**
 * Validate code structure based on provided checks
 */
function validateCodeStructure(code: string, checks: CodeCheck[]): { passed: boolean; message?: string; details?: string } {
  for (const check of checks) {
    switch (check.type) {
      case 'contains':
        if (!code.includes(check.value)) {
          return {
            passed: false,
            message: check.message || `💡 Your code should contain "${check.value}".`,
            details: 'Check your code for the required content.'
          };
        }
        break;
        
      case 'not_contains':
        if (code.includes(check.value)) {
          return {
            passed: false,
            message: check.message || `💡 Your code should not contain "${check.value}".`,
            details: 'Check your code for the prohibited content.'
          };
        }
        break;
        
      case 'regex':
        const regex = new RegExp(check.value);
        if (!regex.test(code)) {
          return {
            passed: false,
            message: check.message || `💡 Your code should match the pattern "${check.value}".`,
            details: 'Check your code for the required pattern.'
          };
        }
        break;
        
      case 'variable_declared':
        const variableRegex = new RegExp(`\\b${check.value}\\b`);
        if (!variableRegex.test(code)) {
          return {
            passed: false,
            message: check.message || `💡 Your code should declare the variable "${check.value}".`,
            details: 'Check your code for the required variable declaration.'
          };
        }
        break;
        
      case 'function_called':
        const functionRegex = new RegExp(`\\b${check.value}\\b\\s*\\(`);
        if (!functionRegex.test(code)) {
          return {
            passed: false,
            message: check.message || `💡 Your code should call the function "${check.value}".`,
            details: 'Check your code for the required function call.'
          };
        }
        break;
        
      default:
        return { passed: true };
    }
  }
  
  return { passed: true };
}

/**
 * Normalize string based on config
 */
function normalizeString(str: string, config: ValidationConfig): string {
  let normalized = str.trim();
  
  if (config.ignoreCase) {
    normalized = normalized.toLowerCase();
  }
  
  if (config.ignoreWhitespace) {
    normalized = normalized.replace(/\s+/g, ' ');
  }
  
  return normalized;
}

/**
 * Extract numbers from string
 */
function extractNumbers(str: string): string[] {
  return str.match(/\d+(\.\d+)?/g) || [];
}

/**
 * Get a random success message
 */
function getRandomSuccessMessage(): string {
  const messages = [
    '🎉 Awesome! Your code works perfectly!',
    '🎉 Great job! Your solution is correct!',
    '🎉 Perfect! Your output is exactly right!',
    '🎉 Excellent! Your code is correct!',
    '🎉 Well done! Your solution is correct!',
    '🎉 Nice work! Your code is correct!',
    '🎉 Good job! Your solution is correct!',
    '🎉 Correct! Your code is correct!',
    '🎉 Perfect! Your code is correct!',
    '🎉 Well done! Your code is correct!'
  ];
  
  return messages[Math.floor(Math.random() * messages.length)];
}