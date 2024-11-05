import { array, literal, object, parseString, withDefault } from 'pure-parse'

export type TableContent = {
  fieldtype: 'table'
  thead: TableHeadContent[]
  tbody: TableRowContent[]
}

export type TableHeadContent = {
  component: '_table_head'
  value: string | null
}

export type TableRowContent = {
  component: '_table_row'
  body: TableColumnContent[]
}

export type TableColumnContent = {
  component: '_table_col'
  value: string | null
}

export const parseTableHeadContent = object<TableHeadContent>({
  component: literal('_table_head'),
  value: withDefault(parseString, undefined),
})

export const parseTableColumnContent = object<TableColumnContent>({
  component: literal('_table_col'),
  value: withDefault(parseString, undefined),
})

export const parseTableRowContent = object<TableRowContent>({
  component: literal('_table_row'),
  body: array(parseTableColumnContent),
})

export const parseTableContent = object<TableContent>({
  fieldtype: literal('table'),
  thead: array(parseTableHeadContent),
  tbody: array(parseTableRowContent),
})
