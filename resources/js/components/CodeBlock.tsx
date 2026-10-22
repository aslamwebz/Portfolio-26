import type { ComponentProps } from 'react';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import php from 'react-syntax-highlighter/dist/esm/languages/prism/php';
import sql from 'react-syntax-highlighter/dist/esm/languages/prism/sql';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-light';

SyntaxHighlighter.registerLanguage('php', php);
SyntaxHighlighter.registerLanguage('sql', sql);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('bash', bash);
const aliases: Record<string, string> = {
    js: 'javascript',
    ts: 'typescript',
    sh: 'bash',
    shell: 'bash',
};
function CodeContent({ children, className }: ComponentProps<'code'>) {
    return <code className={className}>{children}</code>;
}
export default function CodeBlock({
    code,
    language = 'text',
}: {
    code: string;
    language?: string;
}) {
    return (
        <SyntaxHighlighter
            language={aliases[language] || language}
            useInlineStyles={false}
            CodeTag={CodeContent}
            codeTagProps={{}}
        >
            {code.trimEnd()}
        </SyntaxHighlighter>
    );
}
