import { Attribute as AttributeType, Leaf } from '../../felipe'
import { Attribute } from '../Attribute'

type ElementProps = {
  tagname: string
  attributes: AttributeType[]
  children: (Leaf | JSX.Element)[]
}

const Element = ({ tagname, attributes, children }: ElementProps) => {
  return (
    <div id={tagname}>
      <span className="text-cyan-500">{`<${tagname}`}</span>

      {attributes.map(attribute => (
        <Attribute
          key={attribute.key}
          name={attribute.key}
          value={attribute.value}
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
