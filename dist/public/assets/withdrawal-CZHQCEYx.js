import{a as A,b as E,N as P,r as l,u as $,c as u,j as e,L as j,g as y,e as D}from"./index-Cvv3Aoac.js";import{u as V}from"./useMutation-CQzrIuDx.js";import{g as K}from"./countries-DOninoG6.js";import{C as O}from"./chevron-right-XcAmqY4U.js";const N="/assets/t%C3%A9l%C3%A9chargement_(80)_1787363581764-DIwCG-l1.png";function G(){const{user:s,refreshUser:k}=A(),{toast:a}=E(),z=P(),[n,x]=l.useState(""),[r,f]=l.useState(null),[,C]=$(),g=(s?K(s.country):null)?.currency||"XOF",d=g==="FCFA"?"XOF":g,{data:c}=u({queryKey:["/api/settings/withdrawal"]}),h=c?.minWithdrawal??1500,p=c?.withdrawalFees??18,m=c?.withdrawalStartHour??9,b=c?.withdrawalEndHour??17,S=n?Math.floor(Number(n)*(1-p/100)):0,v=new Date().getHours(),F=v>=m&&v<b,{data:i=[],isLoading:I}=u({queryKey:["/api/wallets"]}),{data:R=[]}=u({queryKey:["/api/user/products"]}),W=R.some(t=>t.status==="active");l.useEffect(()=>{const t=localStorage.getItem("selectedWalletId");if(t&&i.length>0){const o=i.find(M=>M.id===parseInt(t));o&&f(o),localStorage.removeItem("selectedWalletId")}},[i]),l.useEffect(()=>{if(!r&&i.length>0){const t=i.find(o=>o.isDefault);t&&f(t)}},[i,r]);const w=V({mutationFn:async t=>(await D("POST","/api/withdrawals",t)).json(),onSuccess:()=>{a({title:"Demande envoyée",description:"Votre demande de retrait a été envoyée."}),k(),z.invalidateQueries({queryKey:["/api/withdrawals"]}),x("")},onError:t=>a({title:"Erreur",description:t.message,variant:"destructive"})}),L=()=>{if(!F){a({title:"Horaires de retrait",description:`Les retraits sont disponibles de ${m}h à ${b}h`,variant:"destructive"});return}if(!W){a({title:"Produit requis",description:"Vous devez avoir un produit actif pour effectuer un retrait",variant:"destructive"});return}if(!n||n<h){a({title:"Montant invalide",description:`Le montant minimum est de ${h} ${d}`,variant:"destructive"});return}if(!r){a({title:"Compte requis",description:"Veuillez sélectionner un compte bancaire",variant:"destructive"});return}w.mutate({amount:Number(n),walletId:r.id})};if(I)return e.jsx("div",{className:"min-h-screen bg-white flex items-center justify-center",children:e.jsx(j,{className:"w-8 h-8 animate-spin text-[#00CC2C]"})});if(!s)return null;const q=parseFloat(s?.balance||"0"),H=i.length>0;return e.jsxs("main",{className:"withdraw-reference min-h-screen bg-[#f7f4f2]",children:[e.jsx("style",{children:`
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
      `}),e.jsxs("div",{className:"withdraw-screen",children:[e.jsxs("section",{className:"withdraw-hero","aria-label":"Retrait",children:[e.jsxs("div",{className:"hero-art","aria-hidden":"true",children:[e.jsx("div",{className:"hero-pattern"}),e.jsx("span",{className:"receipt-icon"})]}),e.jsx("h1",{className:"withdraw-title",children:"Retrait"}),e.jsx(y,{href:"/history",children:e.jsx("button",{className:"history-button","aria-label":"Historique des transactions",children:e.jsx("span",{className:"history-icon","aria-hidden":"true"})})}),e.jsx(y,{href:"/account",children:e.jsx("button",{className:"withdraw-back","data-testid":"button-back","aria-label":"Retour"})}),e.jsxs("div",{className:"balance-card",children:[e.jsx("p",{className:"balance-label",children:"Solde du compte"}),e.jsxs("p",{className:"balance-value","data-testid":"text-balance",children:[Math.round(q).toLocaleString("fr-FR"),e.jsx("span",{children:d})]}),e.jsx("div",{className:"wallet-mark","aria-hidden":"true",children:e.jsx("img",{src:N,alt:""})})]})]}),e.jsxs("section",{className:"amount-panel","aria-label":"Montant de retrait",children:[e.jsx("p",{className:"amount-label",children:"Veuillez saisir le montant de retrait"}),e.jsxs("label",{className:"amount-field",children:[e.jsx("input",{type:"number",value:n,onChange:t=>x(t.target.value?Number(t.target.value):""),placeholder:"montant","data-testid":"input-withdrawal-amount","aria-label":"Montant de retrait"}),e.jsx("span",{className:"amount-currency",children:d})]}),e.jsxs("div",{className:"amount-details",children:[e.jsxs("span",{children:["Montant reçu: ",S.toLocaleString("fr-FR")]}),e.jsxs("span",{children:["Taxe: ",p.toFixed(2),"%"]})]})]}),e.jsxs("button",{onClick:()=>C(H?"/wallet?from=withdrawal":"/wallet"),className:"wallet-choice","data-testid":"button-select-wallet",children:[e.jsx("img",{src:N,alt:""}),e.jsx("span",{className:"wallet-copy",children:r?`${r.accountName} · ${r.accountNumber}`:"Choisissez votre portefeuille"}),e.jsx(O,{"aria-hidden":"true"})]}),e.jsx("button",{onClick:L,disabled:w.isPending,className:"submit","data-testid":"button-submit-withdrawal",children:w.isPending?e.jsx(j,{className:"h-5 w-5 animate-spin"}):"Retirez votre argent maintenant"}),e.jsxs("section",{className:"instructions","aria-label":"Instructions de retrait",children:[e.jsx("h2",{className:"instructions-title",children:"Instructions de Retrait :"}),e.jsxs("p",{className:"instruction",children:[e.jsx("strong",{children:"Montant minimum de retrait :"})," ",h.toLocaleString("fr-FR")," ",d]}),e.jsxs("p",{className:"instruction",children:[e.jsx("strong",{children:"Retraits possibles à tout moment,"})," sans limite de temps, de montant ou de fréquence"]}),e.jsxs("p",{className:"instruction",children:[e.jsx("strong",{children:"Frais de retrait :"})," ",p," % par transaction"]}),e.jsxs("p",{className:"instruction",children:[e.jsx("strong",{children:"Délai de traitement :"})," généralement dans les 2 heures, et exceptionnellement sous 24 heures."]}),e.jsx("p",{className:"instruction",children:"Vérifiez vos informations de portefeuille avant de soumettre votre demande."})]})]})]})}export{G as default};
