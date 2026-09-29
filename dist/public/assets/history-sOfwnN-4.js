import{a as q,F as T,b as O,r as R,j as e,e as B,L as k}from"./index-F5z3Jcuf.js";import{u as f}from"./useQuery-CIXjllfY.js";import{g as H}from"./countries-DOninoG6.js";import{b}from"./john-deere-assets-CD0119W0.js";import{C as M}from"./chevron-left-9A1wmXTq.js";import{R as K}from"./refresh-cw-0_nxpevC.js";const w="#43cf18",_="#f8f8ff",J=(s,i,c)=>{const r=new Date(c),a=String(r.getFullYear()).slice(2),d=String(r.getMonth()+1).padStart(2,"0"),l=String(r.getDate()).padStart(2,"0"),h=String(r.getHours()).padStart(2,"0"),g=String(r.getMinutes()).padStart(2,"0"),x=String(i).padStart(4,"0");return`sdk${a}${d}${l}${h}${g}${s}${x}`},A=s=>{const i=s.sendavapayReference||s.omnipayReference||s.omnipayId||s.soleaspayReference||s.soleaspayOrderId;return i?i.startsWith("sdk")?i:`sdk${i}`:J("D",s.id,s.createdAt)},Q=s=>s.length<=6?s:`${s.slice(0,2)}****${s.slice(-4)}`,j=s=>{const i=new Date(s),c=String(i.getDate()).padStart(2,"0"),r=String(i.getMonth()+1).padStart(2,"0"),a=i.getFullYear(),d=String(i.getHours()).padStart(2,"0"),l=String(i.getMinutes()).padStart(2,"0"),h=String(i.getSeconds()).padStart(2,"0");return`${c}/${r}/${a} ${d}:${l}:${h}`},D=s=>{switch(s){case"completed":case"approved":return{label:"Paiement réussi",color:w};case"rejected":return{label:"Paiement échoué",color:"#e33d3d"};case"processing":return{label:"En traitement",color:"#d98208"};default:return{label:"En attente...",color:"#d98208"}}},V=s=>{switch(s.type){case"bonus":return s.description==="Bonus quotidien"?"Bonus quotidien":s.description;case"signup_bonus":return"Bonus d'inscription";case"task_reward":return"Récompense";case"commission":return"Commission";case"deposit":return"Dépôt";default:return s.description}},p=({label:s,value:i})=>e.jsxs("div",{className:"history-row",children:[e.jsx("span",{children:s}),e.jsx("span",{children:i})]}),v=({label:s,color:i})=>e.jsx("span",{className:"history-status",style:{backgroundColor:i},children:s});function ee(){const{user:s,refreshUser:i}=q(),c=T(),{toast:r}=O(),[a,d]=R.useState("withdrawals"),[l,h]=R.useState(null),g=!!s?.isAdmin,x=s?H(s.country):null,m=x?.currency==="XOF"||x?.currency==="XAF"?"FCFA":x?.currency||"FCFA",{data:N=[],isLoading:C}=f({queryKey:["/api/deposits/history"]}),{data:S=[],isLoading:L}=f({queryKey:["/api/withdrawals/history"]}),{data:F=[],isLoading:z}=f({queryKey:["/api/transactions"]}),E=t=>(t.status==="pending"||t.status==="processing")&&!!(t.soleaspayReference||t.soleaspayOrderId||t.omnipayId||t.omnipayReference||t.sendavapayReference),I=async t=>{h(t);try{const n=await(await fetch(`/api/deposits/${t}/verify`,{credentials:"include"})).json();n.status==="approved"?(r({title:"Paiement confirmé",description:"Votre compte a été crédité"}),i(),c.invalidateQueries({queryKey:["/api/deposits/history"]})):n.status==="rejected"?(r({title:"Paiement échoué",description:"Le paiement a été refusé",variant:"destructive"}),c.invalidateQueries({queryKey:["/api/deposits/history"]})):r({title:"En cours",description:"Le paiement est toujours en attente"})}catch{r({title:"Erreur",description:"Impossible de vérifier le paiement",variant:"destructive"})}finally{h(null)}};if(!s)return null;const $=[...F,{id:-1,userId:s.id,type:"registration",amount:"0",description:"Inscription",createdAt:s.createdAt instanceof Date?s.createdAt.toISOString():String(s.createdAt)}].sort((t,o)=>new Date(o.createdAt).getTime()-new Date(t.createdAt).getTime()),P=a==="balance"?z:a==="deposits"?C:L;return e.jsxs("main",{className:"history-page",children:[e.jsx("style",{children:`
        .history-page {
          width: 100%;
          min-height: 100dvh;
          overflow-x: hidden;
          background: #fff;
          color: #101010;
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
          background: #fff;
        }
        .history-header {
          position: relative;
          display: flex;
          height: 66px;
          align-items: center;
          padding: 8px 20px 0;
        }
        .history-back {
          display: grid;
          width: 32px;
          height: 32px;
          place-items: center;
          border: 0;
          padding: 0;
          background: transparent;
          color: #171717;
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
          color: #111;
          font-size: 20px;
          font-weight: 700;
          line-height: 1;
          text-align: center;
        }
        .history-tabs {
          display: grid;
          grid-template-columns: 1fr 1fr 1.12fr;
          gap: 4px;
          align-items: center;
          min-height: 61px;
          padding: 4px 9px 13px;
        }
        .history-tab {
          display: flex;
          min-width: 0;
          height: 42px;
          align-items: center;
          justify-content: center;
          gap: 7px;
          border: 0;
          border-radius: 6px;
          padding: 0 7px;
          background: transparent;
          color: #333;
          font-size: 16px;
          font-weight: 400;
          line-height: 1;
          white-space: nowrap;
        }
        .history-tab.active {
          background: #242625;
          color: #fff;
          font-weight: 700;
        }
        .history-tab-arrow {
          width: 0;
          height: 0;
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
          border-left: 7px solid #111;
        }
        .history-tab-arrow.right {
          border-left-color: #e12626;
        }
        .history-tab-arrow.left {
          transform: rotate(180deg);
        }
        .history-content {
          min-height: calc(100dvh - 127px);
          padding: 9px 16px 40px;
          background: #fff;
        }
        .history-list {
          display: grid;
          gap: 20px;
        }
        .history-card {
          width: 100%;
          min-height: 146px;
          overflow: hidden;
          border-radius: 7px;
          padding: 10px 18px 11px;
          background: ${_};
          box-shadow: 0 1px 5px rgba(42, 44, 88, .045);
        }
        .history-card-top {
          display: flex;
          min-height: 29px;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }
        .history-amount {
          margin: 0;
          color: #111;
          font-size: 18px;
          font-weight: 700;
          line-height: 1.15;
        }
        .history-card-label {
          margin: 7px 0 0;
          color: #111;
          font-size: 16px;
          line-height: 1.15;
        }
        .history-status {
          display: inline-flex;
          min-height: 31px;
          align-items: center;
          flex: 0 0 auto;
          border-radius: 17px;
          padding: 0 10px;
          color: #fff;
          font-size: 13px;
          font-weight: 700;
          line-height: 1;
          white-space: nowrap;
        }
        .history-divider {
          height: 1px;
          margin: 13px 0 5px;
          background: #8d8d8d;
        }
        .history-row {
          display: flex;
          min-height: 21px;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          color: #111;
          font-size: 14px;
          line-height: 1.2;
        }
        .history-row > span:last-child {
          text-align: right;
          white-space: nowrap;
        }
        .history-empty {
          display: flex;
          min-height: 280px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: #999;
          font-size: 14px;
        }
        .history-empty img {
          width: 112px;
          height: 112px;
          object-fit: contain;
        }
        .history-verify {
          width: 100%;
          margin-top: 10px;
          border: 0;
          border-radius: 18px;
          padding: 9px 12px;
          background: ${w};
          color: #fff;
          font-size: 12px;
          font-weight: 700;
        }
        @media (max-width: 370px) {
          .history-header { height: 62px; padding-top: 6px; }
          .history-title { font-size: 19px; }
          .history-tabs { min-height: 58px; padding-bottom: 11px; }
          .history-tab { font-size: 14px; }
          .history-content { min-height: calc(100dvh - 120px); padding-right: 16px; padding-left: 16px; }
          .history-card { padding-right: 18px; padding-left: 18px; }
          .history-card-label { font-size: 15px; }
          .history-status { font-size: 12px; padding-right: 8px; padding-left: 8px; }
          .history-row { font-size: 13px; }
        }
      `}),e.jsxs("div",{className:"history-screen",children:[e.jsxs("header",{className:"history-header",children:[e.jsx(B,{href:"/account",children:e.jsx("button",{className:"history-back","data-testid":"button-back","aria-label":"Retour",children:e.jsx(M,{"aria-hidden":"true"})})}),e.jsx("h1",{className:"history-title",children:"Enregistrements de fonds"})]}),e.jsxs("nav",{className:"history-tabs","aria-label":"Type d'enregistrement",children:[e.jsxs("button",{className:`history-tab ${a==="balance"?"active":""}`,onClick:()=>d("balance"),"data-testid":"tab-balance",children:[e.jsx("span",{children:"Solde"}),e.jsx("span",{className:`history-tab-arrow ${a==="balance"?"right":"left"}`,"aria-hidden":"true"})]}),e.jsxs("button",{className:`history-tab ${a==="deposits"?"active":""}`,onClick:()=>d("deposits"),"data-testid":"tab-deposits",children:[e.jsx("span",{children:"Dépôt"}),e.jsx("span",{className:`history-tab-arrow ${a==="deposits"?"right":"left"}`,"aria-hidden":"true"})]}),e.jsxs("button",{className:`history-tab ${a==="withdrawals"?"active":""}`,onClick:()=>d("withdrawals"),"data-testid":"tab-withdrawals",children:[e.jsx("span",{children:"Retrait"}),e.jsx("span",{className:"history-tab-arrow right","aria-hidden":"true"})]})]}),e.jsx("section",{className:"history-content","aria-live":"polite",children:P?e.jsx("div",{className:"history-empty",children:e.jsx(k,{className:"animate-spin"})}):a==="balance"?$.length>0?e.jsx("div",{className:"history-list",children:$.map(t=>{const o=Number.parseFloat(t.amount||"0"),n=t.type==="registration";return e.jsxs("article",{className:"history-card","data-testid":`balance-item-${t.id}`,children:[e.jsxs("div",{className:"history-card-top",children:[e.jsxs("div",{children:[e.jsx("p",{className:"history-amount",children:n?"—":`+${m} ${o.toLocaleString("fr-FR")}`}),e.jsx("p",{className:"history-card-label",children:t.type==="deposit"?"Dépôt":t.description})]}),e.jsx(v,{label:"Paiement réussi",color:w})]}),e.jsx("div",{className:"history-divider"}),e.jsx(p,{label:"Type :",value:n?"Inscription":V(t)}),e.jsx(p,{label:"Heure :",value:j(t.createdAt)})]},`${t.type}-${t.id}`)})}):e.jsxs("div",{className:"history-empty",children:[e.jsx("img",{src:b,alt:"John Deere"}),e.jsx("span",{children:"Plus de données"})]}):a==="deposits"?N.length>0?e.jsx("div",{className:"history-list",children:N.map(t=>{const{label:o,color:n}=D(t.status),u=Number.parseFloat(t.amount),y=g?A(t):Q(A(t));return e.jsxs("article",{className:"history-card","data-testid":`deposit-item-${t.id}`,children:[e.jsxs("div",{className:"history-card-top",children:[e.jsxs("div",{children:[e.jsxs("p",{className:"history-amount",children:[m," ",u.toLocaleString("fr-FR")]}),e.jsx("p",{className:"history-card-label",children:"Montant du dépôt"})]}),e.jsx(v,{label:o,color:n})]}),e.jsx("div",{className:"history-divider"}),e.jsx(p,{label:"Numéro :",value:y}),e.jsx(p,{label:"Heure du dépôt :",value:j(t.createdAt)}),E(t)&&!t.sendavapayReference?e.jsxs("button",{className:"history-verify",onClick:()=>I(t.id),disabled:l===t.id,"data-testid":`button-verify-${t.id}`,children:[l===t.id?e.jsx(k,{className:"inline animate-spin"}):e.jsx(K,{className:"mr-1 inline h-3 w-3"}),"Vérifier la transaction"]}):null]},t.id)})}):e.jsxs("div",{className:"history-empty",children:[e.jsx("img",{src:b,alt:"John Deere"}),e.jsx("span",{children:"Plus de données"})]}):S.length>0?e.jsx("div",{className:"history-list",children:S.map(t=>{const{label:o,color:n}=D(t.status),u=Number.parseFloat(t.amount),y=Number.parseFloat(t.netAmount||t.amount);return e.jsxs("article",{className:"history-card","data-testid":`withdrawal-item-${t.id}`,children:[e.jsxs("div",{className:"history-card-top",children:[e.jsxs("div",{children:[e.jsxs("p",{className:"history-amount",children:[m," ",u.toLocaleString("fr-FR")]}),e.jsx("p",{className:"history-card-label",children:"Montant du retrait"})]}),e.jsx(v,{label:o,color:n})]}),e.jsx("div",{className:"history-divider"}),e.jsx(p,{label:"Montant reçu :",value:`${m} ${y.toLocaleString("fr-FR")}`}),e.jsx(p,{label:"Heure du retrait :",value:j(t.createdAt)})]},t.id)})}):e.jsxs("div",{className:"history-empty",children:[e.jsx("img",{src:b,alt:"John Deere"}),e.jsx("span",{children:"Plus de données"})]})})]})]})}export{ee as default};
