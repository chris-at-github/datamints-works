# Kurzanleitungen

Gesammelte Rezepte und Befehle, die im Projekt wiederholt gebraucht werden —
bewusst kurz gehalten und zum Nachschlagen gedacht, nicht zum Durchlesen.

## Übersicht

| Thema | Datei | Inhalt |
| --- | --- | --- |
| Git | [git.md](git.md) | Squash-Merge, Commit-Typen |
| DDEV | [ddev.md](ddev.md) | Umgebung starten, Befehle im Container, Dev-Server hinter dem Router, Build |
| CSS | [css.md](css.md) | Globale Styles, Cascade Layers, CSS-Module, Komponenten und Module, Base-UI-Vorbereitung |
| Base UI | [base-ui.md](base-ui.md) | Eigene Komponenten um Base UI, Server-/Client-Komponenten, Zustände stylen |
| Linting | [lint.md](lint.md) | ESLint und Stylelint ausführen, Befunde beheben, `.editorconfig`, PhpStorm-Einrichtung |

## Aufbau

- Eine Datei pro Themengebiet (`git.md`, `wsl.md`, `node.md`, …).
- Ein Rezept ist ein `##`-Abschnitt mit sprechendem Titel.
- Jeder Abschnitt folgt dem Muster **Problem → Vorgehen → Hinweise**.
- Befehle immer als Code-Block, damit sie kopierbar sind.

## Neue Anleitung ergänzen

1. Passende Themendatei wählen oder neu anlegen.
2. Rezept als `##`-Abschnitt einfügen.
3. Bei einer neuen Datei: Zeile in der Übersichtstabelle oben ergänzen.
