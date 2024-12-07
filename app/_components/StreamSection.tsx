"use client";

import { useCallback, useRef, useState } from "react";

export const StreamSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const actionsResultRef = useRef<HTMLTextAreaElement>(null);

  const handleClick = useCallback(async() => {
    if (actionsResultRef.current === null) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/fizzbazz?start=1&end=15");
      const reader = response.body?.getReader();
      if (reader === undefined) {
        throw new Error("reader is undefined");
      }

      let result = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          setIsLoading(false);
          break;
        }
        result += new TextDecoder().decode(value);
        actionsResultRef.current.value = result;
      }
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }

  }, []);

  return (
    <div>
      <h2 className="text-2xl">Streamで実行する</h2>
      <button
        className="px-2 border rounded hover:bg-gray-50 disabled:bg-gray-300 my-1"
        onClick={handleClick}
        disabled={isLoading}
      >
        Run 
      </button>
      <textarea
        ref={actionsResultRef}
        className="w-full p-2 bg-gray-100 text-sm"
        readOnly
        rows={15}
      ></textarea>
    </div>
  );
};
