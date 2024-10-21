import { useParams } from "react-router-dom";
import { expressions } from "../expressionDb";
import { InteractiveExpression } from "./InteractiveExpression";
import { Heading, Stack } from "@chakra-ui/react";

export function Expression() {
  const { slug } = useParams<{ slug: string }>();

  const expression = expressions.find((e) => e.slug === slug);

  if (!expression) return "Not found";

  return (
    <Stack>
      <Heading as="h1" size="xl">
        {expression.name}
      </Heading>
      <InteractiveExpression
        expression={expression.expression}
        aliases={expression.aliases}
      />
    </Stack>
  );
}
