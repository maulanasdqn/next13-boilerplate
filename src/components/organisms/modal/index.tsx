import { FC, ReactElement } from "react";

export const Modal: FC = (): ReactElement => {
  return (
    <section className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-50 flex justify-center items-center">
      <div>
        <h1>Modal</h1>
      </div>
    </section>
  );
};
