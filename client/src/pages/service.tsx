import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ExternalLink, Headset, MessageCircle, Send, UsersRound } from "lucide-react";
import { Link } from "wouter";
import supportIllustration from "@assets/no-data-CHEGY3VX_1790677728650.png";
import telegramIcon from "@assets/tg-1_1790677728702.png";
import "./service.css";

interface LinksSettings {
  supportLink?: string;
  supportType?: string;
  supportLabel?: string;
  channelLink?: string;
  channelType?: string;
  channelLabel?: string;
  groupLink?: string;
  groupType?: string;
  groupLabel?: string;
}

export default function ServicePage() {
  const { data: settings } = useQuery<LinksSettings>({
    queryKey: ["/api/settings/links"],
  });

  const supportIsWhatsApp = settings?.supportType?.toLowerCase() === "whatsapp";
  const supportIsTelegram = settings?.supportType?.toLowerCase() === "telegram";
  const supportTitle = supportIsWhatsApp ? "WhatsApp" : settings?.supportLabel || "Service client";
  const supportHref = settings?.supportLink || "https://t.me/sybotx";

  const communityLinks = [
    {
      title: settings?.channelLabel || "Canal officiel TPC",
      description: "Abonnez-vous au canal pour rester informé des dernières nouvelles.",
      href: settings?.channelLink || "https://t.me/sybotx",
      action: "Rejoindre",
      Icon: Send,
      isTelegram: settings?.channelType?.toLowerCase() === "telegram",
      testId: "button-channel-link",
    },
    {
      title: settings?.groupLabel || "Groupe officiel TPC",
      description: "Rejoignez le groupe pour plus d'informations.",
      href: settings?.groupLink || "https://t.me/sybotx",
      action: "Rejoindre",
      Icon: UsersRound,
      isTelegram: settings?.groupType?.toLowerCase() === "telegram",
      testId: "button-group-link",
    },
  ];

  return (
    <main className="service-client-page">
      <div className="service-client-screen">
        <header className="service-client-header">
          <div className="service-client-topbar">
            <Link href="/account" className="service-client-back" aria-label="Retour au compte">
              <ChevronLeft aria-hidden="true" />
            </Link>
            <h1>Service</h1>
            <span className="service-client-topbar-spacer" aria-hidden="true" />
          </div>

          <section className="service-client-hero" aria-labelledby="service-client-title">
            <img
              className="service-client-hero-image"
              src={supportIllustration}
              alt="Illustration d'une personne consultant un livre"
            />
            <div className="service-client-hero-copy">
              <h2 id="service-client-title">Service client</h2>
              <strong>Heures de travail 10h00–22h00</strong>
              <p>Si vous rencontrez un problème, veuillez contacter le service client.</p>
            </div>
          </section>
        </header>

        <section className="service-client-content" aria-label="Nous contacter">
          <article className="service-contact-card">
            <span
              className={`service-contact-icon service-contact-icon-support${supportIsTelegram ? " service-contact-icon-telegram" : ""}`}
              aria-hidden="true"
            >
              {supportIsTelegram ? (
                <img src={telegramIcon} alt="" />
              ) : supportIsWhatsApp ? (
                <MessageCircle />
              ) : (
                <Headset />
              )}
            </span>
            <div className="service-contact-copy">
              <h2>{supportTitle}</h2>
              <p>Si vous avez des questions, veuillez contacter le service client officiel.</p>
            </div>
            <a
              className="service-contact-action"
              href={supportHref}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-support-link"
            >
              Discuter
              <ExternalLink aria-hidden="true" />
            </a>
          </article>

          <section className="service-community-card" aria-label="Canaux officiels">
            {communityLinks.map(({ title, description, href, action, Icon, isTelegram, testId }) => (
              <article className="service-community-row" key={testId}>
                <span
                  className={`service-contact-icon${isTelegram ? " service-contact-icon-telegram" : ""}`}
                  aria-hidden="true"
                >
                  {isTelegram ? <img src={telegramIcon} alt="" /> : <Icon />}
                </span>
                <div className="service-contact-copy">
                  <h2>{title}</h2>
                  <p>{description}</p>
                </div>
                <a
                  className="service-contact-action"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={testId}
                >
                  {action}
                  <ExternalLink aria-hidden="true" />
                </a>
              </article>
            ))}
          </section>

          <section className="service-client-advice" aria-label="Aide et informations">
            <h2>Nous sommes là pour vous aider !</h2>
            <p>
              Si vous rencontrez des problèmes lors de l'utilisation de notre application, veuillez
              contacter notre groupe de service client pour obtenir de l'aide.
            </p>
            <p>
              Nos représentants sympathiques et expérimentés sont toujours prêts à répondre à vos
              questions et à vous apporter leur soutien en cas de besoin.
            </p>
            <p>
              Nous nous efforçons de rendre votre expérience aussi fluide et agréable que possible.
              Si vous avez besoin d'aide, n'hésitez pas à nous contacter.
            </p>
          </section>
        </section>
      </div>
    </main>
  );
}