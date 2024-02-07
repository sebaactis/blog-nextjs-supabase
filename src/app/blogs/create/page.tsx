'use client'

import { Input, Textarea } from '@nextui-org/react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import FileUpload from '@/components/FileUpload'
import { type FormEvent, useState, useRef } from 'react'
import Link from 'next/link'
import Swal from 'sweetalert2'

const supabase = createClientComponentClient()

export function Page() {
    const form = useRef<HTMLFormElement>(null)
    const [imageUrl, setImageUrl] = useState<string | null>()
    const [post, setPost] = useState({
        title: '',
        category: '',
        content: ''
    })

    const handleChange = (e: any) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        })

        console.log(post)
    }


    const addBlog = async (e: FormEvent) => {
        try {
            e.preventDefault()

            const { data: { session } } = await supabase.auth.getSession()
            const user = session?.user.id
            const { title, category, content } = post

            if (post.title === '' || post.category === '' || post.content === '' || imageUrl === '') return

            form.current?.reset()

            await supabase.from('posts').insert({ title, content, user_id: user, imageUrl, category })

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
        <form onSubmit={addBlog} ref={form} className="flex flex-col justify-center items-center gap-10 h-screen">
            <Input

                type="text"
                label="Titulo"
                className="max-w-xs"
                name='title'
                onChange={handleChange}
            />
            <Input

                type="text"
                label="Categoria"
                className="max-w-xs"
                name='category'
                onChange={handleChange}
            />
            <Textarea

                type="text"
                label="Contenido"
                className="max-w-xs"
                maxRows={100}
                name='content'
                onChange={handleChange}
            />
            <FileUpload setImageUrl={setImageUrl} />
            <button disabled={post.title === '' || post.category === '' || post.content === '' || imageUrl === ''} className="border p-2 rounded-lg bg-indigo-400 hover:bg-indigo-500 transition font-bold">Crear post</button>
            <Link href="/"><button className="border p-2 rounded-lg bg-indigo-400 hover:bg-indigo-500 transition font-bold">Volver al inicio</button></Link>
        </form>
    )
}

export default Page
