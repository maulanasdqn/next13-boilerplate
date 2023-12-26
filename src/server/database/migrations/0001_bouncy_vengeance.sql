ALTER TABLE "app_customers" ADD COLUMN "phone_number" text;--> statement-breakpoint
ALTER TABLE "app_business" ADD CONSTRAINT "app_business_phone_number_unique" UNIQUE("phone_number");--> statement-breakpoint
ALTER TABLE "app_customers" ADD CONSTRAINT "app_customers_phone_number_unique" UNIQUE("phone_number");