import { Sidebar } from "flowbite-react";
import { HiChartPie, HiInbox, HiShoppingBag, HiUser } from "react-icons/hi";
import { Logout } from "./Logout";

export const CustomSidebar = () => {
  return (
    <Sidebar aria-label="Default sidebar example">
      <div className="flex flex-col justify-between h-full">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="#" icon={HiChartPie}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiInbox} label="3">
              Inbox
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiUser}>
              Users
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiShoppingBag}>
              Products
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>

        <Logout />
      </div>
    </Sidebar>
  );
};
