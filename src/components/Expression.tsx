import "katex/dist/katex.min.css";
import { Card, CardBody } from "@chakra-ui/react";
import Latex from "react-latex-next";
import { MathNode, isConstantNode } from "mathjs";
import { useMemo } from "react";

const Q = "\\mathord{?}";

type Props = {
  node: MathNode | null;
  scope: Record<string, number | undefined>;
  reroller: symbol;
};

export function Expression({ node, scope, reroller }: Props) {
  const rhs = useMemo(() => {
    try {
      if (!node) return Q;
      const r = node.evaluate(scope);
      if (typeof r !== "number") return Q;
      return r;
    } catch (error) {
      return Q;
    }
  }, [node, scope, reroller]);

  const full = useMemo(() => {
    const lhs = !isConstantNode(node) || node.value ? node?.toTex() : Q;
    if (!lhs) return "$$invalid$$";
    return `$$${lhs} = ${rhs}$$`;
  }, [node, rhs]);

  return (
    <Card>
      <CardBody>
        <Latex>{full}</Latex>
      </CardBody>
    </Card>
  );
}
