import { useState } from 'react';
import { Challenge } from '../api/data';
import { RunnerResult } from '../utils/validate-challenge';

interface ChallengeRunnerHookResult {
  isRunning: boolean;
  runChallengeTests: (code: string, challenge: Challenge, pyodide: any) => Promise<RunnerResult>;
}

export function useChallengeRunner(): ChallengeRunnerHookResult {
  const [isRunning, setIsRunning] = useState(false);

  const runChallengeTests = async (
    code: string,
    challenge: Challenge,
    pyodide: any
  ): Promise<RunnerResult> => {
    if (!pyodide) {
      return {
        error: 'Python environment is not ready yet. Please wait...',
        exitCode: 1
      };
    }

    setIsRunning(true);

    try {
      const testCases = challenge.testCases || [];
      const testOutputs: string[] = [];

      // Run each test case separately
      for (const testCase of testCases) {
        try {
          // Reset stdout/stderr for each test
          await pyodide.runPythonAsync(`
import sys
from io import StringIO
sys.stdout = StringIO()
sys.stderr = StringIO()
          `);

          // If test case has input, mock the input() function
          if (testCase.input) {
            const inputs = testCase.input.split('\n').filter(line => line.trim() !== '');
            const inputsArray = inputs.map(i => `"${i.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`).join(', ');
            
            await pyodide.runPythonAsync(`
# Mock input function with predefined inputs
_input_values = [${inputsArray}]
_input_index = 0

def input(prompt=""):
    global _input_index
    if _input_index < len(_input_values):
        value = _input_values[_input_index]
        _input_index += 1
        return value
    return ""
            `);
          }

          // Run the user's code
          await pyodide.runPythonAsync(code);

          // Get the output for this test
          const stdout = await pyodide.runPythonAsync('sys.stdout.getvalue()');
          const stderr = await pyodide.runPythonAsync('sys.stderr.getvalue()');

          // Check for errors
          if (stderr && stderr.trim()) {
            // If there's an error in any test, return early with error
            return {
              error: stderr,
              stdout: stdout || '',
              exitCode: 1
            };
          }

          // Store the output for this test (cleaned)
          testOutputs.push((stdout || '').trim());

        } catch (error: any) {
          // If any test throws an error, return early
          let errorMessage = error.message || 'Unknown error';
          
          // Clean up traceback for better readability
          if (errorMessage.includes('Traceback')) {
            const lines = errorMessage.split('\n');
            const errorLine = lines.find(line => 
              line.includes('Error:') || 
              line.includes('Exception:')
            );
            if (errorLine) {
              errorMessage = errorLine.trim();
            }
          }

          return {
            error: errorMessage,
            exitCode: 1
          };
        }
      }

      // All tests ran successfully
      return {
        testOutputs,
        stdout: testOutputs.join('\n'),
        error: null,
        exitCode: 0
      };

    } catch (error: any) {
      return {
        error: error.message || 'Unknown error occurred',
        exitCode: 1
      };
    } finally {
      setIsRunning(false);
    }
  };

  return {
    isRunning,
    runChallengeTests
  };
}
