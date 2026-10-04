import{j as e}from"./index-BrehqLDr.js";/* empty css               */function n({date:s,amount:i,orderNumber:r,fees:t}){return e.jsxs("article",{className:"reference-history-card",children:[e.jsxs("div",{className:"reference-history-row reference-history-meta",children:[e.jsx("span",{children:s}),e.jsx("span",{children:"Transfert terminé"})]}),e.jsxs("div",{className:"reference-history-row reference-history-payment",children:[e.jsx("span",{children:"(+2****13)"}),e.jsx("strong",{children:i})]}),e.jsxs("div",{className:"reference-history-row",children:[e.jsx("span",{children:"Numéro de commande"}),e.jsx("strong",{title:r,children:r})]}),e.jsxs("div",{className:"reference-history-row",children:[e.jsx("span",{children:"Frais"}),e.jsx("strong",{children:t})]})]})}function a(){return e.jsxs("main",{className:"transaction-history-mockup transaction-history-reference",children:[e.jsx("style",{children:`
        .transaction-history-reference {
          min-height: 100vh;
          padding: 12px;
          background: #fbf9fb;
        }
        .reference-history-list {
          display: grid;
          gap: 12px;
        }
        .reference-history-card {
          display: flex;
          min-height: 204px;
          flex-direction: column;
          justify-content: space-between;
          border: 1px solid #efedf0;
          border-radius: 13px;
          padding: 15px 15px 14px;
          background: #fff;
          box-shadow: 0 2px 8px rgba(40, 34, 42, .06);
        }
        .reference-history-row {
          display: flex;
          min-height: 21px;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          color: #777;
          font-size: 13px;
          line-height: 1.35;
        }
        .reference-history-row > span {
          min-width: 0;
          flex: 1;
        }
        .reference-history-row > strong {
          min-width: 0;
          max-width: 65%;
          color: #679c7c;
          font-size: 13px;
          font-weight: 700;
          text-align: right;
          overflow-wrap: anywhere;
        }
        .reference-history-meta {
          color: #858585;
          font-size: 12px;
        }
        .reference-history-payment {
          color: #252525;
          font-size: 14px;
        }
        .reference-history-payment > strong {
          color: #679c7c;
          font-size: 15px;
        }
        @media (max-width: 370px) {
          .reference-history-card { padding-right: 11px; padding-left: 11px; }
          .reference-history-row { gap: 8px; font-size: 11px; }
          .reference-history-meta { font-size: 10px; }
          .reference-history-payment > strong { font-size: 13px; }
        }
      `}),e.jsxs("div",{className:"reference-history-list",children:[e.jsx(n,{date:"2025-12-26 16:16:46",amount:"$9800.00",orderNumber:"deqmsll-w-000843",fees:"490.00"}),e.jsx(n,{date:"2025-12-23 09:02:33",amount:"$12900.00",orderNumber:"deqmsll-w-000812",fees:"645.00"})]})]})}export{a as ReferenceMatch};
