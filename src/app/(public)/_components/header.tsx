import { Button } from "antd";
import React from "react";

function Header({
  setShowAuthentication,
}: {
  setShowAuthentication: (value: boolean) => void;
}) {
  const menuItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ];

  return (
    <div className="bg-primary py-5 flex justify-between items-center px-20">
      <img className="w-20 h-14" src="/logo.png" />

      <div className="flex gap-5 items-center">
        {menuItems.map((item, index) => (
          <span key={index} className="text-white text-sm">
            {item.name}
          </span>
        ))}

        <Button onClick={() => setShowAuthentication(true)}>Sign In</Button>
      </div>
    </div>
  );
}

export default Header;
