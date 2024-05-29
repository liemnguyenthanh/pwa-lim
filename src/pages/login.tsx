import privy from "@/assets/images/icons/privy.svg";
import { usePrivy } from "@privy-io/react-auth";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
export default function Login() {
  const { login, authenticated, ready } = usePrivy();
  const { push } = useRouter();

  useEffect(() => {
    if (ready && authenticated) {
      push("/dashboard");
    }
  }, [authenticated]);

  if (!ready) {
    return;
  }
  return (
    <main>
      <div className="flex items-center justify-center h-screen">
        <button
          className="text-gray-900 bg-white gap-2 hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-lg px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
          onClick={login}
        >
          Connect with
          <Image
            src={privy}
            alt=""
            className="w-20"
            style={{ height: "auto" }}
          />
        </button>
      </div>
    </main>
  );
}
