import { Input, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { InteractiveExpression } from "./InteractiveExpression";

export function Playground() {
  const [expression, setExpression] = useState("");

  return (
    <Stack>
      <Input
        type="text"
        placeholder="x + 1"
        onChange={(e) => setExpression(e.currentTarget.value)}
      />
      <InteractiveExpression expression={expression} />
    </Stack>
  );
}
