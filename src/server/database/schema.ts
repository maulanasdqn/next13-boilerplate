import { relations } from "drizzle-orm";
import {
  date,
  integer,
  pgTable,
  text,
  uuid,
  bigint,
  timestamp,
  primaryKey,
} from "drizzle-orm/pg-core";
import { AdapterAccount } from "@auth/core/adapters";

export enum ROLES {
  ADMIN = "Admin",
  USER = "User",
}

export enum PERMISSIONS {
  REPORT_TRANSACTION_CREATE = "Create Report Transaction",
  REPORT_TRANSACTION_READ = "Read Report Transaction",
  REPORT_TRANSACTION_UPDATE = "Update Report Transaction",
  REPORT_TRANSACTION_DELETE = "Delete Report Transaction",
  REPORT_TRANSACTION_DETAIL = "Detail Report Transaction",
  REPORT_PAYMENT_CREATE = "Create Report Payment",
  REPORT_PAYMENT_READ = "Read Report Payment",
  REPORT_PAYMENT_UPDATE = "Update Report Payment",
  REPORT_PAYMENT_DELETE = "Delete Report Payment",
  REPORT_PAYMENT_DETAIL = "Detail Report Payment",
  REPORT_FINANCIAL_CREATE = "Create Report Financial",
  REPORT_FINANCIAL_READ = "Read Report Financial",
  REPORT_FINANCIAL_UPDATE = "Update Report Financial",
  REPORT_FINANCIAL_DELETE = "Delete Report Financial",
  REPORT_FINANCIAL_DETAIL = "Detail Report Financial",
  PRODUCT_CREATE = "Create Product",
  PRODUCT_READ = "Read Product",
  PRODUCT_UPDATE = "Update Product",
  PRODUCT_DELETE = "Delete Product",
  PRODUCT_DETAIL = "Detail Product",
  USER_CREATE = "Create User",
  USER_READ = "Read User",
  USER_UPDATE = "Update User",
  USER_DELETE = "Delete User",
  USER_DETAIL = "Detail User",
  CUSTOMER_CREATE = "Create Customer",
  CUSTOMER_READ = "Read Customer",
  CUSTOMER_UPDATE = "Update Customer",
  CUSTOMER_DELETE = "Delete Customer",
  CUSTOMER_DETAIL = "Detail Customer",
  CUSTOMER_DEBT_CREATE = "Create Customer Debt",
  CUSTOMER_DEBT_READ = "Read Customer Debt",
  CUSTOMER_DEBT_UPDATE = "Update Customer Debt",
  CUSTOMER_DEBT_DELETE = "Delete Customer Debt",
}

export const roles = pgTable("app_roles", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
  permissions: text("permissions").notNull().array(),
  created_at: date("created_at", { mode: "date" }).notNull().defaultNow(),
  updated_at: date("updated_at", { mode: "date" }).notNull().defaultNow(),
});

export const users = pgTable("user", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  role_id: uuid("role_id").references(() => roles.id, { onDelete: "cascade" }),
  fullname: text("name"),
  image: text("image"),
  email: text("email").notNull().unique(),
  email_verified_at: timestamp("emailVerified", { mode: "date" }),
  password: text("password"),
  created_at: date("created_at", { mode: "date" }).notNull().defaultNow(),
  updated_at: date("updated_at", { mode: "date" }).notNull().defaultNow(),
});

export const customers = pgTable("app_customers", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  name: text("name").notNull(),
  created_at: date("created_at", { mode: "date" }).notNull().defaultNow(),
  updated_at: date("updated_at", { mode: "date" }).notNull().defaultNow(),
});

