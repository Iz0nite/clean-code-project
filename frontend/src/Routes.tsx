import { createBrowserRouter, RouterProvider } from "react-router-dom"
import DefaultLayout from "./layouts/default-layout"
import MainPage from "./pages/MainPage"
import CardList from "./pages/CardList/card-list"
import Quizz from "./pages/Quizz/quizz"

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
        },
        {
          path: "quizz",
          element: <Quizz />,
        }
      ]
    },
  ])

  return <RouterProvider router={router} />
}

export default Routes
