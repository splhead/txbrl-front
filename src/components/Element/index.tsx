type ElementProps = {
  tagname: string
  data: [name:string, value: string] | Element | Record<string, unknown>
}

const Element = ({tagname, data}: ElementProps) => {
  const isObject = (value: unknown) => {
    return value !== null && !Array.isArray(value) && typeof value === 'object'
  }

  
  return (
      <span>{`<${tagname} />`}</span>
  )
}

export { Element }