import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { JOHN_DEERE_LOGO } from "@/lib/john-deere-assets";

interface AboutModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AboutModal({ open, onClose }: AboutModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center overflow-hidden">
              <img src={JOHN_DEERE_LOGO} alt="John Deere" className="w-10 h-10 object-contain" />
            </div>
            À propos de John Deere
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
            John Deere, fondée en 1837 à Grand Detour dans l’Illinois, est un fabricant mondial d’équipements agricoles et un producteur majeur de machines de construction et d’entretien des espaces verts.
          </p>
          <p>
            Son siège social se trouve à Moline, dans l’Illinois. Ses activités incluent les tracteurs, les moissonneuses-batteuses, les semoirs de précision, les équipements de fenaison et les machines de construction.
          </p>
          <div className="bg-secondary rounded-lg p-4 space-y-2">
            <h4 className="font-medium text-foreground">Nos avantages :</h4>
            <ul className="space-y-1">
              <li>- Revenus quotidiens automatiques</li>
              <li>- Équipements agricoles et de construction</li>
              <li>- Système de parrainage attractif</li>
              <li>- Support client disponible</li>
            </ul>
          </div>
          <p className="text-xs">
            Version 1.0.0 - Tous droits réservés
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
