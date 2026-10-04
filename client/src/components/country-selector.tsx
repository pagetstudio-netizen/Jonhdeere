import { useEffect, useLayoutEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import type { ApiCountry } from "@/lib/countries";
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
  const [temporaryCountryCode, setTemporaryCountryCode] = useState(selectedCountryCode || "");
  const listRef = useRef<HTMLDivElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const scrollFrameRef = useRef<number | null>(null);
  const { data: apiCountries, isLoading, isError, refetch } = useQuery<ApiCountry[]>({
    queryKey: ["/api/countries"],
    enabled: open,
  });

  const countries = useMemo(
    () => (apiCountries || [])
      .filter((country) => country.isActive)
      .map((country) => ({
        code: country.code,
        name: country.name,
        phonePrefix: country.phonePrefix,
      }))
      .sort((first, second) => first.name.localeCompare(second.name, "fr")),
    [apiCountries],
  );

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    const body = document.body;
    const root = document.documentElement;
    const previousBodyOverflow = body.style.overflow;
    const previousRootOverflow = root.style.overflow;
    const previousBodyOverscroll = body.style.overscrollBehavior;
    const previousRootOverscroll = root.style.overscrollBehavior;
    body.style.overflow = "hidden";
    root.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";
    root.style.overscrollBehavior = "none";
    const focusFrame = window.requestAnimationFrame(() => cancelButtonRef.current?.focus());
    return () => {
      window.cancelAnimationFrame(focusFrame);
      body.style.overflow = previousBodyOverflow;
      root.style.overflow = previousRootOverflow;
      body.style.overscrollBehavior = previousBodyOverscroll;
      root.style.overscrollBehavior = previousRootOverscroll;
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
        scrollFrameRef.current = null;
      }
      previouslyFocused?.focus();
    };
  }, [open]);

  useLayoutEffect(() => {
    if (!open || isLoading || isError || countries.length === 0) return;
    const selectedCode = countries.some((country) => country.code === selectedCountryCode)
      ? selectedCountryCode!
      : countries[0].code;
    setTemporaryCountryCode(selectedCode);

    const list = listRef.current;
    if (!list) return;
    const selectedRow = Array.from(
      list.querySelectorAll<HTMLElement>("[data-country-code]"),
    ).find((row) => row.dataset.countryCode === selectedCode);
    if (!selectedRow) return;

    const listBounds = list.getBoundingClientRect();
    const rowBounds = selectedRow.getBoundingClientRect();
    list.scrollTop += rowBounds.top + rowBounds.height / 2 - (listBounds.top + listBounds.height / 2);
  }, [open, isLoading, isError, countries, selectedCountryCode]);

  if (!open) return null;

  function updateTemporarySelectionFromCenter() {
    const list = listRef.current;
    if (!list) return;
    if (scrollFrameRef.current !== null) {
      window.cancelAnimationFrame(scrollFrameRef.current);
    }
    scrollFrameRef.current = window.requestAnimationFrame(() => {
      scrollFrameRef.current = null;
      const currentList = listRef.current;
      if (!currentList) return;
      const center = currentList.getBoundingClientRect().top + currentList.clientHeight / 2;
      let closestCode = "";
      let closestDistance = Number.POSITIVE_INFINITY;
      currentList.querySelectorAll<HTMLElement>("[data-country-code]").forEach((row) => {
        const bounds = row.getBoundingClientRect();
        const distance = Math.abs(bounds.top + bounds.height / 2 - center);
        if (distance < closestDistance) {
          closestCode = row.dataset.countryCode || "";
          closestDistance = distance;
        }
      });
      if (closestCode) setTemporaryCountryCode(closestCode);
    });
  }

  function centerCountry(countryCode: string) {
    const list = listRef.current;
    if (!list) return;
    const row = Array.from(
      list.querySelectorAll<HTMLElement>("[data-country-code]"),
    ).find((item) => item.dataset.countryCode === countryCode);
    if (!row) return;
    const listBounds = list.getBoundingClientRect();
    const rowBounds = row.getBoundingClientRect();
    const offset = rowBounds.top + rowBounds.height / 2 - (listBounds.top + listBounds.height / 2);
    list.scrollTo({ top: list.scrollTop + offset, behavior: "smooth" });
  }

  function confirmSelection() {
    if (!countries.some((country) => country.code === temporaryCountryCode)) return;
    onSelect(temporaryCountryCode);
    onClose();
  }

  function handleDialogKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }
    if (event.key !== "Tab") return;

    const focusable = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(
        "button:not([disabled])",
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
          <button
            ref={cancelButtonRef}
            type="button"
            className="auth-picker-cancel"
            onClick={onClose}
            data-testid="country-picker-cancel"
          >
            Annuler
          </button>
          <h2 id="auth-country-dialog-title">Choisir un pays</h2>
          <button
            type="button"
            className="auth-picker-done"
            onClick={confirmSelection}
            disabled={!countries.some((country) => country.code === temporaryCountryCode)}
            data-testid="country-picker-done"
          >
            Terminé
          </button>
        </header>
        <div className="auth-picker-wheel">
          <div className="auth-picker-center-band" aria-hidden="true" />
          <div
            ref={listRef}
            className="auth-picker-list"
            onScroll={updateTemporarySelectionFromCenter}
            aria-label="Pays disponibles"
          >
            {isLoading ? (
              <div className="auth-picker-state" role="status">Chargement des pays…</div>
            ) : isError ? (
              <div className="auth-picker-state auth-picker-error" role="alert">
                <span>Impossible de charger les pays.</span>
                <button type="button" onClick={() => refetch()}>Réessayer</button>
              </div>
            ) : countries.length === 0 ? (
              <div className="auth-picker-state">
                <EmptyState size="compact" className="auth-picker-empty">
                  Aucun pays disponible
                </EmptyState>
              </div>
            ) : (
              <>
                <div className="auth-picker-edge-spacer" aria-hidden="true" />
                {countries.map((country) => {
                  const selected = country.code === temporaryCountryCode;
                  return (
                    <button
                      type="button"
                      key={country.code}
                      className={`auth-picker-row${selected ? " is-selected" : ""}`}
                      onClick={() => centerCountry(country.code)}
                      aria-pressed={selected}
                      data-country-code={country.code}
                      data-testid={`country-option-${country.code}`}
                    >
                      <span className="auth-picker-flag" aria-hidden="true">{countryFlag(country.code)}</span>
                      <span className="auth-picker-name">{country.name}</span>
                      <span className="auth-picker-prefix">+{country.phonePrefix}</span>
                    </button>
                  );
                })}
                <div className="auth-picker-edge-spacer" aria-hidden="true" />
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}