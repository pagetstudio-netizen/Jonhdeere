import { ChevronLeft, ExternalLink, Headset, MessageCircle, Send, UsersRound } from "lucide-react";
import "./_group.css";
import "./Current.css";

const settings = {
  supportLabel: "Service client",
  supportLink: "https://t.me/example",
  supportType: "telegram",
  channelLabel: "Chaîne officielle",
  channelLink: "https://t.me/example",
  channelType: "telegram",
  groupLabel: "Groupe de discussion",
  groupLink: "https://t.me/example",
  groupType: "telegram",
};

const communityLinks = [
  {
    title: settings.channelLabel,
    description: "Abonnez-vous au canal pour rester informé des dernières nouvelles.",
    href: settings.channelLink,
    Icon: Send,
    isTelegram: settings.channelType === "telegram",
  },
  {
    title: settings.groupLabel,
    description: "Rejoignez le groupe pour plus d'informations.",
    href: settings.groupLink,
    Icon: UsersRound,
    isTelegram: settings.groupType === "telegram",
  },
];

export function Current() {
  const supportIsTelegram = settings.supportType === "telegram";
  const supportIsWhatsApp = settings.supportType === "whatsapp";

  return (
    <main className="service-client-page">
      <div className="service-client-screen">
        <header className="service-client-header">
          <div className="service-client-topbar">
            <a href="#" className="service-client-back" aria-label="Retour au compte">
              <ChevronLeft aria-hidden="true" />
            </a>
            <h1>Service</h1>
            <span className="service-client-topbar-spacer" aria-hidden="true" />
          </div>
          <section className="service-client-hero">
            <img
              className="service-client-hero-image"
              src="/__mockup/images/service-client/current-support.png"
              alt=""
            />
            <div className="service-client-hero-copy">
              <h2>Service client</h2>
              <strong>Heures de travail 10h00–22h00</strong>
              <p>Si vous rencontrez un problème, veuillez contacter le service client.</p>
            </div>
          </section>
        </header>
        <section className="service-client-content">
          <article className="service-contact-card">
            <span className={`service-contact-icon service-contact-icon-support${supportIsTelegram ? " service-contact-icon-telegram" : ""}`}>
              {supportIsTelegram ? (
                <img src="/__mockup/images/service-client/current-telegram.png" alt="" />
              ) : supportIsWhatsApp ? (
                <MessageCircle />
              ) : (
                <Headset />
              )}
            </span>
            <div className="service-contact-copy">
              <h2>{settings.supportLabel}</h2>
              <p>Si vous avez des questions, veuillez contacter le service client officiel.</p>
            </div>
            <a className="service-contact-action" href={settings.supportLink}>
              Discuter <ExternalLink aria-hidden="true" />
            </a>
          </article>
          <section className="service-community-card" aria-label="Canaux officiels">
            {communityLinks.map(({ title, description, href, Icon, isTelegram }) => (
              <article className="service-community-row" key={title}>
                <span className={`service-contact-icon${isTelegram ? " service-contact-icon-telegram" : ""}`}>
                  {isTelegram ? (
                    <img src="/__mockup/images/service-client/current-telegram.png" alt="" />
                  ) : (
                    <Icon />
                  )}
                </span>
                <div className="service-contact-copy">
                  <h2>{title}</h2>
                  <p>{description}</p>
                </div>
                <a className="service-contact-action" href={href}>
                  Rejoindre <ExternalLink aria-hidden="true" />
                </a>
              </article>
            ))}
          </section>
          <section className="service-client-advice">
            <h2>Nous sommes là pour vous aider !</h2>
            <p>
              Si vous rencontrez des problèmes lors de l'utilisation de notre application,
              veuillez contacter notre groupe de service client pour obtenir de l'aide.
            </p>
            <p>
              Nos représentants sympathiques et expérimentés sont toujours prêts à répondre
              à vos questions et à vous apporter leur soutien en cas de besoin.
            </p>
            <p>
              Nous nous efforçons de rendre votre expérience aussi fluide et agréable que
              possible. Si vous avez besoin d'aide, n'hésitez pas à nous contacter.
            </p>
          </section>
        </section>
      </div>
    </main>
  );
}