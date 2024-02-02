import { Input, Textarea } from '@nextui-org/react'
import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'

const supabase = createServerActionClient({ cookies })


export function Page() {
    const addBlog = async (formData: FormData) => {
        'use server'

        const { data: { session } } = await supabase.auth.getSession()
        const user = session?.user.id

        const title = formData.get('title')
        const content = formData.get('content')

        if (title === '' || content === '') return

        await supabase.from('posts').insert({ title, content, user_id: user })

        redirect('/')
    }


    return (
        <form action={addBlog} className="flex flex-col justify-center items-center gap-2 h-screen">
            <Input

                type="text"
                label="Titulo"
                className="max-w-xs"
                name='title'
            />
            <Textarea

                type="text"
                label="Contenido"
                className="max-w-xs"
                name='content'
            />
            <button>Crear</button>
        </form>
    )
}

export default Page
