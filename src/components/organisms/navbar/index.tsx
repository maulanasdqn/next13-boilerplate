import { useSession } from "next-auth/react";
import { FC, ReactElement, Suspense } from "react";
import { IoMdMenu } from "react-icons/io";

export const Navbar: FC = (): ReactElement => {
  const { data: session } = useSession();
  return (
    <nav className="w-full pl-[280px] items-center gap-x-4 right-0 fixed top-0 bg-white shadow-md p-4 max-h-[56px] z-1 justify-between flex">
      <div className="flex gap-x-4">
        <IoMdMenu className="font-bold" size={24} />
        <span>
          Selamat Datang <Suspense fallback="Loading..."> {session?.user?.name} </Suspense>
        </span>
      </div>
      Avatar
    </nav>
  );
};
