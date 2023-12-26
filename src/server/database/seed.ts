import {
  ROLES as ROLES_DATA,
  customers,
  db,
  payment_methods,
  products,
  report_transactions,
  users,
  roles as roles_db,
  PERMISSIONS,
  business,
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
      productId: product[randomProduct],
      paymentId: paymentMethod[randomPaymentMethod],
      userId: user[randomUser],
      customerId: customer[randomCustomer],
      name: faker.person.fullName(),
      price: faker.finance.amount(),
      transactionDate: faker.date.recent(),
      transactionTime: "12.40",
      totalSelled: 2,
      totalPrice: String(Number(faker.finance.amount()) * 2),
      createdAt: new Date(),
      updatedAt: new Date(),
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
  const roles = [ROLES_DATA.MEMBER, ROLES_DATA.ADMIN, ROLES_DATA.OWNER];

  const roleIsExist = await db.select({ id: roles_db.id }).from(roles_db);

  if (roleIsExist.length > 0) {
    return;
  }

  if (!roleIsExist) {
    for (let i = 0; i < roles.length; i++) {
      let newData = {
        name: roles[i],
        createdAt: new Date(),
        updatedAt: new Date(),
        permissions: [PERMISSIONS.DASHBOARD],
      };
      dataToInsert.push(newData);
    }
    console.log("Seeding roles... 🚀");
    dataToInsert.forEach(async (data) => {
      await db.insert(roles_db).values(data).returning();
    });
    console.log("Seeding roles done! 🎊");
  }
};

export const SeedUser = async () => {
  let dataToInsert = [];
  const password = await bs.hash("admin123", await bs.genSalt(12));

  const roleId = await db
    .select({ id: roles_db.id })
    .from(roles_db)
    .where(eq(roles_db.name, ROLES_DATA.MEMBER))
    .then((res) => res.map((item) => item.id).at(0));

  for (let i = 0; i < 10; i++) {
    let newData = {
      fullname: faker.person.fullName(),
      image: faker.image.avatar(),
      email: faker.internet.email(),
      roleId: roleId,
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
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
      createdAt: new Date(),
      updatedAt: new Date(),
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
      providerName: "Methode Pembayaran " + i + 1,
      accountNumber: faker.finance.accountNumber(),
      accountName: faker.finance.accountName(),
      createdAt: new Date(),
      updatedAt: new Date(),
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
      createdAt: new Date(),
      updatedAt: new Date(),
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

export const SeedBussines = async () => {
  let dataToInsert = [];
  const user = await db
    .select({ id: users.id })
    .from(users)
    .then((res) => res.map((item) => item.id));

  const randomUser = Math.floor(Math.random() * user.length);
  for (let i = 0; i < 10; i++) {
    let newData = {
      name: faker.person.fullName(),
      phoneNumber: faker.phone.number(),
      ownerId: user[randomUser],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    dataToInsert.push(newData);
  }
  console.log("Seeding customer... 🚀");
  dataToInsert.forEach(async (data) => {
    try {
      console.log("Inserting customer", data.name);
      await db.insert(business).values(data).returning();
    } catch (error) {
      console.error(error);
    }
  });
  console.log("Seeding customer done! 🎊");
};

async function processAsyncOperations() {
  try {
    await SeedRole();
    await SeedUser();
    await SeedBussines();
    await SeedCustomer();
    await SeedPaymentMethod();
    await SeedProduct();
    await SeedTransaction();
  } catch (error) {
    console.error(error);
  }
}

processAsyncOperations();
