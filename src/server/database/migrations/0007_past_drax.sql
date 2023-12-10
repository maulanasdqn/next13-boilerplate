CREATE TABLE IF NOT EXISTS "app_payment_methods" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"provider_name" text NOT NULL,
	"name" text NOT NULL,
	"account_number" text NOT NULL,
	"created_date" date DEFAULT now() NOT NULL,
	"updated_date" date DEFAULT now() NOT NULL
);
