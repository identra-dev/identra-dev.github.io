"use client";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { IconCheck, IconCopy } from "@tabler/icons-react";

// Syntax theme tuned to the site: light neumorphic surface, near-black text,
// a single orange accent for keywords, aubergine for values, muted grey comments.
const identraCodeTheme = {
  ...oneLight,
  'pre[class*="language-"]': {
    ...(oneLight['pre[class*="language-"]'] || {}),
    background: "transparent",
    margin: 0,
    textShadow: "none",
  },
  'code[class*="language-"]': {
    ...(oneLight['code[class*="language-"]'] || {}),
    background: "transparent",
    color: "#23262f",
    textShadow: "none",
  },
  comment: { color: "#6a7180", fontStyle: "italic" },
  prolog: { color: "#6a7180" },
  doctype: { color: "#6a7180" },
  cdata: { color: "#6a7180" },
  punctuation: { color: "#9aa0ad" },
  operator: { color: "#9aa0ad" },
  keyword: { color: "#e95420", fontWeight: "600" },
  "attr-name": { color: "#e95420" },
  property: { color: "#e95420" },
  tag: { color: "#e95420" },
  builtin: { color: "#e95420" },
  string: { color: "#6a7180" },
  char: { color: "#6a7180" },
  number: { color: "#77216f" },
  boolean: { color: "#77216f" },
  constant: { color: "#77216f" },
  symbol: { color: "#77216f" },
  "class-name": { color: "#77216f" },
  function: { color: "#23262f", fontWeight: "600" },
  variable: { color: "#23262f" },
};

type CodeBlockProps = {
  language: string;
  filename: string;
  highlightLines?: number[];
} & (
  | {
      code: string;
      tabs?: never;
    }
  | {
      code?: never;
      tabs: Array<{
        name: string;
        code: string;
        language?: string;
        highlightLines?: number[];
      }>;
    }
);

export const CodeBlock = ({
  language,
  filename,
  code,
  highlightLines = [],
  tabs = [],
}: CodeBlockProps) => {
  const [copied, setCopied] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);

  const tabsExist = tabs.length > 0;

  const copyToClipboard = async () => {
    const textToCopy = tabsExist ? tabs[activeTab].code : code;
    if (textToCopy) {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const activeCode = tabsExist ? tabs[activeTab].code : code;
  const activeLanguage = tabsExist
    ? tabs[activeTab].language || language
    : language;
  const activeHighlightLines = tabsExist
    ? tabs[activeTab].highlightLines || []
    : highlightLines;

  return (
    <div className="relative w-full rounded-[14px] bg-transparent p-4 font-mono text-sm">
      <div className="flex flex-col gap-2">
        {tabsExist && (
          <div className="flex overflow-x-auto border-b border-border">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`-mb-px border-b-2 px-3 !py-2 text-xs transition-colors font-sans ${
                  activeTab === index
                    ? "border-primary text-primary font-semibold"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        )}
        {!tabsExist && filename && (
          <div className="flex justify-between items-center py-2">
            <div className="text-xs text-muted-foreground">{filename}</div>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors font-sans"
            >
              {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
            </button>
          </div>
        )}
      </div>
      <SyntaxHighlighter
        language={activeLanguage}
        style={identraCodeTheme}
        customStyle={{
          margin: 0,
          marginTop: "0.5rem",
          padding: 0,
          background: "transparent",
          color: "#23262f",
          fontSize: "0.8rem",
        }}
        wrapLines={true}
        showLineNumbers={true}
        lineNumberStyle={{ color: "#b4b9c6", minWidth: "2.2em" }}
        lineProps={(lineNumber) => ({
          style: {
            backgroundColor: activeHighlightLines.includes(lineNumber)
              ? "rgba(233,84,32,0.08)"
              : "transparent",
            display: "block",
            width: "100%",
          },
        })}
        PreTag="div"
      >
        {String(activeCode)}
      </SyntaxHighlighter>
    </div>
  );
};
