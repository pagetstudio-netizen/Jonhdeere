import{j as e}from"./index-BrehqLDr.js";/* empty css               */const l={totalEarnings:0},p=[{id:1,purchasedAt:"2025-08-27T08:55:17.000Z",daysRemaining:60,totalEarned:0,status:"active",product:{name:"Tracteur 4066R",imageUrl:"/__mockup/images/revenue-page/4066r-tractor.webp",price:25e3,dailyEarnings:2e3,totalReturn:18e4,cycleDays:90}}],u="/__mockup/images/revenue-page/4066r-tractor.webp";function a(n){return(Number(n)||0).toLocaleString("fr-FR")}function m(n){const r=new Date(n);if(Number.isNaN(r.getTime()))return"—";const i=String(r.getMonth()+1).padStart(2,"0"),t=String(r.getDate()).padStart(2,"0"),s=r.getFullYear(),d=String(r.getHours()).padStart(2,"0"),o=String(r.getMinutes()).padStart(2,"0"),c=String(r.getSeconds()).padStart(2,"0");return`${i}/${t}/${s} ${d}:${o}:${c}`}function _(){const n=p[0],r=n.product?.cycleDays,i=Math.max(0,r-n.daysRemaining);return e.jsxs("main",{className:"jd-revenue",children:[e.jsx("style",{children:`
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
          font-family: "Inter", Arial, sans-serif;
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
          min-height: 138px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px 18px 25px;
          background: var(--jd-green);
          color: #fff;
          text-align: center;
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
      `}),e.jsxs("div",{className:"jd-revenue__screen",children:[e.jsxs("header",{className:"jd-revenue__total","aria-label":"Revenus totaux",children:[e.jsxs("p",{className:"jd-revenue__amount",children:["FCFA ",a(l.totalEarnings)]}),e.jsx("p",{className:"jd-revenue__total-label",children:"Revenus totaux"})]}),e.jsxs("section",{className:"jd-revenue__notice","aria-label":"Informations sur les revenus",children:[e.jsxs("p",{className:"jd-revenue__notice-main",children:[e.jsx("span",{className:"jd-revenue__info-mark","aria-hidden":"true",children:"i"}),e.jsx("span",{children:"Les revenus des produits sont réglés toutes les 24 heures"})]}),e.jsx("p",{className:"jd-revenue__notice-sub",children:"Vous pouvez acheter plusieurs appareils pour augmenter vos revenus"})]}),e.jsx("section",{className:"jd-revenue__content","aria-label":"Produits achetés",children:e.jsxs("article",{className:"jd-revenue__card",children:[e.jsx("div",{className:"jd-revenue__date-wrap",children:e.jsx("time",{className:"jd-revenue__date",dateTime:n.purchasedAt,children:m(n.purchasedAt)})}),e.jsxs("div",{className:"jd-revenue__metrics",children:[e.jsxs("div",{className:"jd-revenue__metric",children:[e.jsxs("span",{className:"jd-revenue__metric-value",children:["FCFA ",a(n.product?.dailyEarnings)]}),e.jsx("span",{className:"jd-revenue__metric-label",children:"Revenus quotidiens"})]}),e.jsxs("div",{className:"jd-revenue__metric",children:[e.jsxs("span",{className:"jd-revenue__metric-value",children:["FCFA ",a(n.totalEarned)]}),e.jsx("span",{className:"jd-revenue__metric-label",children:"Revenus totaux"})]})]}),e.jsxs("div",{className:"jd-revenue__product",children:[e.jsx("img",{className:"jd-revenue__image",src:n.product?.imageUrl,alt:n.product?.name,onError:t=>{t.currentTarget.onerror=null,t.currentTarget.src=u}}),e.jsxs("div",{className:"jd-revenue__product-copy",children:[e.jsx("h2",{className:"jd-revenue__product-name",children:n.product?.name}),e.jsxs("p",{className:"jd-revenue__duration",children:["Durée : ",i,"/",r," Jours"]})]})]}),e.jsxs("footer",{className:"jd-revenue__footer",children:["Revenus reçus : FCFA ",a(n.totalEarned)]})]})})]})]})}export{_ as ReferenceMatch};
