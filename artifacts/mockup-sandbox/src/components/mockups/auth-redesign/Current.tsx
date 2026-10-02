import { useMemo, useState } from "react";
import { Check, ChevronDown, Code2, LockKeyhole, Search, Square, X } from "lucide-react";
import "./_group.css";

const countries = [
  { code: "TG", name: "Togo", phonePrefix: "228" },
  { code: "BJ", name: "Bénin", phonePrefix: "229" },
  { code: "BF", name: "Burkina Faso", phonePrefix: "226" },
  { code: "CI", name: "Côte d’Ivoire", phonePrefix: "225" },
  { code: "CM", name: "Cameroun", phonePrefix: "237" },
];

export function Current() {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [search, setSearch] = useState("");
  const filteredCountries = useMemo(() => {
    const query = search.trim().toLowerCase();
    return countries.filter((country) =>
      !query
      || country.name.toLowerCase().includes(query)
      || country.phonePrefix.includes(query),
    );
  }, [search]);

  return (
    <main className="auth-reference auth-register">
      <div className="auth-screen">
        <section className="auth-panel">
          <h1 className="auth-title">REGISTER</h1>
          <form onSubmit={(event) => event.preventDefault()}>
            <input type="hidden" value={selectedCountry.code} readOnly />
            <div className="auth-fields">
              <div className="auth-field">
                <button
                  type="button"
                  className="auth-prefix"
                  onClick={() => setPickerOpen(true)}
                  aria-label="Choisir le pays"
                >
                  <Square aria-hidden="true" />
                  <span>+{selectedCountry.phonePrefix}</span>
                  <ChevronDown className="prefix-chevron" aria-hidden="true" />
                </button>
                <input type="tel" placeholder="Entrez le numéro de téléphone" aria-label="Numéro de téléphone" />
              </div>
              <div className="auth-field">
                <LockKeyhole className="auth-field-icon" aria-hidden="true" />
                <input type="password" placeholder="Entrez le mot de passe" aria-label="Mot de passe" />
              </div>
              <div className="auth-field">
                <LockKeyhole className="auth-field-icon" aria-hidden="true" />
                <input type="password" placeholder="Ressaisir le mot de passe" aria-label="Confirmer le mot de passe" />
              </div>
              <div className="auth-field">
                <Code2 className="auth-field-icon" aria-hidden="true" />
                <input placeholder="Code d'invitation" aria-label="Code d'invitation" />
              </div>
            </div>
            <button type="button" className="auth-switch">Aller à la connexion &gt;</button>
            <button type="submit" className="auth-submit">S'inscrire</button>
          </form>
        </section>
      </div>

      {pickerOpen && (
        <div className="country-picker-overlay" onClick={() => setPickerOpen(false)}>
          <section
            className="country-picker"
            role="dialog"
            aria-modal="true"
            aria-label="Choisir un pays"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="country-picker-close" onClick={() => setPickerOpen(false)} aria-label="Fermer">
              <X aria-hidden="true" />
            </button>
            <label className="country-picker-search">
              <Search aria-hidden="true" />
              <input
                autoFocus
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search"
                aria-label="Rechercher un pays"
              />
            </label>
            <div className="country-picker-list">
              {filteredCountries.map((country) => {
                const selected = country.code === selectedCountry.code;
                return (
                  <button
                    key={country.code}
                    className={`country-picker-row${selected ? " is-selected" : ""}`}
                    onClick={() => {
                      setSelectedCountry(country);
                      setSearch("");
                      setPickerOpen(false);
                    }}
                  >
                    <span>{country.name} (+{country.phonePrefix})</span>
                    {selected && <span className="country-picker-check"><Check aria-hidden="true" /></span>}
                  </button>
                );
              })}
              {filteredCountries.length === 0 && <p className="country-picker-empty">Aucun pays disponible</p>}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}