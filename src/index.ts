import { Tokenizer } from "./utils/Tokenizer"
import { Parser } from "./utils/Parser"
import { transformer } from "./utils/Transformer"
import { generator } from "./utils/CodeGenerator"

const result = generator(
  transformer(Parser(Tokenizer("(add 22 (subtract 44 22))")))
)

console.log(result)
