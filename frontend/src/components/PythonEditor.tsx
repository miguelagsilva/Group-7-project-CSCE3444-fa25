import { useState } from 'react';
import { Play, RotateCcw, Copy, Terminal, Loader } from 'lucide-react';
import { Button } from './ui/button';
import { MonacoEditor } from './MonacoEditor';
import { usePyodide } from '../hooks/usePyodide';

interface PythonEditorProps {
  initialCode?: string;
  height?: string;
  showOutput?: boolean;
  showControls?: boolean;
  autosaveKey?: string;
  onCodeChange?: (code: string) => void;
  onRun?: (code: string, output: string) => void;
  className?: string;
}

export function PythonEditor({
  initialCode = '# Write your Python code here\nprint("Hello, World!")',
  height = '500px',
  showOutput = true,
  showControls = true,
  autosaveKey = 'lc4k_python_editor_v1',
  onCodeChange,
  onRun,
  className = ''
}: PythonEditorProps) {
  const [code, setCode] = useState(initialCode);
  const { isLoading, isRunning, output, error, runCode, clearOutput } = usePyodide();

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    onCodeChange?.(newCode);
  };

  const handleRunCode = async () => {
    await runCode(code);
    if (onRun) {
      onRun(code, output);
    }
  };

  const handleResetCode = () => {
    setCode(initialCode);
    clearOutput();
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className={className}>
      {/* Loading State */}
      {isLoading && (
        <div className="mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6">
          <div className="flex items-center justify-center gap-4">
            <Loader className="w-8 h-8 text-white animate-spin" />
            <div>
              <p className="text-white font-bold text-lg">Loading Python Environment...</p>
              <p className="text-blue-100 text-sm">This might take a few seconds on first load</p>
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="mb-4 bg-red-50 border-2 border-red-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <span className="text-3xl">❌</span>
            <div>
              <h3 className="text-xl font-bold text-red-800 mb-2">Oops!</h3>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Code Editor */}
      <div className="bg-gray-900 rounded-2xl overflow-hidden">
        {showControls && (
          <div className="bg-gray-800 p-4 flex items-center justify-between border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-300 text-sm font-medium ml-2">Python Editor</span>
            </div>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="ghost"
                className="text-gray-400 hover:text-white hover:bg-gray-700 p-2"
                onClick={handleCopyCode}
                disabled={isLoading}
              >
                <Copy className="w-4 h-4" />
              </Button>
              <Button 
                size="sm" 
                variant="ghost"
                className="text-gray-400 hover:text-white hover:bg-gray-700 p-2"
                onClick={handleResetCode}
                disabled={isLoading}
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button 
                size="sm" 
                className="bg-green-600 hover:bg-green-700"
                onClick={handleRunCode}
                disabled={isRunning || isLoading}
              >
                {isRunning ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-1" />
                    Run Code
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
        
        <MonacoEditor
          value={code}
          onChange={handleCodeChange}
          language="python"
          theme="vs-dark"
          height={height}
          autosaveKey={autosaveKey}
        />
      </div>

      {/* Output Console */}
      {showOutput && output && (
        <div className="mt-4 bg-gray-900 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Terminal className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-medium">Output:</span>
          </div>
          <pre className="text-gray-300 whitespace-pre-wrap font-mono text-sm">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
