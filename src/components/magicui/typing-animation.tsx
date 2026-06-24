"use client";

import React, { useEffect, useState } from "react";

interface TypingAnimationProps {
  children?: string;
  text?: string;
  duration?: number;
  className?: string;
  delay?: number;
  as?: React.ElementType;
}

export default function TypingAnimation({
  children,
  text = "",
  duration = 80,
  className = "",
  delay = 0,
  as: Component = "span",
}: TypingAnimationProps) {
  const content = children || text;
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    // Reset text if content changes (e.g. language toggle)
    setDisplayedText("");
    
    let index = 0;
    let timer: NodeJS.Timeout;

    const startTyping = () => {
      timer = setInterval(() => {
        if (index < content.length) {
          setDisplayedText(content.substring(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
        }
      }, duration);
    };

    const delayTimer = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(delayTimer);
      clearInterval(timer);
    };
  }, [content, duration, delay]);

  return (
    <Component className={className}>
      {displayedText}
    </Component>
  );
}
