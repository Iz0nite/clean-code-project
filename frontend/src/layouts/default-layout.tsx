import { Outlet } from "react-router-dom"
// import Footer from "@/layouts/client/Footer.tsx"
import Header from "./header"
import { Toaster } from "@/components/ui/toaster"

const DefaultLayout = () => {
  return (
    <>
      <Header />
      <Toaster />
      <main className="mt-6 pb-20">
        <Outlet />
      </main>
    </>
  )
}

export default DefaultLayout
