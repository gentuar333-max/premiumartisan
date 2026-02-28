"use client";

import { useEffect, useState } from "react";

export function SuiviToast({ message }: { message: string }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setVisible(false), 4000);
    return () => window.clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 24,
        right: 24,
        zIndex: 9999,
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: 16,
        padding: "16px 20px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
        fontSize: 15,
        fontWeight: 600,
        color: "#166534",
      }}
    >
      {message}
    </div>
  );
}
