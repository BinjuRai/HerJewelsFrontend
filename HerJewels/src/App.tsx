import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./pages/home.tsx";
import LoginForm from "./pages/login.tsx";
import Shop from "./pages/shop.tsx";
import AdminDashboard from "./pages/admindashboard.tsx";
import Review from "./pages/review.tsx";
import Shopear from "./pages/earring.tsx";
import Shoprings from "./pages/rings.tsx";
import Shopneck from "./pages/necklace.tsx";

const router = createBrowserRouter(
    [

        {
            path:"/",
            element:<LoginForm/>
        },
        {
            path:"/home",
            element : <HomePage />
        },
        {
            path:"/shop",
            element : <Shop />
        },
        {
            path:"/shope",
            element : <Shopear />
        },
        {
            path:"/shopr",
            element : <Shoprings />
        },
        {
            path:"/shopn",
            element : <Shopneck />
        },

        {
            path:"/admin",
            element : <AdminDashboard/>
        },

        {
            path:"/review/:productId",
            element : <Review/>
        },



    ]
)
function App() {

    return (
        <>
            <RouterProvider router={router}></RouterProvider>
        </>
    )
}
export default App