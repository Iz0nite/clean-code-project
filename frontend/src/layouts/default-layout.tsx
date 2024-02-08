import { Outlet } from "react-router-dom"
// import Footer from "@/layouts/client/Footer.tsx"
import Header from "./header"

const DefaultLayout = () => {
  return (
    <>
      <Header />
      <main className="mt-6 pb-20">
        <Outlet />
      </main>
    </>
  )
}

export default DefaultLayout
