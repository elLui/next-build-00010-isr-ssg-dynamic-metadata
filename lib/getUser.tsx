export default async function getUser(userId: string) {


    const res = await fetch("")

    if (!res.ok) throw new Error(res.statusText);
    return res.json();
}