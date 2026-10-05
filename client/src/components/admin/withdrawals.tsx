import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Check, X, Search, Loader2, Send, RefreshCw } from "lucide-react";
import type { Withdrawal } from "@shared/schema";
import { getTransactionOrderNumber } from "@shared/transaction-order-number";
import EmptyState from "@/components/empty-state";

interface WithdrawalWithUser extends Withdrawal {
  user: {
    id: number;
    fullName: string;
    phone: string;
    country: string;
    isPromoter: boolean;
  };
}

export default function AdminWithdrawals() {
  const { toast } = useToast();
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "processing" | "approved" | "rejected">("pending");

  const { data: allWithdrawals, isLoading } = useQuery<WithdrawalWithUser[]>({
    queryKey: ["/api/admin/withdrawals"],
    queryFn: async () => {
      const res = await fetch(`/api/admin/withdrawals?status=all`, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch withdrawals");
      return res.json();
    },
  });

  const { data: platformSettings } = useQuery<Record<string, string>>({
    queryKey: ["/api/settings"],
  });
  const ppayprosPayoutEnabled = platformSettings?.ppayprosPayoutEnabled === "true";
  const drimpayPayoutCountries = (platformSettings?.drimpayPayoutCountries || "")
    .split(",")
    .map((code) => code.trim().toUpperCase())
    .filter(Boolean);

  const withdrawals = allWithdrawals?.filter(w =>
    statusFilter === "all" ? true : w.status === statusFilter
  );

  const [processingId, setProcessingId] = useState<number | null>(null);

  const processMutation = useMutation({
    mutationFn: async ({ id, action }: { id: number; action: "approve" | "reject" }) => {
      setProcessingId(id);
      const res = await fetch(`/api/admin/withdrawals/${id}/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `Erreur ${res.status}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/withdrawals"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      toast({ title: "Retrait traité !" });
    },
    onError: (error: any) => {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    },
    onSettled: () => setProcessingId(null),
  });

  const inpayMutation = useMutation({
    mutationFn: async (id: number) => {
      setProcessingId(id);
      const res = await fetch(`/api/admin/withdrawals/${id}/inpay`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `Erreur ${res.status}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/withdrawals"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      toast({ title: "Retrait envoyé à InPay" });
    },
    onError: (error: any) => {
      toast({ title: "Erreur InPay", description: error.message, variant: "destructive" });
    },
    onSettled: () => setProcessingId(null),
  });

  const ppayprosMutation = useMutation({
    mutationFn: async ({ id, checkStatus }: { id: number; checkStatus: boolean }) => {
      setProcessingId(id);
      const action = checkStatus ? "ppaypros/status" : "ppaypros";
      const res = await fetch(`/api/admin/withdrawals/${id}/${action}`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `Erreur ${res.status}`);
      return { data, checkStatus };
    },
    onSuccess: ({ data, checkStatus }) => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/withdrawals"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      if (checkStatus) {
        const status = data.status === "approved"
          ? "confirmé"
          : data.status === "rejected"
            ? "refusé"
            : "toujours en traitement";
        toast({ title: "Statut PPayPros vérifié", description: `Le retrait est ${status}.` });
      } else {
        toast({ title: "Retrait envoyé à PPayPros" });
      }
    },
    onError: (error: any) => {
      toast({ title: "Erreur PPayPros", description: error.message, variant: "destructive" });
    },
    onSettled: () => setProcessingId(null),
  });

  const drimpayMutation = useMutation({
    mutationFn: async ({ id, checkStatus }: { id: number; checkStatus: boolean }) => {
      setProcessingId(id);
      const action = checkStatus ? "drimpay/status" : "drimpay";
      const response = await fetch(`/api/admin/withdrawals/${id}/${action}`, {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || `Erreur ${response.status}`);
      return { data, checkStatus };
    },
    onSuccess: ({ data, checkStatus }) => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/withdrawals"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      if (checkStatus) {
        const status = data.status === "approved"
          ? "confirmé"
          : data.status === "rejected"
            ? "refusé"
            : "toujours en traitement";
        toast({ title: "Statut DrimPay vérifié", description: `Le retrait est ${status}.` });
      } else {
        toast({ title: "Retrait envoyé à DrimPay" });
      }
    },
    onError: (error: any) => {
      toast({ title: "Erreur DrimPay", description: error.message, variant: "destructive" });
    },
    onSettled: () => setProcessingId(null),
  });

  const filteredWithdrawals = withdrawals?.filter(w =>
    w.accountNumber.includes(filter) ||
    w.user.phone.includes(filter) ||
    w.user.fullName.toLowerCase().includes(filter.toLowerCase()) ||
    ((w as any).inpayOutTradeNo && (w as any).inpayOutTradeNo.toLowerCase().includes(filter.toLowerCase())) ||
    ((w as any).inpayOrderNumber && (w as any).inpayOrderNumber.toLowerCase().includes(filter.toLowerCase())) ||
    (w.omnipayReference && w.omnipayReference.toLowerCase().includes(filter.toLowerCase())) ||
    (w.drimpayReference && w.drimpayReference.toLowerCase().includes(filter.toLowerCase())) ||
    (w.drimpayExternalRef && w.drimpayExternalRef.toLowerCase().includes(filter.toLowerCase())) ||
    getTransactionOrderNumber("withdrawal", w.id).includes(filter.toLowerCase())
  ) || [];

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par numero ou nom..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto">
        {(["all", "pending", "processing", "approved", "rejected"] as const).map((status) => (
          <Button
            key={status}
            size="sm"
            variant={statusFilter === status ? "default" : "outline"}
            onClick={() => setStatusFilter(status)}
          >
            {status === "all"
              ? "Tous"
              : status === "pending"
                ? "En attente"
                : status === "processing"
                  ? "En traitement"
                  : status === "approved"
                    ? "Approuvés"
                    : "Rejetés"}
          </Button>
        ))}
      </div>

      <div className="space-y-3">
        {isLoading ? (
          Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-40" />)
        ) : filteredWithdrawals.length > 0 ? (
          filteredWithdrawals.map((withdrawal) => (
            <Card key={withdrawal.id}>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium text-foreground">{withdrawal.user.fullName}</p>
                      {withdrawal.user.isPromoter && <Badge className="text-xs">Promoteur</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {withdrawal.user.country.trim().toUpperCase() === "BJ" && "Téléphone du compte : "}
                      {withdrawal.user.phone}
                    </p>
                    <p className="text-sm text-muted-foreground">Pays: {withdrawal.user.country}</p>
                  </div>
                  <Badge variant={
                    withdrawal.status === "pending" ? "secondary" :
                    withdrawal.status === "processing" ? "outline" :
                    withdrawal.status === "approved" ? "default" : "destructive"
                  }>
                    {withdrawal.status === "pending"
                      ? "En attente"
                      : withdrawal.status === "processing"
                        ? "En traitement"
                        : withdrawal.status === "approved"
                          ? "Approuvé"
                          : "Rejeté"}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="col-span-2">
                    <p className="text-muted-foreground">Numéro de commande</p>
                    <p className="font-mono font-medium text-foreground">{getTransactionOrderNumber("withdrawal", withdrawal.id)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Montant demandé</p>
                    <p className="font-medium text-foreground">{withdrawal.amount.toLocaleString()} F</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Montant net</p>
                    <p className="font-medium text-primary">{withdrawal.netAmount.toLocaleString()} F</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Frais</p>
                    <p className="font-medium text-destructive">{withdrawal.fees.toLocaleString()} F</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Moyen</p>
                    <p className="font-medium text-foreground">{withdrawal.paymentMethod}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-muted-foreground">
                      {withdrawal.country.trim().toUpperCase() === "BJ"
                        ? "Numéro de réception du portefeuille choisi"
                        : "Numéro de réception"}
                    </p>
                    <p className="font-medium text-foreground">{withdrawal.accountNumber} - {withdrawal.accountName}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-muted-foreground">Date et heure</p>
                    <p className="font-medium text-foreground">
                      {new Date(withdrawal.createdAt).toLocaleDateString("fr-FR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric"
                      })} à {new Date(withdrawal.createdAt).toLocaleTimeString("fr-FR", {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </p>
                  </div>
                  {(withdrawal as any).inpayOutTradeNo && (
                    <div className="col-span-2">
                      <p className="text-muted-foreground">Référence marchand InPay</p>
                      <p className="font-mono font-medium text-foreground">{(withdrawal as any).inpayOutTradeNo}</p>
                    </div>
                  )}
                  {(withdrawal as any).inpayOrderNumber && (
                    <div className="col-span-2">
                      <p className="text-muted-foreground">N° commande InPay</p>
                      <p className="font-mono font-medium text-foreground">{(withdrawal as any).inpayOrderNumber}</p>
                    </div>
                  )}
                  {withdrawal.omnipayReference?.startsWith(`PPOUT-${withdrawal.id}`) && (
                    <div className="col-span-2">
                      <p className="text-muted-foreground">Référence marchand PPayPros</p>
                      <p className="font-mono font-medium text-foreground">{withdrawal.omnipayReference}</p>
                    </div>
                  )}
                  {withdrawal.omnipayId && withdrawal.omnipayReference?.startsWith(`PPOUT-${withdrawal.id}`) && (
                    <div className="col-span-2">
                      <p className="text-muted-foreground">Identifiant transfert PPayPros</p>
                      <p className="font-mono font-medium text-foreground">{withdrawal.omnipayId}</p>
                    </div>
                  )}
                  {withdrawal.drimpayReference && (
                    <div className="col-span-2">
                      <p className="text-muted-foreground">Référence DrimPay</p>
                      <p className="font-mono font-medium text-foreground">{withdrawal.drimpayReference}</p>
                    </div>
                  )}
                  {withdrawal.drimpayExternalRef && (
                    <div className="col-span-2">
                      <p className="text-muted-foreground">Référence externe DrimPay</p>
                      <p className="font-mono font-medium text-foreground">{withdrawal.drimpayExternalRef}</p>
                    </div>
                  )}
                </div>

                {withdrawal.status === "pending" && (
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => inpayMutation.mutate(withdrawal.id)}
                      disabled={processingId === withdrawal.id}
                      data-testid={`button-send-inpay-${withdrawal.id}`}
                    >
                      {processingId === withdrawal.id
                        ? <Loader2 className="w-4 h-4 animate-spin" />
                        : <><Send className="w-4 h-4 mr-1" /> Envoyer à InPay</>}
                    </Button>
                    {ppayprosPayoutEnabled && withdrawal.country.trim().toUpperCase() === "BJ" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => ppayprosMutation.mutate({ id: withdrawal.id, checkStatus: false })}
                        disabled={processingId === withdrawal.id}
                        data-testid={`button-send-ppaypros-${withdrawal.id}`}
                      >
                        {processingId === withdrawal.id
                          ? <Loader2 className="w-4 h-4 animate-spin" />
                          : <><Send className="w-4 h-4 mr-1" /> Envoyer à PPayPros</>}
                      </Button>
                    )}
                    {platformSettings?.drimpayPayoutEnabled === "true" &&
                      drimpayPayoutCountries.includes(withdrawal.country.trim().toUpperCase()) && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => drimpayMutation.mutate({ id: withdrawal.id, checkStatus: false })}
                          disabled={processingId === withdrawal.id}
                          data-testid={`button-send-drimpay-${withdrawal.id}`}
                        >
                          {processingId === withdrawal.id
                            ? <Loader2 className="w-4 h-4 animate-spin" />
                            : <><Send className="w-4 h-4 mr-1" /> Envoyer à DrimPay</>}
                        </Button>
                      )}
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => processMutation.mutate({ id: withdrawal.id, action: "approve" })}
                      disabled={processingId === withdrawal.id}
                      data-testid={`button-approve-${withdrawal.id}`}
                    >
                      {processingId === withdrawal.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Check className="w-4 h-4 mr-1" /> Valider</>}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => processMutation.mutate({ id: withdrawal.id, action: "reject" })}
                      disabled={processingId === withdrawal.id}
                      data-testid={`button-reject-${withdrawal.id}`}
                    >
                      <X className="w-4 h-4 mr-1" /> Rejeter
                    </Button>
                  </div>
                )}
                {withdrawal.status === "processing" &&
                  withdrawal.omnipayReference === `PPOUT-${withdrawal.id}` && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full"
                      onClick={() => ppayprosMutation.mutate({ id: withdrawal.id, checkStatus: true })}
                      disabled={processingId === withdrawal.id}
                      data-testid={`button-check-ppaypros-${withdrawal.id}`}
                    >
                      {processingId === withdrawal.id
                        ? <Loader2 className="w-4 h-4 animate-spin mr-1" />
                        : <><RefreshCw className="w-4 h-4 mr-1" /> Vérifier le statut PPayPros</>}
                    </Button>
                  )}
                {withdrawal.status === "processing" &&
                  (withdrawal.drimpayExternalRef || withdrawal.drimpayReference) && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full"
                      onClick={() => drimpayMutation.mutate({ id: withdrawal.id, checkStatus: true })}
                      disabled={processingId === withdrawal.id}
                      data-testid={`button-check-drimpay-${withdrawal.id}`}
                    >
                      {processingId === withdrawal.id
                        ? <Loader2 className="w-4 h-4 animate-spin mr-1" />
                        : <><RefreshCw className="w-4 h-4 mr-1" /> Vérifier le statut DrimPay</>}
                    </Button>
                  )}
              </CardContent>
            </Card>
          ))
        ) : (
          <EmptyState className="py-8">
            Aucun retrait trouvé
          </EmptyState>
        )}
      </div>
    </div>
  );
}
