import "./_group.css";

export function Current() {
  return (
    <main className="checkin-mockup">
      <style>{`
        .checkin-mockup { background: #f4f4f4; }
        .checkin-screen {
          width: 100%;
          max-width: 500px;
          min-height: 100vh;
          margin: 0 auto;
          overflow: hidden;
          padding-bottom: 80px;
          background: #f4f4f4;
        }
        .current-hero {
          position: relative;
          height: min(61.4vw, 307px);
          min-height: 245px;
          overflow: hidden;
          background: #77cdeb;
        }
        .current-hero-art {
          position: absolute;
          inset: 0 0 auto;
          height: min(49.9vw, 250px);
          overflow: hidden;
        }
        .current-hero-art::after {
          position: absolute;
          z-index: 1;
          inset: 0;
          background: linear-gradient(180deg, rgba(34,151,219,.12), rgba(35,112,198,.2));
          content: "";
        }
        .current-hero-art img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
        .current-back {
          position: absolute;
          z-index: 3;
          top: 12px;
          left: 34px;
          display: grid;
          width: 68px;
          height: 39px;
          place-items: center;
          border: 0;
          border-radius: 22px;
          background: #3776cf;
          color: white;
        }
        .current-back svg { width: 23px; height: 23px; stroke-width: 4; }
        .current-title {
          position: absolute;
          z-index: 2;
          top: 30px;
          left: 0;
          width: 100%;
          margin: 0;
          color: white;
          font-size: 25px;
          font-weight: 400;
          line-height: 1;
          text-align: center;
          text-shadow: 0 1px 2px rgba(0,0,0,.1);
        }
        .current-avatar {
          position: absolute;
          z-index: 3;
          top: 73px;
          left: 50%;
          width: 126px;
          height: 126px;
          border: 4px solid white;
          border-radius: 50%;
          background: white url("/__mockup/images/checkin-current/logo.jpg") center / cover no-repeat;
          box-shadow: 0 2px 4px rgba(0,0,0,.12);
          transform: translateX(-50%);
        }
        .current-earnings {
          position: relative;
          z-index: 4;
          height: 298px;
          margin: -28px 16px 0;
          overflow: hidden;
          border-radius: 20px;
          background: white;
        }
        .current-earned-total {
          padding-top: 9px;
          color: #070707;
          font-size: 29px;
          font-weight: 800;
          line-height: 1.1;
          text-align: center;
        }
        .current-earned-heading {
          margin: 10px 0 0;
          color: #424242;
          font-size: 20px;
          line-height: 1;
          text-align: center;
        }
        .current-stats {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          margin-top: 78px;
        }
        .current-stat { text-align: center; }
        .current-stat-value {
          margin: 0;
          color: #2574cf;
          font-size: 35px;
          font-weight: 800;
          letter-spacing: -.8px;
          line-height: 1;
        }
        .current-stat-value span { padding-left: 4px; font-size: 23px; }
        .current-stat-value.secondary { font-weight: 400; }
        .current-stat-label {
          margin: 15px 6px 0;
          color: #3471a1;
          font-size: 13px;
          font-weight: 500;
          line-height: 1.35;
        }
        .current-claim {
          display: flex;
          width: calc(100% - 96px);
          height: 62px;
          align-items: center;
          justify-content: center;
          margin: 14px 48px 0;
          border: 0;
          border-radius: 34px;
          background: #367c2b;
          color: white;
          font-size: 26px;
          font-weight: 400;
        }
        @media (max-width: 360px) {
          .current-back { left: 20px; }
          .current-title { font-size: 22px; }
          .current-avatar { width: 112px; height: 112px; }
          .current-earnings { margin-right: 10px; margin-left: 10px; }
          .current-claim { width: calc(100% - 64px); margin-right: 32px; margin-left: 32px; }
          .current-stat-label { font-size: 11px; }
        }
      `}</style>
      <div className="checkin-screen">
        <section className="current-hero" aria-label="Check-in quotidien">
          <div className="current-hero-art">
            <img src="/__mockup/images/checkin-current/field-team.jpg" alt="" />
          </div>
          <button className="current-back" aria-label="Retour">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <h1 className="current-title">Check-in</h1>
          <div className="current-avatar" aria-hidden="true" />
        </section>
        <section className="current-earnings" aria-label="Revenus du check-in">
          <p className="current-earned-total">0 XOF</p>
          <p className="current-earned-heading">Revenus cumulés</p>
          <div className="current-stats">
            <div className="current-stat">
              <p className="current-stat-value">50<span>XOF</span></p>
              <p className="current-stat-label">Revenus du check-in quotidien</p>
            </div>
            <div className="current-stat">
              <p className="current-stat-value secondary">0<span>XOF</span></p>
              <p className="current-stat-label">Revenus cumulés</p>
            </div>
          </div>
        </section>
        <button className="current-claim">Check-in</button>
      </div>
    </main>
  );
}