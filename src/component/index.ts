export type TextField = {
  type: 'text'
}

export type NumberField = {
  type: 'number'
}

export type BlocksField = {
  type: 'bloks'
}

export type BooleanField = {
  type: 'boolean'
}

export type Field = TextField | BooleanField | NumberField

export type BlockSchema = Record<string, Field>

export type Schema = BlockSchema

export type Component = {
  name: string
  schema: Schema
}

export const textField = (): TextField => ({
  type: 'text',
})

export const numberField = (): NumberField => ({
  type: 'number',
})

export const booleanField = (): BooleanField => ({
  type: 'boolean',
})

export const component = <T extends Component>(component: T): T => component

export type ContentFromField<F extends Field> = {
  text: string
  number: number
  boolean: boolean
}[F['type']]

export type ContentFromComponent<T extends Component> = {
  [K in keyof T['schema']]: ContentFromField<T['schema'][K]>
} & {
  _uid: string
  component: T['name']
}

/**
 * Takes a complex type expression and simplifies it to a plain object. Useful when inferring types.
 */
export type Simplify<T> = T extends infer _ ? { [K in keyof T]: T[K] } : never
