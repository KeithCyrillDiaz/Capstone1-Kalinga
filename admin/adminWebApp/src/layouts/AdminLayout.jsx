import React, { useState, useEffect} from "react";
import { Sidebar, NavBar } from "@/components";
import { Outlet, useParams } from "react-router-dom";
import { block } from "million/react";
import { checkId } from "../functions/Authentication";
import { Loader } from "../components/loader";
import { NotFound } from ".";

const AdminLayout = () => {

  const [notFound, setNotFound] = useState(true)
  const [loading, setLoading] = useState(true)


  const { id } = useParams();
  useEffect(() => {
    setLoading(true)
      const result = checkId({id: id})
      console.log("result: ", result)
      if(!result)setNotFound(true)
        else setNotFound(false)
        
    setLoading(false)
  }, [id])
  if (loading) {
    return <Loader isLoading={loading}/>
  }

  if(notFound){
    return (
        <>
          <NotFound/>
        </>
    )
  }

  if(!notFound && !loading) {
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
  }
 
};

const AdminLayoutBlock = block(AdminLayout);

export default AdminLayoutBlock;
