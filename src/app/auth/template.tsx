import { FC, PropsWithChildren, ReactElement } from "react";

const AuthTemplate: FC<PropsWithChildren> = ({ children }): ReactElement => {
  return (
    <section className="flex w-full h-screen bg-gray-100 items-center justify-between">
      <div className="w-1/2 h-full bg-primary items-center justify-center md:flex hidden">
        <div className="flex flex-col items-center gap-y-4"></div>
      </div>
      {children}
    </section>
  );
};

export default AuthTemplate;
