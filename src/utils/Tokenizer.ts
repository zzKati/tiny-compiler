export enum TokenType {
  Paren, // 括号
  Number, // 数字
  String, // 字符
  Name, // 操作符
}

export type Token = {
  type: TokenType
  value: string
}

export const Tokenizer = (input: string) => {
  let current = 0
  const tokens: Token[] = []

  while (current < input.length) {
    let char = input[current]

    if (char === "(" || char === ")") {
      tokens.push({
        type: TokenType.Paren,
        value: char,
      })
      current++
      continue
    }

    const numberRegex = /[0-9]/

    if (numberRegex.test(char)) {
      let value = ""
      while (numberRegex.test(char) && current < input.length) {
        value += char
        char = input[++current]
      }

      tokens.push({
        type: TokenType.Number,
        value,
      })
      continue
    }

    const nameRegex = /[a-z]/

    if (nameRegex.test(char)) {
      let value = ""
      while (nameRegex.test(char) && current < input.length) {
        value += char
        char = input[++current]
      }

      tokens.push({
        type: TokenType.Name,
        value,
      })
      continue
    }

    const blankRegex = /\s/

    if (blankRegex.test(char)) {
      current++
      continue
    }

    throw new Error("unknown char type")
  }

  return tokens
}
