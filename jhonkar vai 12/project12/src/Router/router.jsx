import { createBrowserRouter } from "react-router-dom";
import Course from "../Components/Course";
import Home from "../Components/Home";
import Instractor from "../Components/Instractor";
import Main from "../Components/Main";
import NotFound from "../Components/NotFound";
import SingleCourse from "../Components/SingleCourse";
import AllCourse from "../Dashbord/AllCourse";
import Dashbord from "../Dashbord/Dashbord";
import EditCourse from "../Dashbord/EditCourse";
import MyClass from "../Dashbord/MyClass";
import NewCourse from "../Dashbord/NewCourse";
import Payment from "../Dashbord/Payment";
import PaymentSuccess from "../Dashbord/PaymentSuccess";
import SelectCourse from "../Dashbord/SelectCourse";
import Users from "../Dashbord/Users";
import Login from "../Pages/Login";
import Reg from "../Pages/Reg";




const router = createBrowserRouter(
    [
        {
            path:'/',
            element:<Main></Main>,
            children:[
                {
                    path:'/',
                    element:<Home/>
                },
                {
                    path:'/course',
                    element:<Course/>
                },
                {
                    path:'/course/:id',
                    element:<SingleCourse/>,
                    loader:({params})=> fetch(`https://project12server-programmingherorubel.vercel.app/newcourse/${params.id}`)
                },
                {
                    path:'/login',
                    element:<Login/>
                },
                {
                    path:'/reg',
                    element:<Reg/>
                },
                {
                    path:'/instructor',
                    element:<Instractor/>
                },
            ]
        },
        {
            path:'/dashbord',
            element:<Dashbord/>,
            children:[
                {
                    path:'/dashbord/myclass',
                    element:<MyClass/>
                },
                {
                    path:'/dashbord/course',
                    element:<NewCourse/>
                },
                {
                    path:'/dashbord/users',
                    element: <Users/>
                },
                {
                    path:'/dashbord/allcours',
                    element:<AllCourse/>
                },
                {
                    path:'/dashbord/edit/:id',
                    element:<EditCourse/>
                },
                {
                    path:'/dashbord/selectcourse',
                    element:<SelectCourse/>
                },
                {
                    path:'/dashbord/pyment/:id',
                    element:<Payment/>,
                    loader:({params})=>fetch(`https://project12server-programmingherorubel.vercel.app/addtocart/payment/${params.id}`)
                },
                {
                    path:'/dashbord/success',
                    element:<PaymentSuccess/>,
                },
                
            ]
        },

       {
        path:'*',
        element:<NotFound></NotFound>
       }
        
        
    ]
)
export default router



