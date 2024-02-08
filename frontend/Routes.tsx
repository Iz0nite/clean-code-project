import { createBrowserRouter, RouterProvider } from "react-router-dom"

import ProviderLayout from "@/layouts/provider"
import ClientLayout from "@/layouts/client"
import AdminLayout from "@/layouts/admin"

import Landing from "@/pages/Landing"
import NotFound from "@/pages/NotFound"
import HomeAdmin from "@/pages/admin/HomeAdmin"
import HomeProvider from "@/pages/provider/HomeProvider"
import Employees from "@/pages/provider/employees"
import HandleEmployee from "@/pages/provider/employees/handle-employee"
import Login from "@/pages/auth/Login.tsx"
import Register from "@/pages/auth/Register.tsx"
import Terms from "@/pages/Terms.tsx"
import CompanyClient from "@/pages/client/Company"
import AgencyClient from "@/pages/client/Company/Agency"
import ServiceClient from "@/pages/client/Company/Agency/Service"
import Agencies from "@/pages/provider/agencies"
import RegisterSuccess from "@/pages/auth/RegisterSuccess.tsx"
import NewProvider from "@/pages/provider/NewProvider.tsx"
import ProfileClient from "@/pages/client/User/ProfileClient.tsx"
import EmployeePlanning from "@/pages/provider/employee-planning"
import Search from "@/pages/client/Search"
import Users from "@/pages/admin/Users"
import Companies from "@/pages/admin/Companies"
import Services from "@/pages/provider/services"
import App from "@/App.tsx"
import ForgotPassword from "@/pages/auth/ForgotPassword.tsx"
import MyCompany from "@/pages/provider/my-company"
import CompanyDetails from "@/pages/admin/Companies/CompanyDetails"

const Routes = () => {
  const router = createBrowserRouter([
    {
      element: <App />,
      children: [
        {
          element: <ClientLayout />,
          path: "/",
          children: [
            {
              path: "",
              element: <Landing />,
            },
            {
              path: "login",
              element: <Login />,
            },
            {
              path: "register",
              element: <Register />,
            },
            {
              path: "register/welcome",
              element: <RegisterSuccess />,
            },
            {
              path: "/forgot-password",
              element: <ForgotPassword />,
            },
            {
              path: "user/profile",
              element: <ProfileClient />,
            },
            {
              path: "terms",
              element: <Terms />,
            },
            {
              path: "search",
              element: <Search />,
            },
            {
              path: "companies/:companyId",
              element: <CompanyClient />,
            },
            {
              path: "companies/:companyId/agencies/:agencyId",
              element: <AgencyClient />,
            },
            {
              path: "companies/:companyId/agencies/:agencyId/services/:serviceId",
              element: <ServiceClient />,
            },
            {
              path: "provider/new",
              element: <NewProvider />,
            },
          ],
          errorElement: <NotFound />,
        },
        {
          element: <ProviderLayout />,
          path: "/provider",
          children: [
            {
              path: "",
              element: <HomeProvider />,
            },
            {
              path: "company",
              element: <MyCompany />,
            },
            {
              path: "employee",
              element: <Employees />,
            },
            {
              path: "employee/:userId",
              element: <HandleEmployee />,
            },
            {
              path: "agency",
              element: <Agencies />,
            },
            {
              path: "planning",
              element: <EmployeePlanning />,
            },
            {
              path: "service",
              element: <Services />,
            },
          ],
          errorElement: <NotFound />,
        },
        {
          element: <AdminLayout />,
          path: "/admin",
          children: [
            {
              path: "",
              element: <HomeAdmin />,
            },
            {
              path: "companies",
              element: <Companies />,
            },
            {
              path: "companies/:companyId",
              element: <CompanyDetails />,
            },
            {
              path: "users",
              element: <Users />,
            },
          ],
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}

export default Routes
