import { signOut, useSession } from "next-auth/react";
import { FC, ReactElement, Suspense, useState } from "react";
import { IoMdLogOut, IoMdMenu, IoMdPerson } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";

export const Navbar: FC = (): ReactElement => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="w-full pl-[280px] items-center gap-x-4 right-0 fixed top-0 bg-white shadow-md p-4 max-h-[56px] z-1 justify-between flex">
      <div className="flex gap-x-4 relative">
        <IoMdMenu className="font-bold" size={24} />
        <span>
          Selamat Datang <Suspense fallback="Loading..."> {session?.user?.name} </Suspense>
        </span>
      </div>
      <RxAvatar className="cursor-pointer" onClick={() => setIsOpen(!isOpen)} size={30} />
      {isOpen && (
        <div className="absolute top-16 select-none right-3 p-4 gap-y-4 rounded-lg shadow-md h-auto w-[300px] flex flex-col bg-white">
          <span className="flex gap-x-2  hover:bg-gray-200 p-2 rounded-lg items-center font-medium text-gray-500 cursor-pointer">
            <IoMdPerson size={20} /> Profile
          </span>
          <hr />
          <span
            onClick={() => signOut()}
            className="flex gap-x-2  hover:bg-gray-200 p-2 rounded-lg items-center font-medium text-gray-500 cursor-pointer"
          >
            <IoMdLogOut size={20} /> Keluar
          </span>
        </div>
      )}
    </nav>
  );
};
