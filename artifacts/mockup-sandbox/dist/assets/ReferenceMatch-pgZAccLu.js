import{r as n,j as e}from"./index-BrehqLDr.js";/* empty css               */function a(){const[i,c]=n.useState(!1);return e.jsxs("main",{className:"reference-checkin",children:[e.jsx("style",{children:`
        .reference-checkin {
          --ink: #1c252e;
          --blue: #2d70c7;
          --label: #54758a;
          min-height: 100dvh;
          overflow: hidden;
          background: #fffefc;
          color: var(--ink);
          font-family: Inter, "Avenir Next", sans-serif;
          container-type: inline-size;
        }
        .reference-checkin *,
        .reference-checkin *::before,
        .reference-checkin *::after { box-sizing: border-box; }
        .reference-checkin .checkin-frame {
          position: relative;
          width: 100%;
          max-width: 576px;
          min-height: 100dvh;
          margin: 0 auto;
          overflow: hidden;
          background: #fffefc;
          isolation: isolate;
        }
        .reference-checkin .illustration {
          display: block;
          width: 100%;
          height: auto;
          aspect-ratio: 576 / 404;
          object-fit: cover;
        }
        .reference-checkin .back-link {
          position: absolute;
          z-index: 2;
          top: 0;
          left: 8.2%;
          display: grid;
          width: 14%;
          height: 5.5cqw;
          min-height: 28px;
          max-height: 32px;
          place-items: center;
          border-radius: 0 0 22px 22px;
          background: #2c70c6;
          color: #fff;
          text-decoration: none;
          transition: transform 160ms ease, opacity 160ms ease;
        }
        .reference-checkin .back-link:hover { opacity: .92; transform: translateY(2px); }
        .reference-checkin .back-link svg { width: 22px; height: 22px; stroke-width: 3.5; }
        .reference-checkin .cumulative-intro {
          position: relative;
          z-index: 1;
          height: 37.7cqw;
          margin-top: -5.73cqw;
          padding-top: 22.9cqw;
          background: #fff;
          text-align: center;
        }
        .reference-checkin .cumulative-total {
          margin: 0;
          color: #080808;
          font-size: clamp(23px, 6.25cqw, 36px);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -.045em;
        }
        .reference-checkin .cumulative-title {
          margin: 3.1cqw 0 0;
          color: #53565a;
          font-size: clamp(16px, 4.2cqw, 24px);
          font-weight: 400;
          line-height: 1.15;
        }
        .reference-checkin .stats-card {
          position: relative;
          z-index: 2;
          display: grid;
          width: 86.2%;
          height: 31.4cqw;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          align-items: start;
          margin: 11.7cqw auto 0;
          padding: 4.1cqw 2.8cqw 2.4cqw;
          border: 1px solid rgba(77, 110, 132, .08);
          border-radius: 5px;
          background: #fff;
          box-shadow: 0 3px 8px rgba(38, 65, 82, .17);
        }
        .reference-checkin .stat { min-width: 0; text-align: center; }
        .reference-checkin .stat-value {
          margin: 0;
          color: var(--blue);
          font-size: clamp(31px, 8cqw, 47px);
          font-weight: 800;
          letter-spacing: -.055em;
          line-height: 1;
          white-space: nowrap;
        }
        .reference-checkin .stat-value.is-secondary { font-weight: 400; }
        .reference-checkin .stat-value span {
          padding-left: .12em;
          font-size: .66em;
          letter-spacing: -.045em;
        }
        .reference-checkin .stat-label {
          max-width: 205px;
          margin: 3.1cqw auto 0;
          color: var(--label);
          font-size: clamp(11px, 2.3cqw, 14px);
          font-weight: 400;
          line-height: 1.65;
        }
        .reference-checkin .claim-button {
          display: flex;
          width: 82.3%;
          min-height: 52px;
          height: 13.5cqw;
          max-height: 78px;
          align-items: center;
          justify-content: center;
          gap: 9px;
          margin: 4.7cqw auto 5.5cqw;
          padding: 0 18px;
          border: 0;
          border-radius: 999px;
          background: #2e70c4;
          box-shadow: 0 3px 6px rgba(27, 82, 150, .18);
          color: #fff;
          cursor: pointer;
          font: inherit;
          font-size: clamp(20px, 5.65cqw, 33px);
          font-weight: 400;
          line-height: 1;
          transition: background-color 160ms ease, transform 160ms ease, box-shadow 160ms ease;
        }
        .reference-checkin .claim-button:hover {
          background: #245fae;
          box-shadow: 0 5px 10px rgba(27, 82, 150, .22);
          transform: translateY(-1px);
        }
        .reference-checkin .claim-button:active { transform: translateY(1px); }
        .reference-checkin .claim-button:focus-visible,
        .reference-checkin .back-link:focus-visible {
          outline: 3px solid #f4b33d;
          outline-offset: 3px;
        }
        .reference-checkin .claim-button.is-claimed { background: #367c2b; }
        .reference-checkin .claim-button svg { width: 23px; height: 23px; }
        @media (max-width: 402px) {
          .reference-checkin .stats-card { padding-right: 1.6cqw; padding-left: 1.6cqw; }
          .reference-checkin .stat-label { line-height: 1.45; }
        }
        @media (prefers-reduced-motion: reduce) {
          .reference-checkin .claim-button,
          .reference-checkin .back-link { transition: none; }
        }
      `}),e.jsxs("div",{className:"checkin-frame",children:[e.jsx("img",{className:"illustration",src:"/__mockup/images/checkin-reference/hero-art.jpg",alt:"Illustration d’un agent de terrain entouré d’appareils électroniques"}),e.jsx("a",{className:"back-link",href:"/","aria-label":"Retour à l’accueil",children:e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:e.jsx("path",{d:"m15 18-6-6 6-6"})})}),e.jsxs("section",{className:"cumulative-intro","aria-label":"Revenus cumulés",children:[e.jsx("p",{className:"cumulative-total",children:i?"350 FC":"0 FC"}),e.jsx("h1",{className:"cumulative-title",children:"Revenus cumulés"})]}),e.jsxs("section",{className:"stats-card","aria-label":"Détail des revenus",children:[e.jsxs("div",{className:"stat",children:[e.jsxs("p",{className:"stat-value",children:["350",e.jsx("span",{children:"FC"})]}),e.jsx("p",{className:"stat-label",children:"Revenus du check-in quotidien"})]}),e.jsxs("div",{className:"stat",children:[e.jsxs("p",{className:"stat-value is-secondary",children:[i?"350":"0",e.jsx("span",{children:"FC"})]}),e.jsx("p",{className:"stat-label",children:"Revenus cumulés"})]})]}),e.jsx("button",{className:`claim-button${i?" is-claimed":""}`,type:"button",onClick:()=>c(!0),disabled:i,"aria-live":"polite",children:i?e.jsxs(e.Fragment,{children:[e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.6",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:e.jsx("path",{d:"m5 12 4 4L19 6"})}),"Check-in effectué"]}):"Check-in"})]})]})}export{a as ReferenceMatch};
