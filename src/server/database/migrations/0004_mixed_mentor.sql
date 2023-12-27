CREATE TABLE IF NOT EXISTS "app_orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" uuid NOT NULL,
	"customer_id" uuid NOT NULL,
	"name" text NOT NULL,
	"price" bigint NOT NULL,
	"quantity" integer NOT NULL,
	"description" text NOT NULL,
	"created_date" date DEFAULT now() NOT NULL,
	"updated_date" date DEFAULT now() NOT NULL
);
