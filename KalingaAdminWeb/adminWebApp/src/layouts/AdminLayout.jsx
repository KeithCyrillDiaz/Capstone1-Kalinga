import React from "react";
import { Sidebar } from "@/components";
import { Outlet } from "react-router-dom";
import { block } from "million/react";

const AdminLayout = () => {
  return (
    <>
      <main className="flex">
        <div className="z-[1000]">
          <Sidebar />
        </div>
        <Outlet />
      </main>
    </>
  );
};

const AdminLayoutBlock = block(AdminLayout);

export default AdminLayoutBlock;
