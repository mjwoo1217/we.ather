import logo from "../assets/logo.png"
import {useState} from "react";
import { MdMenuOpen } from "react-icons/md";
import { MdMenu } from "react-icons/md";
import {LINKS} from "../constants";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return <nav className="border-b-2">
        <div className="flex justify-between items-center py-4">
            <img src={logo} width={150} height={15} alt="logo"/>


            <div className="md:hidden">
                <button onClick={toggleMenu} className="text-3xl pr-2
                focus:outline-none" aria-label={isOpen ? "Close menu" : "Open menu"}>
                    {isOpen ? <MdMenuOpen /> : <MdMenu  /> }
                </button>
            </div>

            <div className="hidden md:flex space-x-8 md:space-x-4 pr-2">
                {LINKS.map((link, index) => (
                    <a key={index} href={link.link} className="uppercase text-sm font-medium">
                        {link.name}
                    </a>
                ))}
            </div>
        </div>

        <div className={
            `${isOpen ? "block" : "hidden"} md:hidden absolute bg-neutral-50
            py-4 px-4 mt-2 border-b-4 w-10/12`}  >
                {LINKS.map((link, index) => (
                    <a key={index} href={link.link} className="uppercase text-lg font-medium block py-2 tracking-wide">
                        {link.name}
                    </a>
                ))}
        </div>
    </nav>
}
export default Navbar
