import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import NavBarContainer from './NavBarContainer'

const supabase = createServerComponentClient({ cookies })

export async function NavBar() {
    const { data: { session } } = await supabase.auth.getSession()


    return (
        <NavBarContainer session={session} />
    )
}

export default NavBar
