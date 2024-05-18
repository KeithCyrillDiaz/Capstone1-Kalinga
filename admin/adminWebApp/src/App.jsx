import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import {
  Login,
  AdminDashboard,
  City,
  Chart,
  DonorVerifPendings,
  DonorVerification,
  RequestorVerification,
  RequestorVerifPendings,
  Forum,
  Approved,
  Rejected,
  Milkbanks,
  DonorAppointManage,
  RequestorManagement,
  DonorAppointmentConfirmation,
  RequestorAppointmentConfirmation

} from "@/pages";
import { RootLayout, NotFound, MainLayout, AdminLayout } from "@/layouts";
import { MobileChecker } from "@/components";
import { useMediaQuery } from "react-responsive";

const MOBILE_BREAKPOINT = 1023;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      {/* Public Routes */}

      <Route element={<MainLayout />}>
        <Route index element={<Login />} />
      </Route>

      {/* Private Routes */}
      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="milkbanks" element={<Milkbanks />} />
        <Route path="city" element={<City />} />
        <Route path="chart" element={<Chart />} />
        <Route path="DonorVerifPendings" element={<DonorVerifPendings />} />
        <Route path="DonorVerification/:id" element={<DonorVerification />} />
        <Route path="requestorVerifPendings" element={<RequestorVerifPendings/>} />
        <Route path="requestorVerification/:id" element={<RequestorVerification/>} />
        <Route path="forum" element={<Forum />} />
        <Route path="approved" element={<Approved />} />
        <Route path="rejected" element={<Rejected />} />
        <Route path="DonorAppointManage" element={<DonorAppointManage />} />
        <Route path="requestorManagement" element={<RequestorManagement />} />
        <Route path="donorAppointmentConfirmation/:AppointmentDonorID" element={<DonorAppointmentConfirmation />} />
        <Route path="requestorAppointmentConfirmation/:RequestID" element={<RequestorAppointmentConfirmation />} />
        <Route path="requestorAppointmentConfirmation/:RequestID" element={<DonorVerifPendings />} />
        <Route path="requestorAppointmentConfirmation/:RequestID" element={<DonorVerification />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default function App() {
  const isMobile = useMediaQuery({ maxWidth: MOBILE_BREAKPOINT });
  return (
    <>
      {isMobile ? (
        <MobileChecker />
      ) : (
        <>
          <RouterProvider router={router} />
        </>
      )}
    </>
  );
}