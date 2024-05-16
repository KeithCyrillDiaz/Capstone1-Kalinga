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
  DonorVerifPendings,
  DonorVerification,
  Chart,
  Forum,
  Approved,
  Rejected,
  Bugs,
  BugReport,
  BugResolve,
  Feedback,
  FeedbackReport,
  DonorAppointments,
  RequestorAppointments,
  DonorAppointmentConfirmation,
  RequestorAppointmentConfirmation,
  Milkbanks,
  Users,
  DonorAccounts,
  DonorAppointManage,
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
        <Route path="city" element={<City />} />
        <Route path="DonorVerifPendings" element={<DonorVerifPendings />} />
        <Route path="DonorVerification" element={<DonorVerification />} />
        <Route path="chart" element={<Chart />} />
        <Route path="forum" element={<Forum />} />
        <Route path="approved" element={<Approved />} />
        <Route path="rejected" element={<Rejected />} />
        <Route path="bugs" element={<Bugs />} />
        <Route path="bugReport/:ReportBugID" element={<BugReport />} />
        <Route path="bugResolve" element={<BugResolve />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="feedbackReport" element={<FeedbackReport />} />
        <Route path="donorAppointments" element={<DonorAppointments />} />
        <Route
          path="requestorAppointments"
          element={<RequestorAppointments />}
        />
        <Route
          path="donorAppointmentConfirmation/:AppointmentDonorID"
          element={<DonorAppointmentConfirmation />}
        />
        <Route
          path="requestorAppointmentConfirmation/:RequestID"
          element={<RequestorAppointmentConfirmation />}
        />
        <Route path="milkbanks" element={<Milkbanks />} />
        <Route path="users" element={<Users />} />
        <Route path="DonorAccounts" element={<DonorAccounts />} />
        <Route path="DonorAppointManage" element={<DonorAppointManage />} />
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
