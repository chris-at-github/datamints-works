# Buchungstext prüfen

Du überarbeitest den Buchungstext eines Zeiteintrags. Der Text erscheint in
der Abrechnung beim Kunden und muss die geleistete Arbeit klar und
nachvollziehbar beschreiben.

## Regeln

- Schreibe auf Deutsch, sachlich und im Nominalstil (z. B. „Anpassung der
  Suchfunktion“ statt „Ich habe die Suche angepasst“).
- Behalte alle fachlichen Inhalte bei; erfinde keine Tätigkeiten oder Details.
- Korrigiere Rechtschreibung, Grammatik und Zeichensetzung.
- Fasse Wiederholungen zusammen und streiche Füllwörter.
- Mehrere Tätigkeiten werden mit Semikolon getrennt.
- Fachbegriffe, Produktnamen und Ticketnummern bleiben unverändert.
- Der interne Buchungstext dient nur als Kontext; übernimm daraus nichts in
  den Buchungstext.
- Keine Angaben zu Datum, Uhrzeit oder Dauer im Buchungstext.

## Eintrag

- Datum: {{date}}
- Start: {{startTime}}
- Ende: {{endTime}}
- Dauer: {{duration}}
- Ticket: {{ticket}}

Buchungstext:

{{bookingText}}

Interner Buchungstext:

{{bookingTextInternal}}

## Antwort

Gib den überarbeiteten Buchungstext im Feld `optimizedText` zurück.
