import { Button } from "@/components";
import { clientTrpc } from "@/libs/trpc/client";
import Link from "next/link";
import { FC, ReactElement } from "react";
import { SiMarketo } from "react-icons/si";
import Image from "next/image";
import { RxAvatar } from "react-icons/rx";
import { FaChevronDown } from "react-icons/fa6";

export const NavbarLanding: FC = (): ReactElement => {
  const { data } = clientTrpc.getProfile.useQuery();
  return (
    <header className="bg-primary w-full py-4 px-10 text-white font-medium">
      <nav className="flex w-full justify-between items-center">
        <div className="flex gap-x-2">
          <SiMarketo size={24} />
          <span className="font-bold">iPOS</span>
        </div>

        <div className="flex gap-x-4 cursor-pointer">
          <Link href="/" className="border-b-2 border-transparent hover:border-white">
            Beranda
          </Link>
          <Link href="/services" className="border-b-2 border-transparent hover:border-white">
            Layanan
          </Link>
          <Link href="/about" className="border-b-2 border-transparent hover:border-white">
            Tentang Kami
          </Link>
          <Link href="/contact" className="border-b-2 border-transparent hover:border-white">
            Hubungi Kami
          </Link>
        </div>

        <div className="flex gap-x-2">
          {data ? (
            <span className="rounded-full flex items-center gap-x-2 w-fit text-primary py-2 px-4 text-xs bg-white">
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
    </header>
  );
};
