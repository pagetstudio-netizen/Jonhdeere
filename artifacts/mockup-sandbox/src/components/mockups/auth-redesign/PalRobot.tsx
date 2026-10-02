import { useMemo, useState } from "react";
import { Check, ChevronDown, Code2, LockKeyhole, Search, X } from "lucide-react";
import "./_group.css";

const countries = [
  { code: "TG", name: "Togo", phonePrefix: "228" },
  { code: "BJ", name: "Bénin", phonePrefix: "229" },
  { code: "BF", name: "Burkina Faso", phonePrefix: "226" },
  { code: "CI", name: "Côte d’Ivoire", phonePrefix: "225" },
  { code: "CM", name: "Cameroun", phonePrefix: "237" },
];

type Country = (typeof countries)[number];

function countryFlag(code: string) {
  return String.fromCodePoint(...Array.from(code.toUpperCase(), (letter) => 127397 + letter.charCodeAt(0)));
}

function CountryDialog({
  selectedCountry,
  onClose,
  onSelect,
}: {
  selectedCountry: Country;
  onClose: () => void;
  onSelect: (country: Country) => void;
}) {
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
    <div className="auth-picker-overlay" onClick={onClose}>
      <section
        className="auth-picker-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Choisir un pays"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="auth-picker-heading">
          <div>
            <p className="auth-picker-kicker">Indicatif téléphonique</p>
            <h2>Choisir un pays</h2>
            <p>Le code sera ajouté à votre numéro.</p>
          </div>
          <button type="button" className="auth-picker-close" onClick={onClose} aria-label="Fermer">
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
            const selected = country.code === selectedCountry.code;
            return (
              <button
                type="button"
                key={country.code}
                className={`auth-picker-row${selected ? " is-selected" : ""}`}
                onClick={() => onSelect(country)}
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
  );
}

export function PalRobot() {
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <main className="auth-redesign">
      <div className="auth-shell">
        <header className="auth-hero">
          <div className="auth-hero-copy">
            <span className="auth-eyebrow">Espace sécurisé</span>
            <h1>Bienvenue chez <strong>John Deere</strong></h1>
            <p>Retrouvez votre compte et vos services en toute simplicité.</p>
          </div>
          <div className="auth-art">
            <img src="/__mockup/images/zootopia-auth.png" alt="Personnages de Zootopia" />
          </div>
        </header>

        <section className="auth-card">
          <div className="auth-card-heading">
            <h2>Créer un compte</h2>
            <p>Renseignez vos informations pour commencer.</p>
          </div>
          <form onSubmit={(event) => event.preventDefault()}>
            <input type="hidden" value={selectedCountry.code} readOnly />
            <div className="auth-fields">
              <div className="auth-field auth-phone-field">
                <button
                  type="button"
                  className="auth-country-button"
                  onClick={() => setPickerOpen(true)}
                  aria-haspopup="dialog"
                  aria-expanded={pickerOpen}
                  aria-label={`Pays : ${selectedCountry.name}, indicatif +${selectedCountry.phonePrefix}`}
                >
                  <span className="auth-country-label">Pays</span>
                  <span className="auth-country-value">
                    +{selectedCountry.phonePrefix}
                    <ChevronDown aria-hidden="true" />
                  </span>
                </button>
                <span className="auth-field-divider" aria-hidden="true" />
                <input type="tel" inputMode="tel" placeholder="Numéro de téléphone" aria-label="Numéro de téléphone" />
              </div>
              {selectedCountry.code === "BJ" && (
                <p className="auth-hint">Les 8 chiffres locaux sont complétés automatiquement avec 01.</p>
              )}
              <label className="auth-field">
                <LockKeyhole className="auth-field-icon" aria-hidden="true" />
                <input type="password" autoComplete="new-password" placeholder="Mot de passe" aria-label="Mot de passe" />
              </label>
              <label className="auth-field">
                <LockKeyhole className="auth-field-icon" aria-hidden="true" />
                <input type="password" autoComplete="new-password" placeholder="Confirmer le mot de passe" aria-label="Confirmer le mot de passe" />
              </label>
              <label className="auth-field">
                <Code2 className="auth-field-icon" aria-hidden="true" />
                <input placeholder="Code d’invitation" aria-label="Code d’invitation" />
              </label>
            </div>
            <button type="button" className="auth-switch">Déjà inscrit ? Se connecter</button>
            <button type="submit" className="auth-submit">Créer mon compte</button>
          </form>
          <p className="auth-footnote">Vos informations restent protégées.</p>
        </section>
      </div>

      {pickerOpen && (
        <CountryDialog
          selectedCountry={selectedCountry}
          onClose={() => setPickerOpen(false)}
          onSelect={(country) => {
            setSelectedCountry(country);
            setPickerOpen(false);
          }}
        />
      )}
    </main>
  );
}