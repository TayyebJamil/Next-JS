"use client"
import { link } from "fs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./styles.css";
import { useState } from "react";

const navlinks = [
    { name: "Register", href: "/register" },
    { name: "Login", href: "/login" },
    { name: "Forget Password", href: "/forgot-password" },
]
export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [input, setInput] = useState("");
    return (
        <>
            <div>
                <input value={input} onChange={(e) => setInput(e.target.value)} />
            </div>
            {navlinks.map((link) => {
                const isActive = pathname.startsWith(link.href);
                return (
                    <>
                        <Link
                            href={link.href}
                            key={link.name}
                            className={isActive ? "font-bold mr-4" : "text-blue-500 mr-4 "}
                        >{link.name}</Link>

                    </>
                );
            })}

            {children}
        </>
    );


}