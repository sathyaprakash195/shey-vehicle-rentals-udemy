import { IUser } from "@/interfaces";
import { useAuth } from "@clerk/nextjs";
import { Button, message } from "antd";
import {
  Calendar,
  Car,
  Contact,
  DollarSign,
  List,
  LogOut,
  Settings,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface IMenuItems {
  loggedinUserData: IUser;
}

function MenuItems({ loggedinUserData }: IMenuItems) {
  const iconSize = 16;
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const { signOut } = useAuth();

  const onLogOut = async () => {
    try {
      setLoading(true);
      await signOut();
      message.success("Logged out successfully");
      localStorage.clear();
      router.push("/");
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const adminMenuItems = [
    {
      name: "Home",
      path: "/vehicles",
      icon: <Car size={iconSize} />,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: <Contact size={iconSize} />,
    },
    {
      name: "Vehicles",
      path: "/admin/vehicles",
      icon: <List size={iconSize} />,
    },
    {
      name: "Bookings",
      path: "/admin/bookings",
      icon: <Calendar size={iconSize} />,
    },
    {
      name: "Reports",
      path: "/admin/reports",
      icon: <DollarSign size={iconSize} />,
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: <Settings size={iconSize} />,
    },
  ];

  const userMenuItems = [
    {
      name: "Home",
      path: "/vehicles",
      icon: <Car size={iconSize} />,
    },
    {
      name: "Bookings",
      path: "/user/bookings",
      icon: <Calendar size={iconSize} />,
    },
    {
      name: "Profile",
      path: "/user/profile",
      icon: <Contact size={iconSize} />,
    },
    {
      name: "Settings",
      path: "/user/settings",
      icon: <Settings size={iconSize} />,
    },
  ];

  const menuItemsToRender = loggedinUserData.isAdmin
    ? adminMenuItems
    : userMenuItems;

  return (
    <div className="flex flex-col gap-10">
      {menuItemsToRender.map((item, index) => (
        <div
          key={index}
          className={`cursor-pointer p-2 flex gap-5 items-center ${
            pathname === item.path &&
            "border border-solid border-black bg-gray-200"
          }`}
        >
          {item.icon}
          <span className="text-sm">{item.name}</span>
        </div>
      ))}

      <Button
        icon={<LogOut size={iconSize} />}
        loading={loading}
        onClick={onLogOut}
      >
        Logout
      </Button>
    </div>
  );
}

export default MenuItems;
