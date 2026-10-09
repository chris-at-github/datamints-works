"use client";

import { useState } from "react";
import { Button } from "@/components/Button";

// Client component: the counter needs state, the surrounding page does not.
export function CounterDemo() {
  const [count, setCount] = useState(0);

  return (
    <Button onClick={() => setCount((current) => current + 1)}>
      Clicked {count} times
    </Button>
  );
}
