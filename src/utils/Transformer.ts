import { Node } from "./Parser"
import { Visitor } from "./Visitor"
import { Traverser } from "./Traverser"

export const transformer = (ast: Node) => {
  let newAst = {
    type: "Program",
    body: [],
  }

  // 此时我们在便利 旧的ast时就可以通过 _context 修改新ast
  ast._context = newAst.body

  Traverser(ast, Visitor)
  return newAst
}
