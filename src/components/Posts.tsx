'use client'

import { type Post } from '@/types/database'
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from '@nextui-org/react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { IconCircleArrowLeft, IconCircleArrowRight } from '@tabler/icons-react'
import { useEffect, useState } from 'react'

const supabase = createClientComponentClient()
const ITEMS_PER_PAGE = 2

export default function Posts() {
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [posts, setPosts] = useState<Post[] | null>([])


    useEffect(() => {
        const fetchPosts = async () => {
            const count = await supabase
                .from('posts')
                .select('*, users(*)')

            const countDataLength = count.data?.length ?? 0

            const { data } = await supabase
                .from('posts')
                .select('*, users(*)')
                .range((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE - 1)

            setTotalPages(countDataLength)
            setPosts(data)
        }

        fetchPosts()
    }, [page])

    const handlePageChange = (newPage: number) => {
        setPage(newPage)
    }

    return (
        <div>
            {posts !== null
                ? posts.map((post) => (
                    <Card key={post.id} className="max-w-[400px] my-3">
                        <CardHeader className="flex gap-3">
                            <Image
                                alt="nextui logo"
                                height={40}
                                radius="sm"
                                src={post.users.avatar_url}
                                width={40}
                            />
                            <div className="flex flex-col">
                                <p className="text-md">{post.users.user_name}</p>
                            </div>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                            <p>{post.title}</p>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                            <Link
                                showAnchorIcon
                                href={`/blogs/details?id=${post.id}`}
                            >
                                Ver el blog en detalle
                            </Link>
                        </CardFooter>
                    </Card>
                ))
                : 'No hay posts'
            }

            {totalPages >= 0 && (
                <div className="gap-4 flex justify-center">
                    {/* Puedes implementar tus propios componentes de paginación o simplemente usar botones */}
                    <button onClick={() => { handlePageChange(page - 1) }} disabled={page === 1}>
                        {page === 1 ? <IconCircleArrowLeft className="w-6 h-6" color='#49566c' /> : <IconCircleArrowLeft className="w-6 h-6" />}
                    </button>
                    <span className="text-md">Página {page} de {totalPages}</span>
                    <button onClick={() => { handlePageChange(page + 1) }} disabled={page === totalPages}>
                        {page === totalPages ? <IconCircleArrowRight className="w-6 h-6" color='#49566c' /> : <IconCircleArrowRight className="w-6 h-6" />}
                    </button>
                </div>
            )}
        </div>
    )
}
