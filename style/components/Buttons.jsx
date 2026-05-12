import React from "react";
import { cn } from "../../src/utils";

const Buttons = ({ text, variant, type }) => {
  return (
    <button
      className={cn(
        "cursor-pointer",

        variant === "primary" &&
          "px-5 py-2 ring-1 active:scale-92 transition-all ease-in-out duration-200 hover:text-gray-500 rounded-xl",

        variant === "ghost" &&
          "px-5 py-2 hover:bg-gray-200/50 transition-all ease-in-out duration-200 rounded-xl hover:shadow-[1px_1px_5px_1px_rgba(0,0,0,0.3)]",

        variant === "outline" &&
          "px-5 py-2 hover:bg-gray-200/50 transition-all ease-in-out duration-200 rounded-xl ring-2 ring-[rgba(65,65,65,0.3)] shadow-[1px_1px_5px_1px_rgba(0,0,0,0.3)]",
        variant === "secondary" &&
          "px-5 py-2 ring-1 active:scale-92 transition-all ease-in-out duration-200 hover:text-gray-500 rounded-xl",
      )}
      type={type ? type : "button"}
    >
      {text}
    </button>
  );
};

export default Buttons;
