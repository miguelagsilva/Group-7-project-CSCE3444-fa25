// Pyodide runner with input() support for challenges

/**
 * Run Python code with mocked input() function
 */
export async function runPythonWithInput(
  pyodide: any,
  code: string,
  inputs: string[]
): Promise<string> {
  try {
    // Redirect stdout/stderr to capture output
    await pyodide.runPythonAsync(`
import sys
from io import StringIO
sys.stdout = StringIO()
sys.stderr = StringIO()
    `);

    // Mock the input() function with provided inputs
    const inputsArray = inputs.map(i => `"${i.replace(/"/g, '\\"')}"`).join(', ');
    await pyodide.runPythonAsync(`
# Mock input function with predefined inputs
_input_values = [${inputsArray}]
_input_index = 0

def input(prompt=""):
    global _input_index
    if _input_index < len(_input_values):
        value = _input_values[_input_index]
        _input_index += 1
        print(prompt + value)  # Echo the prompt and input like real input() does
        return value
    return ""
    `);

    // Run the user's code
    await pyodide.runPythonAsync(code);

    // Get the output
    const stdout = await pyodide.runPythonAsync('sys.stdout.getvalue()');
    const stderr = await pyodide.runPythonAsync('sys.stderr.getvalue()');

    let result = '';
    if (stdout) {
      result += stdout;
    }

    if (stderr) {
      result += '\n⚠️ Errors:\n' + stderr;
    }

    return result || '';
  } catch (error: any) {
    // Format Python errors nicely
    let errorMessage = error.message || 'Unknown error';
    
    // Remove traceback noise for cleaner error messages
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

    throw new Error(errorMessage);
  }
}

/**
 * Parse input string from test case
 * Handles comma-separated inputs
 */
export function parseTestInputs(inputString: string | undefined): string[] {
  if (!inputString) {
    return [];
  }
  
  // Split by comma and trim each value
  return inputString.split(',').map(s => s.trim());
}
