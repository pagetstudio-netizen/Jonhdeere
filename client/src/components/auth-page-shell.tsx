import type { ReactNode } from "react";
import "./auth-redesign.css";

interface AuthPageShellProps {
  cardTitle: string;
  cardDescription: string;
  children: ReactNode;
}

export function AuthPageShell({
  cardTitle,
  cardDescription,
  children,
}: AuthPageShellProps) {
  return (
    <main className="auth-redesign">
      <div className="auth-shell">
        <header className="auth-hero">
          <div className="auth-hero-copy">
            <span className="auth-eyebrow">Espace sécurisé</span>
            <h1>
              Bienvenue chez
              <strong>John Deere</strong>
            </h1>
            <p>Retrouvez votre compte et vos services en toute simplicité.</p>
          </div>
          <div className="auth-art">
            <img
              src="/john-deere/auth-zootopia.png"
              alt="Personnages de Zootopia"
            />
          </div>
        </header>

        <section className="auth-card">
          <div className="auth-card-heading">
            <h2>{cardTitle}</h2>
            <p>{cardDescription}</p>
          </div>
          {children}
          <p className="auth-footnote">Vos informations restent protégées.</p>
        </section>
      </div>
    </main>
  );
}