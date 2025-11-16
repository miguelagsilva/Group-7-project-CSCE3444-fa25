import { useState, useEffect, useRef } from 'react';

interface PyodideHookResult {
  isLoading: boolean;
  isRunning: boolean;
  output: string;
  error: string | null;
  runCode: (code: string) => Promise<void>;
  clearOutput: () => void;
}

export function usePyodide(): PyodideHookResult {
  const [isLoading, setIsLoading] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const pyodideRef = useRef<any>(null);

  // Load Pyodide when hook is first used
  useEffect(() => {
    const loadPyodide = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Load Pyodide script if not already loaded
        if (!(window as any).loadPyodide) {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
          script.async = true;
          
          await new Promise<void>((resolve, reject) => {
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load Pyodide script'));
            document.head.appendChild(script);
          });
        }
        
        // Load Pyodide from CDN
        const pyodideModule = await (window as any).loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/'
        });
        
        pyodideRef.current = pyodideModule;
        setIsLoading(false);
        setOutput('✅ Python is ready! Start coding!\n');
      } catch (error) {
        console.error('Failed to load Pyodide:', error);
        setError('Failed to load Python environment. Please refresh the page.');
        setIsLoading(false);
      }
    };

    loadPyodide();
  }, []);

  const runCode = async (pythonCode: string) => {
    if (!pyodideRef.current) {
      setOutput('❌ Python environment is not ready yet. Please wait...');
      return;
    }

    setIsRunning(true);
    setOutput('🚀 Running your code...\n');

    try {
      const pyodide = pyodideRef.current;
      
      // Redirect stdout to capture print statements
      await pyodide.runPythonAsync(`
import sys
from io import StringIO
sys.stdout = StringIO()
sys.stderr = StringIO()
      `);

      // Run the user's code
      await pyodide.runPythonAsync(pythonCode);

      // Get the output
      const stdout = await pyodide.runPythonAsync('sys.stdout.getvalue()');
      const stderr = await pyodide.runPythonAsync('sys.stderr.getvalue()');

      let result = '';
      if (stdout) {
        result += '✅ Success!\n\n' + stdout;
      } else if (!stderr) {
        result += '✅ Code executed successfully! (No output to display)\n';
      }

      if (stderr) {
        result += '\n⚠️ Errors:\n' + stderr;
      }

      setOutput(result || '✅ Code executed successfully!');
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

      setOutput(`❌ Error:\n\n${errorMessage}\n\nTip: Check your code for syntax errors or typos!`);
    } finally {
      setIsRunning(false);
    }
  };

  const clearOutput = () => {
    setOutput('');
  };

  return {
    isLoading,
    isRunning,
    output,
    error,
    runCode,
    clearOutput
  };
}
