import Link from 'next/link'
import { Box, Flex, Stack, Text, useDisclosure, Link as ChakraLink, IconButton, Center, Container, Collapse } from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'



export default function Navigation() {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Box bg='brand.blue' paddingY={4} paddingX={3.5} width='100%'>
            <Container maxWidth="6xl">
                <Flex justify='space-between'>
                    <Link href='/' passHref>
                        <ChakraLink fontSize='2xl' color='white' fontWeight={300}>Bitcoin Developers</ChakraLink>
                    </Link>
                        <IconButton
                            onClick={onToggle}
                            icon={
                            isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={6} h={6} />
                            }
                            variant='ghost'
                            aria-label='Toggle Navigation'
                            color='white'
                        />
                </Flex>
            </Container>
            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </Box>
    )
}

const MobileNav = () => {
    return (
        <Stack
            bg="white"
            p={4}
            display={{ md: 'none' }}>
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    );
};

const MobileNavItem = ({ label, href }: NavItem) => {
    const { isOpen, onToggle } = useDisclosure();
  
    return (
      <Stack spacing={4} direction="column" textAlign="center">
          <Text>Test</Text>
      </Stack>
    );
};

interface NavItem {
    label: string;
    href?: string;
}
  
const NAV_ITEMS: Array<NavItem> = [
    {
        label: "Episodes",
        href: "/episodes", 
    },
    {
        label: "About the Show",
        href: "/about-the-show", 
    },
    {
        label: "Schedule",
        href: "/schedule", 
    },
];