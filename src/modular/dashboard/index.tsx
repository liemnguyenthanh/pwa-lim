import { usePrivy } from "@privy-io/react-auth";
import { Button, Spinner } from "flowbite-react";

export const DashboardModular = () => {
  const { ready, user, linkTwitter, linkGoogle, linkTiktok } = usePrivy();

  if (!ready || !user) {
    return <Spinner />;
  }

  return (
    <div className="flex items-center justify-center h-screen p-5">
      <div className="flex flex-col gap-2">
        <div>
          <Transaction />
          <p className="mb-5 text-xl">
            User <b>{user.id}</b> has linked the following accounts:
          </p>
          <ul className="flex flex-col gap-2">
            <SocialCard
              title="Google"
              info={
                user.google
                  ? {
                      title: user.google.name ?? "",
                      des: user.google.email,
                    }
                  : null
              }
              onClick={linkGoogle}
              titleBtn="Connect Google"
            />

            <SocialCard
              title="Twitter"
              info={
                user.twitter
                  ? {
                      title: user.twitter.name ?? "",
                      des: user.twitter.username ?? "",
                    }
                  : null
              }
              onClick={linkTwitter}
              titleBtn="Connect Twitter"
            />

            <SocialCard
              title="Tiktok"
              info={
                user.tiktok
                  ? {
                      title: user.tiktok.subject ?? "",
                      des: user.tiktok.username ?? "",
                    }
                  : null
              }
              onClick={linkTiktok}
              titleBtn="Connect Tiktok"
            />

            <li>Wallet: {user.wallet ? user.wallet.address : "None"}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

import { Transaction } from "./components";

type SocialCardProps = {
  title: string;
  info: null | {
    title: string;
    des: string;
  };
  onClick?: () => void;
  titleBtn: string;
};

export const SocialCard = ({
  title,
  info,
  titleBtn,
  onClick,
}: SocialCardProps) => {
  if (!info) {
    return <Button onClick={onClick}>{titleBtn}</Button>;
  }
  return (
    <div className="flex flex-col justify-between p-4 leading-normal border rounded-lg">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>
      <p className="mt-3 font-normal text-gray-700 dark:text-gray-400">
        {info.title}
      </p>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {info.des}
      </p>
    </div>
  );
};
