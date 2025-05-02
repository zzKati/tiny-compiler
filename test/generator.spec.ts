import { describe, expect, it } from "vitest"
import { generator } from "../src/utils/CodeGenerator"

describe("parser test", () => {
  it("test all", () => {
    const input = {
      type: "Program",
      body: [
        {
          type: "ExpressionStatement",
          expression: {
            type: "CallExpression",
            callee: {
              type: "Identifier",
              name: "add",
            },
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
                },
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
            ],
          },
        },
      ],
    }

    expect(generator(input)).toMatchInlineSnapshot(`"add(2,subtract(4,2));"`)
    expect(generator(input)).toBe("add(2,subtract(4,2));")
  })
})
