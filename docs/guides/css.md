# CSS

## Aufbau der globalen Styles

**Problem:** Globale Angaben (Variablen, Normalisierung, HTML-Elemente) sollen
getrennt von Komponenten-Styles liegen und eine feste Rangfolge haben.

**Vorgehen:** Alle globalen Dateien liegen in `src/styles/`. `layout.tsx`
importiert nur `application.css`.

| Datei | Inhalt | Layer |
| --- | --- | --- |
| `application.css` | Einstiegspunkt, importiert alle anderen Dateien | – |
| `layers.css` | Reihenfolge der Layer | – |
| `normalize.css` | Browser-Defaults angleichen bzw. entfernen | `normalize` |
| `variables.css` | Design-Tokens als Custom Properties | `base` |
| `base.css` | Styles für HTML-Elemente | `base` |
| `layout.css` | Seitenlayout (`.page`, `.page__main`) in BEM-Schreibweise | `layout` |
| `typography.css` | Typografie-Klassen wie `.display`, `.display--layout-1` … für Überschriften | `typography` |
| `utilities.css` | Hilfsklassen wie `.visually-hidden` | `utilities` |

Jede Datei schließt ihre Regeln selbst in ihren Layer ein:

```css
@layer base {
  body { … }
}
```

**Hinweise:**

- `layers.css` muss der **erste** Import in `application.css` bleiben. Turbopack
  setzt den Inhalt von `@import`-Dateien vor alle anderen Regeln der
  importierenden Datei — eine `@layer`-Anweisung direkt in `application.css`
  landet deshalb hinter den Layer-Blöcken und wirkt nicht.
- CSS-Variablen funktionieren nicht in Media Queries
  (`@media (min-width: var(--x))` ist ungültig).

## Rangfolge der Layer

**Problem:** Welche Regel gewinnt, wenn globale Styles und Komponenten-Styles
dasselbe Element treffen?

**Vorgehen:** Die Reihenfolge in `layers.css` entscheidet — spätere Layer
gewinnen, unabhängig von der Spezifität der Selektoren:

```
normalize  <  base  <  layout  <  typography  <  utilities  <  CSS-Module (ohne Layer)
```

**Hinweise:**

- CSS-Module bekommen **keinen** `@layer`-Rahmen. CSS ohne Layer gewinnt immer
  gegen alle Layer.
- Folge: Hilfsklassen verlieren gegen Komponenten-Styles. Utilities nur für
  Dinge nutzen, die sich nicht mit Komponenten überschneiden.
- Kontrolle im Build: `@layer normalize,base,layout,typography,utilities;` muss in der CSS-Datei
  unter `.next/static/chunks/` vor dem ersten `@layer …{` stehen.

## Wohin gehört ein neuer Style?

**Problem:** Neue CSS-Regel — global oder CSS-Modul?

**Vorgehen:**

- Gilt für ein HTML-Element überall (`h1`, `a`, `body`) → `base.css`
- Wert, der mehrfach verwendet wird (Farbe, Abstand, Schriftgröße) → `variables.css`
- Seitenlayout, das für alle Seiten gilt (`.page`, `.page__main`) → `layout.css`
- Einzweck-Hilfsklasse ohne Bezug zu einer Komponente → `utilities.css`
- Alles, was zu einer Komponente oder einem Modul gehört → dessen CSS-Modul

## Komponenten und Module anlegen

**Problem:** Einheitlicher Ort für React-Datei und zugehöriges CSS-Modul.

**Vorgehen:** Jede Komponente und jedes Modul bekommt einen eigenen Ordner:

```
src/components/Button/Button.tsx
src/components/Button/Button.module.css
src/modules/Gallery/Gallery.tsx
src/modules/Gallery/Gallery.module.css
```

```tsx
import styles from "./Button.module.css";

export function Button() {
  return <button className={styles.button}>…</button>;
}
```

**Hinweise:**

- **Komponenten** sind kleine Bausteine (Button, Icon, Badge), **Module** eigene
  Inhaltsbereiche aus Komponenten (Bildergalerie, Text-Bild).
- Native CSS-Verschachtelung ist erlaubt (`&:hover`, `&[data-open]`), ein
  Präprozessor ist nicht nötig.

## Vorbereitung für Base UI

**Problem:** Base UI braucht zwei globale Regeln, damit Popups und Scroll-Lock
funktionieren.

**Vorgehen:** `.page` steht in `layout.css`, `body` in `base.css`:

- `.page { isolation: isolate; }` — `layout.tsx` umschließt alle Seiten mit
  `<div className="page">`. Der eigene Stacking-Context sorgt dafür, dass
  Popups aus Portals immer über dem Seiteninhalt liegen.
- Der Wrapper muss ein eigenes Element direkt in `<body>` sein: Portals werden
  ans Ende von `<body>` gehängt, also neben den Wrapper. `body` selbst würde die
  Portals mit isolieren, `<main>` würde Header und Footer nicht umschließen.
- `body { position: relative; }` — nötig für den Scroll-Lock in iOS Safari.

**Hinweise:**

- Base UI liefert keine Styles. Zustände werden als `data-*`-Attribute gesetzt
  und im CSS-Modul angesprochen, z. B. `.trigger[data-popup-open] { … }`.
- Aufbau eigener Komponenten um Base UI: siehe [base-ui.md](base-ui.md).
