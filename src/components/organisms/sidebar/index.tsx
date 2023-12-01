import { FC, ReactElement, useMemo } from "react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { IoMdPerson } from "react-icons/io";
import Link from "next/link";

export const Sidebar: FC = (): ReactElement => {
  const { data } = useSession();
  const userName = useMemo(() => data?.user?.name, [data]);
  const roleName = useMemo(() => data?.user?.role, [data]);
  const pathname = usePathname();

  const selectedMenu = (url: string) =>
    clsx(
      "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group",
      {
        "bg-gray-700":
          pathname?.split?.("/")?.splice?.(0, 3)?.join?.("") ===
          url?.split?.("/")?.splice?.(0, 3).join(""),
      },
    );

  return (
    <aside
      id="default-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <div className="flex flex-col gap-y-4 mb-4">
          <span className="text-white font-medium  w-full block text-2xl">POS UMKM</span>
          <div className="bg-gray-600 p-2 rounded-lg flex flex-col">
            <span className="text-white text-base">{userName}</span>
            <span className="text-white text-sm">{roleName}</span>
          </div>
        </div>
        <ul className="space-y-2 font-medium">
          <li>
            <Link href="/dashboard?title=Dashboard" className={selectedMenu("/dashboard")}>
              <svg
                className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 21"
              >
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
              </svg>
              <span className="ms-3">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/reservasi?title=Data Reservasi Tamu"
              className={selectedMenu("/dashboard/reservasi")}
            >
              <svg
                className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 18"
              >
                <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap">Reservasi Tamu</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/guest?title=Data Reservasi Tamu selesai"
              className={selectedMenu("/dashboard/guest")}
            >
              <IoMdPerson className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="flex-1 ms-3 whitespace-nowrap">Reservasi Tamu Selesai</span>
            </Link>
          </li>
          <li className="flex mt-6 w-full">
            <Button onClick={() => signOut()} variant="cancel">
              Logout
            </Button>
          </li>
        </ul>
      </div>
    </aside>
  );
};
