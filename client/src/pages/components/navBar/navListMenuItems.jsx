import { FaXRay } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi2";
import { IoDocumentTextOutline } from "react-icons/io5";
import { RiAdminLine } from "react-icons/ri";
import { useAuthContext } from "../../../hooks/useAuthContext";

 export const NavListMenuItems = () => {
    const { user } = useAuthContext();

    const commonMenuItems = [
        {
            id: 2,
            title: "About Us",
            href: "/about",
            description: "Meet and learn about our dedication",
            icon: HiUserGroup,
        },
        {
            id: 4,
            title: "Docs",
            href: "http://localhost:8000/",
            description: "Backend API documentation",
            icon: IoDocumentTextOutline,
        },
         ]


    if (user) {
        return ([
            {
                id: 1,
                title: "Exams",
                href: "/exam",
                description: "Look at all the data, from the database",
                icon: FaXRay,
            },
            ...commonMenuItems,
            {
                id: 3,
                title: "Admin",
                href: "/admin",
                description: "Find the perfect solution for your needs.",
                icon: RiAdminLine,
            },
            
        ])
    } else {
       return commonMenuItems
       
    }
   
}





