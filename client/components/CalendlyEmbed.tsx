"use client"
import React, { useEffect, FC } from "react";

interface CalendlyEmbedProps {
  url: string;
}

const CalendlyEmbed: FC<CalendlyEmbedProps> = ({ url }) => {
  useEffect(() => {
    const head: HTMLHeadElement | null = document.querySelector("head");
    const script: HTMLScriptElement = document.createElement("script");
    script.setAttribute(
      "src",
      "https://assets.calendly.com/assets/external/widget.js"
    );
    head?.appendChild(script);
  }, []);

  return (
    <div
      className="dark:bg-slate-800 calendly-inline-widget"
    style={{
        minWidth:"320px",
        minHeight: "465px",
        height:"720px",
        width: '100%',
        display:'flex',
        margin: 'auto',
        padding: '1rem'
        
    }}
      data-url={url="https://calendly.com/reybinabraham"}
    ></div>
  );
};

export default CalendlyEmbed;