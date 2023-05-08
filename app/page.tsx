import Link from "next/link";

export default function Home() {
    // throw new Error("not today buddy")
    return (
        <main>
            <h1>Home Page</h1>
            <p>
                <Link href="/users">Users</Link>
            </p>
        </main>
    )
}
