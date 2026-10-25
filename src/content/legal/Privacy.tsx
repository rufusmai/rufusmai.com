import { profile } from '@/content/profile';

import { Placeholder } from './Placeholder';

/*
 * One privacy policy for every rufusmai service. The general part applies to
 * all of them; each service has an anchored section other sites can link to:
 * #rufusmai-com, #demo, #customer-portal and #pounce.
 */

const VERCEL = 'Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA';
const AWS =
  'Amazon Web Services EMEA SARL, 38 Avenue John F. Kennedy, L-1855 Luxemburg';
const NEON = 'Neon (Databricks, Inc.), San Francisco, USA';

export function PrivacyDe() {
  return (
    <>
      <p>
        Diese Datenschutzerklärung gilt für rufusmai.com und alle Dienste unter
        Subdomains von rufusmai.com. Der allgemeine Teil gilt für alle Dienste,
        darunter folgen die Besonderheiten der einzelnen Dienste:{' '}
        <a href="#rufusmai-com">rufusmai.com</a>,{' '}
        <a href="#demo">demo.rufusmai.com</a>,{' '}
        <a href="#customer-portal">customer.rufusmai.com</a> und{' '}
        <a href="#pounce">pounce.rufusmai.com</a>.
      </p>

      <h2>1. Verantwortlicher</h2>
      <p>
        {profile.name}
        <br />
        <Placeholder>Straße und Hausnummer</Placeholder>
        <br />
        <Placeholder>PLZ Ort</Placeholder>
        <br />
        E-Mail: <a href={`mailto:${profile.email}`}>{profile.email}</a>
      </p>

      <h2>2. Ihre Rechte</h2>
      <p>
        Sie haben jederzeit das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung
        (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18),
        Datenübertragbarkeit (Art. 20) und Widerspruch gegen Verarbeitungen auf
        Grundlage berechtigter Interessen (Art. 21). Eine erteilte Einwilligung
        können Sie jederzeit mit Wirkung für die Zukunft widerrufen (Art. 7 Abs.
        3 DSGVO). Eine formlose E-Mail an {profile.email} genügt.
      </p>
      <p>
        Außerdem können Sie sich bei einer Datenschutz-Aufsichtsbehörde
        beschweren (Art. 77 DSGVO), etwa bei der für mich zuständigen Behörde:{' '}
        <Placeholder>zuständige Aufsichtsbehörde</Placeholder>.
      </p>

      <h2>3. Hosting und Server-Logfiles</h2>
      <p>
        Alle Dienste werden bei {VERCEL} gehostet. Beim Aufruf einer Seite
        verarbeitet Vercel technisch notwendige Daten: IP-Adresse, Datum und
        Uhrzeit, aufgerufene Adresse, Referrer sowie Browser und Betriebssystem.
        Rechtsgrundlage ist mein berechtigtes Interesse an einem sicheren und
        stabilen Betrieb (Art. 6 Abs. 1 lit. f DSGVO). Mit Vercel besteht ein
        Vertrag zur Auftragsverarbeitung. Vercel ist unter dem EU-US Data
        Privacy Framework zertifiziert; zusätzlich gelten
        Standardvertragsklauseln.
      </p>
      <p>Alle Verbindungen sind per TLS verschlüsselt.</p>

      <h2>4. Kontakt per E-Mail</h2>
      <p>
        Wenn Sie mir schreiben, verarbeite ich Ihre Angaben, um Ihre Anfrage zu
        beantworten (Art. 6 Abs. 1 lit. b DSGVO bei vorvertraglichen Anfragen,
        sonst lit. f). Die Daten lösche ich, sobald die Anfrage erledigt ist und
        keine gesetzlichen Aufbewahrungspflichten bestehen.
      </p>

      <h2 id="rufusmai-com">5. rufusmai.com</h2>
      <h3>Cookies und lokale Speicherung</h3>
      <p>
        rufusmai.com setzt keine Tracking-Cookies. Wenn Sie die Sprache
        wechseln, wird sie im Cookie <code>NEXT_LOCALE</code> gespeichert; das
        gewählte Farbschema liegt nur im lokalen Speicher Ihres Browsers. Beides
        ist für die von Ihnen gewünschte Funktion erforderlich (§ 25 Abs. 2 Nr.
        2 TDDDG).
      </p>
      <h3>Reichweitenmessung mit Umami</h3>
      <p>
        Für anonyme Besuchsstatistiken nutze ich eine selbst betriebene Instanz
        von Umami (analytics.rufusmai.com), die über rufusmai.com ausgeliefert
        wird. Umami setzt keine Cookies und speichert keine IP-Adressen; erfasst
        werden nur zusammengefasste Angaben wie aufgerufene Seiten, Referrer,
        Browser, Betriebssystem, Gerätetyp und Land. Rechtsgrundlage ist mein
        berechtigtes Interesse an der Verbesserung des Angebots (Art. 6 Abs. 1
        lit. f DSGVO). Umami wird betrieben bei:{' '}
        <Placeholder>Hoster und Standort von Umami</Placeholder>.
      </p>
      <h3>Schriftarten</h3>
      <p>
        Die Schriftarten werden von rufusmai.com selbst ausgeliefert. Es besteht
        keine Verbindung zu Servern von Google.
      </p>
      <h3>Kontaktformular</h3>
      <p>
        Über das Kontaktformular übermitteln Sie Name, E-Mail-Adresse, optional
        Ihr Unternehmen sowie Ihre Nachricht. Ich nutze die Daten ausschließlich
        zur Bearbeitung Ihrer Anfrage (Art. 6 Abs. 1 lit. b bzw. f DSGVO). Die
        Nachricht wird per E-Mail über Amazon Simple Email Service von {AWS} an
        mich zugestellt (Region: <Placeholder>AWS-Region</Placeholder>). Die
        Daten werden gelöscht, sobald Ihre Anfrage erledigt ist und keine
        Aufbewahrungspflichten entgegenstehen.
      </p>
      <h3>Schutz vor Spam</h3>
      <p>
        Zum Schutz des Formulars vor automatisierten Anfragen nutze ich Vercel
        BotID. Beim Absenden werden technische Merkmale Ihres Browsers geprüft,
        um Bots von Menschen zu unterscheiden. Rechtsgrundlage ist mein
        berechtigtes Interesse an einem missbrauchsfreien Kontaktweg (Art. 6
        Abs. 1 lit. f DSGVO).
      </p>

      <h2 id="demo">6. demo.rufusmai.com</h2>
      <p>
        Unter demo.rufusmai.com zeige ich statische Momentaufnahmen von
        Kundenprojekten in einem Rahmen mit Projektinformationen. Formulare,
        Newsletter und Tracking sind in den Demos deaktiviert. Es gelten die
        Angaben zu Hosting und Server-Logfiles; die Sprachwahl wird in einem
        Cookie gespeichert.
      </p>

      <h2 id="customer-portal">7. customer.rufusmai.com</h2>
      <p>
        Das Kundenportal steht nur meinen Kundinnen und Kunden zur Verfügung.
        Verarbeitet werden Name, E-Mail-Adresse, Unternehmens- und
        Rechnungsdaten, Projekt- und Stundendaten sowie Rechnungen. Für die
        Anmeldung werden technisch notwendige Sitzungs-Cookies gesetzt.
        Rechtsgrundlage ist die Erfüllung unseres Vertrags (Art. 6 Abs. 1 lit. b
        DSGVO) sowie gesetzliche Aufbewahrungspflichten (lit. c, z. B. § 147 AO
        und § 257 HGB: Rechnungen zehn Jahre).
      </p>
      <p>Eingesetzte Dienstleister:</p>
      <ul>
        <li>
          Datenbank: {NEON} (Region: <Placeholder>Neon-Region</Placeholder>)
        </li>
        <li>
          Buchhaltung: Lexware Office, Haufe-Lexware GmbH & Co. KG, Munzinger
          Straße 9, 79111 Freiburg
        </li>
        <li>E-Mail-Versand: Amazon Simple Email Service, {AWS}</li>
      </ul>

      <h2 id="pounce">8. pounce.rufusmai.com</h2>
      <p>
        Pounce durchsucht Kleinanzeigen-Plattformen nach Ihren Suchaufträgen und
        benachrichtigt Sie über passende Angebote. Die Nutzung ist nur auf
        Einladung möglich. Verarbeitet werden:
      </p>
      <ul>
        <li>
          Konto: E-Mail-Adresse, Name und Anmeldesitzungen (technisch notwendige
          Cookies)
        </li>
        <li>
          Suchaufträge: Suchbegriffe, Preisrahmen, Umkreis und Abholort für die
          Berechnung der Fahrzeit
        </li>
        <li>Gefundene Anzeigen und deren Bewertung</li>
        <li>
          Benachrichtigungskanäle: Telegram-Chat, WhatsApp-Nummer oder
          E-Mail-Adresse
        </li>
        <li>
          Optional: die Sitzungsdaten Ihres Kleinanzeigen-Kontos, damit Pounce
          in Ihrem Auftrag Verkäufer anschreiben kann. Sie werden verschlüsselt
          gespeichert.
        </li>
      </ul>
      <p>
        Rechtsgrundlage ist die Bereitstellung des Dienstes (Art. 6 Abs. 1 lit.
        b DSGVO). Wenn Sie Ihr Konto löschen, werden Ihre Daten gelöscht{' '}
        <Placeholder>Löschfristen prüfen</Placeholder>.
      </p>
      <p>Eingesetzte Dienstleister:</p>
      <ul>
        <li>
          Hosting: Vercel (Region Frankfurt) und ein eigener Server für den
          Such-Dienst (<Placeholder>Standort des Servers</Placeholder>)
        </li>
        <li>
          Datenbank: {NEON} (Region: <Placeholder>Neon-Region</Placeholder>)
        </li>
        <li>
          Bewertung der Anzeigen: OpenAI Ireland Ltd., 1st Floor, The Liffey
          Trust Centre, 117–126 Sheriff Street Upper, Dublin 1, Irland. OpenAI
          erhält den Inhalt der Anzeigen und Ihre Suchkriterien, aber keine
          Kontodaten.
        </li>
        <li>
          Ortssuche: Nominatim der OpenStreetMap Foundation, St John’s
          Innovation Centre, Cowley Road, Cambridge, CB4 0WS, Vereinigtes
          Königreich (für den eingegebenen Ort)
        </li>
        <li>
          Benachrichtigungen: Telegram (Telegram Messenger Inc.), WhatsApp
          (WhatsApp Ireland Limited, Meta) und Amazon Simple Email Service
        </li>
      </ul>

      <h2>9. Änderungen</h2>
      <p>
        Ich passe diese Datenschutzerklärung an, wenn sich die Dienste oder die
        Rechtslage ändern. Es gilt die jeweils hier veröffentlichte Fassung.
        Stand: <Placeholder>Datum</Placeholder>.
      </p>
    </>
  );
}

