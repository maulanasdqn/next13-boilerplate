import { FC, ReactElement } from "react";

export const Footer: FC = (): ReactElement => {
  return (
    <footer className="w-full bg-primary p-12 text-white font-semibold text-lg flex items-center justify-between">
      <div>
        <h1>Hubungi Kami di</h1>
        <p>+62-812-23256-8896</p>
      </div>
      <div>
        <ul>
          <li className="underline hover:cursor-pointer">Kebijakan Dan Privasi</li>
          <li className="underline hover:cursor-pointer">Syarat Dan Ketentuan</li>
        </ul>
      </div>
    </footer>
  );
};
