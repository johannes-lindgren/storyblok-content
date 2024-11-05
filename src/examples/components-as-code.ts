import {
  booleanField,
  component,
  ContentFromComponent,
  numberField,
  textField,
} from '../component'
import { literal } from 'pure-parse'
import {
  blockContent,
  contentParser,
  parseBooleanContent,
  parseNumberContent,
  parseTextContent,
  parseUuid,
} from '../content'

const pageComponent = component({
  name: 'page',
  schema: {
    title: textField(),
    isPublic: booleanField(),
    padding: numberField(),
  },
})

/*
 * You can define the parser yourself...
 */
type PageContent = ContentFromComponent<typeof pageComponent>
const parsePageContent = blockContent<PageContent>({
  _uid: parseUuid,
  component: literal('page'),
  padding: parseNumberContent,
  isPublic: parseBooleanContent,
  title: parseTextContent,
})

/*
 * ...or generate one
 */

const parsePageContentAuto = contentParser(pageComponent)
