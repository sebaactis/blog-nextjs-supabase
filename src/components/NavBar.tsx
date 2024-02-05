import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'
import Link from 'next/link'

export function NavBar() {
    return (
        <nav>
            <Navbar className="bg-sky-700">
                <NavbarBrand>
                    <p className="font-bold text-black">Blogs.NextJS</p>
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarItem>
                        <p className="text-black"> Varios Blogs hechos con NextJS </p>
                    </NavbarItem>
                    <Link href="http://localhost:3000/blogs/create"><button className="border p-2 rounded-lg bg-rose-400 hover:bg-rose-500 transition font-bold border-transparent"> Create NEW </button> </Link>
                </NavbarContent>
            </Navbar>
        </nav>
    )
}

export default NavBar
