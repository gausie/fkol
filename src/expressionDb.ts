import json from "./expressions.json";

type Expression = {
  name: string;
  slug: string;
  expression: string;
  aliases?: { [key: string]: string };
};

function isExpression(data: any): data is Expression {
  if (!("name" in data)) return false;
  if (!("expression" in data)) return false;
  return true;
}

function jsonTypeGuard(data: any): data is Expression[] {
  if (!Array.isArray(data)) return false;
  return data.every((d) => isExpression(d));
}

if (!jsonTypeGuard(json)) throw new Error("Invalid JSON");

json.sort((a, b) => a.name.localeCompare(b.name));

export const expressions = json as Expression[];
