import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import { getCountryByCode, type ApiCountry } from "@/lib/countries";
import { ChevronLeft, Loader2 } from "lucide-react";
import { Link } from "wouter";
import EmptyState from "@/components/empty-state";

interface Deposit {
  id: number;
  amount: string;
  status: string;
  createdAt: string;
  reference?: string | null;
  soleaspayReference?: string;
  soleaspayOrderId?: string;
  inpayOrderNumber?: string;
  inpayOutTradeNo?: string;
  omnipayId?: string;
  omnipayReference?: string;
  sendavapayReference?: string;
  westpayReference?: string;
  ashtechTransactionId?: string;
  ashtechReference?: string;
}

interface Withdrawal {
  id: number;
  amount: string;
  status: string;
  createdAt: string;
  inpayOrderNumber?: string;
  inpayOutTradeNo?: string;
  omnipayId?: string;
  omnipayReference?: string;
}

interface Transaction {
  id: number;
  type: string;
  amount: string;
  createdAt: string;
}

type ActiveTab = "free" | "deposits" | "withdrawals";

const getDepositRef = (deposit: Deposit) => {
  const reference = [
    deposit.ashtechReference,
    deposit.ashtechTransactionId,
    deposit.sendavapayReference,
    deposit.inpayOrderNumber,
    deposit.omnipayId,
    deposit.soleaspayReference,
    deposit.soleaspayOrderId,
    deposit.westpayReference,
    deposit.inpayOutTradeNo,
    deposit.omnipayReference,
    deposit.reference,
  ].find((value) => typeof value === "string" && value.trim());
  return reference?.trim() || `Réf. interne #${deposit.id}`;
};

const getWithdrawalRef = (withdrawal: Withdrawal) => {
  const reference = [
    withdrawal.inpayOrderNumber,
    withdrawal.omnipayId,
    withdrawal.inpayOutTradeNo,
    withdrawal.omnipayReference,
  ].find((value) => typeof value === "string" && value.trim());
  return reference?.trim() || `Réf. interne #${withdrawal.id}`;
};

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "Date indisponible";
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const getStatusInfo = (status: string) => {
  switch (status) {
    case "completed":
    case "approved":
      return { label: "Versé avec succès", tone: "is-success" };
    case "rejected":
    case "failed":
    case "canceled":
    case "cancelled":
      return { label: "Échec bancaire", tone: "is-failure" };
    case "processing":
      return { label: "En cours", tone: "is-pending" };
    default:
      return { label: "En attente", tone: "is-pending" };
  }
};

const EARNING_TYPES = new Set([
  "free_claim",
  "earning",
  "task_reward",
  "signup_bonus",
  "bonus",
  "commission",
  "deposit_commission",
  "gift_code",
  "staking_release",
]);

function HistoryCard({
  code,
  createdAt,
  amount,
  status,
  currency,
  testId,
}: {
  code: string;
  createdAt: string;
  amount: string;
  status: string;
  currency: string;
  testId?: string;
}) {
  const statusInfo = getStatusInfo(status);

  return (
    <article className="history-card" data-testid={testId}>
      <div className="history-row">
        <span>Code :</span>
        <strong className="history-code" title={code}>{code}</strong>
      </div>
      <div className="history-row">
        <span>Temps d’application :</span>
        <strong>{formatDateTime(createdAt)}</strong>
      </div>
      <div className="history-row">
        <span>Montant :</span>
        <strong>{amount} {currency}</strong>
      </div>
      <div className="history-row">
        <span>Statut :</span>
        <strong className={`history-status ${statusInfo.tone}`}>
          <span className="history-status-dot" aria-hidden="true" />
          {statusInfo.label}
        </strong>
      </div>
    </article>
  );
}

