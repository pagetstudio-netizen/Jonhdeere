import { ChevronLeft, House, UsersRound, LayoutGrid, UserRound } from "lucide-react";
import "./_group.css";

const links = [
  {
    title: "Service client",
    action: "En ligne",
    image: "/__mockup/images/service-client/telegram-support.png",
    href: "https://t.me/service_client",
    kind: "support",
  },
  {
    title: "Groupe officiel",
    action: "Rejoindre",
    image: "/__mockup/images/service-client/telegram-community.png",
    href: "https://t.me/groupe_officiel",
    kind: "community",
  },
  {
    title: "Chaîne officielle",
    action: "Rejoindre",
    image: "/__mockup/images/service-client/telegram-community.png",
    href: "https://t.me/chaine_officielle",
    kind: "community",
  },
];

const navItems = [
  { label: "Accueil", Icon: House, active: true },
  { label: "Équipe", Icon: UsersRound, active: false },
  { label: "Appareils", Icon: LayoutGrid, active: false },
  { label: "Moi", Icon: UserRound, active: false },
];

export function FrenchMatch() {
  return (
    <main className="french-service-page">
      <style>{`
        .french-service-page {
          --service-orange: #f27620;
          --service-gray: #ededed;
          --service-muted: #8c8c8c;
          min-height: 100dvh;
          padding-bottom: calc(70px + env(safe-area-inset-bottom, 0px));
          overflow-x: hidden;
          background: var(--service-gray);
          color: #191919;
          font-family: Arial, "Helvetica Neue", sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        .french-service-page *,
        .french-service-page *::before,
        .french-service-page *::after { box-sizing: border-box; }
        .french-service-screen {
          width: min(100%, 512px);
          min-height: 100dvh;
          margin: 0 auto;
          background: var(--service-gray);
        }
        .french-service-titlebar {
          position: relative;
          display: flex;
          height: 49px;
          align-items: center;
          justify-content: center;
          background: var(--service-orange);
          color: #fff;
        }
        .french-service-titlebar h1 {
          margin: 0;
          font-size: 20px;
          font-weight: 700;
          line-height: 1;
          text-align: center;
        }
        .french-service-back {
          position: absolute;
          left: 11px;
          top: 50%;
          display: grid;
          width: 36px;
          height: 42px;
          place-items: center;
          color: #fff;
          transform: translateY(-50%);
          text-decoration: none;
          -webkit-tap-highlight-color: transparent;
        }
        .french-service-back svg { width: 27px; height: 27px; stroke-width: 1.8; }
        .french-service-main {
          display: flex;
          flex-direction: column;
          gap: 19px;
          padding: 20px 20px 30px;
        }
        .french-service-intro {
          display: flex;
          min-height: 114px;
          align-items: center;
          gap: 15px;
          border-radius: 7px;
          padding: 13px 20px;
          background: #fff;
        }
        .french-service-advisor {
          display: block;
          width: 72px;
          height: 72px;
          flex: 0 0 72px;
          border: 3px solid var(--service-orange);
          border-radius: 50%;
          object-fit: cover;
        }
        .french-service-intro-copy { min-width: 0; }
        .french-service-intro-copy p {
          margin: 0;
          font-size: 18px;
          line-height: 1.28;
          font-weight: 400;
        }
        .french-service-intro-copy p + p {
          margin-top: 10px;
          color: #858585;
          font-size: 16px;
        }
        .french-service-links {
          display: flex;
          flex-direction: column;
          gap: 19px;
        }
        .french-service-link {
          position: relative;
          display: grid;
          min-height: 142px;
          grid-template-columns: 88px minmax(0, 1fr);
          align-items: center;
          column-gap: 14px;
          border-radius: 6px;
          padding: 15px 20px 15px 27px;
          overflow: hidden;
          color: #fff;
          text-decoration: none;
          -webkit-tap-highlight-color: transparent;
          transition: filter 160ms ease, transform 160ms ease;
        }
        .french-service-link.support { background: #00c713; }
        .french-service-link.community { background: #06c0fd; }
        .french-service-link:hover { filter: brightness(.97); }
        .french-service-link:active { transform: scale(.99); }
        .french-service-telegram {
          display: block;
          width: 88px;
          height: 88px;
          border-radius: 50%;
          object-fit: cover;
        }
        .french-service-link-content {
          display: flex;
          min-width: 0;
          align-items: flex-end;
          flex-direction: column;
          gap: 23px;
        }
        .french-service-link-title {
          max-width: 100%;
          overflow-wrap: anywhere;
          font-size: 20px;
          font-weight: 400;
          line-height: 1.2;
          text-align: right;
        }
        .french-service-link-action {
          display: inline-flex;
          min-height: 33px;
          align-items: center;
          justify-content: center;
          gap: 6px;
          border: 2px solid rgba(255,255,255,.96);
          border-radius: 999px;
          padding: 2px 17px 3px;
          font-size: 16px;
          line-height: 1;
          white-space: nowrap;
        }
        .french-service-link-action svg { width: 13px; height: 13px; stroke-width: 2; }
        .french-service-nav {
          position: fixed;
          z-index: 5;
          right: 0;
          bottom: 0;
          left: 0;
          display: grid;
          height: calc(68px + env(safe-area-inset-bottom, 0px));
          grid-template-columns: repeat(4, minmax(0, 1fr));
          padding: 5px max(0px, calc((100vw - 512px) / 2)) env(safe-area-inset-bottom, 0px);
          border-top: 1px solid #dedede;
          background: rgba(255,255,255,.98);
        }
        .french-service-nav-item {
          display: flex;
          min-width: 0;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 2px;
          color: var(--service-muted);
          font-size: 14px;
          line-height: 1.1;
          text-decoration: none;
          -webkit-tap-highlight-color: transparent;
        }
        .french-service-nav-item.active { color: var(--service-orange); }
        .french-service-nav-item svg { width: 29px; height: 29px; stroke-width: 2.3; }
        .french-service-nav-item:first-child svg { stroke-width: 2.7; }
        .french-service-page a:focus-visible {
          outline: 3px solid #222;
          outline-offset: 3px;
        }
        @media (max-width: 420px) {
          .french-service-main { gap: 16px; padding: 16px 16px 26px; }
          .french-service-intro { gap: 12px; padding: 12px 14px; }
          .french-service-advisor { width: 64px; height: 64px; flex-basis: 64px; }
          .french-service-intro-copy p { font-size: 16px; }
          .french-service-intro-copy p + p { font-size: 14px; }
          .french-service-links { gap: 16px; }
          .french-service-link { min-height: 126px; grid-template-columns: 74px minmax(0, 1fr); column-gap: 12px; padding: 13px 14px 13px 18px; }
          .french-service-telegram { width: 74px; height: 74px; }
          .french-service-link-title { font-size: 17px; }
          .french-service-link-content { gap: 18px; }
          .french-service-link-action { min-height: 30px; padding-inline: 13px; font-size: 14px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .french-service-link { transition: none; }
        }
      `}</style>
      <div className="french-service-screen">
        <header className="french-service-titlebar">
          <a href="#" className="french-service-back" aria-label="Retour">
            <ChevronLeft aria-hidden="true" />
          </a>
          <h1>Service client en ligne</h1>
        </header>

        <div className="french-service-main">
          <section className="french-service-intro" aria-label="Votre conseillère">
            <img
              className="french-service-advisor"
              src="/__mockup/images/service-client/support-agent.png"
              alt="Votre conseillère du service client"
            />
            <div className="french-service-intro-copy">
              <p>Je suis votre conseillère dédiée au service client</p>
              <p>Heureuse de vous aider.</p>
            </div>
          </section>

          <section className="french-service-links" aria-label="Liens officiels">
            {links.map((link) => (
              <a
                key={link.title}
                className={`french-service-link ${link.kind}`}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${link.title} — ${link.action}`}
              >
                <img className="french-service-telegram" src={link.image} alt="" />
                <span className="french-service-link-content">
                  <span className="french-service-link-title">{link.title}</span>
                  <span className="french-service-link-action">{link.action}</span>
                </span>
              </a>
            ))}
          </section>
        </div>
      </div>

      <nav className="french-service-nav" aria-label="Navigation principale">
        {navItems.map(({ label, Icon, active }) => (
          <a
            key={label}
            href="#"
            className={`french-service-nav-item${active ? " active" : ""}`}
            aria-current={active ? "page" : undefined}
          >
            <Icon aria-hidden="true" fill={label === "Accueil" || label === "Équipe" || label === "Appareils" || label === "Moi" ? "currentColor" : "none"} />
            <span>{label}</span>
          </a>
        ))}
      </nav>
    </main>
  );
}