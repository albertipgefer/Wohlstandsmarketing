# Finanz-Modul — Deep-Work-Log (autonome Session 14.06.2026)

> Albert ist ab ~18:00 für mehrere Stunden weg und hat volle Autonomie erteilt
> (bauen, testen, redeployen, iterieren, kritisch prüfen). Ziel: bis ~22:23 ein
> fertiges Dashboard, besser als Accountable. N26 ausgenommen.

## Arbeitsplan (Wellen)
- [x] **Welle 1** — Logo ohne Schriftzug (PDF + Rechnungsseite), Löschen (Rechnungen/Angebote/Wiederkehrend), Inkasso-Telegram nach letzter Mahnstufe. → PR #51
- [ ] **Welle 2** — Sicherheit: Telegram-2FA (opt-in), Login-Härtung, `factory_chat_state` RLS
- [ ] **Welle 3** — Workflow-Kern: Angebot → Gesamt/Abschlag/wiederkehrend wählbar (Teilbetrag); Telegram-Freigabe (Genehmigen/Anpassen) für alle Sendungen
- [ ] **Welle 4** — Ausgaben-Beleg-Scan (KI-Vision: Lieferant/Kategorie/USt); Steuern: Beleg-Upload + ELSTER-fertiges Dokument
- [ ] **Welle 5** — „weiße Box" (selbst diagnostiziert via Live-Dashboard); Accountable-Migration (zahlenexakt, Unsicherheiten sammeln)
- [ ] **Welle 6** — Kritische Agenten-Prüfung, Lücken schließen, Politur

## Entscheidungen (autonom getroffen, da Albert nicht erreichbar)
- Sicherheit: **Telegram-2FA** (von Albert per Auswahl bestätigt). Opt-in via `ANGEBOT_2FA=on`, damit kein Aussperren.
- Merge-Politik: PRs erst nach grünem Preview-Test mergen.

## Offene Unsicherheiten für Albert (am Ende durchgehen)
- (wird gefüllt)
