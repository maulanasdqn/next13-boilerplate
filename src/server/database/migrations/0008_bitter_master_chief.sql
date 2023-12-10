ALTER TABLE "app_report_transactions" DROP CONSTRAINT "app_report_transactions_payment_id_app_report_payments_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_report_transactions" ADD CONSTRAINT "app_report_transactions_payment_id_app_payment_methods_id_fk" FOREIGN KEY ("payment_id") REFERENCES "app_payment_methods"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "app_report_transactions" DROP COLUMN IF EXISTS "payment_method";