import "./_group.css";

type PurchasedProduct = {
  id: number;
  purchasedAt: string;
  daysRemaining: number;
  totalEarned: string | number;
  status: string;
  product: {
    name: string;
    imageUrl: string | null;
    price: number;
    dailyEarnings: number;
    totalReturn: number;
    cycleDays: number;
  } | null;
};

const currency = "FCFA";
const sampleUser = { totalEarnings: 0 };

// A local-only sample based on the response shape in Current.tsx.
const sampleProducts: PurchasedProduct[] = [
  {
    id: 1,
    purchasedAt: "2025-08-27T08:55:17.000Z",
    daysRemaining: 60,
    totalEarned: 0,
    status: "active",
    product: {
      name: "Tracteur 4066R",
      imageUrl: "/__mockup/images/revenue-page/4066r-tractor.webp",
      price: 25000,
      dailyEarnings: 2000,
      totalReturn: 180000,
      cycleDays: 90,
    },
  },
];

const localProductImage = "/__mockup/images/revenue-page/4066r-tractor.webp";

function formatAmount(value: number | string) {
  const amount = Number(value) || 0;
  return amount.toLocaleString("fr-FR");
}

function formatPurchaseDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
}

export function ReferenceMatch() {
  const product = sampleProducts[0];
  const cycleDays = product.product?.cycleDays ?? 0;
  const completedDays = Math.max(0, cycleDays - product.daysRemaining);

  return (
    <main className="jd-revenue">
      <style>{`
        .jd-revenue {
          --jd-green: #367c2b;
          --jd-deep: #286321;
          --jd-lime: #d8e7c7;
          --jd-ink: #263326;
          --jd-muted: #788078;
          --jd-paper: #f8faf6;
          min-height: 100dvh;
          background: var(--jd-paper);
          color: var(--jd-ink);
          font-family: "DM Sans", "Trebuchet MS", sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        .jd-revenue * { box-sizing: border-box; }
        .jd-revenue__screen {
          width: 100%;
          max-width: 430px;
          min-height: 100dvh;
          margin: 0 auto;
          background: var(--jd-paper);
        }
        .jd-revenue__total {
          display: flex;
          min-height: 152px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px 18px 25px;
          background: var(--jd-green);
          color: #fff;
          text-align: center;
        }
        .jd-revenue__eyebrow {
          margin: 0 0 7px;
          color: rgba(255,255,255,.76);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .14em;
          line-height: 1;
          text-transform: uppercase;
        }
        .jd-revenue__amount {
          margin: 0;
          font-size: clamp(35px, 10vw, 43px);
          font-weight: 750;
          letter-spacing: -.045em;
          line-height: 1.05;
          font-variant-numeric: tabular-nums;
        }
        .jd-revenue__total-label {
          margin: 8px 0 0;
          color: rgba(255,255,255,.9);
          font-size: 15px;
          font-weight: 500;
          line-height: 1.2;
        }
        .jd-revenue__notice {
          padding: 13px 19px 16px;
          background: #f0f4eb;
          color: #626c61;
          text-align: center;
        }
        .jd-revenue__notice-main {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          gap: 8px;
          margin: 0 auto 6px;
          font-size: 14px;
          font-weight: 500;
          line-height: 1.4;
        }
        .jd-revenue__info-mark {
          display: inline-flex;
          width: 16px;
          height: 16px;
          flex: 0 0 16px;
          align-items: center;
          justify-content: center;
          margin-top: 1px;
          border-radius: 50%;
          background: #71836d;
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          line-height: 1;
        }
        .jd-revenue__notice-sub {
          margin: 0;
          color: #778073;
          font-size: 12px;
          line-height: 1.45;
        }
        .jd-revenue__content {
          padding: 17px 14px 30px;
        }
        .jd-revenue__card {
          overflow: hidden;
          border: 1px solid #e8ede4;
          border-radius: 17px;
          background: #fff;
          box-shadow: 0 5px 18px rgba(46, 75, 39, .07);
        }
        .jd-revenue__date-wrap {
          display: flex;
          justify-content: flex-end;
          padding: 10px 10px 0;
        }
        .jd-revenue__date {
          display: inline-flex;
          min-height: 31px;
          align-items: center;
          padding: 0 12px;
          border-radius: 0 9px 0 9px;
          background: var(--jd-green);
          color: #fff;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: .01em;
          font-variant-numeric: tabular-nums;
          white-space: nowrap;
        }
        .jd-revenue__metrics {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          padding: 7px 13px 12px;
        }
        .jd-revenue__metric {
          min-width: 0;
          padding: 5px 3px 4px;
          text-align: center;
        }
        .jd-revenue__metric + .jd-revenue__metric {
          border-left: 1px solid #edf0e9;
        }
        .jd-revenue__metric-value {
          display: block;
          overflow: hidden;
          color: var(--jd-green);
          font-size: clamp(19px, 5.5vw, 23px);
          font-weight: 750;
          letter-spacing: -.035em;
          line-height: 1.15;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-variant-numeric: tabular-nums;
        }
        .jd-revenue__metric-label {
          display: block;
          margin-top: 4px;
          color: #7c847b;
          font-size: 12px;
          line-height: 1.3;
        }
        .jd-revenue__product {
          display: grid;
          grid-template-columns: minmax(105px, .9fr) minmax(0, 1.45fr);
          min-height: 113px;
          align-items: center;
          gap: 14px;
          padding: 2px 18px 15px;
        }
        .jd-revenue__image {
          display: block;
          width: 100%;
          height: 91px;
          object-fit: contain;
        }
        .jd-revenue__product-copy { min-width: 0; }
        .jd-revenue__product-name {
          margin: 0;
          color: #263326;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.3;
        }
        .jd-revenue__duration {
          margin: 8px 0 0;
          color: #77856e;
          font-size: 13px;
          font-weight: 500;
          line-height: 1.35;
        }
        .jd-revenue__footer {
          padding: 11px 16px 12px;
          background: var(--jd-green);
          color: #fff;
          font-size: 15px;
          font-weight: 600;
          line-height: 1.3;
          text-align: center;
          font-variant-numeric: tabular-nums;
        }
        @media (max-width: 350px) {
          .jd-revenue__notice { padding-right: 13px; padding-left: 13px; }
          .jd-revenue__content { padding-right: 10px; padding-left: 10px; }
          .jd-revenue__product { grid-template-columns: minmax(88px, .85fr) minmax(0, 1.4fr); gap: 10px; padding-right: 13px; padding-left: 13px; }
          .jd-revenue__date { font-size: 11px; }
        }
      `}</style>

      <div className="jd-revenue__screen">
        <header className="jd-revenue__total" aria-label="Revenus totaux">
          <p className="jd-revenue__eyebrow">John Deere</p>
          <p className="jd-revenue__amount">FCFA {formatAmount(sampleUser.totalEarnings)}</p>
          <p className="jd-revenue__total-label">Revenus totaux</p>
        </header>

        <section className="jd-revenue__notice" aria-label="Informations sur les revenus">
          <p className="jd-revenue__notice-main">
            <span className="jd-revenue__info-mark" aria-hidden="true">i</span>
            <span>Les revenus des produits sont réglés toutes les 24 heures</span>
          </p>
          <p className="jd-revenue__notice-sub">
            Vous pouvez acheter plusieurs appareils pour augmenter vos revenus
          </p>
        </section>

        <section className="jd-revenue__content" aria-label="Produits achetés">
          <article className="jd-revenue__card">
            <div className="jd-revenue__date-wrap">
              <time className="jd-revenue__date" dateTime={product.purchasedAt}>
                {formatPurchaseDate(product.purchasedAt)}
              </time>
            </div>

            <div className="jd-revenue__metrics">
              <div className="jd-revenue__metric">
                <span className="jd-revenue__metric-value">
                  FCFA {formatAmount(product.product?.dailyEarnings ?? 0)}
                </span>
                <span className="jd-revenue__metric-label">Revenus quotidiens</span>
              </div>
              <div className="jd-revenue__metric">
                <span className="jd-revenue__metric-value">
                  FCFA {formatAmount(product.product?.totalReturn ?? 0)}
                </span>
                <span className="jd-revenue__metric-label">Revenus totaux</span>
              </div>
            </div>

            <div className="jd-revenue__product">
              <img
                className="jd-revenue__image"
                src={product.product?.imageUrl || localProductImage}
                alt={product.product?.name || "Produit John Deere"}
                onError={event => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = localProductImage;
                }}
              />
              <div className="jd-revenue__product-copy">
                <h1 className="jd-revenue__product-name">{product.product?.name}</h1>
                <p className="jd-revenue__duration">
                  Durée : {completedDays}/{cycleDays} Jours
                </p>
              </div>
            </div>

            <footer className="jd-revenue__footer">
              Revenus reçus : FCFA {formatAmount(product.totalEarned)}
            </footer>
          </article>
        </section>
      </div>
    </main>
  );
}