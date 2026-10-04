import{j as t}from"./index-BrehqLDr.js";/* empty css               */function o(s){switch(s){case"completed":case"approved":return{label:"Versé avec succès",tone:"is-success"};case"rejected":case"failed":case"canceled":case"cancelled":return{label:"Échec bancaire",tone:"is-failure"};case"processing":return{label:"En cours",tone:"is-pending"};default:return{label:"En attente",tone:"is-pending"}}}function c(s){return new Intl.DateTimeFormat("fr-FR",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"}).format(new Date(s))}function e({code:s,createdAt:n,amount:i,status:a}){const r=o(a);return t.jsxs("article",{className:"history-card",children:[t.jsxs("div",{className:"history-row",children:[t.jsx("span",{children:"Code :"}),t.jsx("strong",{className:"history-code",title:s,children:s})]}),t.jsxs("div",{className:"history-row",children:[t.jsx("span",{children:"Temps d’application :"}),t.jsx("strong",{children:c(n)})]}),t.jsxs("div",{className:"history-row",children:[t.jsx("span",{children:"Montant :"}),t.jsx("strong",{children:i})]}),t.jsxs("div",{className:"history-row",children:[t.jsx("span",{children:"Statut :"}),t.jsxs("strong",{className:`history-status ${r.tone}`,children:[t.jsx("span",{className:"history-status-dot","aria-hidden":"true"}),r.label]})]})]})}function h(){return t.jsxs("main",{className:"transaction-history-mockup transaction-history-current",children:[t.jsx("style",{children:`
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
      `}),t.jsxs("div",{className:"transaction-history-current-list",children:[t.jsx(e,{code:"deqmsll-w-000284",createdAt:"2025-12-26T16:16:46",amount:"9 800 FCFA",status:"approved"}),t.jsx(e,{code:"deqmsll-w-000281",createdAt:"2025-12-23T09:02:33",amount:"12 900 FCFA",status:"approved"})]})]})}export{h as Current};
