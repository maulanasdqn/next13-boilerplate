import { customers, db, payment_methods, products, report_transactions, users } from ".";
import { faker } from "@faker-js/faker";

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
  console.log("Seeding reservations... 🚀");
  console.log(dataToInsert);
  dataToInsert.forEach(async (data) => {
    await db.insert(report_transactions).values(data).returning();
  });
  console.log("Seeding reservations done! 🎊");
  return;
};

SeedTransaction();
