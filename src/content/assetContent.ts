import { literal, object, parseString } from 'pure-parse'

export type AssetContent = {
  fieldtype: 'asset'
  filename: string
}

export const parseAssetContent = object<AssetContent>({
  fieldtype: literal('asset'),
  filename: parseString,
})
