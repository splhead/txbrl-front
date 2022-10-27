//import { useEffect } from 'react'
import { useEffect, useState } from 'react'
import { Attribute as AttributeType, Leaf } from '../../utils/XBRLParser'
import { Attribute } from '../Attribute'

type ElementProps = {
  tagname: string
  attributes: AttributeType[]
  children: (Leaf | JSX.Element)[]
  path: string[]
}
const Input = (props: { value: string }) => {
  return <input type="text" value={props.value} />
}
const Element = ({ tagname, attributes, children, path }: ElementProps) => {
  const [innerTagName, setState] = useState(() => tagname)

  useEffect(() => {
    // console.log(path)
    console.log('hhhhhh')
  }, [])

  return (
    <div id={tagname}>
      <button onClick={() => setState(state => state.toUpperCase())}>
        edit
      </button>
      <button
        onClick={() => {
          console.log('submiting', { path, tagName: innerTagName })
        }}
      >
        submit
      </button>
      <span className="text-cyan-500">{`<${innerTagName}`}</span>

      {attributes.map(attribute => (
        <Attribute
          key={attribute.key}
          name={attribute.key}
          value={attribute.value}
          path={[...path, `@_${attribute.key}`]}
        />
      ))}
      {children.length === 0 ? (
        <span className="text-cyan-500">{` />`}</span>
      ) : (
        <>
          <span className="text-cyan-500">{`>`}</span>
          {children}
          <span className="text-cyan-500">{`</${tagname}>`}</span>
        </>
      )}
    </div>
  )
}

export { Element }
