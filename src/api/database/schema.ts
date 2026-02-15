import { pgTable, pgSchema, varchar, decimal, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";

export const emparclubSchema = pgSchema("emparclub");

export const plans = emparclubSchema.table("plans", {
    id: varchar("id", { length: 50 }).primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    duration_months: integer("duration_months").default(1),
    active: boolean("active").default(true),
    type: varchar("type", { length: 20 }).default("individual"), // individual / family
    createdAt: timestamp("created_at").defaultNow(),
});
