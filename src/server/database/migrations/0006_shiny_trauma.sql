ALTER TABLE "app_customer_debts" RENAME COLUMN "user_id" TO "customer_id";--> statement-breakpoint
ALTER TABLE "app_customer_debts" DROP CONSTRAINT "app_customer_debts_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "app_report_payments" ADD COLUMN "customer_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "app_report_transactions" ADD COLUMN "customer_id" uuid NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_customer_debts" ADD CONSTRAINT "app_customer_debts_customer_id_app_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "app_customers"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_report_payments" ADD CONSTRAINT "app_report_payments_customer_id_app_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "app_customers"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_report_transactions" ADD CONSTRAINT "app_report_transactions_customer_id_user_id_fk" FOREIGN KEY ("customer_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
