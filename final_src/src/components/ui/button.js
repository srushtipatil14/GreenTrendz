import * as React from "react";

export function Button({ children, onClick }) {
  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={onClick}>
      {children}
    </button>
  );
}
