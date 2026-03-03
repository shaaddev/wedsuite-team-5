import {
	boolean,
	pgTable,
	serial,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("email_verified").notNull(),
	image: text("image"),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
});

export const session = pgTable("session", {
	id: text("id").primaryKey(),
	expiresAt: timestamp("expires_at").notNull(),
	token: text("token").notNull().unique(),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
	id: text("id").primaryKey(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: timestamp("access_token_expires_at"),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
	scope: text("scope"),
	password: text("password"),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
	id: text("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expires_at").notNull(),
	createdAt: timestamp("created_at"),
	updatedAt: timestamp("updated_at"),
});

export const onboardingProfiles = pgTable("onboarding_profiles", {
	userId: text("user_id")
		.primaryKey()
		.references(() => user.id, { onDelete: "cascade" }),
	role: varchar("role", { length: 20 }).notNull(),
	onboardingComplete: boolean("onboarding_complete").notNull().default(false),
	partnerOneName: varchar("partner_one_name", { length: 255 }),
	partnerTwoName: varchar("partner_two_name", { length: 255 }),
	weddingDate: varchar("wedding_date", { length: 30 }),
	location: varchar("location", { length: 255 }),
	businessName: varchar("business_name", { length: 255 }),
	category: varchar("category", { length: 120 }),
	startingPrice: varchar("starting_price", { length: 80 }),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const vendors = pgTable("vendors", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	category: varchar("category", { length: 100 }).notNull(),
	city: varchar("city", { length: 100 }).notNull(),
	state: varchar("state", { length: 100 }),
	phone: varchar("phone", { length: 50 }),
	email: varchar("email", { length: 255 }),
	website: varchar("website", { length: 255 }),
	description: text("description"),
	priceRange: varchar("price_range", { length: 50 }),
	isClaimed: boolean("is_claimed").default(false),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});