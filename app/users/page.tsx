import React from 'react'
import {Metadata} from "next";
import getAllUsers from "@/lib/getAllUsers";
import Link from "next/link";


export const metadata: Metadata = {
    title: 'Users',
    description: 'Users',

}

export default async function Users() {

    const usersData: Promise<User[]> = getAllUsers();

    const users = await usersData;


    return (
        <section>
            <h2>
                <Link href={"/"}>Back to home</Link>
            </h2>
            <br/>
            {users.map((user: User) => {
                return (
                    <>
                        <p key={user.id}>
                            <Link href={`/users/${user.id}`}>{user.name}</Link>
                        </p>
                        <br/>
                    </>
                )
            })

            }
        </section>
    );

}


export async function generateStaticParams() {
    const usersData: Promise<User[]> = getAllUsers();

    const users = await usersData;

    // params should be strings :: since our type is number, we need to convert it to string
    return users.map(user => ({
        userId: user.id.toString()

    }))

}
