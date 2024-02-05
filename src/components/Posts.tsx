'use client'

import { type Post } from '@/types/database'
import { formatearFecha } from '@/utils/format-date'
import { Link, Image, Button } from '@nextui-org/react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { IconCircleArrowLeft, IconCircleArrowRight } from '@tabler/icons-react'
import { useEffect, useState } from 'react'

const supabase = createClientComponentClient()
const ITEMS_PER_PAGE = 6

export default function Posts() {
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [posts, setPosts] = useState<Post[] | null>([])

    useEffect(() => {
        const fetchPosts = async () => {
            const count = await supabase
                .from('posts')
                .select('*, users(*)')

            const totalPosts = count.data?.length ?? 0

            const { data } = await supabase
                .from('posts')
                .select('*, users(*)')
                .range((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE - 1)

            setTotalPages(Math.ceil(totalPosts / ITEMS_PER_PAGE))
            setPosts(data)
        }

        fetchPosts()
    }, [page])

    const handlePageChange = (newPage: number) => {
        setPage(newPage)
    }

    return (
        <>
            <section className="grid grid-cols-3 gap-20 mt-5">
                {posts !== null
                    ? posts.map((post) => (
                        <article className="flex flex-col w-72 gap-2 border border-transparent rounded-lg pb-4 justify-between" key={post.id}>
                            <img
                                className="rounded-lg max-w-[300px] max-h-[200px]"
                                alt="nextui logo"
                                src={post.imageUrl}
                            />
                            <div className="flex gap-1 mb-1">
                                <p className="font-bold">{post.category}</p>

                                <p>⎼ {formatearFecha(post.created_at)}</p>
                            </div>
                            <div className="text-md font-bold mb-1">
                                <p>{post.title}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Image
                                        alt="avatur_url github"
                                        height={33}
                                        radius="sm"
                                        src={post.users.avatar_url}
                                        width={33}
                                    />
                                    <div className="flex flex-col">
                                        <p className="text-md">{post.users.user_name}</p>
                                    </div>
                                </div>

                                <Link className="mb-2"
                                    href={`/blogs/details?id=${post.id}`}
                                >
                                    <Button className="bg-indigo-500 text-white hover:bg-indigo-600 transition">Leer articulo</Button>
                                </Link>
                            </div>
                        </article>
                    ))
                    : 'No hay posts'
                }
            </section >

            {totalPages >= 0 && (
                <div className="gap-4 flex justify-center mb-10">
                    {/* Puedes implementar tus propios componentes de paginación o simplemente usar botones */}
                    <button onClick={() => { handlePageChange(page - 1) }} disabled={page === 1}>
                        {page === 1 ? <IconCircleArrowLeft className="w-6 h-6" color='#49566c' /> : <IconCircleArrowLeft className="w-6 h-6" />}
                    </button>
                    <span className="text-md">Página {page} de {totalPages}</span>
                    <button onClick={() => { handlePageChange(page + 1) }} disabled={page === totalPages}>
                        {page === totalPages ? <IconCircleArrowRight className="w-6 h-6" color='#49566c' /> : <IconCircleArrowRight className="w-6 h-6" />}
                    </button>
                </div>
            )
            }
        </>
    )
}
