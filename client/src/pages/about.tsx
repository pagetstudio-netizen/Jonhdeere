import { ChevronLeft } from "lucide-react";
import { Link } from "wouter";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-full" style={{ background: "#111" }}>

      {/* Header */}
      <header className="flex items-center px-4 py-3" style={{ background: "#111", borderBottom: "1px solid #222" }}>
        <Link href="/account">
          <button className="p-1" data-testid="button-back">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
        </Link>
        <h1 className="flex-1 text-center text-base font-semibold text-white pr-6">À propos de nous</h1>
      </header>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5" style={{ color: "#d4d4d4", fontSize: 13.5, lineHeight: "1.75" }}>

        <p>
          John Deere est un fabricant mondial d’équipements agricoles et un producteur majeur de machines de construction et d’entretien des espaces verts.
        </p>

        <h2 className="text-base font-semibold text-white">Origines et histoire</h2>
        <p>
          L’entreprise a été fondée en 1837 à Grand Detour, dans l’Illinois, par le forgeron et innovateur John Deere (1804–1886). Il y a mis au point une charrue en acier autonettoyante, conçue pour labourer les sols collants des grandes plaines américaines. Le siège social de l’entreprise se trouve à Moline, dans l’Illinois, aux États-Unis.
        </p>

        <h2 className="text-base font-semibold text-white">Domaines d’activité</h2>
        <p>
          En agriculture et pour les espaces verts, John Deere propose notamment des tracteurs des séries 6M et 6R, des moissonneuses-batteuses, des semoirs de précision et des équipements de fenaison.
        </p>
        <p>
          Dans la construction et les travaux routiers, la gamme comprend des pelles et des chargeuses, ainsi que des solutions pour les chantiers routiers via des filiales spécialisées comme le groupe Wirtgen.
        </p>

        <h2 className="text-base font-semibold text-white">Agriculture de précision</h2>
        <p>
          Le John Deere Operations Center est une plateforme numérique gratuite qui permet de connecter et de gérer à distance les données agronomiques et les performances des machines.
        </p>

      </div>
    </div>
  );
}
