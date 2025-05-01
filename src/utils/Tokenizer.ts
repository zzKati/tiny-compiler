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

    const numberRegx = /[0-9]/

    if (numberRegx.test(char)) {
      let value = ""
      while (numberRegx.test(char) && current < input.length) {
        value += char
        char = input[++current]
      }

      tokens.push({
        type: TokenType.Number,
        value,
      })
      continue
    }

    const nameRgex = /[a-z]/

    if (nameRgex.test(char)) {
      let value = ""
      while (nameRgex.test(char) && current < input.length) {
        value += char
        char = input[++current]
      }

      tokens.push({
        type: TokenType.Name,
        value,
      })
      continue
    }

    const blankRegx = /\s/

    if (blankRegx.test(char)) {
      current++
      continue
    }

    throw new Error("unknow char type")
  }

  return tokens
}
