import { useEffect, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import telegramIcon from "@assets/groupService-1_1790964412411.png";
import "./home-welcome-popup.css";

interface HomePopupSettings {
  groupLink?: string;
  groupEnabled?: string;
  popupButtonLabel?: string;
  signupBonus?: string;
  minDeposit?: string;
  minWithdrawal?: string;
  withdrawalStartHour?: string;
  withdrawalEndHour?: string;
  level1Commission?: string;
}

function safeTelegramUrl(value?: string) {
  if (!value?.trim()) return undefined;

  try {
    const url = new URL(value.trim());
    return url.protocol === "https:" ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

function formatFcfa(value?: string) {
  const amount = Number(value);
  return Number.isFinite(amount)
    ? `${Math.round(amount).toLocaleString("fr-FR")} FCFA`
    : "— FCFA";
}

function formatPercent(value?: string) {
  const rate = Number(value);
  return Number.isFinite(rate) ? `${rate}%` : "—";
}

export default function HomeWelcomePopup() {
  const [open, setOpen] = useState(false);
  const { data: settings, isLoading } = useQuery<HomePopupSettings>({
    queryKey: ["/api/settings"],
    enabled: open,
  });

  useEffect(() => {
    const showPopup = () => setOpen(true);
    window.addEventListener("home-tab-clicked", showPopup);
    return () => window.removeEventListener("home-tab-clicked", showPopup);
  }, []);

  const groupUrl = safeTelegramUrl(settings?.groupLink);
  const groupEnabled = settings?.groupEnabled !== "false";
  const canJoinGroup = Boolean(groupUrl && groupEnabled);
  const joinLabel = settings?.popupButtonLabel?.trim() || "Rejoindre le groupe Telegram";
  const withdrawalHours = settings?.withdrawalStartHour && settings?.withdrawalEndHour
    ? `retraits de ${settings.withdrawalStartHour} h à ${settings.withdrawalEndHour} h`
    : "retraits aux heures autorisées";

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="home-welcome-overlay" />
        <DialogPrimitive.Content
          className="home-welcome-dialog"
          onOpenAutoFocus={(event) => event.preventDefault()}
        >
          <DialogPrimitive.Title className="home-welcome-title">
            John Deere
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Informations de la plateforme et lien du groupe Telegram.
          </DialogPrimitive.Description>

          {canJoinGroup ? (
            <a
              className="home-welcome-telegram"
              href={groupUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={joinLabel}
            >
              <span className="home-welcome-telegram-label">{joinLabel}</span>
              <span className="home-welcome-telegram-icon">
                <img src={telegramIcon} alt="" aria-hidden="true" />
              </span>
            </a>
          ) : (
            <button className="home-welcome-telegram is-unavailable" type="button" disabled>
              <span className="home-welcome-telegram-label">
                {isLoading ? "Chargement du groupe Telegram…" : "Lien Telegram indisponible"}
              </span>
              <span className="home-welcome-telegram-icon">
                <img src={telegramIcon} alt="" aria-hidden="true" />
              </span>
            </button>
          )}

          <div className="home-welcome-details" aria-live="polite">
            <p className="home-welcome-app-name">John Deere App</p>
            <p>Commission : {formatPercent(settings?.level1Commission)}</p>
            <p className="home-welcome-bonus">
              Bonus d’inscription : {formatFcfa(settings?.signupBonus)}
            </p>
            <p>Gains journaliers, {withdrawalHours}</p>
            <p className="home-welcome-minimums">
              <span>Dépôt minimum : {formatFcfa(settings?.minDeposit)}</span>
              <span>Retrait minimum : {formatFcfa(settings?.minWithdrawal)}</span>
            </p>
          </div>

          <DialogPrimitive.Close asChild>
            <button className="home-welcome-confirm" type="button">
              {isLoading ? <Loader2 className="home-welcome-spinner" aria-label="Chargement" /> : "Confirmer"}
            </button>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}