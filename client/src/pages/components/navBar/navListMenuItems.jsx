import { FaXRay } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi2";
import { IoDocumentTextOutline } from "react-icons/io5";
import { RiAdminLine } from "react-icons/ri";

export const navListMenuItems = [
    {
        id: 1,
        title: "Exams",
        href: "/",
        description: "Look at all the data, from the database",
        icon: FaXRay,
    },
    {
        id: 2,
        title: "About Us",
        href: "/about",
        description: "Meet and learn about our dedication",
        icon: HiUserGroup,
    },
    {
        id: 3,
        title: "Admin",
        href: "/admin",
        description: "Find the perfect solution for your needs.",
        icon: RiAdminLine,
    },
    {
        id: 4,
        title: "Docs",
        href: "http://localhost:8000/",
        description: "Backend API documentation",
        icon: IoDocumentTextOutline,
    },
];
