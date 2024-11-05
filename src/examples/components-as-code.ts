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

type PageContent = ContentFromComponent<typeof pageComponent>

/*
 * You can define the parser yourself...
 */

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
