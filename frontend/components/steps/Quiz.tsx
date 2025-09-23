import React, { useEffect } from 'react';

const Quiz = ({ data }: { data: string }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//embed.typeform.com/next/embed.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);
  const decodeHtml = (html: string) => {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = html;
    return textArea.value;
  };
  return (
    <div
      dangerouslySetInnerHTML={{ __html: decodeHtml(data) }}
    />
  );
};

export default Quiz;