ALTER TABLE "app_customer_debts" ADD COLUMN "user_id" uuid;--> statement-breakpoint
ALTER TABLE "app_payment_methods" ADD COLUMN "user_id" uuid;--> statement-breakpoint
ALTER TABLE "app_product_categories" ADD COLUMN "user_id" uuid;--> statement-breakpoint
ALTER TABLE "app_products" ADD COLUMN "user_id" uuid;--> statement-breakpoint
ALTER TABLE "app_report_financials" ADD COLUMN "user_id" uuid;