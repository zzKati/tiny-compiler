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
    enter(node, parent) {
      let expression: any = {
        type: "CallExpression",
        callee: {
          type: "Identifier",
          name: node.name,
        },
        arguments: [],
      }

      node._context = expression.arguments

      if (parent?.type !== NodeType.CallExpression) {
        // 说明 这个 expression 是顶层的
        expression = {
          type: "ExpressionStatement",
          expression,
        }
      }

      parent?._context.push(expression)
    },
    exit(node, parent) {},
  },
  [NodeType.NumberLiteral]: {
    enter(node, parent) {
      parent?._context.push({
        type: "NumberLiteral",
        value: node.value,
      })
    },
    exit(node, parent) {},
  },
  [NodeType.StringLiteral]: {
    enter(node, parent) {
      parent?._context.push({
        type: "StringLiteral",
        value: node.value,
      })
    },
    exit(node, parent) {},
  },
}
