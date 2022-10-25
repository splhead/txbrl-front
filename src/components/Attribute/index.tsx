type AttributeProps = {
  name: string
  value: string
}

const Attribute = ({ name, value }: AttributeProps) => {
  return (
    <>
      <span className="attribute key">{`${name}="`}</span>
      <span className="attribute value">{value}</span>
      <span className="attribute">"</span>
    </>
  )
}

export { Attribute }
