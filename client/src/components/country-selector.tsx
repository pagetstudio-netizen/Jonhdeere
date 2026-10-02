import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import type { ApiCountry } from "@/lib/countries";
import { Check, Search, X } from "lucide-react";
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
  const searchRef = useRef<HTMLInputElement>(null);
  const { data: apiCountries, isLoading, isError, refetch } = useQuery<ApiCountry[]>({
    queryKey: ["/api/countries"],
    enabled: open,
  });

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    searchRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [open]);

  if (!open) return null;

  const countries = (apiCountries || [])
    .filter(c => c.isActive)
    .map(c => ({ code: c.code, name: c.name, phonePrefix: c.phonePrefix }))
    .filter(country => {
      const query = search.trim().toLowerCase();
      return !query
        || country.name.toLowerCase().includes(query)
        || country.code.toLowerCase().includes(query)
        || country.phonePrefix.includes(query.replace(/^\+/, ""));
    });

  function handleDialogKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }
    if (event.key !== "Tab") return;

    const focusable = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled])',
      ),
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <div
      className="auth-picker-overlay"
      onClick={onClose}
      role="presentation"
    >
      <section
        className="auth-picker-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-country-dialog-title"
        onKeyDown={handleDialogKeyDown}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="auth-picker-heading">
          <div>
            <h2 id="auth-country-dialog-title">Choisir un pays</h2>
          </div>
          <button type="button" className="auth-picker-close" onClick={onClose} aria-label="Fermer">
            <X aria-hidden="true" />
          </button>
        </header>
        <label className="auth-picker-search">
          <Search aria-hidden="true" />
          <input
            ref={searchRef}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Rechercher un pays"
            aria-label="Rechercher un pays"
          />
        </label>
        <div className="auth-picker-list">
          {isLoading ? (
            <div className="auth-picker-skeleton" role="status" aria-label="Chargement des pays">
              {Array.from({ length: 5 }, (_, index) => (
                <span className="auth-picker-skeleton-row" key={index} />
              ))}
            </div>
          ) : isError ? (
            <div className="auth-picker-error" role="alert">
              <span>Impossible de charger les pays.</span>
              <button type="button" onClick={() => refetch()}>Réessayer</button>
            </div>
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