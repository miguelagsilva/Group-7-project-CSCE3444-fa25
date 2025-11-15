import { useRef } from 'react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
  showLineNumbers?: boolean;
  readOnly?: boolean;
}

export function CodeEditor({ 
  value, 
  onChange, 
  placeholder = "# Write your Python code here...",
  minHeight = "450px",
  showLineNumbers = true,
  readOnly = false
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newValue = value.substring(0, start) + '    ' + value.substring(end);
      onChange(newValue);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
        }
      }, 0);
    }
  };

  const generateLineNumbers = () => {
    const lines = value ? value.split('\n').length : 1;
    return Array.from({ length: Math.max(lines, 20) }, (_, i) => i + 1).join('\n');
  };

  return (
    <div className="bg-gray-900 rounded-2xl overflow-hidden" style={{ minHeight }}>
      <div className="flex">
        {/* Line Numbers */}
        {showLineNumbers && (
          <div className="bg-gray-800 px-4 py-6 border-r border-gray-700 min-w-[60px] select-none">
            <pre
              className="text-gray-500 font-mono text-right"
              style={{ 
                fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                lineHeight: '1.6',
                fontSize: '16px'
              }}
            >
              {generateLineNumbers()}
            </pre>
          </div>
        )}
        
        {/* Code Area */}
        <div className="flex-1 relative" style={{ minHeight }}>
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            readOnly={readOnly}
            className="w-full h-full bg-transparent font-mono resize-none outline-none p-6 text-green-300"
            placeholder={placeholder}
            style={{ 
              fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
              lineHeight: '1.6',
              fontSize: '16px',
              minHeight,
              caretColor: 'white'
            }}
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
