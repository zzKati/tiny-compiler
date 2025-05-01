import { transformer } from "../src/utils/Transformer"
import { describe, expect, it } from "vitest"
import { NodeType, Parser } from "../src/utils/Parser"
import { TokenType } from "../src/utils/Tokenizer"

describe("parser test", () => {
  it("test all", () => {
    const input = {
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

    const result = {
      type: "Program",
      body: [
        {
          type: "ExpressionStatement",
          expression: {
            type: "CallExpression",
            callee: {
              type: "Identifier",
              name: "add",
              arguments: [
                {
                  type: "NumberLiteral",
                  value: "2",
                },
                {
                  type: "CallExpression",
                  callee: {
                    type: "Identifier",
                    name: "subtract",
                    arguments: [
                      {
                        type: "NumberLiteral",
                        value: "4",
                      },
                      {
                        type: "NumberLiteral",
                        value: "2",
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
      ],
    }

    expect(transformer(input)).toMatchInlineSnapshot(`
      {
        "body": [
          {
            "expression": {
              "arguments": [
                {
                  "type": "NumberLiteral",
                  "value": "2",
                },
                {
                  "arguments": [
                    {
                      "type": "NumberLiteral",
                      "value": "4",
                    },
                    {
                      "type": "NumberLiteral",
                      "value": "2",
                    },
                  ],
                  "callee": {
                    "name": "subtract",
                    "type": "Identifier",
                  },
                  "type": "CallExpression",
                },
              ],
              "callee": {
                "name": "add",
                "type": "Identifier",
              },
              "type": "CallExpression",
            },
            "type": "ExpressionStatement",
          },
        ],
        "type": "Program",
      }
    `)

    expect(transformer(input)).toEqual(result)
  })
})
