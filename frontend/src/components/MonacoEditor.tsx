// src/components/MonacoEditor.tsx
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';

interface MonacoEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  theme?: string;
  height?: string;
  readOnly?: boolean;
  autosaveKey?: string;
}

export function MonacoEditor({
  value,
  onChange,
  language = 'python',
  theme = 'vs-dark',
  height = '500px',
  readOnly = false,
  autosaveKey = 'lc4k_monaco_code_v1'
}: MonacoEditorProps) {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [isReady, setIsReady] = useState(false);
  const saveTimer = useRef<number | null>(null);

  // onMount provides the editor instance and monaco namespace
  const handleMount: OnMount = useCallback((editor, monacoNs) => {
    editorRef.current = editor;
    setIsReady(true);

    // add Ctrl/Cmd+Enter run action (optional)
    editor.addAction({
      id: 'run-code',
      label: 'Run Code (Ctrl+Enter)',
      keybindings: [monacoNs.KeyMod.CtrlCmd | monacoNs.KeyCode.Enter],
      run: () => {
        // emit the current value via onChange (so parent can run)
        onChange(editor.getValue());
        return null;
      }
    });
  }, [onChange]);

  // update editor value when prop changes
  useEffect(() => {
    if (!isReady || !editorRef.current) return;
    const current = editorRef.current.getValue();
    if (current !== value) {
      // preserve cursor position if you like, but simple setValue is fine
      editorRef.current.setValue(value);
    }
  }, [value, isReady]);

  // internal onChange with debounce autosave
  const handleEditorChange = useCallback((val?: string) => {
    const v = val ?? '';
    onChange(v);

    if (saveTimer.current) window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => {
      try {
        localStorage.setItem(autosaveKey, v);
      } catch (err) {
        console.warn('Autosave failed', err);
      }
    }, 700) as unknown as number;
  }, [onChange, autosaveKey]);

  // expose editor options (kept similar to your original)
  const editorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
    readOnly,
    automaticLayout: true,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Monaco, Menlo, "Ubuntu Mono", "Courier New", monospace',
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    wordWrap: 'on',
    wrappingIndent: 'indent',
    lineNumbers: 'on',
    glyphMargin: false,
    folding: true,
    lineDecorationsWidth: 10,
    lineNumbersMinChars: 3,
    renderLineHighlight: 'all',
    scrollbar: {
      vertical: 'visible',
      horizontal: 'visible',
      useShadows: false,
      verticalScrollbarSize: 10,
      horizontalScrollbarSize: 10,
    },
    suggestOnTriggerCharacters: true,
    quickSuggestions: true,
    tabSize: 4,
    insertSpaces: true,
    detectIndentation: false,
    formatOnPaste: true,
    formatOnType: true,
    padding: { top: 16, bottom: 16 },
  };

  return (
    <div style={{ width: '100%', height }}>
      <Editor
        theme={theme}
        language={language}
        value={value}
        onMount={handleMount}
        onChange={handleEditorChange}
        options={editorOptions}
      />
    </div>
  );
}
