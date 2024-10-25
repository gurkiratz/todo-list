CREATE TABLE IF NOT EXISTS "org_memberships" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"orgId" uuid NOT NULL,
	"clerkUserId" text NOT NULL,
	"role" text DEFAULT 'member' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organizations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP INDEX IF EXISTS "clerkUserIdIndex";--> statement-breakpoint
ALTER TABLE "todos" ADD COLUMN "orgId" uuid NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_memberships" ADD CONSTRAINT "org_memberships_orgId_organizations_id_fk" FOREIGN KEY ("orgId") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "org_memberships_org_id_idx" ON "org_memberships" USING btree ("orgId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "org_memberships_clerk_user_id_idx" ON "org_memberships" USING btree ("clerkUserId");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "todos" ADD CONSTRAINT "todos_orgId_organizations_id_fk" FOREIGN KEY ("orgId") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "todos_clerk_user_id_idx" ON "todos" USING btree ("clerkUserId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "todos_org_id_idx" ON "todos" USING btree ("orgId");