export function PrivacyEn() {
  return (
    <>
      <p>
        This privacy policy applies to rufusmai.com and all services on
        subdomains of rufusmai.com. The general part applies to all services;
        the specifics of each service follow below:{' '}
        <a href="#rufusmai-com">rufusmai.com</a>,{' '}
        <a href="#demo">demo.rufusmai.com</a>,{' '}
        <a href="#customer-portal">customer.rufusmai.com</a> and{' '}
        <a href="#pounce">pounce.rufusmai.com</a>.
      </p>

      <h2>1. Controller</h2>
      <p>
        {profile.name}
        <br />
        <Placeholder>Street and number</Placeholder>
        <br />
        <Placeholder>Postcode, city</Placeholder>
        <br />
        E-mail: <a href={`mailto:${profile.email}`}>{profile.email}</a>
      </p>

      <h2>2. Your rights</h2>
      <p>
        You have the right to access (Art. 15 GDPR), rectification (Art. 16),
        erasure (Art. 17), restriction of processing (Art. 18), data portability
        (Art. 20) and to object to processing based on legitimate interests
        (Art. 21). You can withdraw any consent at any time with effect for the
        future (Art. 7 (3) GDPR). An informal e-mail to {profile.email} is
        enough.
      </p>
      <p>
        You can also lodge a complaint with a data protection supervisory
        authority (Art. 77 GDPR), for example the one responsible for me:{' '}
        <Placeholder>competent supervisory authority</Placeholder>.
      </p>

      <h2>3. Hosting and server log files</h2>
      <p>
        All services are hosted by {VERCEL}. When you open a page, Vercel
        processes technically necessary data: IP address, date and time, the
        requested address, referrer, browser and operating system. The legal
        basis is my legitimate interest in secure and stable operation (Art. 6
        (1) (f) GDPR). A data processing agreement is in place with Vercel.
        Vercel is certified under the EU-US Data Privacy Framework; standard
        contractual clauses apply in addition.
      </p>
      <p>All connections are encrypted with TLS.</p>

      <h2>4. Contact by e-mail</h2>
      <p>
        When you write to me, I process your details to answer your enquiry
        (Art. 6 (1) (b) GDPR for pre-contractual enquiries, otherwise (f)). I
        delete the data once the enquiry is settled and no statutory retention
        obligations apply.
      </p>

      <h2 id="rufusmai-com">5. rufusmai.com</h2>
      <h3>Cookies and local storage</h3>
      <p>
        rufusmai.com does not set tracking cookies. If you switch the language,
        it is stored in the <code>NEXT_LOCALE</code> cookie; the chosen colour
        scheme is only kept in your browser’s local storage. Both are required
        for the function you asked for (§ 25 (2) no. 2 TDDDG).
      </p>
      <h3>Analytics with Umami</h3>
      <p>
        For anonymous visitor statistics I use a self-hosted instance of Umami
        (analytics.rufusmai.com), served through rufusmai.com. Umami does not
        set cookies and does not store IP addresses; it only records aggregated
        information such as pages viewed, referrer, browser, operating system,
        device type and country. The legal basis is my legitimate interest in
        improving the site (Art. 6 (1) (f) GDPR). Umami is hosted by:{' '}
        <Placeholder>Umami host and location</Placeholder>.
      </p>
      <h3>Fonts</h3>
      <p>
        Fonts are served by rufusmai.com itself. There is no connection to
        Google’s servers.
      </p>
      <h3>Contact form</h3>
      <p>
        Through the contact form you send your name, e-mail address, optionally
        your company and your message. I use this data solely to handle your
        enquiry (Art. 6 (1) (b) or (f) GDPR). The message is delivered to me by
        e-mail via Amazon Simple Email Service from {AWS} (region:{' '}
        <Placeholder>AWS region</Placeholder>). The data is deleted once your
        enquiry is settled and no retention obligations apply.
      </p>
      <h3>Spam protection</h3>
      <p>
        To protect the form from automated requests I use Vercel BotID. When you
        submit it, technical characteristics of your browser are checked to tell
        bots from people. The legal basis is my legitimate interest in a contact
        channel free of abuse (Art. 6 (1) (f) GDPR).
      </p>

      <h2 id="demo">6. demo.rufusmai.com</h2>
      <p>
        demo.rufusmai.com shows static snapshots of client projects in a frame
        with project information. Forms, newsletters and tracking are disabled
        in the demos. The information on hosting and server log files applies;
        the language choice is stored in a cookie.
      </p>

      <h2 id="customer-portal">7. customer.rufusmai.com</h2>
      <p>
        The customer portal is only available to my clients. It processes name,
        e-mail address, company and billing details, project and hour data, and
        invoices. Technically necessary session cookies are set for signing in.
        The legal basis is the performance of our contract (Art. 6 (1) (b) GDPR)
        and statutory retention obligations ((c), e.g. § 147 AO and § 257 HGB:
        invoices for ten years).
      </p>
      <p>Service providers:</p>
      <ul>
        <li>
          Database: {NEON} (region: <Placeholder>Neon region</Placeholder>)
        </li>
        <li>
          Accounting: Lexware Office, Haufe-Lexware GmbH & Co. KG, Munzinger
          Straße 9, 79111 Freiburg, Germany
        </li>
        <li>E-mail delivery: Amazon Simple Email Service, {AWS}</li>
      </ul>

      <h2 id="pounce">8. pounce.rufusmai.com</h2>
      <p>
        Pounce searches classifieds platforms for your search jobs and notifies
        you about matching offers. It is invite-only. It processes:
      </p>
      <ul>
        <li>
          Account: e-mail address, name and sign-in sessions (technically
          necessary cookies)
        </li>
        <li>
          Search jobs: search terms, price range, radius and pickup location for
          the travel time
        </li>
        <li>Listings found and their ratings</li>
        <li>
          Notification channels: Telegram chat, WhatsApp number or e-mail
          address
        </li>
        <li>
          Optionally: the session data of your Kleinanzeigen account, so that
          Pounce can message sellers on your behalf. It is stored encrypted.
        </li>
      </ul>
      <p>
        The legal basis is providing the service (Art. 6 (1) (b) GDPR). When you
        delete your account, your data is deleted{' '}
        <Placeholder>check deletion periods</Placeholder>.
      </p>
      <p>Service providers:</p>
      <ul>
        <li>
          Hosting: Vercel (Frankfurt region) and an own server for the search
          service (<Placeholder>server location</Placeholder>)
        </li>
        <li>
          Database: {NEON} (region: <Placeholder>Neon region</Placeholder>)
        </li>
        <li>
          Rating listings: OpenAI Ireland Ltd., 1st Floor, The Liffey Trust
          Centre, 117–126 Sheriff Street Upper, Dublin 1, Ireland. OpenAI
          receives the listing content and your search criteria, but no account
          data.
        </li>
        <li>
          Location search: Nominatim by the OpenStreetMap Foundation, St John’s
          Innovation Centre, Cowley Road, Cambridge, CB4 0WS, United Kingdom
          (for the location you enter)
        </li>
        <li>
          Notifications: Telegram (Telegram Messenger Inc.), WhatsApp (WhatsApp
          Ireland Limited, Meta) and Amazon Simple Email Service
        </li>
      </ul>

      <h2>9. Changes</h2>
      <p>
        I update this privacy policy when the services or the law change. The
        version published here applies. Last updated:{' '}
        <Placeholder>date</Placeholder>.
      </p>
    </>
  );
}
