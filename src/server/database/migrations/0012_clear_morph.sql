ALTER TABLE "app_roles" ADD COLUMN "business_id" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_roles" ADD CONSTRAINT "app_roles_business_id_app_business_id_fk" FOREIGN KEY ("business_id") REFERENCES "app_business"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
