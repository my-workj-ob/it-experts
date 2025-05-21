// app/layout.tsx yoki page.tsx
"use client";

import { initializeOneSignal } from "@/lib/one-signal";
import { useEffect } from "react";

export default function OneSignalInit() {
  useEffect(() => {
    initializeOneSignal();
  }, []);

  return <div>App</div>;
}
