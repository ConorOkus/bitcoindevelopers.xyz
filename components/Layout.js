import { Heading } from "@chakra-ui/react";

export default function Layout({ children }) {
    return (
        <div>
        <Heading>Bitcoin Developers</Heading>
        {children}
        </div>
    );
}