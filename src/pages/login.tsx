import privy from "@/assets/images/icons/privy.svg";
import { useLogin } from "@privy-io/react-auth";
import Image from "next/image";
export default function Login() {
  const { login } = useLogin();
  const handleLogin = async () => {
    try {
      const data = await login();
      console.log("data", data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main>
      <div className="flex items-center justify-center h-screen">
        <button
          className="text-gray-900 bg-white gap-2 hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-lg px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
          onClick={handleLogin}
        >
          Connect with
          <Image src={privy} alt="" className="w-20" style={{ height: "auto" }}/>
        </button>
      </div>
    </main>
  );
}
