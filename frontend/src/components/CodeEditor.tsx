import { useRef, useEffect, useState } from 'react';

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
  const highlightRef = useRef<HTMLPreElement>(null);

  const syntaxHighlight = (code: string) => {
    if (!code) return `<span class="text-gray-500">${placeholder}</span>`;
    
    let result = code;
    
    // Escape HTML first
    result = result
      .replace(/&/g, '&')
      .replace(/</g, '<')
      .replace(/>/g, '>');
    
    // Highlight strings (handle both single and double quotes, avoiding already highlighted content)
    result = result.replace(/(['"`])(?:(?=(\\?))\2.)*?\1/g, (match) => {
      return `<span style="color: #fcd34d;">${match}</span>`;
    });
    
    // Highlight comments
    result = result.replace(/#[^\n]*/g, (match) => {
      return `<span style="color: #9ca3af; font-style: italic;">${match}</span>`;
    });
    
    // Python keywords
    const keywords = [
      'def', 'class', 'if', 'elif', 'else', 'for', 'while', 'in', 'return', 
      'import', 'from', 'as', 'try', 'except', 'finally', 'with', 'pass',
      'break', 'continue', 'and', 'or', 'not', 'is', 'None', 'True', 'False',
      'lambda', 'yield', 'global', 'nonlocal', 'assert', 'raise', 'del'
    ];
    
    // Highlight keywords
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
      result = result.replace(regex, `<span style="color: #f472b6; font-weight: 600;">$1</span>`);
    });
    
    // Built-in functions
    const builtins = [
      'print', 'input', 'len', 'range', 'str', 'int', 'float', 'list', 'dict',
      'tuple', 'set', 'bool', 'type', 'isinstance', 'open', 'map', 'filter',
      'sorted', 'sum', 'min', 'max', 'abs', 'round', 'zip', 'enumerate'
    ];
    
    // Highlight built-in functions
    builtins.forEach(builtin => {
      const regex = new RegExp(`\\b(${builtin})\\b`, 'g');
      result = result.replace(regex, `<span style="color: #60a5fa;">$1</span>`);
    });
    
    // Highlight numbers
    result = result.replace(/\b(\d+\.?\d*)\b/g, `<span style="color: #c084fc;">$1</span>`);
    
    // Highlight function/class names in definitions
    result = result.replace(
      /<span style="color: #f472b6; font-weight: 600;">(def|class)<\/span>\s+(\w+)/g, 
      '<span style="color: #f472b6; font-weight: 600;">$1</span> <span style="color: #86efac;">$2</span>'
    );
    
    return result;
  };

  const syncScroll = () => {
    if (textareaRef.current && highlightRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
      highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
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
          {/* Syntax Highlighted Background */}
          <pre
            ref={highlightRef}
            className="absolute top-0 left-0 w-full h-full p-6 font-mono pointer-events-none overflow-auto"
            style={{ 
              fontFamily: 'Monaco, Menlo, "Ubuntu Mono\", monospace',
              lineHeight: '1.6',
              fontSize: '16px',
              margin: 0,
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
              color: '#86efac'
            }}
            dangerouslySetInnerHTML={{ __html: syntaxHighlight(value) }}
          />
          
          {/* Actual Textarea */}
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onScroll={syncScroll}
            readOnly={readOnly}
            className="relative w-full h-full bg-transparent font-mono resize-none outline-none p-6"
            placeholder={placeholder}
            style={{ 
              fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
              lineHeight: '1.6',
              fontSize: '16px',
              color: 'transparent',
              caretColor: 'white',
              minHeight,
              WebkitTextFillColor: 'transparent'
            }}
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
