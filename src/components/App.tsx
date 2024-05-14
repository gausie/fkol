import { Button, Container, Heading, Input, Stack } from "@chakra-ui/react";
import { MathNode, all, create, isFunctionNode } from "mathjs";
import { useCallback, useMemo, useState } from "react";
import { SymbolList } from "./SymbolList";
import { Expression } from "./Expression";

const math = create(all);

function isRandom(node: MathNode) {
  return (
    node.filter((node) => {
      if (!isFunctionNode(node)) return false;
      return ["randomInt", "random"].includes(node.fn.name);
    }).length > 0
  );
}

function App() {
  const [expression, setExpression] = useState("");
  const [scope, setScope] = useState<Record<string, number | undefined>>({});

  const node = useMemo(() => {
    try {
      return math.parse(expression);
    } catch (error) {
      return null;
    }
  }, [expression]);

  const showReroll = useMemo(() => node && isRandom(node), [node]);
  const [reroller, setReroller] = useState<symbol>(Symbol());
  const reroll = useCallback(() => setReroller(Symbol()), []);

  return (
    <Container pt={5}>
      <Stack>
        <Heading textAlign="center">Interactive Expressions</Heading>
        <Input
          type="text"
          placeholder="x + 1"
          onChange={(e) => setExpression(e.currentTarget.value)}
        />
        <Expression node={node} scope={scope} reroller={reroller} />
        <SymbolList node={node} scope={scope} onChangeScope={setScope} />
        {showReroll && <Button onClick={reroll}>Reroll random 🎲</Button>}
      </Stack>
    </Container>
  );
}

export default App;
