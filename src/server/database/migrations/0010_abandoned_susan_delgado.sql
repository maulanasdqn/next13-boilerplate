ALTER TABLE "app_report_transactions" DROP CONSTRAINT "app_report_transactions_customer_id_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_report_transactions" ADD CONSTRAINT "app_report_transactions_customer_id_app_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "app_customers"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
