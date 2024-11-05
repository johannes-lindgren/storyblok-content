import { array, literal, oneOf, withDefault } from 'pure-parse'
import { LinkContent, parseLinkContent } from './linkContent'
import { AssetContent, parseAssetContent } from './assetContent'
import { parseBooleanContent } from './booleanContent'
import { parseNumberContent } from './numberContent'
import { parseTextContent } from './textContent'
import { ObjectContent, blockContent, parseUuid } from './blockContent'

/*
 * Examples
 */

type PageContent = ObjectContent<{
  component: 'page'
  title: string
  isPublic: boolean
  body: Array<HeroContent | GridContent>
}>

type HeroContent = ObjectContent<{
  component: 'hero'
  image: AssetContent | undefined
  buttonLink: LinkContent | undefined
  buttonType: 'primary' | 'secondary'
}>

type GridContent = ObjectContent<{
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

// const pageComponentV1 = component({
//   title: stringField(),
//   isPublic: booleanField(),
// })
//
// const pageComponentV2 = component({
//   title: stringField(),
//   padding: numberField(),
// })
//
// stories.map((story) => {
//   const { isPublic, ...rest } = story
//   return {
//     ...rest,
//     padding: 10,
//   }
// })
//
// const PageContent = ContentFromComponent<typeof pageComponentV1>
//
// const pageContent = parsePageContent({})
