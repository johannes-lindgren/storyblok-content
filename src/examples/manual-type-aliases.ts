import { array, literal, oneOf, withDefault } from 'pure-parse'
import {
  parseBooleanContent,
  parseNumberContent,
  parseTextContent,
  BlockContent,
  blockContent,
  parseUuid,
  LinkContent,
  parseLinkContent,
  AssetContent,
  parseAssetContent,
} from '../content'

type PageContent = BlockContent<{
  component: 'page'
  title: string
  isPublic: boolean
  body: Array<HeroContent | GridContent>
}>

type HeroContent = BlockContent<{
  component: 'hero'
  image: AssetContent | undefined
  buttonLink: LinkContent | undefined
  buttonType: 'primary' | 'secondary'
}>

type GridContent = BlockContent<{
  component: 'grid'
  columns: number
}>

const parseHeroContent = blockContent<HeroContent>({
  _uid: parseUuid,
  component: literal('hero'),
  image: withDefault(parseAssetContent, undefined),
  buttonLink: withDefault(parseLinkContent, undefined),
  buttonType: withDefault(literal('primary', 'secondary'), 'primary'),
})

const parseGridContent = blockContent<GridContent>({
  _uid: parseUuid,
  component: literal('grid'),
  columns: withDefault(parseNumberContent, 3),
})

const parsePageContent = blockContent<PageContent>({
  _uid: parseUuid,
  component: literal('page'),
  isPublic: withDefault(parseBooleanContent, false),
  title: withDefault(parseTextContent, ''),
  body: withDefault(array(oneOf(parseHeroContent, parseGridContent)), []),
})
