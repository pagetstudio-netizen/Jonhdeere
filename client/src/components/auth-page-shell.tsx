import type { ReactNode } from "react";
import "./auth-redesign.css";

interface AuthPageShellProps {
  children: ReactNode;
}

export function AuthPageShell({ children }: AuthPageShellProps) {
  return (
    <main className="auth-redesign">
      <div className="auth-shell">
        <header className="auth-hero">
          <div className="auth-hero-copy">
            <h1>
              Bienvenue chez
              <strong>John Deere</strong>
            </h1>
          </div>
          <div className="auth-art">
            <img
              src="/john-deere/auth-zootopia.png"
              alt=""
              aria-hidden="true"
            />
          </div>
        </header>

        <section className="auth-card" aria-label="Formulaire d’authentification">
          {children}
        </section>
      </div>
    </main>
  );
}