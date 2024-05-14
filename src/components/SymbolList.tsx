import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { MathNode, isFunctionNode, isSymbolNode } from "mathjs";
import { useMemo } from "react";

function getSymbols(node: MathNode) {
  const symbols = node
    .filter((node, _path, parent) => {
      // Filter out non-symbol nodes.
      if (!isSymbolNode(node)) return false;
      // The name of a function itself is a symbols, so filter them out too.
      if (isFunctionNode(parent) && parent.fn.name === node.name) return false;
      return true;
    })
    .map((n) => n.toString());

  return [...new Set(symbols)];
}

type Props = {
  node: MathNode | null;
  scope: Record<string, number | undefined>;
  onChangeScope: (scope: Record<string, number | undefined>) => void;
};

export function SymbolList({ node, scope, onChangeScope }: Props) {
  const symbols = useMemo(() => (node ? getSymbols(node) : []), [node]);

  return symbols.map((symbol) => (
    <InputGroup key={symbol}>
      <InputLeftAddon>{symbol} =</InputLeftAddon>
      <Input
        value={scope[symbol] ?? ""}
        onChange={(e) => {
          const value = e.currentTarget.value;
          onChangeScope({ ...scope, [symbol]: Number(value) || undefined });
        }}
        type="number"
      />
    </InputGroup>
  ));
}
