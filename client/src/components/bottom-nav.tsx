import { useLocation } from "wouter";
import homeIcon from "@assets/nav-home-mask.png";
import revenueIcon from "@assets/nav-revenue-mask.png";
import teamIcon from "@assets/nav-team-mask.png";
import accountIcon from "@assets/nav-account-mask.png";

const navItems = [
  { path: "/",            label: "Accueil", icon: homeIcon,    testId: "nav-accueil" },
  { path: "/my-products", label: "Revenu",  icon: revenueIcon, testId: "nav-revenus" },
  { path: "/team",        label: "Équipe",  icon: teamIcon,    testId: "nav-equipe" },
  { path: "/account",     label: "Compte",  icon: accountIcon, testId: "nav-moi" },
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
                    backgroundColor: "#367c2b",
                    WebkitMaskImage: `url(${icon})`,
                    maskImage: `url(${icon})`,
                  }}
                />
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
