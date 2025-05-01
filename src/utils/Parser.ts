import { Token, TokenType } from "./Tokenizer"

export enum NodeType {
  NumberLiteral,
  StringLiteral,
  CallExpression,
  Program,
}

export type Node = {
  type: NodeType
  value?: string
  name?: string
  params?: Node[]
  body?: Node[]
}

export const Parser = (Tokens: Token[]) => {
  let current = 0

  const walk = (): Node => {
    let token = Tokens[current]

    if (token.type === TokenType.Number) {
      current++
      return {
        type: NodeType.NumberLiteral,
        value: token.value,
      }
    }

    if (token.type === TokenType.String) {
      current++
      return {
        type: NodeType.StringLiteral,
        value: token.value,
      }
    }

    if (token.type === TokenType.Paren && token.value === "(") {
      token = Tokens[++current]
      const node: Node = {
        type: NodeType.CallExpression,
        name: token.value,
        params: [],
      }
      token = Tokens[++current]

      while (
        token.type !== TokenType.Paren ||
        (token.type === TokenType.Paren && token.value !== ")")
      ) {
        node.params?.push(walk())
        token = Tokens[current]
      }

      current++

      return node
    }

    throw new Error(`unknow type ${token.type}`)
  }

  const AST: Node = {
    type: NodeType.Program,
    body: [],
  }

  while (current < Tokens.length) {
    AST.body?.push(walk())
  }

  return AST
}
