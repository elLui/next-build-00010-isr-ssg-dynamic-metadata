import Link from "next/link";
import getUser from "@/lib/getUser";
import getUserPosts from "@/lib/getUserPosts";
import UserPosts from "@/app/users/[userId]/components/UserPosts";
import {Suspense} from "react";


type Params = {
    params: {
        userId: string
    }
}


export default async function UserPage({params: {userId}}: Params) {


    const userData: Promise<User> = getUser(userId);
    const userPostsData: Promise<Post[]> = getUserPosts(userId);


    // implement Promise.all to fetch both user and userPosts in parallel
    // const [user, userPosts] = await Promise.all([userData, userPostsData]);


const user = await userData;


    return (
        <>
            <h2>
                <Link href={"/"}>Back to home</Link>
            </h2>
            <h3>User : {user.name}</h3>
            <br/>
            <Suspense fallback={<h2>Loading...</h2>} >
                {/* @ts-expect-error Server Component */}
            <UserPosts promise={userPostsData}/>
            </Suspense>
        </>
    )
}