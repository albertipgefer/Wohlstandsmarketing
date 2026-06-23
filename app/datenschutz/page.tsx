import Footer from "@/components/sections/Footer";
import BlogNav from "@/components/blog/BlogNav";

export const metadata = {
  title: "Datenschutz · Wohlstandsmarketing",
  description:
    "Datenschutzerklärung von Wohlstandsmarketing — transparente Informationen, wie wir personenbezogene Daten gemäß DSGVO verarbeiten, speichern und schützen.",
};

export default function Datenschutz() {
  return (
    <main className="bg-[var(--bg)] text-[var(--text)]">
      <BlogNav />

      <section className="mx-auto max-w-3xl px-4 pt-32 pb-16 sm:px-6 sm:pt-36 sm:pb-20 md:px-12 md:pt-40 md:pb-24">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
          Rechtliches
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-black tracking-tight text-[var(--text)] sm:text-5xl">
          Datenschutzerklärung
        </h1>

        <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-[var(--text-muted)]">
          <div>
            <h2 className="font-semibold text-[var(--text)]">
              Verantwortlicher
            </h2>
            <p className="mt-2">
              Albert Ipgefer
              <br />
              Vor der Loos 4e
              <br />
              56130 Bad Ems
              <br />
              Telefon:{" "}
              <a
                href="tel:+4917622787559"
                className="text-[var(--accent)] hover:underline"
              >
                +49 176 227 87 559
              </a>
              <br />
              E-Mail:{" "}
              <a
                href="mailto:info@wohlstandsmarketing.de"
                className="text-[var(--accent)] hover:underline"
              >
                info@wohlstandsmarketing.de
              </a>
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-[var(--text)]">Grundprinzip</h2>
            <p className="mt-2">
              Personenbezogene Daten werden von uns nur im Rahmen der
              Erforderlichkeit sowie zum Zwecke der Bereitstellung eines
              funktionsfähigen und nutzerfreundlichen Internetauftritts
              verarbeitet.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-[var(--text)]">
              Rechte der Nutzer
            </h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Bestätigung und Auskunft über Datenverarbeitung (Art. 15 DSGVO)</li>
              <li>Berichtigung unkorrekter Daten (Art. 16 DSGVO)</li>
              <li>Löschung oder Einschränkung der Verarbeitung (Art. 17–18 DSGVO)</li>
              <li>Datenportabilität (Art. 20 DSGVO)</li>
              <li>Beschwerde bei Aufsichtsbehörden (Art. 77 DSGVO)</li>
              <li>Widerspruchsrecht gegen Direktwerbung (Art. 21 DSGVO)</li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-[var(--text)]">Cookies</h2>
            <p className="mt-2">
              Session-Cookies werden auf Grundlage von Art. 6 Abs. 1 lit. b
              DSGVO eingesetzt. Drittanbieter-Cookies dienen der Werbung und
              Analyse. Nutzer können die Installation von Cookies in den
              Browser-Einstellungen verhindern.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-[var(--text)]">
              Kontaktanfragen
            </h2>
            <p className="mt-2">
              Daten aus Kontaktanfragen werden zur Bearbeitung der Anfrage
              genutzt (Art. 6 Abs. 1 lit. b DSGVO). Eine Löschung erfolgt nach
              vollständiger Bearbeitung.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-[var(--text)]">Serverdaten</h2>
            <p className="mt-2">
              Browser-Typ, Betriebssystem und IP-Adresse werden zur technischen
              Bereitstellung erhoben (Art. 6 Abs. 1 lit. f DSGVO). Eine
              Löschung erfolgt nach sieben Tagen.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-[var(--text)]">
              Hosting (Vercel)
            </h2>
            <p className="mt-2">
              Diese Website wird bei Vercel Inc. (USA) gehostet. Vercel
              verarbeitet im Rahmen des Hostings personenbezogene Daten gemäß
              eigener Datenschutzerklärung. Mit Vercel besteht ein
              Auftragsverarbeitungsvertrag.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-[var(--text)]">
              Terminbuchung (TidyCal)
            </h2>
            <p className="mt-2">
              Für die Terminbuchung nutzen wir TidyCal. Beim Klick auf den
              entsprechenden Button verlässt du diese Seite — es gilt die
              Datenschutzerklärung von TidyCal.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-[var(--text)]">
              Facebook &amp; Instagram
            </h2>
            <p className="mt-2">
              Gemeinsame Verantwortung mit Meta Platforms Ireland Limited zur
              Produktbewerbung (Art. 6 Abs. 1 lit. f DSGVO).
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-[var(--text)]">
              Google Analytics 4
            </h2>
            <p className="mt-2">
              Diese Website nutzt Google Analytics 4, einen
              Webanalysedienst der Google Ireland Limited (Gordon House,
              Barrow Street, Dublin 4, Irland). Google verarbeitet die Daten
              ggf. auch auf Servern der Google LLC in den USA.
            </p>
            <p className="mt-2">
              <span className="font-medium text-[var(--text)]">Zweck:</span>{" "}
              Analyse des Nutzungsverhaltens zur Verbesserung unseres Angebots
              (Reichweiten- und Performance-Messung).
            </p>
            <p className="mt-2">
              <span className="font-medium text-[var(--text)]">
                Rechtsgrundlage:
              </span>{" "}
              Die Verarbeitung erfolgt ausschließlich auf Grundlage Ihrer
              Einwilligung (Art. 6 Abs. 1 lit. a DSGVO i. V. m. § 25 Abs. 1
              TDDDG). Google Analytics wird erst geladen, nachdem Sie über
              unseren Cookie-Banner zugestimmt haben; ohne Einwilligung findet
              keine Übertragung an Google statt.
            </p>
            <p className="mt-2">
              <span className="font-medium text-[var(--text)]">
                Datenübermittlung in die USA:
              </span>{" "}
              Google ist nach dem EU-US Data Privacy Framework zertifiziert.
              Es kann nicht ausgeschlossen werden, dass US-Behörden Zugriff
              auf übermittelte Daten nehmen.
            </p>
            <p className="mt-2">
              <span className="font-medium text-[var(--text)]">Widerruf:</span>{" "}
              Sie können Ihre Einwilligung jederzeit über den Link
              „Cookie-Einstellungen“ im Footer mit Wirkung für die Zukunft
              widerrufen.
            </p>
            <p className="mt-2">
              <span className="font-medium text-[var(--text)]">
                Weitere Informationen:
              </span>{" "}
              Datenschutzerklärung von Google unter{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:underline"
              >
                policies.google.com/privacy
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-[var(--text)]">
              Reichweitenmessung (PostHog)
            </h2>
            <p className="mt-2">
              Zur Verbesserung unserer Website nutzen wir PostHog (EU-Server,
              PostHog BV, Niederlande). Die Analyse erfolgt datensparsam:
              anonyme Besucher werden nicht zu Personenprofilen zusammengeführt,
              es findet keine Sitzungsaufzeichnung statt. Rechtsgrundlage ist
              unser berechtigtes Interesse an einer anonymisierten
              Reichweiten- und Nutzungsanalyse (Art. 6 Abs. 1 lit. f DSGVO).
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-[var(--text)]">Social-Media-Links</h2>
            <p className="mt-2">
              Verlinkungen zu Facebook, Instagram, LinkedIn und YouTube auf
              Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
            </p>
          </div>

          <p className="border-t border-[var(--border)] pt-6 text-[12px] text-[var(--text-subtle)]">
            © {new Date().getFullYear()} Wohlstandsmarketing — Albert Ipgefer
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