export const accounts = pgTable(
  "account",
  {
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  }),
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  }),
);
export const report_transactions = pgTable("app_report_transactions", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  product_id: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  payment_id: uuid("payment_id")
    .notNull()
    .references(() => payment_methods.id, { onDelete: "cascade" }),
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  customer_id: uuid("customer_id")
    .notNull()
    .references(() => customers.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  price: bigint("price", { mode: "number" }).notNull(),
  transaction_date: text("transaction_date").notNull(),
  transaction_time: text("transaction_time").notNull(),
  total_selled: integer("total_selled").notNull(),
  total_price: bigint("total_price", { mode: "number" }).notNull(),
  created_at: date("created_date", { mode: "date" }).notNull().defaultNow(),
  updated_at: date("updated_date", { mode: "date" }).notNull().defaultNow(),
});

export const payment_methods = pgTable("app_payment_methods", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  provider_name: text("provider_name").notNull(),
  account_name: text("name").notNull(),
  account_number: text("account_number").notNull(),
  created_at: date("created_date", { mode: "date" }).notNull().defaultNow(),
  updated_at: date("updated_date", { mode: "date" }).notNull().defaultNow(),
});

export const report_payments = pgTable("app_report_payments", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  customer_id: uuid("customer_id")
    .notNull()
    .references(() => customers.id, { onDelete: "cascade" }),

  name: text("name").notNull(),
  price: text("price").notNull(),
  description: text("description").notNull(),
  total_payment: bigint("total_payment", { mode: "number" }).notNull(),
  created_at: date("created_date", { mode: "date" }).notNull().defaultNow(),
  updated_at: date("updated_date", { mode: "date" }).notNull().defaultNow(),
});

export const report_financials = pgTable("app_report_financials", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  gross_income: bigint("gross_income", { mode: "number" }).notNull(),
  net_income: bigint("net_income", { mode: "number" }).notNull(),
  operational_cost: bigint("operational_cost", { mode: "number" }).notNull(),
  description: text("description").notNull(),
  created_at: date("created_date", { mode: "date" }).notNull().defaultNow(),
  updated_at: date("updated_date", { mode: "date" }).notNull().defaultNow(),
});

export const customer_debts = pgTable("app_customer_debts", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  customer_id: uuid("customer_id")
    .notNull()
    .references(() => customers.id, { onDelete: "cascade" }),
  total_product: integer("total_product").notNull(),
  name: text("name").notNull(),
  amount: bigint("amount", { mode: "number" }).notNull(),
  date: date("date").notNull(),
  created_at: date("created_date", { mode: "date" }).notNull().defaultNow(),
  updated_at: date("updated_date", { mode: "date" }).notNull().defaultNow(),
});

export const products = pgTable("app_products", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  name: text("name").notNull(),
  price: bigint("price", { mode: "number" }).notNull(),
  quantity: integer("quantity").notNull(),
  description: text("description").notNull(),
  created_at: date("created_date", { mode: "date" }).notNull().defaultNow(),
  updated_at: date("updated_date", { mode: "date" }).notNull().defaultNow(),
});

export const rolesRelations = relations(roles, ({ many }) => ({
  users: many(users),
}));

export const userReportTransactionRelations = relations(users, ({ many }) => ({
  report_transactions: many(report_transactions),
}));

export const customerReportTransactionRelations = relations(customers, ({ many }) => ({
  report_transactions: many(report_transactions),
}));

export const productReportTransactionRelations = relations(products, ({ many }) => ({
  report_transactions: many(report_transactions),
}));

export const usersRelations = relations(users, ({ one }) => ({
  roles: one(roles, {
    fields: [users.role_id],
    references: [roles.id],
  }),
}));

export const paymetMethodReportTransactionRelations = relations(payment_methods, ({ many }) => ({
  report_transactions: many(report_transactions),
}));

export const reportTransactionRelations = relations(report_transactions, ({ one }) => ({
  user: one(users, {
    fields: [report_transactions.user_id],
    references: [users.id],
  }),
  customer: one(customers, {
    fields: [report_transactions.customer_id],
    references: [customers.id],
  }),
  product: one(products, {
    fields: [report_transactions.product_id],
    references: [products.id],
  }),
  payment: one(payment_methods, {
    fields: [report_transactions.payment_id],
    references: [payment_methods.id],
  }),
}));
