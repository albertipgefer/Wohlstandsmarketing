import Footer from "@/components/sections/Footer";
import BlogNav from "@/components/blog/BlogNav";

export const metadata = {
  title: "Impressum · Wohlstandsmarketing",
  description:
    "Impressum und rechtliche Angaben von Wohlstandsmarketing — Albert Ipgefer, Vor der Loos 4e, 56130 Bad Ems. Kontakt, verantwortliche Person und Pflichtangaben nach TMG.",
};

export default function Impressum() {
  return (
    <main className="bg-[var(--bg)] text-[var(--text)]">
      <BlogNav />

      <section className="mx-auto max-w-3xl px-4 pt-32 pb-16 sm:px-6 sm:pt-36 sm:pb-20 md:px-12 md:pt-40 md:pb-24">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
          Rechtliches
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-black tracking-tight text-[var(--text)] sm:text-5xl">
          Impressum
        </h1>

        <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-[var(--text-muted)]">
          <div>
            <h2 className="font-semibold text-[var(--text)]">
              Angaben gemäß § 5 TMG
            </h2>
            <p className="mt-2">
              Wohlstandsmarketing
              <br />
              Albert Ipgefer
              <br />
              Vor der Loos 4e
              <br />
              56130 Bad Ems
              <br />
              Deutschland
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-[var(--text)]">Kontakt</h2>
            <p className="mt-2">
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
            <h2 className="font-semibold text-[var(--text)]">
              Wirtschafts-Identifikationsnummer
            </h2>
            <p className="mt-2">3007543765</p>
          </div>

          <div>
            <h2 className="font-semibold text-[var(--text)]">
              Verantwortlich für Inhalte gemäß § 55 Abs. 2 RStV
            </h2>
            <p className="mt-2">Albert Ipgefer</p>
          </div>

          <div>
            <h2 className="font-semibold text-[var(--text)]">
              Haftung für Inhalte
            </h2>
            <p className="mt-2">
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene
              Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
              verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter
              jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
              Informationen zu überwachen oder nach Umständen zu forschen, die
              auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
            <p className="mt-3">
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
              Informationen nach den allgemeinen Gesetzen bleiben hiervon
              unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
              Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich.
              Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden
              wir diese Inhalte umgehend entfernen.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-[var(--text)]">
              Haftung für Links
            </h2>
            <p className="mt-2">
              Unser Angebot enthält Links zu externen Websites Dritter, auf
              deren Inhalte wir keinen Einfluss haben. Deshalb können wir für
              diese fremden Inhalte auch keine Gewähr übernehmen. Für die
              Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
              oder Betreiber der Seiten verantwortlich.
            </p>
            <p className="mt-3">
              Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf
              mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren
              zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente
              inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne
              konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei
              Bekanntwerden von Rechtsverletzungen werden wir derartige Links
              umgehend entfernen.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-[var(--text)]">Urheberrecht</h2>
            <p className="mt-2">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
              diesen Seiten unterliegen dem deutschen Urheberrecht. Die
              Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
              Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
              schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
            <p className="mt-3">
              Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt
              wurden, werden die Urheberrechte Dritter beachtet. Insbesondere
              werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie
              trotzdem auf eine Urheberrechtsverletzung aufmerksam werden,
              bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von
              Rechtsverletzungen werden wir derartige Inhalte umgehend
              entfernen.
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
