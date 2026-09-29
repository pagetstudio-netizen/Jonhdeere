import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import type { Product } from "@shared/schema";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/lib/auth";
import { JOHN_DEERE_PHOTOS, JOHN_DEERE_PRODUCT_IMAGES } from "@/lib/john-deere-assets";
import depositIcon from "@assets/ic-g-m_1790642732365.png";
import withdrawalIcon from "@assets/ic-s-r_1790642772623.png";
import serviceIcon from "@assets/ic-24-7_1790642772537.png";
import channelIcon from "@assets/ic-con_1790642772656.png";

type HomeProduct = Product & {
  canClaimFree?: boolean;
};

const quickActions = [
  { label: "Recharger", image: depositIcon, path: "/deposit" },
  { label: "Retirer", image: withdrawalIcon, path: "/withdrawal" },
  { label: "Service", image: serviceIcon, path: "/service" },
  { label: "Canal", image: channelIcon, path: null },
];

const formatFcfa = (amount: number) =>
  `${Math.round(amount).toLocaleString("fr-FR")} FCFA`;

export default function HomeDashboard() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [welcomePopupOpen, setWelcomePopupOpen] = useState(false);

  const { data: settings } = useQuery<Record<string, string>>({
    queryKey: ["/api/settings"],
  });
  const { data: products = [], isLoading: productsLoading } = useQuery<HomeProduct[]>({
    queryKey: ["/api/products"],
    enabled: Boolean(user),
    refetchOnWindowFocus: true,
  });

  const groupLink = settings?.groupLink || "";
  const channelLink = settings?.channelLink || "";
  const visibleProducts = products.filter((product) => product.isActive);

  if (!user) return null;

  const handleQuickAction = (path: string | null) => {
    if (path) {
      navigate(path);
      return;
    }

    if (channelLink) {
      window.open(channelLink, "_blank", "noopener,noreferrer");
    } else if (groupLink) {
      setWelcomePopupOpen(true);
    }
  };

  return (
    <>
      <main className="john-deere-home">
        <style>{`
          .john-deere-home {
            min-height: 100vh;
            padding: 18px 0 100px;
            background: #f2f2f2;
            color: #202124;
            font-family: Inter, Arial, sans-serif;
          }
          .john-deere-home,
          .john-deere-home * {
            box-sizing: border-box;
          }
          .john-deere-home .home-screen {
            width: 100%;
            max-width: 512px;
            margin: 0 auto;
            padding: 0 20px;
          }
          .john-deere-home .home-hero {
            display: block;
            width: 100%;
            aspect-ratio: 1.98 / 1;
            overflow: hidden;
            border-radius: 8px;
            background: #e9eee5;
          }
          .john-deere-home .home-hero img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center 52%;
          }
          .john-deere-home .home-actions {
            display: grid;
            width: 100%;
            height: 116px;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            align-items: center;
            margin-top: 12px;
            border-radius: 14px;
            background: #086b2d;
            box-shadow: 0 2px 3px rgba(0, 0, 0, .12);
          }
          .john-deere-home .home-action {
            display: flex;
            min-width: 0;
            height: 100%;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 11px;
            border: 0;
            padding: 0 3px;
            background: transparent;
            color: #fff;
            cursor: pointer;
            font: inherit;
            -webkit-tap-highlight-color: transparent;
          }
          .john-deere-home .home-action:active {
            background: rgba(255, 255, 255, .1);
          }
          .john-deere-home .home-action:focus-visible,
          .john-deere-home .product-buy:focus-visible {
            outline: 3px solid #ffde00;
            outline-offset: -4px;
          }
          .john-deere-home .home-action-icon {
            width: 40px;
            height: 38px;
            flex: 0 0 auto;
            object-fit: contain;
            filter: grayscale(1) sepia(1) saturate(2.4) hue-rotate(55deg) brightness(.96) contrast(1.1);
          }
          .john-deere-home .home-action-label {
            max-width: 100%;
            overflow: hidden;
            font-size: 13px;
            font-weight: 400;
            line-height: 1.1;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .john-deere-home .product-carousel {
            --carousel-card-width: min(62vw, 320px);
            --carousel-edge-inset: 20px;
            display: flex;
            gap: 12px;
            margin: 12px -20px 0;
            padding: 0 calc((100% - var(--carousel-card-width)) / 2 + var(--carousel-edge-inset));
            overflow-x: auto;
            overscroll-behavior-x: contain;
            scroll-padding-inline: calc((100% - var(--carousel-card-width)) / 2 + var(--carousel-edge-inset));
            scroll-snap-type: x mandatory;
            scroll-behavior: smooth;
            scrollbar-width: none;
            touch-action: pan-x pan-y;
            -webkit-overflow-scrolling: touch;
          }
          .john-deere-home .product-carousel::-webkit-scrollbar {
            display: none;
          }
          .john-deere-home .home-product-card {
            display: grid;
            min-width: 0;
            height: 250px;
            flex: 0 0 var(--carousel-card-width);
            grid-template-rows: 164px 40px;
            row-gap: 6px;
            scroll-snap-align: center;
            scroll-snap-stop: always;
            transform: scale(.87);
            transform-origin: center;
            opacity: .76;
            border-radius: 18px;
            padding: 12px 13px 28px;
            background: #fff;
            box-shadow: 0 1px 3px rgba(0, 0, 0, .035);
            transition: transform .34s cubic-bezier(.22, .61, .36, 1), opacity .28s ease, box-shadow .28s ease;
          }
          .john-deere-home .home-product-card.is-active {
            z-index: 1;
            transform: scale(1);
            opacity: 1;
            box-shadow: 0 8px 22px rgba(19, 55, 27, .14);
          }
          .john-deere-home .product-main-row {
            display: grid;
            min-width: 0;
            min-height: 0;
            grid-template-columns: 42% minmax(0, 1fr);
            column-gap: 13px;
          }
          .john-deere-home .product-photo {
            position: relative;
            min-width: 0;
            min-height: 0;
            overflow: hidden;
            border-radius: 8px;
            background:
              linear-gradient(145deg, transparent 0 81%, rgba(255, 222, 0, .85) 81% 86%, transparent 86%),
              #f7f8f5;
          }
          .john-deere-home .product-image {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
          }
          .john-deere-home .product-mini-logo {
            position: absolute;
            top: 7px;
            right: 7px;
            width: 38px;
            height: 21px;
            border-radius: 3px;
            background: rgba(255, 255, 255, .9);
            object-fit: contain;
          }
          .john-deere-home .product-info {
            display: grid;
            min-width: 0;
            min-height: 0;
            grid-template-rows: 25px 28px minmax(0, 1fr);
            row-gap: 7px;
          }
          .john-deere-home .product-name {
            overflow: hidden;
            color: #202124;
            font-size: 16px;
            font-weight: 700;
            line-height: 25px;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .john-deere-home .product-price {
            overflow: hidden;
            color: #176c37;
            font-size: 19px;
            font-weight: 800;
            line-height: 28px;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .john-deere-home .product-metrics {
            display: grid;
            min-width: 0;
            grid-template-rows: repeat(3, minmax(0, 1fr));
            gap: 8px;
          }
          .john-deere-home .product-metric {
            display: flex;
            min-width: 0;
            align-items: center;
            overflow: hidden;
            border-radius: 7px;
            padding: 0 12px;
            background: #f3f4f9;
            color: #28633a;
            font-size: 11px;
            font-weight: 400;
            line-height: 1.1;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .john-deere-home .product-buy {
            display: flex;
            width: 100%;
            min-width: 0;
            align-items: center;
            justify-content: center;
            gap: 9px;
            border: 0;
            border-radius: 6px;
            background: #086b2d;
            color: white;
            cursor: pointer;
            font-family: inherit;
            font-size: 14px;
            font-weight: 500;
            line-height: 1;
            transition: background-color .15s ease, transform .12s ease;
            -webkit-tap-highlight-color: transparent;
          }
          .john-deere-home .product-buy-icon {
            display: block;
            width: 18px;
            height: 18px;
            flex: 0 0 18px;
            background-color: #b8dc4e;
            -webkit-mask-position: center;
            mask-position: center;
            -webkit-mask-repeat: no-repeat;
            mask-repeat: no-repeat;
            -webkit-mask-size: contain;
            mask-size: contain;
          }
          .john-deere-home .product-buy:hover {
            background: #075a27;
          }
          .john-deere-home .product-buy:active {
            transform: scale(.99);
            background: #064c21;
          }
          .john-deere-home .product-buy:disabled {
            cursor: wait;
            opacity: .75;
          }
          .john-deere-home .product-empty,
          .john-deere-home .product-loading {
            display: grid;
            min-height: 140px;
            flex: 0 0 100%;
            place-items: center;
            border-radius: 18px;
            padding: 18px;
            background: #fff;
            color: #28633a;
            font-size: 14px;
            text-align: center;
            scroll-snap-align: start;
          }
          .john-deere-home .buy-dialog-actions {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
            margin-top: 22px;
          }
          .john-deere-home .buy-dialog-button {
            min-height: 42px;
            border: 0;
            border-radius: 7px;
            padding: 0 16px;
            font: inherit;
            font-weight: 600;
          }
          .john-deere-home .buy-dialog-cancel {
            background: #f1f3ef;
            color: #293327;
          }
          .john-deere-home .buy-dialog-confirm {
            background: #086b2d;
            color: #fff;
          }
          @media (max-width: 390px) {
            .john-deere-home .home-screen {
              padding-right: 14px;
              padding-left: 14px;
            }
            .john-deere-home .product-carousel {
              --carousel-card-width: min(68vw, 270px);
              --carousel-edge-inset: 14px;
              margin-right: -14px;
              margin-left: -14px;
            }
            .john-deere-home .home-actions {
              height: 108px;
            }
            .john-deere-home .home-action-label {
              font-size: 12px;
            }
            .john-deere-home .product-main-row {
              grid-template-columns: 40% minmax(0, 1fr);
              column-gap: 9px;
            }
            .john-deere-home .product-info {
              grid-template-rows: 24px 27px minmax(0, 1fr);
              row-gap: 6px;
            }
            .john-deere-home .product-name {
              font-size: 14px;
            }
            .john-deere-home .product-price {
              font-size: 16px;
            }
            .john-deere-home .product-metric {
              padding: 0 7px;
              font-size: 10px;
            }
          }
          @media (max-width: 350px) {
            .john-deere-home .product-carousel {
              --carousel-card-width: min(70vw, 230px);
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .john-deere-home .product-buy,
            .john-deere-home .home-product-card {
              transition: none;
            }
          }
          .john-deere-home .product-list {
            display: grid;
            gap: 14px;
            margin-top: 14px;
          }
          .john-deere-home .product-list-card {
            display: grid;
            min-width: 0;
            gap: 12px;
            border: 1px solid #e4e9df;
            border-radius: 16px;
            padding: 12px;
            background: #fff;
            box-shadow: 0 5px 15px rgba(26, 55, 29, .09);
          }
          .john-deere-home .product-list-main {
            display: grid;
            min-width: 0;
            min-height: 138px;
            grid-template-columns: minmax(105px, 37%) minmax(0, 1fr);
            gap: 12px;
          }
          .john-deere-home .product-list-photo {
            min-width: 0;
            min-height: 138px;
            overflow: hidden;
            border-radius: 11px;
            background: #f3f5ee;
          }
          .john-deere-home .product-list-image {
            display: block;
            width: 100%;
            height: 100%;
            min-height: 138px;
            object-fit: cover;
            object-position: center;
          }
          .john-deere-home .product-list-info {
            display: flex;
            min-width: 0;
            flex-direction: column;
            justify-content: center;
            gap: 12px;
          }
          .john-deere-home .product-list-heading {
            display: flex;
            min-width: 0;
            align-items: flex-start;
            justify-content: space-between;
            gap: 6px;
          }
          .john-deere-home .product-list-name {
            display: -webkit-box;
            min-width: 0;
            overflow: hidden;
            color: #202124;
            font-size: 16px;
            font-weight: 750;
            line-height: 1.2;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
          .john-deere-home .product-list-cycle {
            flex: 0 0 auto;
            border-radius: 0 10px 0 10px;
            padding: 6px 8px;
            background: #367c2b;
            color: #fff;
            font-size: 10px;
            font-weight: 700;
            line-height: 1;
            white-space: nowrap;
          }
          .john-deere-home .product-list-metrics {
            display: grid;
            min-width: 0;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 7px;
          }
          .john-deere-home .product-list-metric {
            display: flex;
            min-width: 0;
            flex-direction: column;
            justify-content: center;
            gap: 4px;
            border-radius: 9px;
            padding: 8px 7px;
            background: #f4f5f1;
          }
          .john-deere-home .product-list-metric strong {
            color: #28633a;
            font-size: clamp(11px, 3.3vw, 16px);
            font-weight: 800;
            line-height: 1.1;
            overflow-wrap: anywhere;
          }
          .john-deere-home .product-list-metric span {
            color: #555c55;
            font-size: 10px;
            line-height: 1.15;
          }
          .john-deere-home .product-list-footer {
            display: grid;
            min-width: 0;
            grid-template-columns: minmax(0, .85fr) minmax(135px, 1.15fr);
            align-items: center;
            gap: 10px;
            border-top: 1px solid #edf0e9;
            padding-top: 11px;
          }
          .john-deere-home .product-list-price {
            display: flex;
            min-width: 0;
            flex-direction: column;
            gap: 2px;
          }
          .john-deere-home .product-list-price span {
            color: #666c66;
            font-size: 11px;
            line-height: 1.1;
          }
          .john-deere-home .product-list-price strong {
            color: #176c37;
            font-size: clamp(15px, 4.1vw, 21px);
            font-weight: 800;
            line-height: 1.15;
            overflow-wrap: anywhere;
          }
          .john-deere-home .product-list .product-buy {
            min-height: 46px;
            border-radius: 999px;
            padding: 0 11px;
            background: #086b2d;
            font-size: 13px;
            font-weight: 700;
          }
          .john-deere-home .product-list .product-buy:hover {
            background: #075a27;
          }
          .john-deere-home .product-list .product-buy:active {
            background: #064c21;
          }
          @media (max-width: 390px) {
            .john-deere-home .product-list-main {
              min-height: 124px;
              grid-template-columns: minmax(96px, 36%) minmax(0, 1fr);
              gap: 9px;
            }
            .john-deere-home .product-list-photo,
            .john-deere-home .product-list-image {
              min-height: 124px;
            }
            .john-deere-home .product-list-info {
              gap: 9px;
            }
            .john-deere-home .product-list-metrics {
              gap: 5px;
            }
            .john-deere-home .product-list-metric {
              padding: 7px 5px;
            }
            .john-deere-home .product-list-metric span {
              font-size: 9px;
            }
            .john-deere-home .product-list-footer {
              grid-template-columns: minmax(0, .78fr) minmax(130px, 1.22fr);
              gap: 7px;
            }
            .john-deere-home .product-list .product-buy {
              padding: 0 8px;
              font-size: 12px;
            }
          }
        `}</style>

        <div className="home-screen">
          <section className="home-hero" aria-label="Concession John Deere">
            <img src={JOHN_DEERE_PHOTOS.homeHero} alt="Concession et équipements John Deere" />
          </section>

          <section className="home-actions" aria-label="Actions rapides">
            {quickActions.map(({ label, image, path }) => (
              <button
                key={label}
                type="button"
                className="home-action"
                onClick={() => handleQuickAction(path)}
                aria-label={label}
              >
                <img className="home-action-icon" src={image} alt="" aria-hidden="true" />
                <span className="home-action-label">{label}</span>
              </button>
            ))}
          </section>

          <section
            ref={carouselRef}
            className="product-carousel"
            aria-label="Produits John Deere disponibles"
            aria-roledescription="carrousel"
            tabIndex={0}
            onScroll={handleCarouselScroll}
          >
            {productsLoading ? (
              <div className="product-loading">Chargement des produits…</div>
            ) : visibleProducts.length > 0 ? (
              visibleProducts.map((product, index) => {
                const price = Number(product.price) || 0;
                const dailyEarnings = Number(product.dailyEarnings) || 0;
                const cycleDays = Number(product.cycleDays) || 0;
                const totalReturn = Number(product.totalReturn) || dailyEarnings * cycleDays;
                const image =
                  product.imageUrl ||
                  JOHN_DEERE_PRODUCT_IMAGES[index % JOHN_DEERE_PRODUCT_IMAGES.length] ||
                  JOHN_DEERE_LOGO;

                return (
                  <article
                    className={`home-product-card${activeProductIndex === index ? " is-active" : ""}`}
                    data-carousel-index={index}
                    key={product.id}
                  >
                    <div className="product-main-row">
                      <div className="product-photo">
                        <img
                          className="product-image"
                          src={image}
                          alt={product.name}
                          loading={index > 1 ? "lazy" : "eager"}
                        />
                        <img
                          className="product-mini-logo"
                          src={JOHN_DEERE_LOGO}
                          alt="John Deere"
                        />
                      </div>
                      <div className="product-info">
                        <h2 className="product-name" title={product.name}>{product.name}</h2>
                        <div className="product-price">{formatFcfa(price)}</div>
                        <div className="product-metrics">
                          <div className="product-metric">Gain / jour : {formatFcfa(dailyEarnings)}</div>
                          <div className="product-metric">Durée : {cycleDays} jours</div>
                          <div className="product-metric">Gain total : {formatFcfa(totalReturn)}</div>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="product-buy"
                      onClick={() => setConfirmProduct(product)}
                      disabled={Boolean(product.isFree && !product.canClaimFree)}
                      aria-label={`Acheter ${product.name}`}
                    >
                      <span
                        className="product-buy-icon"
                        aria-hidden="true"
                        style={{
                          WebkitMaskImage: `url(${purchaseIcon})`,
                          maskImage: `url(${purchaseIcon})`,
                        }}
                      />
                      {product.isFree
                        ? product.canClaimFree ? "Réclamer" : "Déjà réclamé"
                        : "Acheter maintenant"}
                    </button>
                  </article>
                );
              })
            ) : (
              <div className="product-empty">Aucun produit disponible pour le moment.</div>
            )}
          </section>
        </div>
      </main>

      <Dialog open={Boolean(confirmProduct)} onOpenChange={(open) => !open && setConfirmProduct(null)}>
          <DialogContent className="max-w-[380px] border border-[#dce5d8] bg-white text-[#202124]">
          <DialogHeader>
            <DialogTitle>Confirmer l'achat</DialogTitle>
            <DialogDescription>
              {confirmProduct
                ? confirmProduct.isFree
                  ? `Réclamer gratuitement ${confirmProduct.name} ?`
                  : `Confirmez l'achat de ${confirmProduct.name} au prix de ${formatFcfa(Number(confirmProduct.price) || 0)}.`
                : ""}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              className="min-h-[42px] rounded-md bg-[#f1f3ef] px-4 font-semibold text-[#293327] disabled:opacity-60"
              onClick={() => setConfirmProduct(null)}
              disabled={purchaseMutation.isPending}
            >
              Annuler
            </button>
            <button
              type="button"
              className="min-h-[42px] rounded-md bg-[#086b2d] px-4 font-semibold text-white hover:bg-[#075a27] disabled:opacity-60"
              onClick={() => confirmProduct && purchaseMutation.mutate(confirmProduct)}
              disabled={!confirmProduct || purchaseMutation.isPending}
            >
              {purchaseMutation.isPending ? "Traitement…" : confirmProduct?.isFree ? "Réclamer" : "Confirmer"}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={welcomePopupOpen} onOpenChange={setWelcomePopupOpen}>
        <DialogContent className="max-h-[calc(100vh-24px)] max-w-[380px] overflow-y-auto overflow-x-visible border-0 bg-transparent p-0 shadow-none [&>button:last-child]:hidden">
          <DialogHeader>
            <DialogTitle className="sr-only">Service John Deere</DialogTitle>
            <DialogDescription className="sr-only">Rejoindre le groupe de discussion</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center">
            <img src={JOHN_DEERE_PHOTOS.dealerTeam} alt="" className="block h-auto w-full" />
            <a
              href={groupLink || "#"}
              target="_blank"
              rel="noreferrer"
              onClick={() => setWelcomePopupOpen(false)}
              className="mt-3 block w-[92%]"
              aria-label="Rejoindre le groupe"
            >
              <img src={JOHN_DEERE_PHOTOS.tractorExpo} alt="Rejoindre le groupe John Deere" className="h-auto w-full" />
            </a>
          </div>
          <button
            type="button"
            onClick={() => setWelcomePopupOpen(false)}
            className="mx-auto mt-5 block h-14 w-14 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            aria-label="Fermer"
          >
            <span className="flex h-full w-full items-center justify-center rounded-full bg-white text-[#367c2b]">
              <X aria-hidden="true" className="h-7 w-7" />
            </span>
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
}