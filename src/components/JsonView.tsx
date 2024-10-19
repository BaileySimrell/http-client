import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface JsonViewProps {
  data: string;
}

const JsonView: React.FC<JsonViewProps> = ({ data }) => {
  const [copied, setCopied] = useState(false);

  const formatJson = (json: string): string => {
    try {
      return JSON.stringify(JSON.parse(json), null, 2);
    } catch {
      return json;
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formatJson(data)).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative h-[70vh]">
      <SyntaxHighlighter
        language="json"
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          borderRadius: '0.375rem',
          height: '100%',
          overflow: 'auto',
        }}
      >
        {formatJson(data)}
      </SyntaxHighlighter>
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded text-sm"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
};

export default JsonView;
