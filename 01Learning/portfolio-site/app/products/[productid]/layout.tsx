import React, { Children } from "react";

export default function ProductDetailLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
            <h2>Layout Features products</h2>
        </>
    );


}