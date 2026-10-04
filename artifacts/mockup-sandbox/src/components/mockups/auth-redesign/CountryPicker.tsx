import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./_group.css";

const countries = [
  { code: "BF", name: "Burkina Faso", phonePrefix: "226" },
  { code: "BJ", name: "Bénin", phonePrefix: "229" },
  { code: "CM", name: "Cameroun", phonePrefix: "237" },
  { code: "CI", name: "Côte d’Ivoire", phonePrefix: "225" },
  { code: "FR", name: "France", phonePrefix: "33" },
  { code: "GH", name: "Ghana", phonePrefix: "233" },
  { code: "ML", name: "Mali", phonePrefix: "223" },
  { code: "NE", name: "Niger", phonePrefix: "227" },
  { code: "NG", name: "Nigeria", phonePrefix: "234" },
  { code: "SN", name: "Sénégal", phonePrefix: "221" },
  { code: "TG", name: "Togo", phonePrefix: "228" },
  { code: "GB", name: "Royaume-Uni", phonePrefix: "44" },
  { code: "US", name: "États-Unis", phonePrefix: "1" },
];

function countryFlag(code: string) {
  return String.fromCodePoint(...Array.from(code.toUpperCase(), (letter) => 127397 + letter.charCodeAt(0)));
}

export function CountryPicker() {
  const [selectedCode, setSelectedCode] = useState("TG");
  const [temporaryCode, setTemporaryCode] = useState("TG");
  const [isOpen, setIsOpen] = useState(true);
  const listRef = useRef<HTMLDivElement>(null);
  const scrollFrameRef = useRef<number | null>(null);
  const selectedCountry = countries.find((country) => country.code === selectedCode) || countries[0];

  useEffect(() => {
    if (!isOpen) return;
    const body = document.body;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";
    return () => {
      body.style.overflow = previousOverflow;
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
        scrollFrameRef.current = null;
      }
    };
  }, [isOpen]);

  useLayoutEffect(() => {
    if (!isOpen) return;
    setTemporaryCode(selectedCode);
    const list = listRef.current;
    if (!list) return;
    const row = Array.from(list.querySelectorAll<HTMLElement>("[data-country-code]"))
      .find((item) => item.dataset.countryCode === selectedCode);
    if (!row) return;
    const listBounds = list.getBoundingClientRect();
    const rowBounds = row.getBoundingClientRect();
    list.scrollTop += rowBounds.top + rowBounds.height / 2 - (listBounds.top + listBounds.height / 2);
  }, [isOpen, selectedCode]);

  function syncCenteredCountry() {
    if (scrollFrameRef.current !== null) {
      window.cancelAnimationFrame(scrollFrameRef.current);
    }
    scrollFrameRef.current = window.requestAnimationFrame(() => {
      scrollFrameRef.current = null;
      const list = listRef.current;
      if (!list) return;
      const center = list.getBoundingClientRect().top + list.clientHeight / 2;
      let closestCode = "";
      let closestDistance = Number.POSITIVE_INFINITY;
      list.querySelectorAll<HTMLElement>("[data-country-code]").forEach((row) => {
        const bounds = row.getBoundingClientRect();
        const distance = Math.abs(bounds.top + bounds.height / 2 - center);
        if (distance < closestDistance) {
          closestCode = row.dataset.countryCode || "";
          closestDistance = distance;
        }
      });
      if (closestCode) setTemporaryCode(closestCode);
    });
  }

  function centerCountry(code: string) {
    const list = listRef.current;
    if (!list) return;
    const row = Array.from(list.querySelectorAll<HTMLElement>("[data-country-code]"))
      .find((item) => item.dataset.countryCode === code);
    if (!row) return;
    const listBounds = list.getBoundingClientRect();
    const rowBounds = row.getBoundingClientRect();
    const offset = rowBounds.top + rowBounds.height / 2 - (listBounds.top + listBounds.height / 2);
    list.scrollTo({ top: list.scrollTop + offset, behavior: "smooth" });
  }

  function cancel() {
    setTemporaryCode(selectedCode);
    setIsOpen(false);
  }

  function confirm() {
    setSelectedCode(temporaryCode);
    setIsOpen(false);
  }

  return (
    <main className="auth-redesign auth-picker-preview">
      <div className="auth-picker-preview-content">
        <div className="auth-eyebrow">Espace sécurisé</div>
        <h1>Bienvenue chez<br />John Deere</h1>
        <div className="auth-picker-preview-field">
          <span className="auth-picker-preview-prefix">
            <span aria-hidden="true">{countryFlag(selectedCountry.code)}</span>
            +{selectedCountry.phonePrefix}
          </span>
          <span className="auth-picker-preview-number">Numéro de téléphone</span>
          <button type="button" onClick={() => {
            setTemporaryCode(selectedCode);
            setIsOpen(true);
          }}>
            Modifier
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="auth-picker-overlay" onClick={(event) => {
          if (event.target === event.currentTarget) cancel();
        }}>
        <section
          className="auth-picker-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="country-picker-title"
        >
          <header className="auth-picker-heading">
            <button type="button" className="auth-picker-cancel" onClick={cancel}>Annuler</button>
            <h2 id="country-picker-title">Choisir un pays</h2>
            <button type="button" className="auth-picker-done" onClick={confirm}>Terminé</button>
          </header>
          <div className="auth-picker-wheel">
            <div className="auth-picker-center-band" aria-hidden="true" />
            <div
              ref={listRef}
              className="auth-picker-list"
              onScroll={syncCenteredCountry}
              aria-label="Pays disponibles"
            >
              <div className="auth-picker-edge-spacer" aria-hidden="true" />
              {countries.map((country) => {
                const isSelected = country.code === temporaryCode;
                return (
                  <button
                    type="button"
                    key={country.code}
                    className={`auth-picker-row${isSelected ? " is-selected" : ""}`}
                    onClick={() => centerCountry(country.code)}
                    aria-pressed={isSelected}
                    data-country-code={country.code}
                  >
                    <span className="auth-picker-flag" aria-hidden="true">{countryFlag(country.code)}</span>
                    <span className="auth-picker-name">{country.name}</span>
                    <span className="auth-picker-prefix">+{country.phonePrefix}</span>
                  </button>
                );
              })}
              <div className="auth-picker-edge-spacer" aria-hidden="true" />
            </div>
          </div>
        </section>
        </div>
      )}
    </main>
  );
}