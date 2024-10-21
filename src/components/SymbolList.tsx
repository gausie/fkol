import {
  InputGroup,
  InputLeftAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
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
  aliases?: Record<string, string>;
  onChangeScope: (scope: Record<string, number | undefined>) => void;
};

export function SymbolList({
  node,
  scope,
  aliases = {},
  onChangeScope,
}: Props) {
  const symbols = useMemo(() => (node ? getSymbols(node) : []), [node]);

  return symbols.map((symbol) => (
    <InputGroup key={symbol}>
      <InputLeftAddon>{aliases[symbol] ?? symbol} =</InputLeftAddon>
      <NumberInput
        width="100%"
        value={scope[symbol] ?? ""}
        onChange={(value) => {
          onChangeScope({ ...scope, [symbol]: Number(value) || undefined });
        }}
      >
        <NumberInputField borderLeftRadius={0} />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </InputGroup>
  ));
}
