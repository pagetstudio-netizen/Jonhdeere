import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { ApiCountry } from "@/lib/countries";
import { Check, Loader2, Search, X } from "lucide-react";
import EmptyState from "@/components/empty-state";

function countryFlag(code: string) {
  return String.fromCodePoint(
    ...Array.from(code.toUpperCase(), (letter) => 127397 + letter.charCodeAt(0)),
  );
}

interface CountrySelectorProps {
  open: boolean;
  onClose: () => void;
  onSelect: (countryCode: string) => void;
  selectedCountryCode?: string;
}

export function CountrySelector({ open, onClose, onSelect, selectedCountryCode }: CountrySelectorProps) {
  const [search, setSearch] = useState("");
  const { data: apiCountries, isLoading, isError } = useQuery<ApiCountry[]>({
    queryKey: ["/api/countries"],
    enabled: open,
  });

  if (!open) return null;

  const countries = (apiCountries || [])
    .filter(c => c.isActive)
    .map(c => ({ code: c.code, name: c.name, phonePrefix: c.phonePrefix }))
    .filter(country => {
      const query = search.trim().toLowerCase();
      return !query || country.name.toLowerCase().includes(query) || country.phonePrefix.includes(query);
    });

  return (
    <div
      className="auth-picker-overlay"
      onClick={onClose}
      onKeyDown={(event) => {
        if (event.key === "Escape") onClose();
      }}
    >
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
          {isLoading ? (
            <div className="auth-picker-loading">
              <Loader2 className="animate-spin" aria-hidden="true" />
              <span>Chargement des pays...</span>
            </div>
          ) : isError ? (
            <p className="auth-picker-empty">Impossible de charger les pays.</p>
          ) : countries.map((country) => {
            const selected = country.code === selectedCountryCode;
            return (
              <button
                type="button"
                key={country.code}
                className={`auth-picker-row${selected ? " is-selected" : ""}`}
                onClick={() => { onSelect(country.code); setSearch(""); onClose(); }}
                aria-pressed={selected}
                data-testid={`country-option-${country.code}`}
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
          {!isLoading && !isError && countries.length === 0 && (
            <EmptyState size="compact" className="auth-picker-empty">
              Aucun pays disponible
            </EmptyState>
          )}
        </div>
      </section>
    </div>
  );
}