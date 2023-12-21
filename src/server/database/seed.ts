import {
  ROLES as ROLES_DATA,
  customers,
  db,
  payment_methods,
  products,
  report_transactions,
  users,
  roles as roles_db,
} from ".";
import { faker } from "@faker-js/faker";
import * as bs from "bcryptjs";
import { eq } from "drizzle-orm";

export const SeedTransaction = async () => {
  let dataToInsert = [];

  const product = await db
    .select({ id: products.id })
    .from(products)
    .then((res) => res.map((item) => item.id));
  const paymentMethod = await db
    .select({ id: payment_methods.id })
    .from(payment_methods)
    .then((res) => res.map((item) => item.id));
  const user = await db
    .select({ id: users.id })
    .from(users)
    .then((res) => res.map((item) => item.id));
  const customer = await db
    .select({ id: customers.id })
    .from(customers)
    .then((res) => res.map((item) => item.id));

  for (let i = 0; i < 100; i++) {
    const randomProduct = Math.floor(Math.random() * product.length);
    const randomPaymentMethod = Math.floor(Math.random() * paymentMethod.length);
    const randomUser = Math.floor(Math.random() * user.length);
    const randomCustomer = Math.floor(Math.random() * customer.length);

    let newData = {
      product_id: product[randomProduct],
      payment_id: paymentMethod[randomPaymentMethod],
      user_id: user[randomUser],
      customer_id: customer[randomCustomer],
      name: faker.person.fullName(),
      price: faker.finance.amount(),
      transaction_date: String(faker.date.recent()),
      transaction_time: "12.40",
      total_selled: 2,
      total_price: String(Number(faker.finance.amount()) * 2),
      created_at: new Date(),
      updated_at: new Date(),
    };
    dataToInsert.push(newData);
  }
  console.log("Seeding transactions... 🚀");
  dataToInsert.forEach(async (data) => {
    console.log("Inserting transaction", data.name);
    await db.insert(report_transactions).values(data).returning();
  });
  console.log("Seeding transactions! 🎊");
};

export const SeedRole = async () => {
  let dataToInsert = [];
  const roles = [ROLES_DATA.USER, ROLES_DATA.ADMIN];

  for (let i = 0; i < roles.length; i++) {
    let newData = {
      name: roles[i],
      created_at: new Date(),
      updated_at: new Date(),
    };
    dataToInsert.push(newData);
  }
  console.log("Seeding roles... 🚀");
  dataToInsert.forEach(async (data) => {
    await db.insert(roles_db).values(data).returning();
  });
  console.log("Seeding roles done! 🎊");
};

export const SeedUser = async () => {
  let dataToInsert = [];
  const password = await bs.hash("admin123", await bs.genSalt(12));

  const roleId = await db
    .select({ id: roles_db.id })
    .from(roles_db)
    .where(eq(roles_db.name, ROLES_DATA.USER))
    .then((res) => res.map((item) => item.id).at(0));

  for (let i = 0; i < 10; i++) {
    let newData = {
      fullname: faker.person.fullName(),
      image: faker.image.avatar(),
      email: `test${i}@mail.com`,
      role_id: roleId,
      password,
      created_at: new Date(),
      updated_at: new Date(),
    };
    dataToInsert.push(newData);
  }
  console.log("Seeding users... 🚀");
  dataToInsert.forEach(async (data) => {
    await db.insert(users).values(data).returning();
  });
  console.log("Seeding users done! 🎊");
};

export const SeedProduct = async () => {
  let dataToInsert = [];

  for (let i = 0; i < 10; i++) {
    let newData = {
      name: faker.commerce.productName(),
      price: parseInt(faker.finance.amount()),
      quantity: parseInt(faker.finance.amount()),
      description: faker.commerce.productDescription(),
      created_at: new Date(),
      updated_at: new Date(),
    };
    dataToInsert.push(newData);
  }
  console.log("Seeding products... 🚀");
  dataToInsert.forEach(async (data) => {
    console.log("Inserting product", data.name);
    await db.insert(products).values(data).returning();
  });
  console.log("Seeding products done! 🎊");
};

export const SeedPaymentMethod = async () => {
  let dataToInsert = [];

  for (let i = 0; i < 10; i++) {
    let newData = {
      name: "Methode Pembayaran " + i + 1,
      provider_name: "Methode Pembayaran " + i + 1,
      account_number: faker.finance.accountNumber(),
      account_name: faker.finance.accountName(),
      created_at: new Date(),
      updated_at: new Date(),
    };
    dataToInsert.push(newData);
  }
  console.log("Seeding payment method... 🚀");
  dataToInsert.forEach(async (data) => {
    setTimeout(async () => {
      console.log("Inserting payment method...", data.name);
      await db.insert(payment_methods).values(data).returning();
    }, 1000);
  });
  console.log("Seeding payment method done! 🎊");
};

export const SeedCustomer = async () => {
  let dataToInsert = [];

  for (let i = 0; i < 10; i++) {
    let newData = {
      name: faker.person.fullName(),
      created_at: new Date(),
      updated_at: new Date(),
    };
    dataToInsert.push(newData);
  }
  console.log("Seeding customer... 🚀");
  dataToInsert.forEach(async (data) => {
    try {
      console.log("Inserting customer", data.name);
      await db.insert(customers).values(data).returning();
    } catch (error) {
      console.error(error);
    }
  });
  console.log("Seeding customer done! 🎊");
};

async function processAsyncOperations() {
  try {
    await SeedCustomer();
    await SeedPaymentMethod();
    await SeedProduct();
    await SeedTransaction();
  } catch (error) {
    console.error(error);
  }
}

processAsyncOperations();
