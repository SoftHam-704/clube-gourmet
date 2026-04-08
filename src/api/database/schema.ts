import { pgSchema, varchar, text, integer, boolean, timestamp, serial, numeric } from "drizzle-orm/pg-core";

export const emparclubSchema = pgSchema("emparclub");

export const plans = emparclubSchema.table("plans", {
    id: varchar("id", { length: 50 }).primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    price: numeric("price").notNull(),
    duration_months: integer("duration_months").default(1),
    active: boolean("active").default(true),
    type: varchar("type", { length: 20 }).default("individual"),
    createdAt: timestamp("created_at").defaultNow(),
});

export const cities = emparclubSchema.table("cidades", {
    id: serial("id_cidade").primaryKey(),
    name: varchar("nome", { length: 255 }).notNull(),
    state: varchar("uf", { length: 2 }).notNull(),
    ibge: integer("cod_ibge"),
    slug: varchar("slug", { length: 255 }).unique(),
    active: boolean("ativo").default(false),
    createdAt: timestamp("data_cadastro").defaultNow(),
});

export const restaurants = emparclubSchema.table("restaurantes", {
    id: serial("id").primaryKey(),
    name: varchar("nome", { length: 255 }).notNull(),
    cuisine: varchar("categoria", { length: 255 }).notNull(),
    description: text("descricao"),
    address: text("endereco"),
    image: text("imagem_url"),
    slug: varchar("slug", { length: 255 }).unique().notNull(),
    highlighted: boolean("destaque").default(false),
    active: boolean("ativo").default(true),
    city_slug: varchar("cidade_slug", { length: 255 }),
    createdAt: timestamp("data_cadastro").defaultNow(),
});

export const users = emparclubSchema.table("users", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified").notNull(),
    image: text("image"),
    passwordHash: text("password_hash"),
    role: varchar("role", { length: 20 }).default("user"),
    cityId: integer("city_id"),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
});

export const sessions = emparclubSchema.table("sessions", {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id").notNull().references(() => users.id),
});

export const accounts = emparclubSchema.table("accounts", {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id").notNull().references(() => users.id),
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

export const verifications = emparclubSchema.table("verifications", {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at"),
    updatedAt: timestamp("updated_at"),
});

export const subscriptions = emparclubSchema.table("subscriptions", {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(() => users.id),
    planId: varchar("plan_id", { length: 50 }).notNull().references(() => plans.id),
    status: varchar("status", { length: 20 }).notNull().default("pending"),
    startDate: timestamp("start_date").defaultNow(),
    endDate: timestamp("end_date"),
    externalCustomerId: text("external_customer_id"),
    externalSubscriptionId: text("external_subscription_id"),
    createdAt: timestamp("created_at").defaultNow(),
});

export const favorites = emparclubSchema.table("favoritos", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull().references(() => users.id),
    restaurantId: integer("restaurante_id").notNull().references(() => restaurants.id),
    createdAt: timestamp("data_cadastro").defaultNow(),
});

export const redeemedBenefits = emparclubSchema.table("beneficios_resgatados", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull().references(() => users.id),
    restaurantId: integer("restaurante_id").notNull().references(() => restaurants.id),
    redeemedAt: timestamp("data_resgate").defaultNow(),
});
