//import { useEffect } from 'react'

type AttributeProps = {
  name: string
  value: string
  path: string[]
}

const Attribute = ({ name, value, path }: AttributeProps) => {
  // useEffect(() => {
  //   console.log(path)
  // }, [])
  return (
    <>
      <span className="attribute key">{`${name}="`}</span>
      <span className="attribute value">{value}</span>
      <span className="attribute">"</span>
    </>
  )
}

export { Attribute }
