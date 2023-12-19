import Footer from "@/component/layout/footer";
import Header from "@/component/layout/header/header";
import { ApolloWrapper } from "@/shared/lib/apollo-wrapper";
import "bootstrap/dist/css/bootstrap.min.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Movie Recommendation",
    description: "This is the project following FFW's test",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Header />
                <ApolloWrapper>
                    <div
                        style={{
                            minHeight: "calc(100vh - 100px)",
                        }}
                    >
                        {children}
                    </div>
                </ApolloWrapper>
                <Footer />
            </body>
        </html>
    );
}
