import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";
import { Nav } from "./Nav";
import { useState } from "react";
import { SearchInput } from "./SearchInput";

export function App() {
  const [query, setQuery] = useState("");

  return (
    <>
      <Flex
        as="header"
        shadow="sm"
        height="4.5rem"
        px={6}
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Link to="/">
            <Heading as="h2" size="lg">
              𝑓(KoL)
            </Heading>
          </Link>
        </Box>
        <Box flexBasis="33%">
          <SearchInput value={query} onChange={setQuery} />
        </Box>
        <Box>
          <Button as={Link} to="/playground">
            Playground
          </Button>
        </Box>
      </Flex>
      <Flex as="main">
        <Nav query={query} />
        <Box p={6} flexGrow={1}>
          <Outlet />
        </Box>
      </Flex>
    </>
  );
}
