import { describe, expect, it } from "vitest"
import { Tokenizer, TokenType } from "../src/utils/Tokenizer"

describe("tokenizer test", () => {
  it("test paren", () => {
    let input = "("
    expect(Tokenizer(input)).toEqual([{ type: TokenType.Paren, value: "(" }])
    input = ")"
    expect(Tokenizer(input)).toEqual([{ type: TokenType.Paren, value: ")" }])
  })

  it("test number", () => {
    let input = "2"
    expect(Tokenizer(input)).toEqual([{ type: TokenType.Number, value: "2" }])

    input = "22"
    expect(Tokenizer(input)).toEqual([{ type: TokenType.Number, value: "22" }])
  })

  it("test name", () => {
    let input = "add"
    expect(Tokenizer(input)).toEqual([{ type: TokenType.Name, value: "add" }])

    input = "subtract"
    expect(Tokenizer(input)).toEqual([
      { type: TokenType.Name, value: "subtract" },
    ])
  })

  it("test all", () => {
    const result = [
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

    expect(Tokenizer("(add 2 (subtract 4 2))")).toEqual(result)
  })
})
