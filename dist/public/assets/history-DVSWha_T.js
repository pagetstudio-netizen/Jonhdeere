import{a as R,r as T,c as d,j as e,g as z,L as C}from"./index-Did7w8ne.js";import{g as D}from"./countries-DOninoG6.js";import{E as h}from"./empty-state-Cn9KFlJL.js";import{C as I}from"./chevron-left-BaaLqrRM.js";const L=t=>[t.ashtechReference,t.ashtechTransactionId,t.sendavapayReference,t.inpayOrderNumber,t.omnipayId,t.soleaspayReference,t.soleaspayOrderId,t.westpayReference,t.inpayOutTradeNo,t.omnipayReference,t.reference].find(i=>typeof i=="string"&&i.trim())?.trim()||`Réf. interne #${t.id}`,F=t=>[t.inpayOrderNumber,t.omnipayId,t.inpayOutTradeNo,t.omnipayReference].find(i=>typeof i=="string"&&i.trim())?.trim()||`Réf. interne #${t.id}`,$=t=>{const r=new Date(t);return Number.isNaN(r.getTime())?"Date indisponible":new Intl.DateTimeFormat("fr-FR",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"}).format(r)},S=t=>{switch(t){case"completed":case"approved":return{label:"Versé avec succès",tone:"is-success"};case"rejected":case"failed":case"canceled":case"cancelled":return{label:"Échec bancaire",tone:"is-failure"};case"processing":return{label:"En cours",tone:"is-pending"};default:return{label:"En attente",tone:"is-pending"}}},_=new Set(["free_claim","earning","task_reward","signup_bonus","bonus","commission","deposit_commission","gift_code","staking_release"]);function p({code:t,createdAt:r,amount:i,status:l,currency:o,testId:c}){const n=S(l);return e.jsxs("article",{className:"history-card","data-testid":c,children:[e.jsxs("div",{className:"history-row",children:[e.jsx("span",{children:"Code :"}),e.jsx("strong",{className:"history-code",title:t,children:t})]}),e.jsxs("div",{className:"history-row",children:[e.jsx("span",{children:"Temps d’application :"}),e.jsx("strong",{children:$(r)})]}),e.jsxs("div",{className:"history-row",children:[e.jsx("span",{children:"Montant :"}),e.jsxs("strong",{children:[i," ",o]})]}),e.jsxs("div",{className:"history-row",children:[e.jsx("span",{children:"Statut :"}),e.jsxs("strong",{className:`history-status ${n.tone}`,children:[e.jsx("span",{className:"history-status-dot","aria-hidden":"true"}),n.label]})]})]})}function K(){const{user:t}=R(),[r,i]=T.useState("free"),{data:l=[]}=d({queryKey:["/api/countries"]}),o=t?D(t.country,l):null,c=o?.currency==="XOF"||o?.currency==="XAF"?"FCFA":o?.currency||"FCFA",n=s=>{const a=Number(s||0);return(Number.isFinite(a)?Math.round(a):0).toLocaleString("fr-FR")},{data:u=[],isLoading:m,isError:f}=d({queryKey:["/api/deposits/history"],enabled:!!t&&r==="deposits"}),{data:b=[],isLoading:w,isError:j}=d({queryKey:["/api/withdrawals/history"],enabled:!!t&&r==="withdrawals"}),{data:N=[],isLoading:v,isError:k}=d({queryKey:["/api/transactions"],enabled:!!t&&r==="free"});if(!t)return null;const g=N.filter(s=>_.has(s.type)).sort((s,a)=>new Date(a.createdAt).getTime()-new Date(s.createdAt).getTime()),y=[...u].sort((s,a)=>new Date(a.createdAt).getTime()-new Date(s.createdAt).getTime()),x=[...b].sort((s,a)=>new Date(a.createdAt).getTime()-new Date(s.createdAt).getTime()),A=r==="free"?v:r==="deposits"?m:w,E=r==="free"?k:r==="deposits"?f:j;return e.jsxs("main",{className:"history-page",children:[e.jsx("style",{children:`
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
      `}),e.jsxs("div",{className:"history-screen",children:[e.jsxs("header",{className:"history-header",children:[e.jsx(z,{href:"/account",children:e.jsx("button",{className:"history-back","data-testid":"button-back","aria-label":"Retour",children:e.jsx(I,{"aria-hidden":"true"})})}),e.jsx("h1",{className:"history-title",children:"Historique"})]}),e.jsxs("nav",{className:"history-tabs","aria-label":"Type d'enregistrement",children:[e.jsx("button",{type:"button",className:`history-tab ${r==="free"?"active":""}`,onClick:()=>i("free"),"aria-pressed":r==="free","data-testid":"tab-free-earnings",children:"Free Earnings"}),e.jsx("button",{type:"button",className:`history-tab ${r==="deposits"?"active":""}`,onClick:()=>i("deposits"),"aria-pressed":r==="deposits","data-testid":"tab-deposits",children:"Dépôt"}),e.jsx("button",{type:"button",className:`history-tab ${r==="withdrawals"?"active":""}`,onClick:()=>i("withdrawals"),"aria-pressed":r==="withdrawals","data-testid":"tab-withdrawals",children:"Retrait"})]}),e.jsx("section",{className:"history-content","aria-live":"polite",children:A?e.jsx("div",{className:"history-empty",children:e.jsx(C,{className:"animate-spin"})}):E?e.jsx("p",{className:"history-load-error",children:"Impossible de charger cet historique. Réessayez plus tard."}):r==="free"?g.length>0?e.jsx("div",{className:"history-list",children:g.map(s=>e.jsx(p,{testId:`free-earning-item-${s.id}`,code:`#${s.id}`,createdAt:s.createdAt,amount:`+${n(s.amount)}`,status:"approved",currency:c},s.id))}):e.jsx(h,{className:"history-empty",children:e.jsx("span",{children:"Plus de données"})}):r==="deposits"?y.length>0?e.jsx("div",{className:"history-list",children:y.map(s=>e.jsx(p,{testId:`deposit-item-${s.id}`,code:L(s),createdAt:s.createdAt,amount:n(s.amount),status:s.status,currency:c},s.id))}):e.jsx(h,{className:"history-empty",children:e.jsx("span",{children:"Plus de données"})}):x.length>0?e.jsx("div",{className:"history-list",children:x.map(s=>e.jsx(p,{testId:`withdrawal-item-${s.id}`,code:F(s),createdAt:s.createdAt,amount:n(s.amount),status:s.status,currency:c},s.id))}):e.jsx(h,{className:"history-empty",children:e.jsx("span",{children:"Plus de données"})})})]})]})}export{K as default};
