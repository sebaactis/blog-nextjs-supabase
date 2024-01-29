import React from 'react'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from '@nextui-org/react'

const supabase = createServerComponentClient({ cookies })

export default async function Blogs() {
    const { data: posts } = await supabase.from('posts').select('*, users(*)')

    return (
        <div>
            {
                posts?.map((post) => {
                    return (
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
                                <p>{post.content}</p>
                            </CardBody>
                            <Divider />
                            <CardFooter>
                                <Link
                                    isExternal
                                    showAnchorIcon
                                    href="https://github.com/nextui-org/nextui"
                                >
                                    Visit source code on GitHub.
                                </Link>
                            </CardFooter>
                        </Card>
                    )
                })
            }
        </div>
    )
}

