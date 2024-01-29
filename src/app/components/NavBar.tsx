import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'

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
                </NavbarContent>
            </Navbar>
        </nav>
    )
}

export default NavBar
