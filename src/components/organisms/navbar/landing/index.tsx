import { Button } from "@/components";
import { clientTrpc } from "@/libs/trpc/client";
import Link from "next/link";
import { FC, ReactElement, useState } from "react";
import { SiMarketo } from "react-icons/si";
import Image from "next/image";
import { RxAvatar } from "react-icons/rx";
import { FaChevronDown } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { IoMdLogOut, IoMdPerson } from "react-icons/io";
import { signOut } from "next-auth/react";

export const NavbarLanding: FC = (): ReactElement => {
  const { data } = clientTrpc.getProfile.useQuery();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navbarClassName = (url: string) =>
    clsx({
      "border-b-2 border-transparent hover:border-white border-white": pathname === url,
      "border-b-2 border-transparent hover:border-white": pathname !== url,
    });

  return (
    <header className="bg-primary w-full py-4 px-10 text-white font-medium">
      {/* dekstop */}
      <nav className="lg:flex hidden w-full justify-between items-center">
        <div className="flex gap-x-2">
          <SiMarketo size={24} />
          <span className="font-bold">iPOS</span>
        </div>

        <div className="flex gap-x-4 cursor-pointer">
          <Link href="/" className={navbarClassName("/")}>
            Beranda
          </Link>
          <Link href="/services" className={navbarClassName("/services")}>
            Layanan
          </Link>
          <Link href="/about" className={navbarClassName("/about")}>
            Tentang Kami
          </Link>
          <Link href="/contact" className={navbarClassName("/contact")}>
            Hubungi Kami
          </Link>
        </div>

        <div className="flex gap-x-2">
          {data ? (
            <span
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-full cursor-pointer flex items-center gap-x-2 w-fit text-primary py-2 px-4 text-xs bg-white"
            >
              {data?.user?.image ? (
                <Image
                  src={data?.user?.image}
                  alt="profile"
                  width={30}
                  height={30}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <RxAvatar className="cursor-pointer" size={30} />
              )}
              <span className="text-lg">{data?.user?.fullname}</span>
              <FaChevronDown size={20} />
            </span>
          ) : (
            <div className="flex gap-x-2">
              <Button href="/auth/login" variant="cancel" size="sm">
                Masuk
              </Button>
              <Button href="/auth/register" size="sm">
                Daftar
              </Button>
            </div>
          )}
        </div>
      </nav>
      {/* mobile */}
      <nav className="lg:hidden flex  justify-between">
        <div className="flex gap-x-2 py-2">
          <SiMarketo size={24} />
          <span className="font-bold">iPOS</span>
        </div>
        <div>
          <GiHamburgerMenu size={32} />
        </div>
      </nav>

      {isOpen && (
        <div className="absolute top-16 select-none right-3 p-4 gap-y-4 rounded-lg shadow-md h-auto w-[300px] flex flex-col bg-white">
          <Link href={"/dashboard/setting?title=Pengaturan&menu=account"}>
            <span className="flex gap-x-2  hover:bg-gray-200 p-2 rounded-lg items-center font-medium text-gray-500 cursor-pointer">
              <IoMdPerson size={20} />
              Profile
            </span>
          </Link>
          <hr />
          <span
            onClick={() => signOut()}
            className="flex gap-x-2  hover:bg-gray-200 p-2 rounded-lg items-center font-medium text-gray-500 cursor-pointer"
          >
            <IoMdLogOut size={20} /> Keluar
          </span>
        </div>
      )}
    </header>
  );
};
