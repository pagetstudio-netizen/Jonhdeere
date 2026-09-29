import{a as T,b as V,B as U,r as c,u as K,j as e,L as C,d as P}from"./index-C3sAryos.js";import{u as x}from"./useQuery-BPZmahFR.js";import{u as O}from"./useMutation-mcjRYw0z.js";import{g as Q}from"./countries-DOninoG6.js";import{L as f}from"./loader-circle-DSIzD1pt.js";import{C as _}from"./chevron-right-CLG1_p0E.js";import"./createLucideIcon-jwZy10wK.js";const S="/assets/t%C3%A9l%C3%A9chargement_(80)_1787363581764-DIwCG-l1.png";function re(){const{user:l,refreshUser:I}=T(),{toast:a}=V(),R=U(),[r,m]=c.useState(""),[i,g]=c.useState(null),[b,y]=c.useState(!1),[,h]=K(),v=(l?Q(l.country):null)?.currency||"XOF",s=v==="FCFA"?"XOF":v,{data:p}=x({queryKey:["/api/settings/withdrawal"]}),d=p?.minWithdrawal??1500,w=p?.withdrawalFees??18,j=p?.withdrawalStartHour??9,N=p?.withdrawalEndHour??17,F=r?Math.floor(Number(r)*(1-w/100)):0,k=new Date().getHours(),L=k>=j&&k<N,{data:n=[],isLoading:W}=x({queryKey:["/api/wallets"]}),{data:M=[]}=x({queryKey:["/api/user/products"]}),E=M.some(t=>t.status==="active");c.useEffect(()=>{const t=localStorage.getItem("selectedWalletId");if(t&&n.length>0){const o=n.find(D=>D.id===parseInt(t));o&&g(o),localStorage.removeItem("selectedWalletId")}},[n]),c.useEffect(()=>{if(!i&&n.length>0){const t=n.find(o=>o.isDefault);t&&g(t)}},[n,i]);const u=O({mutationFn:async t=>(await P("POST","/api/withdrawals",t)).json(),onSuccess:()=>{a({title:"Demande envoyée",description:"Votre demande de retrait a été envoyée."}),I(),R.invalidateQueries({queryKey:["/api/withdrawals"]}),m("")},onError:t=>{if(t.data?.code==="WITHDRAWAL_PREPAYMENT_REQUIRED"&&t.data.paymentUrl){h(t.data.paymentUrl);return}a({title:"Erreur",description:t.message,variant:"destructive"})}}),z=r?Math.max(1,Math.round(Number(r)*25/100)):0,q=async()=>{if(!r||Number(r)<d){a({title:"Montant invalide",description:`Le montant minimum est de ${d} ${s}`,variant:"destructive"});return}y(!0);try{const o=await(await P("POST","/api/withdrawal-fee/prepare",{amount:Number(r)})).json();h(o.paymentUrl)}catch(t){a({title:"Paiement indisponible",description:t.message,variant:"destructive"})}finally{y(!1)}},A=()=>{if(!L){a({title:"Horaires de retrait",description:`Les retraits sont disponibles de ${j}h à ${N}h`,variant:"destructive"});return}if(!E){a({title:"Produit requis",description:"Vous devez avoir un produit actif pour effectuer un retrait",variant:"destructive"});return}if(!r||r<d){a({title:"Montant invalide",description:`Le montant minimum est de ${d} ${s}`,variant:"destructive"});return}if(!i){a({title:"Compte requis",description:"Veuillez sélectionner un compte bancaire",variant:"destructive"});return}u.mutate({amount:Number(r),walletId:i.id})};if(W)return e.jsx("div",{className:"min-h-screen bg-white flex items-center justify-center",children:e.jsx(f,{className:"w-8 h-8 animate-spin text-[#00CC2C]"})});if(!l)return null;const H=parseFloat(l?.balance||"0"),$=n.length>0;return e.jsxs("main",{className:"withdraw-reference min-h-screen bg-[#f7f4f2]",children:[e.jsx("style",{children:`
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
      `}),e.jsxs("div",{className:"withdraw-screen",children:[e.jsxs("section",{className:"withdraw-hero","aria-label":"Retrait",children:[e.jsxs("div",{className:"hero-art","aria-hidden":"true",children:[e.jsx("div",{className:"hero-pattern"}),e.jsx("span",{className:"receipt-icon"})]}),e.jsx("h1",{className:"withdraw-title",children:"Retrait"}),e.jsx(C,{href:"/history",children:e.jsx("button",{className:"history-button","aria-label":"Historique des transactions",children:e.jsx("span",{className:"history-icon","aria-hidden":"true"})})}),e.jsx(C,{href:"/account",children:e.jsx("button",{className:"withdraw-back","data-testid":"button-back","aria-label":"Retour"})}),e.jsxs("div",{className:"balance-card",children:[e.jsx("p",{className:"balance-label",children:"Solde du compte"}),e.jsxs("p",{className:"balance-value","data-testid":"text-balance",children:[Math.round(H).toLocaleString("fr-FR"),e.jsx("span",{children:s})]}),e.jsx("div",{className:"wallet-mark","aria-hidden":"true",children:e.jsx("img",{src:S,alt:""})})]})]}),e.jsxs("section",{className:"amount-panel","aria-label":"Montant de retrait",children:[e.jsx("p",{className:"amount-label",children:"Veuillez saisir le montant de retrait"}),e.jsxs("label",{className:"amount-field",children:[e.jsx("input",{type:"number",value:r,onChange:t=>m(t.target.value?Number(t.target.value):""),placeholder:"montant","data-testid":"input-withdrawal-amount","aria-label":"Montant de retrait"}),e.jsx("span",{className:"amount-currency",children:s})]}),e.jsxs("div",{className:"amount-details",children:[e.jsxs("span",{children:["Montant reçu: ",F.toLocaleString("fr-FR")]}),e.jsxs("span",{children:["Taxe: ",w.toFixed(2),"%"]})]}),e.jsxs("div",{className:"prepayment-notice",children:[e.jsx("strong",{children:"Paiement obligatoire avant le retrait"}),e.jsxs("span",{children:["Vous devez payer 25 % du montant du retrait",z>0?`, soit ${z.toLocaleString("fr-FR")} ${s}`:""," ","avant que votre demande soit lancée."]}),e.jsx("button",{type:"button",onClick:q,disabled:b||!r||Number(r)<d,className:"pay-prepayment","data-testid":"button-pay-withdrawal-prepayment",children:b?e.jsx(f,{className:"h-4 w-4 animate-spin"}):"Payer"})]})]}),e.jsxs("button",{onClick:()=>h($?"/wallet?from=withdrawal":"/wallet"),className:"wallet-choice","data-testid":"button-select-wallet",children:[e.jsx("img",{src:S,alt:""}),e.jsx("span",{className:"wallet-copy",children:i?`${i.accountName} · ${i.accountNumber}`:"Choisissez votre portefeuille"}),e.jsx(_,{"aria-hidden":"true"})]}),e.jsx("button",{onClick:A,disabled:u.isPending,className:"submit","data-testid":"button-submit-withdrawal",children:u.isPending?e.jsx(f,{className:"h-5 w-5 animate-spin"}):"Retirez votre argent maintenant"}),e.jsxs("section",{className:"instructions","aria-label":"Instructions de retrait",children:[e.jsx("h2",{className:"instructions-title",children:"Instructions de Retrait :"}),e.jsxs("p",{className:"instruction",children:[e.jsx("strong",{children:"Montant minimum de retrait :"})," ",d.toLocaleString("fr-FR")," ",s]}),e.jsxs("p",{className:"instruction",children:[e.jsx("strong",{children:"Retraits possibles à tout moment,"})," sans limite de temps, de montant ou de fréquence"]}),e.jsxs("p",{className:"instruction",children:[e.jsx("strong",{children:"Frais de retrait :"})," ",w," % par transaction"]}),e.jsxs("p",{className:"instruction",children:[e.jsx("strong",{children:"Délai de traitement :"})," généralement dans les 2 heures, et exceptionnellement sous 24 heures."]}),e.jsx("p",{className:"instruction",children:"Vérifiez vos informations de portefeuille avant de soumettre votre demande."})]})]})]})}export{re as default};
