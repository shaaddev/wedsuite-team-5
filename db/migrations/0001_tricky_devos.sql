CREATE TABLE "vendors" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"category" varchar(100) NOT NULL,
	"city" varchar(100) NOT NULL,
	"state" varchar(100),
	"phone" varchar(50),
	"email" varchar(255),
	"website" varchar(255),
	"description" text,
	"price_range" varchar(50),
	"is_claimed" boolean DEFAULT false
);
--> statement-breakpoint
DROP TABLE "users" CASCADE;