export default function HistoryPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<ActiveTab>("free");
  const { data: apiCountries = [] } = useQuery<ApiCountry[]>({
    queryKey: ["/api/countries"],
  });
  const countryInfo = user ? getCountryByCode(user.country, apiCountries) : null;
  const currency = countryInfo?.currency === "XOF" || countryInfo?.currency === "XAF"
    ? "FCFA"
    : countryInfo?.currency || "FCFA";
  const formatAmount = (value: string | number) => {
    const amount = Number(value || 0);
    return (Number.isFinite(amount) ? Math.round(amount) : 0).toLocaleString("fr-FR");
  };

  const {
    data: deposits = [],
    isLoading: depositsLoading,
    isError: depositsError,
  } = useQuery<Deposit[]>({
    queryKey: ["/api/deposits/history"],
    enabled: Boolean(user) && activeTab === "deposits",
  });

  const {
    data: withdrawals = [],
    isLoading: withdrawalsLoading,
    isError: withdrawalsError,
  } = useQuery<Withdrawal[]>({
    queryKey: ["/api/withdrawals/history"],
    enabled: Boolean(user) && activeTab === "withdrawals",
  });

  const {
    data: transactions = [],
    isLoading: transactionsLoading,
    isError: transactionsError,
  } = useQuery<Transaction[]>({
    queryKey: ["/api/transactions"],
    enabled: Boolean(user) && activeTab === "free",
  });

  if (!user) return null;

  const freeEarnings = transactions
    .filter((transaction) => EARNING_TYPES.has(transaction.type))
    .sort((first, second) => new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime());
  const sortedDeposits = [...deposits].sort(
    (first, second) => new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime(),
  );
  const sortedWithdrawals = [...withdrawals].sort(
    (first, second) => new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime(),
  );

  const isLoading =
    activeTab === "free"
      ? transactionsLoading
      : activeTab === "deposits"
        ? depositsLoading
        : withdrawalsLoading;
  const isError =
    activeTab === "free"
      ? transactionsError
      : activeTab === "deposits"
        ? depositsError
        : withdrawalsError;

  return (
    <main className="history-page">
      <style>{`
        .history-page {
          width: 100%;
          min-height: 100dvh;
          overflow-x: hidden;
          background: #f4f7f3;
          color: #1b241c;
          font-family: Arial, sans-serif;
        }
        .history-page *,
        .history-page *::before,
        .history-page *::after {
          box-sizing: border-box;
        }
        .history-screen {
          width: 100%;
          max-width: 500px;
          min-height: 100dvh;
          margin: 0 auto;
          background: #f4f7f3;
        }
        .history-header {
          position: relative;
          display: flex;
          height: 68px;
          align-items: center;
          padding: 8px 18px 0;
          background: #fff;
        }
        .history-back {
          display: grid;
          width: 32px;
          height: 32px;
          place-items: center;
          border: 0;
          padding: 0;
          background: transparent;
          color: #263329;
          cursor: pointer;
        }
        .history-back svg {
          width: 25px;
          height: 25px;
          stroke-width: 1.9;
        }
        .history-title {
          position: absolute;
          right: 55px;
          left: 55px;
          margin: 0;
          color: #1d2a20;
          font-size: 19px;
          font-weight: 700;
          line-height: 1;
          text-align: center;
        }
        .history-tabs {
          display: grid;
          grid-template-columns: 1.25fr 1fr 1fr;
          gap: 7px;
          align-items: center;
          min-height: 58px;
          margin: 10px 14px 0;
          padding: 5px;
          border: 1px solid #e4eae2;
          border-radius: 13px;
          background: #fff;
        }
        .history-tab {
          display: flex;
          min-width: 0;
          height: 42px;
          align-items: center;
          justify-content: center;
          border: 0;
          border-radius: 9px;
          padding: 0 6px;
          background: transparent;
          color: #556156;
          font-size: 14px;
          font-weight: 600;
          line-height: 1;
          white-space: nowrap;
          cursor: pointer;
          transition: background-color .16s ease, color .16s ease;
        }
        .history-tab.active {
          background: #367c2b;
          color: #fff;
          font-weight: 700;
        }
        .history-tab:focus-visible,
        .history-back:focus-visible {
          outline: 3px solid #a8d5a0;
          outline-offset: 2px;
        }
        .history-content {
          min-height: calc(100dvh - 136px);
          padding: 14px 14px 40px;
        }
        .history-list {
          display: grid;
          gap: 12px;
        }
        .history-card {
          width: 100%;
          overflow: hidden;
          border: 1px solid #e5ebe3;
          border-radius: 12px;
          padding: 12px 14px;
          background: #fff;
          box-shadow: 0 2px 9px rgba(34, 56, 36, .045);
        }
        .history-row {
          display: flex;
          min-height: 31px;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          color: #687369;
          font-size: 13px;
          line-height: 1.35;
        }
        .history-row strong {
          min-width: 0;
          color: #202a21;
          font-size: 13px;
          font-weight: 600;
          text-align: right;
          overflow-wrap: anywhere;
        }
        .history-row .history-code {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: .01em;
        }
        .history-row .history-status {
          display: inline-flex;
          align-items: center;
          justify-content: flex-end;
          gap: 6px;
          white-space: nowrap;
        }
        .history-status.is-success { color: #287a38; }
        .history-status.is-failure { color: #bc3434; }
        .history-status.is-pending { color: #9a6b0a; }
        .history-status-dot {
          width: 8px;
          height: 8px;
          flex: 0 0 auto;
          border-radius: 50%;
          background: currentColor;
        }
        .history-empty {
          display: flex;
          min-height: 300px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: #768078;
          font-size: 14px;
        }
        .history-empty img {
          width: 112px;
          height: 112px;
          object-fit: contain;
        }
        .history-load-error {
          padding: 32px 16px;
          color: #9c3434;
          text-align: center;
          font-size: 14px;
        }
        @media (max-width: 370px) {
          .history-title { font-size: 17px; }
          .history-tabs { margin-right: 10px; margin-left: 10px; gap: 4px; }
          .history-tab { font-size: 12px; }
          .history-content { padding-right: 10px; padding-left: 10px; }
          .history-card { padding-right: 11px; padding-left: 11px; }
          .history-row { gap: 8px; font-size: 12px; }
          .history-row strong { font-size: 12px; }
          .history-row .history-code { font-size: 11px; }
        }
      `}</style>

      <div className="history-screen">
        <header className="history-header">
          <Link href="/account">
            <button className="history-back" data-testid="button-back" aria-label="Retour">
              <ChevronLeft aria-hidden="true" />
            </button>
          </Link>
          <h1 className="history-title">Historique</h1>
        </header>

        <nav className="history-tabs" aria-label="Type d'enregistrement">
          <button
            type="button"
            className={`history-tab ${activeTab === "free" ? "active" : ""}`}
            onClick={() => setActiveTab("free")}
            aria-pressed={activeTab === "free"}
            data-testid="tab-free-earnings"
          >
            Free Earnings
          </button>
          <button
            type="button"
            className={`history-tab ${activeTab === "deposits" ? "active" : ""}`}
            onClick={() => setActiveTab("deposits")}
            aria-pressed={activeTab === "deposits"}
            data-testid="tab-deposits"
          >
            Dépôt
          </button>
          <button
            type="button"
            className={`history-tab ${activeTab === "withdrawals" ? "active" : ""}`}
            onClick={() => setActiveTab("withdrawals")}
            aria-pressed={activeTab === "withdrawals"}
            data-testid="tab-withdrawals"
          >
            Retrait
          </button>
        </nav>

        <section className="history-content" aria-live="polite">
          {isLoading ? (
            <div className="history-empty">
              <Loader2 className="animate-spin" />
            </div>
          ) : isError ? (
            <p className="history-load-error">Impossible de charger cet historique. Réessayez plus tard.</p>
          ) : activeTab === "free" ? (
            freeEarnings.length > 0 ? (
              <div className="history-list">
                {freeEarnings.map((transaction) => (
                  <HistoryCard
                    key={transaction.id}
                    testId={`free-earning-item-${transaction.id}`}
                    code={`#${transaction.id}`}
                    createdAt={transaction.createdAt}
                    amount={`+${formatAmount(transaction.amount)}`}
                    status="approved"
                    currency={currency}
                  />
                ))}
              </div>
            ) : (
              <EmptyState className="history-empty">
                <span>Plus de données</span>
              </EmptyState>
            )
          ) : activeTab === "deposits" ? (
            sortedDeposits.length > 0 ? (
              <div className="history-list">
                {sortedDeposits.map((deposit) => (
                  <HistoryCard
                    key={deposit.id}
                    testId={`deposit-item-${deposit.id}`}
                    code={getDepositRef(deposit)}
                    createdAt={deposit.createdAt}
                    amount={formatAmount(deposit.amount)}
                    status={deposit.status}
                    currency={currency}
                  />
                ))}
              </div>
            ) : (
              <EmptyState className="history-empty">
                <span>Plus de données</span>
              </EmptyState>
            )
          ) : sortedWithdrawals.length > 0 ? (
            <div className="history-list">
              {sortedWithdrawals.map((withdrawal) => (
                <HistoryCard
                  key={withdrawal.id}
                  testId={`withdrawal-item-${withdrawal.id}`}
                  code={getWithdrawalRef(withdrawal)}
                  createdAt={withdrawal.createdAt}
                  amount={formatAmount(withdrawal.amount)}
                  status={withdrawal.status}
                  currency={currency}
                />
              ))}
            </div>
          ) : (
            <EmptyState className="history-empty">
              <span>Plus de données</span>
            </EmptyState>
          )}
        </section>
      </div>
    </main>
  );
}