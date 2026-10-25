import { profile } from '@/content/profile';
import { Link } from '@/i18n/routing';

import { Placeholder } from './Placeholder';

export function ImprintDe() {
  return (
    <>
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        {profile.name}
        <br />
        rufusmai – Softwareentwicklung
        <br />
        <Placeholder>Straße und Hausnummer</Placeholder>
        <br />
        <Placeholder>PLZ Ort</Placeholder>
        <br />
        Deutschland
      </p>

      <h2>Kontakt</h2>
      <p>
        E-Mail: <a href={`mailto:${profile.email}`}>{profile.email}</a>
        <br />
        Telefon: <Placeholder>Telefonnummer (optional)</Placeholder>
        <br />
        Kontaktformular:{' '}
        <Link href="/contact" locale="de">
          rufusmai.com/de/kontakt
        </Link>
      </p>

      <h2>Umsatzsteuer</h2>
      <p>
        Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:{' '}
        <Placeholder>USt-IdNr. – oder Hinweis auf § 19 UStG</Placeholder>
      </p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>{profile.name}, Anschrift wie oben</p>

      <h2>Geltungsbereich</h2>
      <p>
        Dieses Impressum gilt für rufusmai.com und alle Dienste unter Subdomains
        von rufusmai.com, insbesondere demo.rufusmai.com, customer.rufusmai.com
        und pounce.rufusmai.com.
      </p>

      <h2>Verbraucherstreitbeilegung</h2>
      <p>
        Ich bin nicht bereit und nicht verpflichtet, an
        Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
        teilzunehmen.
      </p>

      <h2>Haftung für Inhalte und Links</h2>
      <p>
        Die Inhalte dieser Seiten wurden mit größter Sorgfalt erstellt. Für die
        Richtigkeit, Vollständigkeit und Aktualität kann ich jedoch keine Gewähr
        übernehmen. Für Inhalte externer Websites, auf die verlinkt wird, sind
        ausschließlich deren Betreiber verantwortlich. Bei Bekanntwerden von
        Rechtsverletzungen entferne ich entsprechende Inhalte oder Links
        umgehend.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Die Inhalte und Werke auf diesen Seiten, einschließlich des
        rufusmai-Logos, unterliegen dem deutschen Urheberrecht. Marken und
        Inhalte der gezeigten Kundenprojekte gehören den jeweiligen Inhabern.
      </p>
    </>
  );
}

export function ImprintEn() {
  return (
    <>
      <h2>Information according to § 5 DDG (German Digital Services Act)</h2>
      <p>
        {profile.name}
        <br />
        rufusmai – software development
        <br />
        <Placeholder>Street and number</Placeholder>
        <br />
        <Placeholder>Postcode, city</Placeholder>
        <br />
        Germany
      </p>

      <h2>Contact</h2>
      <p>
        E-mail: <a href={`mailto:${profile.email}`}>{profile.email}</a>
        <br />
        Phone: <Placeholder>Phone number (optional)</Placeholder>
        <br />
        Contact form:{' '}
        <Link href="/contact" locale="en">
          rufusmai.com/en/contact
        </Link>
      </p>

      <h2>VAT</h2>
      <p>
        VAT identification number according to § 27a of the German VAT Act:{' '}
        <Placeholder>VAT ID – or note on § 19 UStG</Placeholder>
      </p>

      <h2>Responsible for the content according to § 18 (2) MStV</h2>
      <p>{profile.name}, address as above</p>

      <h2>Scope</h2>
      <p>
        This legal notice applies to rufusmai.com and all services on subdomains
        of rufusmai.com, in particular demo.rufusmai.com, customer.rufusmai.com
        and pounce.rufusmai.com.
      </p>

      <h2>Consumer dispute resolution</h2>
      <p>
        I am neither willing nor obliged to take part in dispute resolution
        proceedings before a consumer arbitration board.
      </p>

      <h2>Liability for content and links</h2>
      <p>
        The content of these pages was created with great care. However, I
        cannot guarantee that it is correct, complete or up to date. The
        operators of linked external websites are solely responsible for their
        content. If I become aware of any legal infringements, I will remove the
        content or links concerned immediately.
      </p>

      <h2>Copyright</h2>
      <p>
        The content and works on these pages, including the rufusmai logo, are
        subject to German copyright law. Brands and content of the client
        projects shown here belong to their respective owners.
      </p>
    </>
  );
}
