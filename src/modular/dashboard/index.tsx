import { Actions, UserInfo } from "./components";

export const DashboardModular = () => {
  return (
    <div className="flex items-center justify-center h-screen p-5 gap-2">
      <Actions />
      <UserInfo />
    </div>
  );
};
