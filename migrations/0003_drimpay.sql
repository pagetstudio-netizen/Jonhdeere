ALTER TABLE "deposits"
  ADD COLUMN IF NOT EXISTS "drimpay_reference" text,
  ADD COLUMN IF NOT EXISTS "drimpay_order_id" text;
--> statement-breakpoint
ALTER TABLE "withdrawals"
  ADD COLUMN IF NOT EXISTS "drimpay_reference" text,
  ADD COLUMN IF NOT EXISTS "drimpay_external_ref" text;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "deposits_drimpay_reference_idx"
  ON "deposits" ("drimpay_reference");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "deposits_drimpay_order_id_idx"
  ON "deposits" ("drimpay_order_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "withdrawals_drimpay_reference_idx"
  ON "withdrawals" ("drimpay_reference");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "withdrawals_drimpay_external_ref_idx"
  ON "withdrawals" ("drimpay_external_ref");