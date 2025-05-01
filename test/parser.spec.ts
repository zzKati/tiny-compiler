import { describe, expect, it } from "vitest"
import { NodeType, Parser } from "../src/utils/Parser"
import { TokenType } from "../src/utils/Tokenizer"

describe("parser test", () => {
  it("test all", () => {
    const input = [
      { type: TokenType.Paren, value: "(" },
      { type: TokenType.Name, value: "add" },
      { type: TokenType.Number, value: "2" },
      { type: TokenType.Paren, value: "(" },
      { type: TokenType.Name, value: "subtract" },
      { type: TokenType.Number, value: "4" },
      { type: TokenType.Number, value: "2" },
      { type: TokenType.Paren, value: ")" },
      { type: TokenType.Paren, value: ")" },
    ]
    const result = {
      type: NodeType.Program,
      body: [
        {
          type: NodeType.CallExpression,
          name: "add",
          params: [
            {
              type: NodeType.NumberLiteral,
              value: "2",
            },
            {
              type: NodeType.CallExpression,
              name: "subtract",
              params: [
                {
                  type: NodeType.NumberLiteral,
                  value: "4",
                },
                {
                  type: NodeType.NumberLiteral,
                  value: "2",
                },
              ],
            },
          ],
        },
      ],
    }

    expect(Parser(input)).toEqual(result)
  })
})
