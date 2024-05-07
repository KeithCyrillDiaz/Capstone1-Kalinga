import React from "react";
import { Outlet } from "react-router-dom";
import { block } from "million/react";

const MainLayout = () => {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
};

const MainLayoutBlock = block(MainLayout);

export default MainLayoutBlock;
