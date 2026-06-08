import { Link } from "react-router"

interface NavbarProps {
    isAdmin: boolean
}

export default function Navbar(isAdmin: NavbarProps) {
    return (
        <>
            {isAdmin && (
                <nav className="">

                </nav>
            )}
            <nav className="">
                <ul className="flex">
                    <Link to="/"><li>Home</li></Link>
                    <Link to="/login"><li>Logar</li></Link>
                </ul>
            </nav >
        </>
    )
}