import "./_group.css";

function getStatusInfo(status: string) {
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
}

function formatDateTime(dateString: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateString));
}

function HistoryCard({
  code,
  createdAt,
  amount,
  status,
}: {
  code: string;
  createdAt: string;
  amount: string;
  status: string;
}) {
  const statusInfo = getStatusInfo(status);

  return (
    <article className="history-card">
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
        <strong>{amount}</strong>
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

export function Current() {
  return (
    <main className="transaction-history-mockup transaction-history-current">
      <style>{`
        .transaction-history-current {
          min-height: 100vh;
          padding: 12px;
          background: #f4f7f3;
        }
        .transaction-history-current-list {
          display: grid;
          gap: 12px;
        }
        .transaction-history-current .history-card {
          width: 100%;
          border: 1px solid #e5ebe3;
          border-radius: 12px;
          padding: 12px 14px;
          background: #fff;
          box-shadow: 0 2px 9px rgba(34, 56, 36, .045);
        }
        .transaction-history-current .history-row {
          display: flex;
          min-height: 31px;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          color: #687369;
          font-size: 13px;
          line-height: 1.35;
        }
        .transaction-history-current .history-row strong {
          min-width: 0;
          color: #202a21;
          font-size: 13px;
          font-weight: 600;
          text-align: right;
          overflow-wrap: anywhere;
        }
        .transaction-history-current .history-row .history-code {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: .01em;
        }
        .transaction-history-current .history-status {
          display: inline-flex;
          align-items: center;
          justify-content: flex-end;
          gap: 6px;
          white-space: nowrap;
        }
        .transaction-history-current .history-status.is-success { color: #287a38; }
        .transaction-history-current .history-status.is-failure { color: #bc3434; }
        .transaction-history-current .history-status.is-pending { color: #9a6b0a; }
        .transaction-history-current .history-status-dot {
          width: 8px;
          height: 8px;
          flex: 0 0 auto;
          border-radius: 50%;
          background: currentColor;
        }
      `}</style>
      <div className="transaction-history-current-list">
        <HistoryCard
          code="Réf. interne #284"
          createdAt="2025-12-26T16:16:46"
          amount="9 800 FCFA"
          status="approved"
        />
        <HistoryCard
          code="Réf. interne #281"
          createdAt="2025-12-23T09:02:33"
          amount="12 900 FCFA"
          status="approved"
        />
      </div>
    </main>
  );
}
