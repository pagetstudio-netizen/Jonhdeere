import { useAuth } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import { getCountryByCode } from "@/lib/countries";
import { Loader2 } from "lucide-react";
import type { Product } from "@shared/schema";

import { getJohnDeereProductImage, JOHN_DEERE_PHOTOS } from "@/lib/john-deere-assets";
import EmptyState from "@/components/empty-state";

const revenueHero = JOHN_DEERE_PHOTOS.homeHero;
const activeProductIcon = "/john-deere/revenue/active-product.png";
const cumulativeRevenueIcon = "/john-deere/revenue/cumulative-revenue.png";

interface UserProduct {
  id: number;
  purchasedAt: string;
  daysRemaining: number;
  totalEarned: string | number;
  status: string;
  product: Product | null;
}

function getPurchasedProductImage(imageUrl: string | null | undefined, index: number) {
  const image = imageUrl?.trim();
  if (image && image.startsWith("/") && !image.startsWith("//")) return image;

  if (image) {
    try {
      const parsed = new URL(image);
      if (parsed.protocol === "https:" || parsed.protocol === "http:") return image;
    } catch {
      // Use a local John Deere image when the stored URL is malformed.
    }
  }

  return getJohnDeereProductImage(image, index);
}

export default function MyProductsPage() {
  const { user } = useAuth();

  const { data: userProducts, isLoading: loadingUserProducts } = useQuery<UserProduct[]>({
    queryKey: ["/api/user/products"],
  });

  if (!user) return null;

  const country = getCountryByCode(user.country);
  const currency = country?.currency === "FCFA" ? "XOF" : country?.currency || "XOF";
  const allUserProducts = userProducts || [];
  const activeUserProducts = allUserProducts.filter(up => up.status === "active");
  const activeProductCount = activeUserProducts.length;
  const totalUserEarnings = Math.round(Number(user.totalEarnings || 0));
  const formatStatAmount = (amount: number) => `${amount.toLocaleString("fr-FR")} ${currency}`;

  const formatPurchaseDate = (dateStr: string) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return "-";
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const seconds = String(d.getSeconds()).padStart(2, "0");
    return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <main className="products-reference min-h-full bg-[#245bc3] pb-24">
      <style>{`
        .products-reference { color: #151515; font-family: Inter, Arial, sans-serif; }
        .products-reference .products-screen { width: 100%; max-width: 576px; margin: 0 auto; }
        .products-reference .products-hero { position: relative; height: min(48.1vw, 277px); background: #245bc3; }
        .products-reference .products-hero-photo { display: block; width: 100%; height: min(38.7vw, 223px); object-fit: cover; object-position: center top; pointer-events: none; }
        .products-reference .summary-card { position: absolute; z-index: 1; right: 3%; bottom: -32.5%; left: 3%; display: grid; grid-template-columns: 1fr 1fr; height: 52%; overflow: hidden; border-radius: clamp(20px, 5vw, 30px); background: #fff; }
        .products-reference .summary-column { display: flex; min-width: 0; flex-direction: column; justify-content: center; gap: 5px; padding: 4px 8px; text-align: center; }
        .products-reference .summary-column + .summary-column { border-left: 5px solid #245bc3; }
        .products-reference .stat-label { overflow: hidden; color: #3c3c3c; font-size: clamp(13px, 3.5vw, 20px); font-weight: 600; line-height: 1.15; text-overflow: ellipsis; white-space: nowrap; }
        .products-reference .summary-row { display: flex; min-width: 0; align-items: center; justify-content: center; gap: clamp(7px, 2vw, 12px); }
        .products-reference .summary-icon { width: clamp(36px, 10.5vw, 61px); height: clamp(36px, 10.5vw, 61px); flex: 0 0 auto; object-fit: contain; }
        .products-reference .stat-value { display: block; min-width: 0; overflow: hidden; color: #303030; font-size: clamp(26px, 8vw, 46px); font-weight: 700; line-height: 1; text-overflow: ellipsis; white-space: nowrap; }
        .products-reference .stat-value.revenue { font-size: clamp(16px, 5.5vw, 32px); }
        .products-reference .product-list { display: flex; flex-direction: column; gap: 18px; padding: clamp(64px, 19.8vw, 114px) 4% 20px; background: #245bc3; }
        .products-reference .purchased-product-card { position: relative; display: flex; width: 100%; flex-direction: column; margin: 0; padding: clamp(14px, 3.4vw, 20px) clamp(16px, 4.2vw, 25px) clamp(14px, 3.4vw, 20px); overflow: hidden; border: 0; border-radius: clamp(18px, 5vw, 28px); background: #fff; box-shadow: none; }
        .products-reference .purchased-product-card .product-name { margin: 0; overflow: hidden; color: #3e3e3e; font-size: clamp(17px, 3.8vw, 22px); font-weight: 600; line-height: 1.2; text-align: center; text-overflow: ellipsis; white-space: nowrap; }
        .products-reference .purchased-image-stage { position: static !important; display: flex; width: 100%; height: clamp(140px, 34vw, 190px); flex: 0 0 auto; align-items: center; justify-content: center; margin: clamp(8px, 2vw, 12px) 0 0; overflow: hidden; border: 0; border-radius: 0; background: #fff; }
        .products-reference .purchased-image-stage img { position: static !important; display: block; width: auto !important; height: 100% !important; max-width: 100% !important; max-height: 100% !important; flex: 0 1 auto; object-fit: contain; }
        .products-reference .term-pill { align-self: center; margin: clamp(6px, 1.5vw, 9px) auto clamp(9px, 2vw, 13px); padding: 5px clamp(18px, 4vw, 28px); border-radius: 8px; background: #1885e4; color: #fff; font-size: clamp(12px, 2.8vw, 16px); font-weight: 500; line-height: 1.25; white-space: nowrap; }
        .products-reference .product-info { border-top: 1px solid #bdbdbd; padding-top: clamp(5px, 1.5vw, 9px); }
        .products-reference .product-info-row { display: flex; min-height: clamp(22px, 5.5vw, 32px); align-items: baseline; justify-content: space-between; gap: 10px; color: #757575; font-size: clamp(12px, 2.7vw, 16px); line-height: 1.35; }
        .products-reference .product-info-row span:first-child { flex: 0 1 52%; }
        .products-reference .product-info-row strong { flex: 1 1 48%; color: #181818; font-weight: 500; text-align: right; overflow-wrap: anywhere; }
        .products-reference .empty { display: flex; min-height: 260px; flex-direction: column; align-items: center; justify-content: center; border-radius: 9px; background: white; color: #777; }
        .products-reference .empty img { width: 150px; height: 150px; object-fit: contain; }
        @media (max-width: 390px) {
          .products-reference .summary-column + .summary-column { border-left-width: 3px; }
          .products-reference .summary-column { gap: 3px; padding-right: 4px; padding-left: 4px; }
        }
      `}</style>

      <div className="products-screen">
        <section className="products-hero" aria-label="Produits">
          <img className="products-hero-photo" src={revenueHero} alt="" />
          <div className="summary-card" aria-label="Résumé des produits et revenus">
            <div className="summary-column">
              <span className="stat-label">Produit actif</span>
              <div className="summary-row">
                <img className="summary-icon" src={activeProductIcon} alt="" />
                <span className="stat-value">{String(activeProductCount).padStart(2, "0")}</span>
              </div>
            </div>
            <div className="summary-column">
              <span className="stat-label">Revenus cumulés</span>
              <div className="summary-row">
                <span className="stat-value revenue">{formatStatAmount(totalUserEarnings)}</span>
                <img className="summary-icon" src={cumulativeRevenueIcon} alt="" />
              </div>
            </div>
          </div>
        </section>

        <div className="product-list">
          {loadingUserProducts ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-[#00CC2C]" />
            </div>
          ) : allUserProducts.length === 0 ? (
            <EmptyState className="empty">
              <p>Aucun produit John Deere</p>
              <p className="text-sm text-gray-400">Achetez des produits pour commencer à gagner</p>
            </EmptyState>
          ) : (
            allUserProducts.map((up, index) => {
              const cycleDays = Number(up.product?.cycleDays) || 60;
              const daysRemaining = Number(up.daysRemaining) || 0;
              const daysCompleted = Math.max(0, Math.min(cycleDays, cycleDays - daysRemaining));
              const earnedSoFar = Number(up.totalEarned || 0);

              return (
                <article
                  key={up.id}
                  className="purchased-product-card"
                  data-testid={`my-product-card-${up.id}`}
                >
                  <p className="product-name">{up.product?.name || "Produit acheté"}</p>
                  <div className="purchased-image-stage">
                    <img
                      src={getPurchasedProductImage(up.product?.imageUrl, index)}
                      alt={up.product?.name || "Produit acheté"}
                      onError={event => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = getJohnDeereProductImage(null, index);
                      }}
                    />
                  </div>
                  <span className="term-pill">Terme : {daysCompleted}/{cycleDays} Jours</span>
                  <div className="product-info">
                    <div className="product-info-row">
                      <span>Prix :</span>
                      <strong>{Number(up.product?.price || 0).toLocaleString("fr-FR")} {currency}</strong>
                    </div>
                    <div className="product-info-row">
                      <span>Revenu journalier :</span>
                      <strong>{Number(up.product?.dailyEarnings || 0).toLocaleString("fr-FR")} {currency}</strong>
                    </div>
                    <div className="product-info-row">
                      <span>Revenu total :</span>
                      <strong>{Number(up.product?.totalReturn || 0).toLocaleString("fr-FR")} {currency}</strong>
                    </div>
                    <div className="product-info-row">
                      <span>Revenu reçu :</span>
                      <strong>{earnedSoFar.toLocaleString("fr-FR")} {currency}</strong>
                    </div>
                    <div className="product-info-row">
                      <span>Date d'achat :</span>
                      <strong>{formatPurchaseDate(up.purchasedAt)}</strong>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>
    </main>
  );
}
