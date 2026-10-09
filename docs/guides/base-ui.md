# Base UI

Base UI (`@base-ui/react`) liefert ungestylte, barrierefreie React-Komponenten.
Styles kommen aus eigenen CSS-Modulen. Die globale Vorbereitung (`.page`-Wrapper,
`body { position: relative; }`) steht in [css.md](css.md#vorbereitung-für-base-ui).

## Eigene Komponente um Base UI bauen

**Problem:** Base-UI-Komponenten sollen einheitlich gestylt sein, ohne dass jedes
Modul die Styles wiederholt.

**Vorgehen:** Eine eigene Komponente in `src/components/<Name>/` umschließt die
Base-UI-Komponente, reicht alle Props durch und ergänzt die Modul-Klasse:

```tsx
"use client";

import { Button as BaseButton } from "@base-ui/react/button";
import styles from "./Button.module.css";

export type ButtonProps = BaseButton.Props;

export function Button({ className, ...props }: ButtonProps) {
  const mergedClassName =
    typeof className === "function"
      ? (state: BaseButton.State) => joinClassNames(styles.button, className(state))
      : joinClassNames(styles.button, className);

  return <BaseButton className={mergedClassName} {...props} />;
}
```

**Hinweise:**

- Import pro Komponente: `@base-ui/react/<komponente>` (z. B. `/button`,
  `/dialog`). Typen liegen im Namespace: `BaseButton.Props`, `BaseButton.State`.
- `className` darf bei Base UI ein String **oder** eine Funktion
  `(state) => string` sein — beim Zusammenführen beide Fälle abdecken.
- Module verwenden nur die eigenen Komponenten aus `src/components/`, nie Base UI
  direkt.

## Server- und Client-Komponenten

**Problem:** Wann braucht eine Datei `"use client"`?

**Vorgehen:**

- Base UI markiert seine Komponenten selbst als Client-Komponenten.
- Eigene Wrapper, die Funktionen erzeugen (z. B. ein zusammengeführtes
  `className`), bekommen `"use client"` — Funktionen können nicht vom Server zum
  Client übergeben werden.
- Seiten bleiben Server-Komponenten. Teile mit State oder Event-Handlern
  (`useState`, `onClick`) in eine eigene Client-Komponente auslagern, siehe
  `src/app/prototype/components/_helpers/CounterDemo.tsx`.

**Hinweise:**

- Server-Komponenten dürfen Client-Komponenten rendern und ihnen serialisierbare
  Props übergeben (Strings, Zahlen, React-Elemente) — aber keine Funktionen.

## Zustände stylen

**Problem:** Wie werden Zustände wie „deaktiviert“ oder „geöffnet“ gestylt?

**Vorgehen:** Base UI setzt `data-*`-Attribute, die im CSS-Modul angesprochen
werden:

```css
.button {
  &:hover:not([data-disabled]) { … }
  &[data-disabled] { … }
}
```

**Hinweise:**

- Welche Attribute es gibt, steht in der Doku der Komponente oder in
  `node_modules/@base-ui/react/<komponente>/*DataAttributes.d.ts`.
- `Button` kennt nur `data-disabled`, kein `data-pressed` — gedrückt über
  `:active`.
- Übergänge mit `var(--transition-duration-default)`. Bei
  `prefers-reduced-motion: reduce` ist die Variable `0s`, die Übergänge sind dann
  automatisch aus.

## Keine Links über `render`

**Problem:** Ein Link soll wie ein Button aussehen.

**Vorgehen:** **Nicht** `<Button nativeButton={false} render={<a href="…" />}>`
verwenden. Base UI setzt dann `role="button"` und Button-Tastaturverhalten auf das
`<a>` — Screenreader sagen „Schaltfläche“ statt „Link“. Für Links im Button-Look
eine eigene Komponente mit echter Link-Semantik bauen (z. B. auf `next/link`).

**Hinweise:**

- `render` ist für Elemente gedacht, die sich wie ein Button *verhalten* sollen.
