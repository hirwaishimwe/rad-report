import "./NavBar.css";

import {
    Button,
    Collapse,
    IconButton,
    List,
    ListItem,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
    Navbar,
    Typography,
} from "@material-tailwind/react";

import React from "react";
import { FaChevronDown } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { navListMenuItems } from "./navListMenuItems";

function NavListMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const renderItems = navListMenuItems.map(
        ({ id, icon: Icon, title, description, href }) => (
            <MenuItem key={id}>
                <Link to={href} onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center bg-blue-gray-50 p-2 rounded-md">
                            <Icon
                                strokeWidth={2}
                                className="h-6 text-gray-900 w-6"
                            />
                        </div>
                        <div>
                            <Typography
                                variant="h6"
                                color="blue-gray"
                                className="flex items-center text-sm font-bold"
                            >
                                {title}
                            </Typography>
                            <Typography
                                variant="paragraph"
                                className="text-xs font-medium text-blue-gray-500"
                            >
                                {description}
                            </Typography>
                        </div>
                    </div>
                </Link>
            </MenuItem>
        ),
    );

    return (
        <React.Fragment>
            <Menu
                open={isMenuOpen}
                handler={setIsMenuOpen}
                offset={{ mainAxis: 20 }}
                placement="bottom"
                allowHover={true}
            >
                <MenuHandler>
                    <Typography
                        as="div"
                        variant="small"
                        className="font-medium"
                    >
                        <ListItem
                            className="flex items-center gap-2 py-2 pr-4 font-medium text-gray-900"
                            selected={isMenuOpen || isMobileMenuOpen}
                            onClick={() => setIsMobileMenuOpen((cur) => !cur)}
                        >
                            Resources
                            <FaChevronDown
                                strokeWidth={2.5}
                                className={`hidden h-3 w-3 transition-transform lg:block ${
                                    isMenuOpen ? "rotate-180" : ""
                                }`}
                            />
                            <FaChevronDown
                                strokeWidth={2.5}
                                className={`block h-3 w-3 transition-transform lg:hidden ${
                                    isMobileMenuOpen ? "rotate-180" : ""
                                }`}
                            />
                        </ListItem>
                    </Typography>
                </MenuHandler>
                <MenuList className="hidden max-w-screen-xl  lg:block">
                    <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
                        {renderItems}
                    </ul>
                </MenuList>
            </Menu>
            <div className="block lg:hidden">
                <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
            </div>
        </React.Fragment>
    );
}

function NavList() {
    return (
        <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
            <NavListMenu />
        </List>
    );
}

export function NavbarWithMegaMenu() {
    const [openNav, setOpenNav] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    return (
        <Navbar className="mx-auto max-w-9xl px-4 py-5">
            <div className="flex items-center justify-between text-blue-gray-900">
                <Typography
                    as="a"
                    href="#"
                    variant="h6"
                    className="mr-4 cursor-pointer py-1.5 lg:ml-2"
                >
                    <Link to="/">Rad-Report</Link>
                </Typography>
                <div className="hidden lg:block">
                    <NavList />
                </div>
                <div className="hidden gap-2 lg:flex">
                    <Button variant="text" size="sm" color="blue-gray">
                        <Link to="/login"> Log In </Link>
                    </Button>
                    <Button variant="gradient" size="sm">
                        <Link to="/register"> Register </Link>
                    </Button>
                </div>
                <IconButton
                    variant="text"
                    color="blue-gray"
                    className="lg:hidden"
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <FaXmark className="h-6 w-6" strokeWidth={2} />
                    ) : (
                        <GiHamburgerMenu className="h-6 w-6" strokeWidth={2} />
                    )}
                </IconButton>
            </div>
            <Collapse open={openNav}>
                <NavList />
                <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
                    <Button
                        variant="outlined"
                        size="sm"
                        color="blue-gray"
                        fullWidth
                    >
                        <Link href="/login"> Log In</Link>
                    </Button>
                    <Button variant="gradient" size="sm" fullWidth>
                        <Link href="/register"> register</Link>
                    </Button>
                </div>
            </Collapse>
        </Navbar>
    );
}
