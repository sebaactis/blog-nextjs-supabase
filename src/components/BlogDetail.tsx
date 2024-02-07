import { type Post } from '@/types/database'
import { Button } from '@nextui-org/react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import { useEffect } from 'react'
import Loader from './blog-loader'

const supabase = createClientComponentClient()

interface Props {
    blog: Post | null
    setBlog: (blog: Post) => void
    id: string | null
}

function BlogDetail({ blog, setBlog, id }: Props) {
    useEffect(() => {
        const fetchBlog = async () => {
            setTimeout(async () => {
                const response = await supabase.from('posts').select('*, users(user_name, avatar_url)').eq('id', id)
                const blog: Post = response.data !== null && response.data.length > 0 ? response.data[0] : null
                setBlog(blog)
            }, 500)
        }

        fetchBlog()
    }, [])


    if (blog === null) {
        return (
            <Loader />
        )
    }
    return (
        <article className="m-auto flex flex-col items-center border rounded-md" >
            <div className="flex flex-col items-center pb-[50px] w-[700px]">
                <img
                    className="rounded-sm h-fit"
                    alt="nextui logo"
                    src={blog?.imageUrl}
                />
                <div>
                    <h1 className="text-2xl mt-6 text-wrap text-center uppercase">{blog?.title}</h1>
                </div>
            </div>
            <p className="text-md text-center max-w-[500px] pb-[10rem] h-fit">{blog?.content}</p>
            <div className="w-full m-auto flex justify-center py-3">
                <Link href="/">
                    <Button >Volver al inicio</Button>
                </Link>
            </div>
        </article >
    )
}

export default BlogDetail
