type TagProps = {
  name: string
  depth?: number
}

const Tag = ({ name, depth = 0 }: TagProps) => {
  const identation = (depth: number) => {
    let state = '\u00A0'
    for (let index = 0; index < depth; index++) {
      state += '\u00A0'
    }
    return state
  }

  return (
    <span>
      {identation(depth)}
      {`<${name} />`}
    </span>
  )
}

export { Tag }
