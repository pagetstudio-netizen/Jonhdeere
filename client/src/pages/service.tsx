import { useQuery } from "@tanstack/react-query";
import {
  ChevronLeft,
  Grid2X2,
  Headset,
  MessageCircle,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { useLocation } from "wouter";
import supportTelegramIcon from "@assets/groupService_1790964597734.png";
import communityTelegramIcon from "@assets/groupService-1_1790964597782.png";
import serviceAgentImage from "@assets/service-1_1790964597810.png";
import "./service-screenshot.css";

interface LinksSettings {
  supportLink?: string;
  supportType?: string;
  supportLabel?: string;
  supportEnabled?: string | boolean;
  channelLink?: string;
  channelType?: string;
  channelLabel?: string;
  channelEnabled?: string | boolean;
  groupLink?: string;
  groupType?: string;
  groupLabel?: string;
  groupEnabled?: string | boolean;
}

function isEnabled(value?: string | boolean) {
  return value !== false && value !== "false";
}

function ServiceLinkCard({
  title,
  action,
  href,
  enabled,
  icon,
  FallbackIcon,
  tone,
  testId,
}: {
  title: string;
  action: string;
  href: string;
  enabled: boolean;
  icon?: string;
  FallbackIcon: LucideIcon;
  tone: "support" | "community";
  testId: string;
}) {
  return (
    <article className={`service-link-card service-link-card-${tone}`}>
      <span className="service-link-icon" aria-hidden="true">
        {icon ? <img src={icon} alt="" /> : <FallbackIcon />}
      </span>
      <div className="service-link-copy">
        <h2>{title}</h2>
        {enabled ? (
          <a
            className="service-link-action"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            data-testid={testId}
          >
            {action}
          </a>
        ) : (
          <span
            className="service-link-action is-disabled"
            aria-disabled="true"
            data-testid={`${testId}-disabled`}
          >
            Désactivé
          </span>
        )}
      </div>
    </article>
  );
}

export default function ServicePage() {
  const [, navigate] = useLocation();
  const { data: settings } = useQuery<LinksSettings>({
    queryKey: ["/api/settings/links"],
  });

  const supportType = settings?.supportType?.toLowerCase() || "telegram";
  const supportIsTelegram = supportType === "telegram";

  return (
    <main className="service-client-page">
      <div className="service-client-screen">
        <header className="service-client-header">
          <button
            className="service-client-back"
            type="button"
            aria-label="Retour au compte"
            onClick={() => navigate("/account")}
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <h1>Service client en ligne</h1>
          <span className="service-client-header-spacer" aria-hidden="true" />
        </header>

        <section className="service-client-content" aria-label="Contacts officiels">
          <div className="service-client-intro">
            <img
              className="service-client-agent"
              src={serviceAgentImage}
              alt="Conseillère du service client"
            />
            <div className="service-client-intro-copy">
              <p className="service-client-intro-title">Je suis votre service client dédié</p>
              <p className="service-client-intro-subtitle">Heureuse de vous aider</p>
            </div>
          </div>

          <div className="service-client-links">
            <ServiceLinkCard
              title={settings?.supportLabel || "Service client"}
              action="Joindre l’assistance"
              href={settings?.supportLink || "https://t.me/sybotx"}
              enabled={isEnabled(settings?.supportEnabled)}
              icon={supportIsTelegram ? supportTelegramIcon : undefined}
              FallbackIcon={supportType === "whatsapp" ? MessageCircle : Headset}
              tone="support"
              testId="button-support-link"
            />
            <ServiceLinkCard
              title={settings?.groupLabel || "Groupe officiel"}
              action="Rejoindre"
              href={settings?.groupLink || "https://t.me/sybotx"}
              enabled={isEnabled(settings?.groupEnabled)}
              icon={settings?.groupType?.toLowerCase() === "telegram" ? communityTelegramIcon : undefined}
              FallbackIcon={UsersRound}
              tone="community"
              testId="button-group-link"
            />
            <ServiceLinkCard
              title={settings?.channelLabel || "Chaîne officielle"}
              action="Rejoindre"
              href={settings?.channelLink || "https://t.me/sybotx"}
              enabled={isEnabled(settings?.channelEnabled)}
              icon={settings?.channelType?.toLowerCase() === "telegram" ? communityTelegramIcon : undefined}
              FallbackIcon={Grid2X2}
              tone="community"
              testId="button-channel-link"
            />
          </div>
        </section>
      </div>
    </main>
  );
}