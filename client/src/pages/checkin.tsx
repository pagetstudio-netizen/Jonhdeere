import { useMutation, useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import { Link } from "wouter";
import { getCountryByCode } from "@/lib/countries";
import { useAuth } from "@/lib/auth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import "./checkin.css";

const DAILY_BONUS_AMOUNT = 50;

interface DailyBonusStatus {
  canClaim: boolean;
  hoursRemaining: number;
  totalBonusClaimed: number;
  daysPointed: number;
}

interface ClaimResponse {
  success: boolean;
  message?: string;
}

function formatAmount(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);
}

export default function CheckinPage() {
  const { user, refreshUser } = useAuth();
  const { toast } = useToast();
  const statusQuery = useQuery<DailyBonusStatus>({
    queryKey: ["/api/daily-bonus-status"],
  });

  const claimMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/claim-daily-bonus", {});
      return response.json() as Promise<ClaimResponse>;
    },
    onSuccess: async (result) => {
      await queryClient.invalidateQueries({
        queryKey: ["/api/daily-bonus-status"],
      });
      await refreshUser();
      toast({
        title: "Check-in effectué",
        description: result.message || "Votre bonus quotidien a été ajouté.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Échec du check-in",
        description: error.message || "Impossible de réclamer le bonus.",
        variant: "destructive",
      });
      void statusQuery.refetch();
    },
  });

  if (!user) return null;

  const currency = getCountryByCode(user.country)?.currency || "FCFA";
  const currencyLabel = /^(XOF|XAF|FCFA)$/i.test(currency) ? "FC" : currency;
  const totalClaimed = Number(statusQuery.data?.totalBonusClaimed || 0);
  const hoursRemaining = Math.max(0, Number(statusQuery.data?.hoursRemaining || 0));
  const canClaim = statusQuery.data?.canClaim === true;
  const isUnavailable = !canClaim && hoursRemaining > 0;
  const isButtonDisabled =
    statusQuery.isLoading || statusQuery.isError || !canClaim || claimMutation.isPending;

  return (
    <main className="checkin-reference">
      <div className="checkin-layout">
        <section className="checkin-hero" aria-label="Centre de check-in">
          <img
            className="checkin-hero-art"
            src="/john-deere/checkin-reference-hero.jpg"
            alt=""
            aria-hidden="true"
          />
          <h1 className="checkin-screen-reader-only">Centre de check-in</h1>
          <Link
            href="/"
            className="checkin-back"
            aria-label="Retour à l’accueil"
            data-testid="button-back"
          >
            <ChevronLeft aria-hidden="true" />
          </Link>
        </section>

        <section className="checkin-intro" aria-label="Revenus cumulés">
          <p className="checkin-total">
            {formatAmount(totalClaimed)}
            <span>{currencyLabel}</span>
          </p>
          <h2 className="checkin-intro-title">Revenus cumulés</h2>
        </section>

        <section className="checkin-stats" aria-label="Détail des revenus">
          <div className="checkin-stat">
            <p className="checkin-stat-value">
              {formatAmount(DAILY_BONUS_AMOUNT)}
              <span>{currencyLabel}</span>
            </p>
            <p className="checkin-stat-label">Revenus du check-in quotidien</p>
          </div>
          <div className="checkin-stat">
            <p className="checkin-stat-value checkin-stat-secondary">
              {formatAmount(totalClaimed)}
              <span>{currencyLabel}</span>
            </p>
            <p className="checkin-stat-label">Revenus cumulés</p>
          </div>
        </section>

        <button
          className="checkin-claim"
          type="button"
          onClick={() => claimMutation.mutate()}
          disabled={isButtonDisabled}
          aria-busy={claimMutation.isPending}
          data-testid="button-claim-daily-bonus"
        >
          {claimMutation.isPending ? "Traitement…" : "Check-in"}
        </button>

        {isUnavailable && (
          <p className="checkin-next-claim" role="status" aria-live="polite">
            Prochain check-in dans {hoursRemaining} h
          </p>
        )}
        {statusQuery.isError && (
          <div className="checkin-query-error" role="alert">
            <p>Impossible de charger le statut du check-in.</p>
            <button type="button" onClick={() => void statusQuery.refetch()}>
              Réessayer
            </button>
          </div>
        )}
      </div>
    </main>
  );
}