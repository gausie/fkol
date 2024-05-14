import { Card, CardBody } from "@chakra-ui/react";
import { MathJax } from "better-react-mathjax";
import { MathNode, isConstantNode } from "mathjs";
import { useMemo } from "react";

const Q = "\\mathord{?}";

type Props = {
  node: MathNode | null;
  scope: Record<string, number | undefined>;
  reroller: symbol;
};

export function Expression({ node, scope, reroller }: Props) {
  const result = useMemo(() => {
    if (reroller) reroller;
    try {
      if (!node) return Q;
      const r = node.evaluate(scope);
      if (typeof r !== "number") return Q;
      return r;
    } catch (error) {
      return Q;
    }
  }, [node, scope, reroller]);

  return (
    <Card>
      <CardBody>
        <MathJax
          renderMode="pre"
          typesettingOptions={{ fn: "tex2chtml" }}
          text={
            (isConstantNode(node) && !node.value
              ? Q
              : node?.toTex() ?? "invalid") +
            " = " +
            result
          }
        />
      </CardBody>
    </Card>
  );
}
