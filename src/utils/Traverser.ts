import { visitor } from "./Visitor"
import { Node, NodeType } from "./Parser"

export const Traverser = (ast: Node, visitor: visitor) => {
  function traverseArray(array: Node[], parent: Node | null) {
    array.forEach(node => {
      traverseNode(node, parent)
    })
  }

  function traverseNode(node: Node, parent: Node | null) {
    const methods = visitor[node.type]

    // 调用该类型node的enter方法
    if (methods && !!methods.enter) {
      methods.enter(node, parent)
    }

    switch (node.type) {
      case NodeType.Program:
        traverseArray(node.body!, node)
        break
      case NodeType.CallExpression:
        traverseArray(node.params!, node)
        break
      case NodeType.NumberLiteral:
      case NodeType.StringLiteral:
        break
      default:
        throw new Error("unknown type")
    }

    if (methods && !!methods.exit) {
      methods.exit(node, parent)
    }
  }

  traverseNode(ast, null)
}
