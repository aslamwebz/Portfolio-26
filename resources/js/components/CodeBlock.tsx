import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
    code: string;
    language?: string;
    filename?: string;
}

export default function CodeBlock({
    code,
    language = 'php',
    filename,
}: CodeBlockProps) {
    // Determine the displayed filename or fallback to language
    const displayHeader =
        filename || (language === 'php' ? 'index.php' : language.toUpperCase());

    // Dedent function to remove common leading whitespace
    const dedent = (text: string) => {
        const lines = text.split('\n');
        // Filter out empty lines to find the minimum indent
        const minIndent = lines
            .filter((line) => line.trim().length > 0)
            .reduce((min, line) => {
                const indent = line.match(/^\s*/)?.[0].length ?? 0;
                return Math.min(min, indent);
            }, Infinity);

        if (minIndent === Infinity) return text.trim();

        return lines
            .map((line) => line.slice(minIndent))
            .join('\n')
            .trim();
    };

    return (
        <div className="group my-8 overflow-hidden rounded-xl border border-white/10 bg-[#1E1E1E] shadow-2xl transition-all hover:border-emerald-500/30">
            {/* Header / Title Bar */}
            <div className="flex h-10 items-center justify-between border-b border-white/5 bg-[#252526] px-4">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="h-3 w-3 rounded-full bg-[#FF5F56]"></div>
                        <div className="h-3 w-3 rounded-full bg-[#FFBD2E]"></div>
                        <div className="h-3 w-3 rounded-full bg-[#27C93F]"></div>
                    </div>
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px] font-medium text-slate-400">
                    <span className="opacity-50">
                        {language === 'sql' ? '🐘' : '⚡'}
                    </span>
                    {displayHeader}
                </div>
                <div className="w-12"></div>{' '}
                {/* Spacer to keep title centered if needed */}
            </div>

            {/* Code Content */}
            <div className="custom-scrollbar relative overflow-x-auto p-4">
                <SyntaxHighlighter
                    language={language}
                    style={vscDarkPlus}
                    customStyle={{
                        margin: 0,
                        padding: 0,
                        background: 'transparent',
                        fontSize: '14px',
                        lineHeight: '1.6',
                        fontFamily: 'var(--font-mono)',
                    }}
                    showLineNumbers={true}
                    lineNumberStyle={{
                        minWidth: '2.5em',
                        paddingRight: '1em',
                        color: '#606060',
                        textAlign: 'right',
                        userSelect: 'none',
                    }}
                >
                    {dedent(code)}
                </SyntaxHighlighter>
            </div>
        </div>
    );
}
