import{j as e}from"./index-BrehqLDr.js";import{C as t,U as s}from"./_group-CwwzuDqH.js";import{c as r}from"./createLucideIcon-DoJ96-oR.js";const a=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"r6nss1"}]],o=r("house",a);const l=[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1",key:"1g98yp"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1",key:"6d4xhi"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1",key:"nxv5o0"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1",key:"1bb6yr"}]],p=r("layout-grid",l);const h=[["circle",{cx:"12",cy:"8",r:"5",key:"1hypcn"}],["path",{d:"M20 21a8 8 0 0 0-16 0",key:"rfgkzh"}]],d=r("user-round",h),f=[{title:"Service client",action:"En ligne",image:"/__mockup/images/service-client/telegram-support.png",href:"https://t.me/service_client",kind:"support"},{title:"Groupe officiel",action:"Rejoindre",image:"/__mockup/images/service-client/telegram-community.png",href:"https://t.me/groupe_officiel",kind:"community"},{title:"Chaîne officielle",action:"Rejoindre",image:"/__mockup/images/service-client/telegram-community.png",href:"https://t.me/chaine_officielle",kind:"community"}],x=[{label:"Accueil",Icon:o,active:!0},{label:"Équipe",Icon:s,active:!1},{label:"Appareils",Icon:p,active:!1},{label:"Moi",Icon:d,active:!1}];function u(){return e.jsxs("main",{className:"french-service-page",children:[e.jsx("style",{children:`
        .french-service-page {
          --service-orange: #f27620;
          --service-gray: #ededed;
          --service-muted: #8c8c8c;
          min-height: 100dvh;
          padding-bottom: calc(70px + env(safe-area-inset-bottom, 0px));
          overflow-x: hidden;
          background: var(--service-gray);
          color: #191919;
          font-family: Arial, "Helvetica Neue", sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        .french-service-page *,
        .french-service-page *::before,
        .french-service-page *::after { box-sizing: border-box; }
        .french-service-screen {
          width: min(100%, 512px);
          min-height: 100dvh;
          margin: 0 auto;
          background: var(--service-gray);
        }
        .french-service-titlebar {
          position: relative;
          display: flex;
          height: 49px;
          align-items: center;
          justify-content: center;
          background: var(--service-orange);
          color: #fff;
        }
        .french-service-titlebar h1 {
          margin: 0;
          font-size: 20px;
          font-weight: 700;
          line-height: 1;
          text-align: center;
        }
        .french-service-back {
          position: absolute;
          left: 11px;
          top: 50%;
          display: grid;
          width: 36px;
          height: 42px;
          place-items: center;
          color: #fff;
          transform: translateY(-50%);
          text-decoration: none;
          -webkit-tap-highlight-color: transparent;
        }
        .french-service-back svg { width: 27px; height: 27px; stroke-width: 1.8; }
        .french-service-main {
          display: flex;
          flex-direction: column;
          gap: 19px;
          padding: 20px 20px 30px;
        }
        .french-service-intro {
          display: flex;
          min-height: 114px;
          align-items: center;
          gap: 15px;
          border-radius: 7px;
          padding: 13px 20px;
          background: #fff;
        }
        .french-service-advisor {
          display: block;
          width: 72px;
          height: 72px;
          flex: 0 0 72px;
          border: 3px solid var(--service-orange);
          border-radius: 50%;
          object-fit: cover;
        }
        .french-service-intro-copy { min-width: 0; }
        .french-service-intro-copy p {
          margin: 0;
          font-size: 18px;
          line-height: 1.28;
          font-weight: 400;
        }
        .french-service-intro-copy p + p {
          margin-top: 10px;
          color: #858585;
          font-size: 16px;
        }
        .french-service-links {
          display: flex;
          flex-direction: column;
          gap: 19px;
        }
        .french-service-link {
          position: relative;
          display: grid;
          min-height: 142px;
          grid-template-columns: 88px minmax(0, 1fr);
          align-items: center;
          column-gap: 14px;
          border-radius: 6px;
          padding: 15px 20px 15px 27px;
          overflow: hidden;
          color: #fff;
          text-decoration: none;
          -webkit-tap-highlight-color: transparent;
          transition: filter 160ms ease, transform 160ms ease;
        }
        .french-service-link.support { background: #00c713; }
        .french-service-link.community { background: #06c0fd; }
        .french-service-link:hover { filter: brightness(.97); }
        .french-service-link:active { transform: scale(.99); }
        .french-service-telegram {
          display: block;
          width: 88px;
          height: 88px;
          border-radius: 50%;
          object-fit: cover;
        }
        .french-service-link-content {
          display: flex;
          min-width: 0;
          align-items: flex-end;
          flex-direction: column;
          gap: 23px;
        }
        .french-service-link-title {
          max-width: 100%;
          overflow-wrap: anywhere;
          font-size: 20px;
          font-weight: 400;
          line-height: 1.2;
          text-align: right;
        }
        .french-service-link-action {
          display: inline-flex;
          min-height: 33px;
          align-items: center;
          justify-content: center;
          gap: 6px;
          border: 2px solid rgba(255,255,255,.96);
          border-radius: 999px;
          padding: 2px 17px 3px;
          font-size: 16px;
          line-height: 1;
          white-space: nowrap;
        }
        .french-service-link-action svg { width: 13px; height: 13px; stroke-width: 2; }
        .french-service-nav {
          position: fixed;
          z-index: 5;
          right: 0;
          bottom: 0;
          left: 0;
          display: grid;
          height: calc(68px + env(safe-area-inset-bottom, 0px));
          grid-template-columns: repeat(4, minmax(0, 1fr));
          padding: 5px max(0px, calc((100vw - 512px) / 2)) env(safe-area-inset-bottom, 0px);
          border-top: 1px solid #dedede;
          background: rgba(255,255,255,.98);
        }
        .french-service-nav-item {
          display: flex;
          min-width: 0;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 2px;
          color: var(--service-muted);
          font-size: 14px;
          line-height: 1.1;
          text-decoration: none;
          -webkit-tap-highlight-color: transparent;
        }
        .french-service-nav-item.active { color: var(--service-orange); }
        .french-service-nav-item svg { width: 29px; height: 29px; stroke-width: 2.3; }
        .french-service-nav-item:first-child svg { stroke-width: 2.7; }
        .french-service-page a:focus-visible {
          outline: 3px solid #222;
          outline-offset: 3px;
        }
        @media (max-width: 420px) {
          .french-service-main { gap: 16px; padding: 16px 16px 26px; }
          .french-service-intro { gap: 12px; padding: 12px 14px; }
          .french-service-advisor { width: 64px; height: 64px; flex-basis: 64px; }
          .french-service-intro-copy p { font-size: 16px; }
          .french-service-intro-copy p + p { font-size: 14px; }
          .french-service-links { gap: 16px; }
          .french-service-link { min-height: 126px; grid-template-columns: 74px minmax(0, 1fr); column-gap: 12px; padding: 13px 14px 13px 18px; }
          .french-service-telegram { width: 74px; height: 74px; }
          .french-service-link-title { font-size: 17px; }
          .french-service-link-content { gap: 18px; }
          .french-service-link-action { min-height: 30px; padding-inline: 13px; font-size: 14px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .french-service-link { transition: none; }
        }
      `}),e.jsxs("div",{className:"french-service-screen",children:[e.jsxs("header",{className:"french-service-titlebar",children:[e.jsx("a",{href:"#",className:"french-service-back","aria-label":"Retour",children:e.jsx(t,{"aria-hidden":"true"})}),e.jsx("h1",{children:"Service client en ligne"})]}),e.jsxs("div",{className:"french-service-main",children:[e.jsxs("section",{className:"french-service-intro","aria-label":"Votre conseillère",children:[e.jsx("img",{className:"french-service-advisor",src:"/__mockup/images/service-client/support-agent.png",alt:"Votre conseillère du service client"}),e.jsxs("div",{className:"french-service-intro-copy",children:[e.jsx("p",{children:"Je suis votre conseillère dédiée au service client"}),e.jsx("p",{children:"Heureuse de vous aider."})]})]}),e.jsx("section",{className:"french-service-links","aria-label":"Liens officiels",children:f.map(i=>e.jsxs("a",{className:`french-service-link ${i.kind}`,href:i.href,target:"_blank",rel:"noreferrer","aria-label":`${i.title} — ${i.action}`,children:[e.jsx("img",{className:"french-service-telegram",src:i.image,alt:""}),e.jsxs("span",{className:"french-service-link-content",children:[e.jsx("span",{className:"french-service-link-title",children:i.title}),e.jsx("span",{className:"french-service-link-action",children:i.action})]})]},i.title))})]})]}),e.jsx("nav",{className:"french-service-nav","aria-label":"Navigation principale",children:x.map(({label:i,Icon:c,active:n})=>e.jsxs("a",{href:"#",className:`french-service-nav-item${n?" active":""}`,"aria-current":n?"page":void 0,children:[e.jsx(c,{"aria-hidden":"true",fill:i==="Accueil"||i==="Équipe"||i==="Appareils"||i==="Moi"?"currentColor":"none"}),e.jsx("span",{children:i})]},i))})]})}export{u as FrenchMatch};
