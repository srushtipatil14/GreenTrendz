import * as React from "react";

export function Card({ children, className = "" }) {
  return <div className={`border p-4 rounded-lg shadow ${className}`}>{children}</div>;
}

export function CardHeader({ children, className = "" }) {
  return <div className={`border-b pb-2 mb-2 font-semibold ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "" }) {
  return <h2 className={`text-lg font-bold ${className}`}>{children}</h2>;
}

export function CardContent({ children, className = "" }) {
  return <div className={`py-2 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = "" }) {
  return <div className={`border-t pt-2 mt-2 ${className}`}>{children}</div>;
}

