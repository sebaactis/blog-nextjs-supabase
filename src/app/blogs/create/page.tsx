'use client'

import { Input, Textarea } from '@nextui-org/react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import FileUpload from '@/components/FileUpload'
import { type FormEvent, useState } from 'react'
import Link from 'next/link'
import Swal from 'sweetalert2'

const supabase = createClientComponentClient()

export function Page() {
    const [title, setTitle] = useState<string | null>()
    const [category, setCategory] = useState<string | null>()
    const [content, setContent] = useState<string | null>()
    const [imageUrl, setImageUrl] = useState<string | null>()

    const addBlog = async (e: FormEvent) => {
        try {
            e.preventDefault()

            const { data: { session } } = await supabase.auth.getSession()
            const user = session?.user.id

            if (title === '' || category === '' || content === '' || imageUrl === '') return

            await supabase.from('posts').insert({ title, content, user_id: user, imageUrl, category })

            setTitle('')
            setCategory('')
            setContent('')
            setImageUrl('')

            Swal.fire({
                title: 'Completado!!',
                text: 'El blog se ha publicado correctamente',
                icon: 'success'
            })
        } catch (error) {
            Swal.fire({
                title: 'Error!!',
                text: 'No se ha podido publicar el blog',
                icon: 'error'
            })
        }
    }


    return (
        <form onSubmit={addBlog} className="flex flex-col justify-center items-center gap-10 h-screen">
            <Input

                type="text"
                label="Titulo"
                className="max-w-xs"
                name='title'
                onChange={(e) => { setTitle(e.target.value) }}
            />
            <Input

                type="text"
                label="Categoria"
                className="max-w-xs"
                name='category'
                onChange={(e) => { setCategory(e.target.value) }}
            />
            <Textarea

                type="text"
                label="Contenido"
                className="max-w-xs"
                maxRows={100}
                name='content'
                onChange={(e) => { setContent(e.target.value) }}
            />
            <FileUpload setImageUrl={setImageUrl} />
            <button disabled={title === '' || category === '' || content === '' || imageUrl === ''} className="border p-2 rounded-lg bg-indigo-400 hover:bg-indigo-500 transition font-bold">Crear post</button>
            <Link href="/"><button className="border p-2 rounded-lg bg-indigo-400 hover:bg-indigo-500 transition font-bold">Volver al inicio</button></Link>
        </form>
    )
}

export default Page
