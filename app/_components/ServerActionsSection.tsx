"use client";

import { useCallback, useRef, useState } from "react";
import { fizzBazzAction } from "../_actions/fizzbazz";

export const ServerActionsSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const actionsResultRef = useRef<HTMLTextAreaElement>(null);

  const handleClick = useCallback(async () => {
    if (actionsResultRef.current === null) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await fizzBazzAction(1, 15)
      actionsResultRef.current.value = result;
    } catch (e) {
      console.error(e);
    }

    setIsLoading(false);
  }, []);

  return (
    <div>
      <h2 className="text-2xl">Server Actionsで実行する</h2>
      <button
        className="px-2 border rounded hover:bg-gray-50 disabled:bg-gray-300 my-1"
        onClick={handleClick}
        disabled={isLoading}
      >
        Run Server Action
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
