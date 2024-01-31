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
                    <Link href="blogs/create"><button> Create NEW </button> </Link>
                </NavbarContent>
            </Navbar>
        </nav>
    )
}

export default NavBar
