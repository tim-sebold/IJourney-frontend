import React from "react";

export function ProfileShell({ children }: { children: React.ReactNode }) {
  const handelScrollTop = () => {
    window.scrollTo(0, 0);
  }
  return <div className="min-h-screen pt-30" onLoad={handelScrollTop}>{children}</div>;
}
