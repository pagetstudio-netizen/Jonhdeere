export type TransactionOrderKind = "deposit" | "withdrawal" | "earning";

const KIND_CODES: Record<TransactionOrderKind, string> = {
  deposit: "d",
  withdrawal: "w",
  earning: "e",
};

export function getTransactionOrderNumber(kind: TransactionOrderKind, id: number): string {
  if (!Number.isSafeInteger(id) || id < 1) {
    throw new Error("Identifiant de transaction invalide.");
  }

  return `deqmsll-${KIND_CODES[kind]}-${String(id).padStart(6, "0")}`;
}