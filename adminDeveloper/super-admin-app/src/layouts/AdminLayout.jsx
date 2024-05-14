import React from "react";
import { Sidebar, NavBar } from "@/components";
import { Outlet } from "react-router-dom";
import { block } from "million/react";

const AdminLayout = () => {
  return (
    <>
      <main className="flex">
        <div className="z-[1000]">
          <Sidebar />
        </div>
        <div className="flex flex-col w-full">
          <NavBar />
          <Outlet />
        </div>
      </main>
    </>
  );
};

const AdminLayoutBlock = block(AdminLayout);

export default AdminLayoutBlock;
