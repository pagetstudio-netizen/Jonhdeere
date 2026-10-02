import { useMemo, useState } from "react";
import { Check, Search, X } from "lucide-react";
import "./_group.css";

const countries = [
  { code: "TG", name: "Togo", phonePrefix: "228" },
  { code: "BJ", name: "Bénin", phonePrefix: "229" },
  { code: "BF", name: "Burkina Faso", phonePrefix: "226" },
  { code: "CI", name: "Côte d’Ivoire", phonePrefix: "225" },
  { code: "CM", name: "Cameroun", phonePrefix: "237" },
];

function countryFlag(code: string) {
  return String.fromCodePoint(...Array.from(code.toUpperCase(), (letter) => 127397 + letter.charCodeAt(0)));
}

export function CountryPicker() {
  const [search, setSearch] = useState("");
  const [selectedCode, setSelectedCode] = useState("TG");
  const filteredCountries = useMemo(() => {
    const query = search.trim().toLowerCase();
    return countries.filter((country) =>
      !query
      || country.name.toLowerCase().includes(query)
      || country.phonePrefix.includes(query),
    );
  }, [search]);

  return (
    <main className="auth-redesign auth-picker-preview">
      <div className="auth-picker-preview-content" aria-hidden="true">
        <span className="auth-eyebrow">Espace sécurisé</span>
        <h1>Bienvenue chez<br />John Deere</h1>
        <span />
        <span />
        <span />
      </div>
      <div className="auth-picker-overlay">
        <section className="auth-picker-panel" role="dialog" aria-modal="true" aria-label="Choisir un pays">
          <header className="auth-picker-heading">
            <div>
              <p className="auth-picker-kicker">Indicatif téléphonique</p>
              <h2>Choisir un pays</h2>
              <p>Sélectionnez le pays associé à votre numéro.</p>
            </div>
            <button type="button" className="auth-picker-close" aria-label="Fermer">
              <X aria-hidden="true" />
            </button>
          </header>
          <label className="auth-picker-search">
            <Search aria-hidden="true" />
            <input
              autoFocus
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Rechercher un pays ou un indicatif"
              aria-label="Rechercher un pays"
            />
          </label>
          <div className="auth-picker-list">
            {filteredCountries.map((country) => {
              const selected = country.code === selectedCode;
              return (
                <button
                  type="button"
                  key={country.code}
                  className={`auth-picker-row${selected ? " is-selected" : ""}`}
                  onClick={() => setSelectedCode(country.code)}
                >
                  <span className="auth-picker-flag" aria-hidden="true">{countryFlag(country.code)}</span>
                  <span className="auth-picker-country">
                    <span className="auth-picker-name">{country.name}</span>
                    <span className="auth-picker-prefix">+{country.phonePrefix}</span>
                  </span>
                  {selected && <span className="auth-picker-check"><Check aria-hidden="true" /></span>}
                </button>
              );
            })}
            {filteredCountries.length === 0 && <p className="auth-picker-empty">Aucun pays correspondant.</p>}
          </div>
        </section>
      </div>
    </main>
  );
}