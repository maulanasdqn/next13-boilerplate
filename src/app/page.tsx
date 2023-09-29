import { NextPage } from "next";
import { ReactElement } from "react";

const Home: NextPage = (): ReactElement => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Boilerplate</h1>
    </main>
  );
};

export default Home;
