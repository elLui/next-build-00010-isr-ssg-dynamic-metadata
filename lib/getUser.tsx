export default async function getUser(userId: string) {


    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)


    // having this return undefined instead of throwing an error allows us to use this function in a Suspense boundary
    // also, it allows the app to continue to a 404 page if the user is not found
    // if (!res.ok) throw new Error(res.statusText);
    if (!res.ok) return undefined;

    return res.json();
}