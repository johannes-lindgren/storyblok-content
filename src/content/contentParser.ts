import {
  Component,
  ContentFromComponent,
  Field,
  ContentFromField,
  Simplify,
} from '../component'
import { literal, object, Parser, parseString } from 'pure-parse'
import { parseBooleanContent } from './booleanContent'
import { parseTextContent } from './textContent'
import { parseNumberContent } from './numberContent'

const contentParserFromField: {
  [K in Field['type']]: Parser<ContentFromField<Extract<Field, { type: K }>>>
} = {
  boolean: parseBooleanContent,
  text: parseTextContent,
  number: parseNumberContent,
}

export const contentParser = <C extends Component>(
  component: C,
): Parser<Simplify<ContentFromComponent<C>>> =>
  // @ts-ignore
  object<ContentFromComponent<C>>({
    _uid: parseString,
    component: literal(component.name),
    schema: Object.fromEntries(
      Object.entries(component.schema).map(([key, value]) => [
        key,
        contentParserFromField[value.type],
      ]),
    ),
  })
