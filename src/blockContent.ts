/**
 * Storyblok content types
 */
import { object, OptionalParser, Parser, parseString } from 'pure-parse'

export const parseUuid = parseString

export type ObjectContent<T extends { component: string }> = {
  _uid: string
} & T

export const blockContent = <
  T extends { _uid: string; component: string },
>(schema: {
  // When you pick K from T, do you get an object with an optional property, which {} can be assigned to?
  [K in keyof T]-?: {} extends Pick<T, K> ? OptionalParser<T[K]> : Parser<T[K]>
}): Parser<T> =>
  // @ts-ignore
  object<T>(schema)
