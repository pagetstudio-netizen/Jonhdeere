import { useLocation } from "wouter";

const navItems = [
  { path: "/",            label: "Accueil", icon: "/nav-home.png",    testId: "nav-accueil" },
  { path: "/my-products", label: "Revenu",  icon: "/nav-revenue.png", testId: "nav-revenus" },
  { path: "/team",        label: "Équipe",  icon: "/nav-team.png",    testId: "nav-equipe" },
  { path: "/account",     label: "Compte",  icon: "/nav-account.png", testId: "nav-moi" },
];

export default function BottomNav() {
  const [location, navigate] = useLocation();

  return (
    <nav
      className="bottom-nav fixed bottom-0 left-0 right-0 z-50 border-t bg-white shadow-[0_-2px_5px_rgba(0,0,0,.04)]"
      aria-label="Navigation principale"
      style={{ borderColor: "#e9e9e9" }}
    >
      <div className="mx-auto grid h-[68px] max-w-[512px] grid-cols-4 items-center">
        {navItems.map(({ path, label, icon, testId }) => {
          const isActive = location === path;

          return (
            <button
              key={label}
              onClick={() => {
                navigate(path);
                if (path === "/") {
                  window.dispatchEvent(new Event("home-tab-clicked"));
                }
              }}
              className="flex h-full min-w-0 flex-col items-center justify-center gap-[3px]"
              data-testid={testId}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="relative flex h-[31px] w-[31px] items-center justify-center">
                <span
                  className="bottom-nav-icon"
                  aria-hidden="true"
                  style={{
                    backgroundColor: isActive ? "#367c2b" : "#92969a",
                    WebkitMaskImage: `url(${icon})`,
                    maskImage: `url(${icon})`,
                  }}
                />
                {label === "Compte" && (
                  <span className="absolute -right-[5px] -top-[1px] grid h-[19px] min-w-[19px] place-items-center rounded-full bg-[#d7193f] px-[4px] text-[11px] font-medium leading-none text-white">
                    1
                  </span>
                )}
              </span>
              <span className="text-[12px] font-medium leading-none" style={{ color: isActive ? "#28633a" : "#7b7d80" }}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
