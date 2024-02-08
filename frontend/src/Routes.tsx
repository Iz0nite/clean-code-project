import { createBrowserRouter, RouterProvider } from "react-router-dom"
import DefaultLayout from "./layouts/default-layout"
import MainPage from "./pages/MainPage"
import CardList from "./pages/CardList/card-list"

const Routes = () => {
  const router = createBrowserRouter([
    {
      element: <DefaultLayout/>,
      path: "/",
      children: [
        {
          path: "",
          element: <MainPage />,
        },
        {
          path: "cards",
          element: <CardList />,
        }
      ]
    },
  ])

  return <RouterProvider router={router} />
}

export default Routes
