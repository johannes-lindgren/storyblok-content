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
  parseBooleanContent,
  parseNumberContent,
  parseTextContent,
  parseUuid,
} from '../content'

const pageComponentV1 = component({
  name: 'page',
  schema: {
    title: textField(),
    isPublic: booleanField(),
    padding: numberField(),
  },
})

type PageContent = ContentFromComponent<typeof pageComponentV1>

const parsePageContent = blockContent<PageContent>({
  _uid: parseUuid,
  component: literal('page'),
  padding: parseNumberContent,
  isPublic: parseBooleanContent,
  title: parseTextContent,
})
