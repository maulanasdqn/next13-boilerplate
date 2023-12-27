CREATE TABLE IF NOT EXISTS "app_product_categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_date" date DEFAULT now() NOT NULL,
	"updated_date" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "app_products" ADD COLUMN "category_id" uuid;