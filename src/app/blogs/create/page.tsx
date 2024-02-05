'use client'

import { Input, Textarea } from '@nextui-org/react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import FileUpload from '@/components/FileUpload'
import { useState } from 'react'

const supabase = createClientComponentClient()

export function Page() {
    const [title, setTitle] = useState<string | null>()
    const [content, setContent] = useState<string | null>()
    const [imageUrl, setImageUrl] = useState<string | null>()

    const addBlog = async (e: any) => {
        e.preventDefault()

        const { data: { session } } = await supabase.auth.getSession()
        const user = session?.user.id

        if (title === '' || content === '' || imageUrl === '') return

        await supabase.from('posts').insert({ title, content, user_id: user, imageUrl })

        redirect('/')
    }


    return (
        <form onSubmit={addBlog} className="flex flex-col justify-center items-center gap-2 h-screen">
            <Input

                type="text"
                label="Titulo"
                className="max-w-xs"
                name='title'
                onChange={(e) => { setTitle(e.target.value) }}
            />
            <FileUpload setImageUrl={setImageUrl} />
            <Textarea

                type="text"
                label="Contenido"
                className="max-w-xs"
                name='content'
                onChange={(e) => { setContent(e.target.value) }}
            />
            <button>Crear</button>
        </form>
    )
}

export default Page
