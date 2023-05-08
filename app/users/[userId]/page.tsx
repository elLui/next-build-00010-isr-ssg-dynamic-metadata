import Link from "next/link";
import getUser from "@/lib/getUser";
import getUserPosts from "@/lib/getUserPosts";
import UserPosts from "@/app/users/[userId]/components/UserPosts";
import {Suspense} from "react";
import {Metadata} from "next";


import {notFound} from 'next/navigation';


type Params = {
    params: {
        userId: string
    }
}

export async function generateMetadata({params: {userId}}: Params): Promise<Metadata> {
    const userData: Promise<User> = getUser(userId);
    const user: User = await userData;

    if (!user) {

        return {
            title: "User not found",
        }
    }

    return {
        title: user.name,
        description: `Posts by: ${user.name}`
    }
}


export default async function UserPage({params: {userId}}: Params) {


    const userData: Promise<User> = getUser(userId);
    const userPostsData: Promise<Post[]> = getUserPosts(userId);


    // in lieu of Promise.all we have decided to use Suspense boundary to fetch both user and userPosts in parallel -
    // the commented code below is the original code that uses Promise.all and is completely valid -
    // implement Promise.all to fetch both user and userPosts in parallel
    // const [user, userPosts] = await Promise.all([userData, userPostsData]);


    const user = await userData;

    if (!user.name) {
        return notFound();
    }


    return (
        <>
            <h2>
                <Link href={"/"}>Back to home</Link>
            </h2>
            <h3>User : {user.name}</h3>
            <br/>
            <Suspense fallback={<h2>Loading...</h2>}>
                {/* @ts-expect-error Server Component */}
                <UserPosts promise={userPostsData}/>
            </Suspense>
        </>
    )
}