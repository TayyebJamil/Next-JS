import { cookies } from "next/headers";

export default function AboutPage() {
    const cookiesStore = cookies();
    const theme = cookiesStore.get("theme");
    console.log(theme);
    console.log("About Server components");
    return <h1>About Page {new Date().toLocaleTimeString()}</h1>
}