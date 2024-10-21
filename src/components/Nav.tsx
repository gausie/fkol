import { Box, ListItem, UnorderedList } from "@chakra-ui/react";
import { expressions } from "../expressionDb";
import { Link } from "react-router-dom";
import { matchSorter } from "match-sorter";
import { useMemo } from "react";

type Props = {
  query?: string;
};

export function Nav({ query = "" }: Props) {
  const searched = useMemo(
    () =>
      matchSorter(expressions, query, {
        keys: ["name", "description", "slug"],
      }),
    [query],
  );

  return (
    <Box
      as="nav"
      width="280px"
      height="calc(100vh - 4.5rem)"
      paddingTop={4}
      paddingLeft={6}
      paddingRight={8}
      paddingBottom={6}
      overflow="auto"
      overscrollBehavior="contain"
    >
      <UnorderedList listStyleType="none" fontSize="sm">
        {searched.map((e) => (
          <ListItem py={1}>
            <Link to={`/e/${e.slug}`}>{e.name}</Link>
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
}
