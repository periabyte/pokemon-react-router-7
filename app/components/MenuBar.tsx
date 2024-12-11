import { useState } from "react";
import { Link, NavLink, useLoaderData } from "react-router";
import logo from "../Logo.png";

type Menu = {
    name: string;
    link: string;
};

const menus: Menu[] = [
    {
        name: "Home",
        link: "/",
    },
    {
        name: "Pokédex",
        link: "/pokedex",
    },
];

export default function MenuBar() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const renderMenu = (menu: Menu) => {
        return (
            <NavLink 
                key={`menu-${menu.name}`}
                to={menu.link} 
                prefetch="intent" 
                className="text-xl md:text-base font-medium border-b-2 border-b-transparent my-2 md:my-0 active:border-b-white hover:border-b-white"
            >
                {menu.name}
            </NavLink>
        );
    }

    return (
        <nav className=" bg-primary text-white p-4 w-full sticky z-100">
            <div className="container mx-auto flex flex-row items-center justify-between">
                <header>
                    <Link to="/">
                        <img src={logo} className="h-10"/>
                    </Link>
                </header>
                
                <div className="hidden md:flex md:items-center md:space-x-6">
                    {menus.map((menu) => renderMenu(menu))}
                </div>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="p-2 focus:outline-none">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div
                    className={`origin-top absolute top-[72px] p-4 bg-primary left-0 right-0 transform transition-transform duration-500 ease-in-out ${
    isOpen ? "scale-y-100" : "scale-y-0"
  }`}
            >
                <div className="flex flex-col items-center justify-center h-full">
                    {menus.map((menu) => renderMenu(menu))}
                </div>
            </div>
        </nav>
    )
}