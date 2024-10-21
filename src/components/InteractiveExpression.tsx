import { Button, Stack } from "@chakra-ui/react";
import { MathNode, all, create, isFunctionNode } from "mathjs";
import { useCallback, useMemo, useState } from "react";
import { SymbolList } from "./SymbolList";
import { Latex } from "./Latex";

const math = create(all);

function isRandom(node: MathNode) {
  return (
    node.filter((node) => {
      if (!isFunctionNode(node)) return false;
      return ["randomInt", "random"].includes(node.fn.name);
    }).length > 0
  );
}

type Props = {
  expression: string;
  aliases?: Record<string, string>;
};

export function InteractiveExpression({ expression, aliases }: Props) {
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
    <Stack>
      <Latex node={node} scope={scope} reroller={reroller} />
      <SymbolList
        node={node}
        aliases={aliases}
        scope={scope}
        onChangeScope={setScope}
      />
      {showReroll && <Button onClick={reroll}>Reroll random 🎲</Button>}
    </Stack>
  );
}
