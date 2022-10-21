import { Tag } from '../Tag'

type ElementProps = {
  tagname: string
  data: [name:string, value: string] | Element | Record<string, unknown>
}

const Element = ({tagname, data}: ElementProps) => {
  const isObject = (value: unknown) => {
    return value !== null && !Array.isArray(value) && typeof value === 'object'
  }

  if (isObject(data)) {
    const entriesArray = Object.entries(data) 
    const attributes = entriesArray.filter(([name, _]) => name.startsWith('@_'))
    console.log(attributes)
  }

  return (
      <Tag name={tagname} />
  )
}

export { Element }