# Linting

ESLint prüft JavaScript/TypeScript (`eslint.config.mjs`), Stylelint prüft CSS
(`stylelint.config.mjs`). Einen Formatter gibt es nicht — der Code-Stil steht in
`.editorconfig`.

## Linter ausführen

**Problem:** Code vor dem Commit auf Fehler und Stilverstöße prüfen.

**Vorgehen:**

```bash
ddev exec npm run lint          # ESLint + Stylelint
ddev exec npm run lint:js       # nur ESLint
ddev exec npm run lint:css      # nur Stylelint (src/**/*.css)

ddev exec npm run lint:fix      # automatisch behebbare Befunde korrigieren
ddev exec npm run lint:js:fix
ddev exec npm run lint:css:fix
```

**Hinweise:**

- `lint` verkettet mit `&&`: Findet ESLint Fehler, läuft Stylelint in diesem
  Durchlauf nicht. Nach dem Beheben erneut starten.
- Keine Ausgabe außer den Skriptnamen bedeutet: keine Befunde.
- Git-Hooks gibt es bewusst nicht (Git läuft auf dem Host, Node nur im
  Container) — `lint` vor jedem Commit von Hand bzw. durch Claude.

## Mit Befunden umgehen

**Problem:** Ein Linter meldet einen Fehler.

**Vorgehen:**

1. `lint:fix` ausführen und das Ergebnis im Diff prüfen.
2. Verbleibende Befunde von Hand beheben — die Regel nennt die Ausgabe am
   Zeilenende (z. B. `no-descending-specificity`), Doku über die Suche nach dem
   Regelnamen.
3. Nur wenn ein Befund bewusst bleiben soll: Ausnahme mit Begründung direkt an
   der Stelle, nicht in der Konfiguration:

```css
/* stylelint-disable-next-line <regel> -- <Begründung> */
```

```ts
// eslint-disable-next-line <regel> -- <Begründung>
```

**Hinweise:**

- Ausnahmen nur nach Absprache.
- Vor einer Ausnahme im Build prüfen, ob sie überhaupt wirkt: Lightning CSS
  entfernt z. B. Vendor-Präfixe, die laut Zielbrowsern nicht gebraucht werden.
  Die Standard-Zielbrowser von Next.js enthalten kein iOS Safari (`ios_saf`).

## Typische Stylelint-Regeln im Projekt

**Problem:** Wiederkehrende Befunde aus `stylelint-config-standard`.

**Vorgehen:**

| Regel | Erwartet |
| --- | --- |
| `selector-class-pattern` | Klassennamen in kebab-case, auch in CSS-Modulen; BEM erlaubt (`block__element--modifier`), eigenes Muster in `stylelint.config.mjs` |
| `import-notation` | `@import url("./datei.css");` |
| `hue-degree-notation` | Farbton mit Einheit: `oklch(50% 0 0deg)` |
| `property-no-vendor-prefix` | keine Präfixe — Lightning CSS ergänzt sie beim Build |
| `custom-property-empty-line-before` | keine Leerzeile zwischen Custom Properties, außer nach einem Kommentar |
| `no-descending-specificity` | Selektoren mit niedrigerer Spezifität vor denen mit höherer |

**Hinweise:**

- Klassen mit Bindestrich in TSX: `styles["primary-button"]`, einfache Namen
  weiter `styles.button`.

## Code-Stil über `.editorconfig`

**Problem:** Dateien sollen ohne Formatter direkt linter-konform entstehen.

**Vorgehen:** `.editorconfig` im Projekt-Root legt fest: UTF-8, LF, 2 Leerzeichen,
Leerzeile am Dateiende, keine Leerzeichen am Zeilenende (außer Markdown). Die
`ij_*`-Angaben steuern PhpStorm: doppelte Anführungszeichen, Semikolons,
Leerzeichen in `{ … }`, Trailing Comma bei mehrzeiligen Listen.

**Hinweise:**

- PhpStorm liest `.editorconfig` automatisch (Settings → Editor → Code Style →
  „Enable EditorConfig support“ muss aktiv sein).
- `Code → Reformat Code` (`Strg+Alt+L`) wendet die Angaben auf eine Datei an.

## ESLint und Stylelint in PhpStorm einrichten

**Problem:** Befunde sollen schon beim Tippen angezeigt werden — Node läuft aber
nur im Container.

**Vorgehen:**

1. Plugin **„DDEV Integration“** installieren (Settings → Plugins → Marketplace).
   Bei laufendem `ddev start` richtet es einen Node-Interpreter im Container ein.
2. Interpreter prüfen: Settings → Languages & Frameworks → Node.js →
   Node interpreter zeigt den DDEV-Interpreter.
3. ESLint: Settings → Languages & Frameworks → JavaScript → Code Quality Tools →
   ESLint → „Automatic ESLint configuration“. Optional „Run eslint --fix on save“.
4. Stylelint: Settings → Languages & Frameworks → Style Sheets → Stylelint →
   „Enable“, Stylelint package `node_modules/stylelint`, „Run for files“:
   `**/*.css`. Optional „Run stylelint --fix on save“.

**Hinweise:**

- Ohne laufenden Container findet PhpStorm keinen Interpreter — erst
  `ddev start`.
- Alternative ohne Plugin: Node.js-Interpreter manuell als Docker-Interpreter
  auf den Web-Container der DDEV-Umgebung anlegen.
- Diese Schritte sind nicht automatisiert geprüft; Menüpfade können je nach
  PhpStorm-Version leicht abweichen.
