import { Node, NodeType } from "./Parser"

export type visitor = {
  [key in NodeType]: {
    enter: (node: Node, parent: Node | null) => void
    exit: (node: Node, parent: Node | null) => void
  }
}

export const Visitor: visitor = {
  [NodeType.Program]: {
    enter(node, parent) {},
    exit(node, parent) {},
  },
  [NodeType.CallExpression]: {
    enter(node, parent) {},
    exit(node, parent) {},
  },
  [NodeType.NumberLiteral]: {
    enter(node, parent) {},
    exit(node, parent) {},
  },
  [NodeType.StringLiteral]: {
    enter(node, parent) {},
    exit(node, parent) {},
  },
}
