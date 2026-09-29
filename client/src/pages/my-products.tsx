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
        .products-reference .stat-toggle { position: absolute; z-index: 2; top: 80.5%; height: 52%; background: transparent; }
        .products-reference .stat-toggle.our { left: 3%; width: 47%; }
        .products-reference .stat-toggle.my { right: 3%; width: 47%; }
        .products-reference .product-list { display: flex; flex-direction: column; gap: 18px; padding: 19.8vw 4% 20px; background: #245bc3; }
        .products-reference .product-card { position: relative; width: 100%; min-height: min(82.6vw, 476px); margin: 0; padding: clamp(14px, 3.4vw, 20px) clamp(16px, 4.2vw, 25px) clamp(14px, 3.4vw, 20px); overflow: hidden; border: 0; border-radius: clamp(18px, 5vw, 28px); background: #fff; box-shadow: none; }
        .products-reference .my-card { display: flex; flex-direction: column; }
        .products-reference .my-card .product-name { margin: 0; overflow: hidden; color: #3e3e3e; font-size: clamp(17px, 3.8vw, 22px); font-weight: 600; line-height: 1.2; text-align: center; text-overflow: ellipsis; white-space: nowrap; }
        .products-reference .my-card .product-picture { display: grid; width: 100%; height: clamp(92px, 22vw, 128px); margin: clamp(8px, 2vw, 12px) auto 0; place-items: center; }
        .products-reference .my-card .product-picture img { display: block; width: 100%; height: 100%; object-fit: contain; }
        .products-reference .term-pill { align-self: center; margin: clamp(6px, 1.5vw, 9px) auto clamp(9px, 2vw, 13px); padding: 5px clamp(18px, 4vw, 28px); border-radius: 8px; background: #1885e4; color: #fff; font-size: clamp(12px, 2.8vw, 16px); font-weight: 500; line-height: 1.25; white-space: nowrap; }
        .products-reference .product-info { border-top: 1px solid #bdbdbd; padding-top: clamp(5px, 1.5vw, 9px); }
        .products-reference .product-info-row { display: flex; min-height: clamp(22px, 5.9vw, 34px); align-items: baseline; justify-content: space-between; gap: 10px; color: #757575; font-size: clamp(12px, 2.7vw, 16px); line-height: 1.35; }
        .products-reference .product-info-row span:first-child { flex: 0 0 auto; }
        .products-reference .product-info-row strong { color: #181818; font-weight: 500; text-align: right; overflow-wrap: anywhere; }
        .products-reference .catalog-card { min-height: 265px; padding: 0; overflow: hidden; border-bottom: 1px solid #eee; border-radius: 0; }
        .products-reference .catalog-card .product-picture { position: absolute; top: 12px; right: 7px; width: 154px; height: 154px; overflow: hidden; border: 2px solid #7fc9a2; border-radius: 11px; background: #fff; }
        .products-reference .catalog-card .product-picture img { width: 100%; height: 100%; object-fit: cover; }
        .products-reference .catalog-card .product-details { position: absolute; top: 17px; left: 31px; right: 181px; overflow: hidden; }
        .products-reference .catalog-card .product-name { overflow: hidden; color: #42bd45; font-size: 23px; font-weight: 500; line-height: 1.15; text-overflow: ellipsis; white-space: nowrap; }
        .products-reference .catalog-card .product-price { margin-top: 22px; color: #171717; font-size: 17px; font-weight: 400; }
        .products-reference .catalog-card .product-line { margin-top: 12px; color: #171717; font-size: 16px; line-height: 1.15; overflow-wrap: anywhere; }
        .products-reference .catalog-card .product-line strong { margin-left: 8px; color: #171717; font-weight: 400; }
        .products-reference .catalog-card .buy { position: absolute; right: 7px; bottom: 25px; display: grid; width: 154px; height: 61px; place-items: center; border-radius: 14px; background: linear-gradient(180deg, #43d338 0%, #19b948 100%); color: white; font-size: 18px; font-weight: 400; line-height: 1.1; text-align: center; }
        .products-reference .empty { display: flex; min-height: 260px; flex-direction: column; align-items: center; justify-content: center; border-radius: 9px; background: white; color: #777; }
        .products-reference .empty img { width: 150px; height: 150px; object-fit: contain; }
        @media (max-width: 390px) {
          .products-reference .summary-column + .summary-column { border-left-width: 3px; }
          .products-reference .summary-column { gap: 3px; padding-right: 4px; padding-left: 4px; }
          .products-reference .catalog-card .product-picture { right: 5px; width: 112px; height: 112px; }
          .products-reference .catalog-card .product-details { left: 18px; right: 126px; }
          .products-reference .catalog-card .product-name { font-size: 17px; }
          .products-reference .catalog-card .product-price { margin-top: 18px; font-size: 14px; }
          .products-reference .catalog-card .product-line { margin-top: 9px; font-size: 13px; }
          .products-reference .catalog-card .buy { right: 5px; width: 112px; height: 52px; font-size: 14px; }
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
          <button className="stat-toggle our" onClick={() => setActiveTab("our")} data-testid="tab-our-products" aria-label="Voir les produits disponibles" />
          <button className="stat-toggle my" onClick={() => setActiveTab("my")} data-testid="tab-my-product" aria-label="Voir mes revenus et produits achetés" />
        </section>

        <div className="product-list">

        {/* ── OUR PRODUCTS tab ── */}
        {activeTab === "our" && (
          <div>
            {loadingProducts ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-[#00CC2C]" />
              </div>
            ) : paidProducts.length === 0 ? (
               <EmptyState className="empty">
                <p>Aucun produit disponible</p>
               </EmptyState>
            ) : (
              paidProducts.map((product, idx) => {
                const img = getJohnDeereProductImage(product.imageUrl, idx);
                return (
                  <div
                    key={product.id}
                    className="product-card catalog-card"
                    data-testid={`product-card-${product.id}`}
                  >
                    <div className="product-picture"><img src={img} alt={product.name} /></div>
                    <div className="product-details">
                      <p className="product-name">{product.name}</p>
                      <p className="product-price">{Number(product.price).toLocaleString("fr-FR")} {currency}</p>
                      <p className="product-line">Durée :<strong>{product.cycleDays}jours</strong></p>
                      <p className="product-line">Revenu quotidien :<strong>{Number(product.dailyEarnings).toLocaleString("fr-FR")} {currency}</strong></p>
                      <p className="product-line">Revenu total :<strong>{Number(product.totalReturn).toLocaleString("fr-FR")} {currency}</strong></p>
                    </div>
                    <button onClick={() => setConfirmProduct(product)} className="buy" data-testid={`button-purchase-${product.id}`}>
                      <span>ACHETER<br />MAINTENANT</span>
                    </button>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* ── MY PRODUCT tab ── */}
        {activeTab === "my" && (
          <div>
            <div>
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
                allUserProducts.map((up: any, index: number) => {
                  const cycleDays = Number(up.product?.cycleDays) || 60;
                  const daysRemaining = Number(up.daysRemaining) || 0;
                  const daysCompleted = Math.max(0, Math.min(cycleDays, cycleDays - daysRemaining));
                  const earnedSoFar = parseFloat(up.totalEarned || "0");

                  return (
                    <div
                      key={up.id}
                      className="product-card my-card"
                      data-testid={`my-product-card-${up.id}`}
                    >
                      <p className="product-name">{up.product?.name || "Produit"}</p>
                      <div className="product-picture">
                        <img src={getPurchasedProductImage(up.product?.imageUrl, index)} alt={up.product?.name || "Produit acheté"} />
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
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
        </div>
      </div>

      {/* Purchase confirm modal */}
      {confirmProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-8 bg-black/50"
          onClick={() => setConfirmProduct(null)}
        >
          <div
            className="w-full max-w-xs rounded-2xl overflow-hidden shadow-2xl bg-white"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 pt-6 pb-5 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                Conseil
              </p>
              <p className="text-gray-800 font-semibold text-base leading-snug">
                Êtes-vous sûr de vouloir acheter ce produit ?
              </p>
              <p className="text-gray-500 text-sm mt-2 font-medium">
                {confirmProduct.name}
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-100" />

            {/* Buttons */}
            <div className="flex">
              <button
                onClick={() => setConfirmProduct(null)}
                className="flex-1 py-4 font-semibold text-base text-gray-500 active:bg-gray-50 transition-colors"
                style={{ borderRight: "1px solid #f0f0f0" }}
                data-testid="button-cancel-purchase"
              >
                Non
              </button>
              <button
                onClick={() => purchaseMutation.mutate(confirmProduct.id)}
                disabled={purchaseMutation.isPending}
                className="flex-1 py-4 font-bold text-base text-white flex items-center justify-center gap-1.5 active:opacity-90 transition-opacity disabled:opacity-60"
                style={{ background: "#367C2B" }}
                data-testid="button-confirm-purchase"
              >
                {purchaseMutation.isPending
                  ? <Loader2 className="w-4 h-4 animate-spin" />
                  : "Oui"
                }
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
