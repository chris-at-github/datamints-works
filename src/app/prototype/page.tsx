import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Prototype",
};

export default function PrototypePage() {
  return (
    <>
      <h1>Prototype</h1>

      <ul>
        <li>
          <Link href="/prototype/components">Components</Link>
        </li>
      </ul>
    </>
  );
}
