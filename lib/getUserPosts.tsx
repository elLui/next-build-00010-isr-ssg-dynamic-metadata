export default async function getUser(userId: string) {



    // ? option: {cache: 'force-cache'} is default
    // ? ISR (Incremental Static Regeneration) is supported by option :: {next: {revalidate: 60}} // 60 seconds
    // ? update to data through revalidation requires a page reload
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`, {next: {revalidate: 60}})
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
}