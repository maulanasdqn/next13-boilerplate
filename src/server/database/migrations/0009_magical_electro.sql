ALTER TABLE "app_report_transactions" RENAME COLUMN "item_id" TO "product_id";--> statement-breakpoint
ALTER TABLE "app_report_transactions" DROP CONSTRAINT "app_report_transactions_item_id_app_products_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_report_transactions" ADD CONSTRAINT "app_report_transactions_product_id_app_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "app_products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
