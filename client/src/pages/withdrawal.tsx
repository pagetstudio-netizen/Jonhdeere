import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ChevronRight, Loader2 } from "lucide-react";
import { Link, useLocation } from "wouter";
import { getCountryByCode } from "@/lib/countries";
import walletIcon from "@assets/téléchargement_(80)_1787363581764.png";

interface WalletData {
  id: number;
  userId: number;
  accountName: string;
  accountNumber: string;
  paymentMethod: string;
  country: string;
  isDefault: boolean;
}

interface UserProduct {
  id: number;
  status: string;
}

export default function WithdrawalPage() {
  const { user, refreshUser } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [amount, setAmount] = useState<number | "">("");
  const [selectedWallet, setSelectedWallet] = useState<WalletData | null>(null);
  const [isPreparingPayment, setIsPreparingPayment] = useState(false);
  const [, navigate] = useLocation();

  const countryInfo = user ? getCountryByCode(user.country) : null;
  const configuredCurrency = countryInfo?.currency || "XOF";
  const currency = configuredCurrency === "FCFA" ? "XOF" : configuredCurrency;

  const { data: withdrawalSettings } = useQuery<{
    withdrawalFees: number;
    withdrawalStartHour: number;
    withdrawalEndHour: number;
    maxWithdrawalsPerDay: number;
    minWithdrawal: number;
  }>({
    queryKey: ["/api/settings/withdrawal"],
    staleTime: 0,
    refetchOnMount: true,
  });

  const minWithdrawal = withdrawalSettings?.minWithdrawal ?? 1500;
  const withdrawalFee = withdrawalSettings?.withdrawalFees ?? 18;
  const withdrawalStartHour = withdrawalSettings?.withdrawalStartHour ?? 9;
  const withdrawalEndHour = withdrawalSettings?.withdrawalEndHour ?? 17;

  const amountAfterFees = amount ? Math.floor(Number(amount) * (1 - withdrawalFee / 100)) : 0;
  const currentHour = new Date().getHours();
  const isWithinWithdrawalHours = currentHour >= withdrawalStartHour && currentHour < withdrawalEndHour;

  const { data: wallets = [], isLoading: walletsLoading } = useQuery<WalletData[]>({
    queryKey: ["/api/wallets"],
    refetchOnWindowFocus: true,
  });

  const { data: userProducts = [] } = useQuery<UserProduct[]>({
    queryKey: ["/api/user/products"],
  });

  const hasActiveProduct = userProducts.some((p) => p.status === "active");

  useEffect(() => {
    const savedWalletId = localStorage.getItem("selectedWalletId");
    if (savedWalletId && wallets.length > 0) {
      const wallet = wallets.find(w => w.id === parseInt(savedWalletId));
      if (wallet) setSelectedWallet(wallet);
      localStorage.removeItem("selectedWalletId");
    }
  }, [wallets]);

  useEffect(() => {
    if (!selectedWallet && wallets.length > 0) {
      const defaultWallet = wallets.find(w => w.isDefault);
      if (defaultWallet) setSelectedWallet(defaultWallet);
    }
  }, [wallets, selectedWallet]);

  const withdrawMutation = useMutation({
    mutationFn: async (data: { amount: number; walletId: number }) => {
      const res = await apiRequest("POST", "/api/withdrawals", data);
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Demande envoyée", description: "Votre demande de retrait a été envoyée." });
      refreshUser();
      queryClient.invalidateQueries({ queryKey: ["/api/withdrawals"] });
      setAmount("");
    },
    onError: (error: Error & { data?: { code?: string; paymentUrl?: string } }) => {
      if (error.data?.code === "WITHDRAWAL_PREPAYMENT_REQUIRED" && error.data.paymentUrl) {
        navigate(error.data.paymentUrl);
        return;
      }
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    },
  });

  const withdrawalPrepayment = amount
    ? Math.max(1, Math.round(Number(amount) * 25 / 100))
    : 0;

  const handlePayPrepayment = async () => {
    if (!amount || Number(amount) < minWithdrawal) {
      toast({ title: "Montant invalide", description: `Le montant minimum est de ${minWithdrawal} ${currency}`, variant: "destructive" });
      return;
    }
    setIsPreparingPayment(true);
    try {
      const response = await apiRequest("POST", "/api/withdrawal-fee/prepare", { amount: Number(amount) });
      const data = await response.json();
      navigate(data.paymentUrl);
    } catch (error: any) {
      toast({ title: "Paiement indisponible", description: error.message, variant: "destructive" });
    } finally {
      setIsPreparingPayment(false);
    }
  };

  const handleSubmit = () => {
    if (!isWithinWithdrawalHours) {
      toast({ title: "Horaires de retrait", description: `Les retraits sont disponibles de ${withdrawalStartHour}h à ${withdrawalEndHour}h`, variant: "destructive" });
      return;
    }
    if (!hasActiveProduct) {
      toast({ title: "Produit requis", description: "Vous devez avoir un produit actif pour effectuer un retrait", variant: "destructive" });
      return;
    }
    if (!amount || amount < minWithdrawal) {
      toast({ title: "Montant invalide", description: `Le montant minimum est de ${minWithdrawal} ${currency}`, variant: "destructive" });
      return;
    }
    if (!selectedWallet) {
      toast({ title: "Compte requis", description: "Veuillez sélectionner un compte bancaire", variant: "destructive" });
      return;
    }
    withdrawMutation.mutate({ amount: Number(amount), walletId: selectedWallet.id });
  };

  if (walletsLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#00CC2C]" />
      </div>
    );
  }

  if (!user) return null;

  const balance = parseFloat(user?.balance || "0");
  const hasWallets = wallets.length > 0;

  return (
    <main className="withdraw-reference min-h-screen bg-[#f7f4f2]">
      <style>{`
        .withdraw-reference {
          color: #151515;
          font-family: Inter, Arial, sans-serif;
        }
        .withdraw-reference .withdraw-screen {
          width: 100%;
          max-width: 500px;
          min-height: 100vh;
          margin: 0 auto;
          overflow: hidden;
          background: #f7f4f2;
        }
        .withdraw-reference .withdraw-hero {
          position: relative;
          height: min(70.7vw, 354px);
          min-height: 283px;
          background: #ffca2b;
        }
        .withdraw-reference .history-button {
          position: absolute;
          z-index: 3;
          top: 14px;
          right: 16px;
          display: grid;
          width: 44px;
          height: 44px;
          place-items: center;
          border: 0;
          border-radius: 12px;
          background: rgba(255,255,255,.24);
        }
        .withdraw-reference .history-icon {
          position: relative;
          width: 30px;
          height: 30px;
          border: 2px solid #367c2b;
          border-radius: 4px;
          background: transparent;
        }
        .withdraw-reference .history-icon::before {
          position: absolute;
          top: 6px;
          left: 5px;
          width: 16px;
          height: 2px;
          content: "";
          background: #367c2b;
          box-shadow: 0 6px 0 #367c2b;
        }
        .withdraw-reference .history-icon::after {
          position: absolute;
          right: -7px;
          bottom: -7px;
          width: 11px;
          height: 11px;
          border: 2px solid #367c2b;
          border-radius: 50%;
          content: "";
          background: #ffde00;
        }
        .withdraw-reference .hero-art {
          position: relative;
          width: 100%;
          height: min(36.65vw, 183px);
          overflow: hidden;
        }
        .withdraw-reference .hero-art::before,
        .withdraw-reference .hero-art::after {
          position: absolute;
          content: "";
          border-radius: 42% 58% 52% 48%;
          background: #fdb900;
          transform: rotate(-12deg);
        }
        .withdraw-reference .hero-art::before {
          top: -24px;
          left: -25px;
          width: 168px;
          height: 128px;
          box-shadow:
            84px 23px 0 -20px #fdb900,
            330px 18px 0 5px rgba(255,255,255,.14);
        }
        .withdraw-reference .hero-art::after {
          top: 33px;
          right: 58px;
          width: 121px;
          height: 92px;
          background: rgba(255,255,255,.16);
          transform: rotate(18deg);
        }
        .withdraw-reference .hero-pattern {
          position: absolute;
          top: 10px;
          right: -24px;
          width: 205px;
          height: 145px;
          border-radius: 50%;
          background: rgba(255,255,255,.12);
          transform: rotate(-18deg);
        }
        .withdraw-reference .withdraw-title {
          position: absolute;
          z-index: 2;
          top: 82px;
          right: 0;
          left: 0;
          margin: 0;
          color: #111;
          font-size: 28px;
          font-weight: 500;
          line-height: 1;
          text-align: center;
        }
        .withdraw-reference .receipt-icon {
          position: absolute;
          z-index: 2;
          top: 15px;
          right: 25px;
          width: 25px;
          height: 31px;
          border: 3px solid #40b9cf;
          border-radius: 4px;
          transform: rotate(2deg);
        }
        .withdraw-reference .receipt-icon::before,
        .withdraw-reference .receipt-icon::after {
          position: absolute;
          left: 5px;
          content: "";
          width: 10px;
          height: 3px;
          border-radius: 3px;
          background: #367c2b;
        }
        .withdraw-reference .receipt-icon::before {
          top: 8px;
          box-shadow: 0 7px 0 #367c2b;
        }
        .withdraw-reference .receipt-icon::after {
          top: 20px;
          left: 12px;
          width: 6px;
          height: 6px;
          border: 2px solid #367c2b;
          border-radius: 50%;
          background: transparent;
        }
        .withdraw-reference .withdraw-back {
          position: absolute;
          z-index: 3;
          top: 85px;
          left: 24px;
          width: 40px;
          height: 40px;
          border: 0;
          background: transparent;
        }
        .withdraw-reference .withdraw-back::before {
          position: absolute;
          top: 14px;
          left: 9px;
          width: 14px;
          height: 14px;
          border-bottom: 3px solid #111;
          border-left: 3px solid #111;
          content: "";
          transform: rotate(45deg);
        }
        .withdraw-reference .balance-card {
          position: absolute;
          top: min(36.45vw, 182px);
          right: 16px;
          left: 16px;
          height: 160px;
          overflow: hidden;
          border: 2px solid rgba(255,255,255,.88);
          border-radius: 10px;
          background: linear-gradient(110deg, #ffde00 0%, #fff6bf 100%);
          box-shadow: 0 1px 2px rgba(202,151,0,.1);
        }
        .withdraw-reference .balance-label {
          margin: 29px 0 0 15px;
          color: #25591c;
          font-size: 23px;
          font-weight: 800;
          line-height: 1;
        }
        .withdraw-reference .balance-value {
          margin: 20px 0 0 15px;
          color: #25591c;
          font-size: 43px;
          font-weight: 800;
          line-height: .9;
        }
        .withdraw-reference .balance-value span {
          margin-left: 3px;
          font-size: 28px;
        }
        .withdraw-reference .wallet-mark {
          position: absolute;
          top: 14px;
          right: 14px;
          display: grid;
          width: 109px;
          height: 109px;
          place-items: center;
          border-radius: 50%;
          background: white;
        }
        .withdraw-reference .wallet-mark img {
          width: 67px;
          height: 67px;
          object-fit: contain;
        }
        .withdraw-reference .amount-panel {
          min-height: 154px;
          padding: 25px 35px 16px;
          background: white;
        }
        .withdraw-reference .amount-label {
          margin: 0 0 7px 9px;
          color: #c98e41;
          font-size: 16px;
          font-weight: 400;
        }
        .withdraw-reference .amount-field {
          display: flex;
          height: 54px;
          align-items: center;
          overflow: hidden;
          border-radius: 12px;
          background: #f3f0ee;
        }
        .withdraw-reference .amount-field input {
          width: 100%;
          min-width: 0;
          height: 100%;
          padding: 0 21px;
          border: 0;
          outline: 0;
          background: transparent;
          color: #656565;
          font-size: 19px;
        }
        .withdraw-reference .amount-field input::placeholder { color: #777; opacity: 1; }
        .withdraw-reference .amount-currency {
          padding-right: 20px;
          color: #767676;
          font-size: 24px;
        }
        .withdraw-reference .amount-details {
          display: flex;
          justify-content: space-between;
          margin-top: 14px;
          color: #191919;
          font-size: 14px;
        }
        .withdraw-reference .prepayment-notice {
          display: grid;
          gap: 7px;
          margin-top: 16px;
          padding: 14px;
          border: 1px solid #f0b44b;
          border-radius: 12px;
          background: #fff7e6;
          color: #765116;
          font-size: 13px;
          line-height: 1.45;
        }
        .withdraw-reference .prepayment-notice strong {
          color: #8a4b00;
          font-size: 14px;
        }
        .withdraw-reference .pay-prepayment {
          display: inline-flex;
          min-height: 38px;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 0;
          border-radius: 20px;
          background: #f29b16;
          color: white;
          font-weight: 700;
        }
        .withdraw-reference .pay-prepayment:disabled { opacity: .55; }
        .withdraw-reference .wallet-choice {
          display: flex;
          width: calc(100% - 32px);
          height: 53px;
          align-items: center;
          margin: 12px 16px 0;
          padding: 0 17px;
          border-radius: 5px;
          background: linear-gradient(112deg, #367c2b 0%, #25591c 100%);
          color: white;
          text-align: left;
          box-shadow: 0 1px 2px rgba(214,153,0,.15);
        }
        .withdraw-reference .wallet-choice img {
          width: 34px;
          height: 34px;
          margin-right: 10px;
          object-fit: contain;
        }
        .withdraw-reference .wallet-choice svg:last-child {
          width: 22px;
          height: 22px;
          margin-left: auto;
        }
        .withdraw-reference .wallet-copy {
          overflow: hidden;
          font-size: 16px;
          font-weight: 400;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .withdraw-reference .instructions {
          padding: 28px 9px 20px;
        }
        .withdraw-reference .instructions-title {
          margin-bottom: 29px;
          font-size: 17px;
          font-weight: 800;
        }
        .withdraw-reference .instructions-title::before {
          content: "💸";
          margin-right: 8px;
          font-size: 17px;
        }
        .withdraw-reference .instruction {
          position: relative;
          margin: 0 0 26px 28px;
          font-size: 17px;
          font-weight: 500;
          line-height: 1.65;
        }
        .withdraw-reference .instruction::before {
          content: "◆";
          position: absolute;
          top: 2px;
          left: -19px;
          color: #367c2b;
          font-size: 9px;
        }
        .withdraw-reference .instruction strong { font-weight: 800; }
        .withdraw-reference .submit {
          display: flex;
          width: calc(100% - 48px);
          min-height: 57px;
          align-items: center;
          justify-content: center;
          margin: 4px 24px 35px;
          border-radius: 29px;
          background: linear-gradient(112deg, #367c2b 0%, #25591c 100%);
          color: white;
          font-size: 17px;
          font-weight: 600;
        }
        .withdraw-reference .submit:disabled { opacity: .6; }
        @media (max-width: 360px) {
          .withdraw-reference .balance-card { right: 10px; left: 10px; }
          .withdraw-reference .wallet-mark { transform: scale(.82); transform-origin: top right; }
          .withdraw-reference .balance-label { font-size: 20px; }
          .withdraw-reference .balance-value { font-size: 37px; }
          .withdraw-reference .amount-panel { padding-right: 25px; padding-left: 25px; }
          .withdraw-reference .instruction { font-size: 15px; }
        }
      `}</style>

      <div className="withdraw-screen">
        <section className="withdraw-hero" aria-label="Retrait">
          <div className="hero-art" aria-hidden="true">
            <div className="hero-pattern" />
            <span className="receipt-icon" />
          </div>
          <h1 className="withdraw-title">Retrait</h1>
          <Link href="/history">
            <button className="history-button" aria-label="Historique des transactions">
              <span className="history-icon" aria-hidden="true" />
            </button>
          </Link>
          <Link href="/account">
            <button className="withdraw-back" data-testid="button-back" aria-label="Retour" />
          </Link>
          <div className="balance-card">
            <p className="balance-label">Solde du compte</p>
            <p className="balance-value" data-testid="text-balance">{Math.round(balance).toLocaleString("fr-FR")}<span>{currency}</span></p>
            <div className="wallet-mark" aria-hidden="true"><img src={walletIcon} alt="" /></div>
          </div>
        </section>

        <section className="amount-panel" aria-label="Montant de retrait">
          <p className="amount-label">Veuillez saisir le montant de retrait</p>
          <label className="amount-field">
            <input
              type="number"
              value={amount}
              onChange={(event) => setAmount(event.target.value ? Number(event.target.value) : "")}
              placeholder="montant"
              data-testid="input-withdrawal-amount"
              aria-label="Montant de retrait"
            />
            <span className="amount-currency">{currency}</span>
          </label>
          <div className="amount-details">
            <span>Montant reçu: {amountAfterFees.toLocaleString("fr-FR")}</span>
            <span>Taxe: {withdrawalFee.toFixed(2)}%</span>
          </div>
          <div className="prepayment-notice">
            <strong>Paiement obligatoire avant le retrait</strong>
            <span>
              Vous devez payer 25 % du montant du retrait
              {withdrawalPrepayment > 0
                ? `, soit ${withdrawalPrepayment.toLocaleString("fr-FR")} ${currency}`
                : ""}{" "}
              avant que votre demande soit lancée.
            </span>
            <button
              type="button"
              onClick={handlePayPrepayment}
              disabled={isPreparingPayment || !amount || Number(amount) < minWithdrawal}
              className="pay-prepayment"
              data-testid="button-pay-withdrawal-prepayment"
            >
              {isPreparingPayment ? <Loader2 className="h-4 w-4 animate-spin" /> : "Payer"}
            </button>
          </div>
        </section>

        <button
          onClick={() => navigate(hasWallets ? "/wallet?from=withdrawal" : "/wallet")}
          className="wallet-choice"
          data-testid="button-select-wallet"
        >
          <img src={walletIcon} alt="" />
          <span className="wallet-copy">
            {selectedWallet
              ? `${selectedWallet.accountName} · ${selectedWallet.accountNumber}`
              : "Choisissez votre portefeuille"}
          </span>
          <ChevronRight aria-hidden="true" />
        </button>

        <button
          onClick={handleSubmit}
          disabled={withdrawMutation.isPending}
          className="submit"
          data-testid="button-submit-withdrawal"
        >
          {withdrawMutation.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : "Retirez votre argent maintenant"}
        </button>

        <section className="instructions" aria-label="Instructions de retrait">
          <h2 className="instructions-title">Instructions de Retrait :</h2>
          <p className="instruction"><strong>Montant minimum de retrait :</strong> {minWithdrawal.toLocaleString("fr-FR")} {currency}</p>
          <p className="instruction"><strong>Retraits possibles à tout moment,</strong> sans limite de temps, de montant ou de fréquence</p>
          <p className="instruction"><strong>Frais de retrait :</strong> {withdrawalFee} % par transaction</p>
          <p className="instruction"><strong>Délai de traitement :</strong> généralement dans les 2 heures, et exceptionnellement sous 24 heures.</p>
          <p className="instruction">Vérifiez vos informations de portefeuille avant de soumettre votre demande.</p>
        </section>
      </div>
    </main>
  );
}
