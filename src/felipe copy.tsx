import './styles/global.css'

import data from './components/Element/data'

type Leaf = string | number | boolean

type Tree =
  | Array<Tree | Leaf>
  | Readonly<{
      [k in string]: Tree | Leaf
    }>

type Atribute = { key: string; value: string }

type Element = {
  tagName: string
  atributes: Atribute[]
}

type Message<T> = Readonly<
  | {
      type: 'Element'
      tagName: string
      atributes: Atribute[]
      children: T[]
    }
  | {
      type: 'Text'
      tagName: string
      data: Leaf
    }
  | {
      type: 'Unknown'
      tagName: string
      data: Leaf
    }
>

type ParseCallback<T> = (element: Element, children: T[]) => T

function parse<T>(data: Tree, fn: ParseCallback<T>): T {
  return loop('example', data, fn, 3)
}

function isLeaf(data: Tree | Leaf): data is Leaf {
  return (
    typeof data === 'string' ||
    typeof data === 'number' ||
    typeof data === 'boolean'
  )
}

function loop<T>(
  key: string,
  data: Tree,
  fn: ParseCallback<T>,
  depth: number
): T {
  if (typeof data === 'string') {
    console.log('string aqui', key, data)
  }

  const atributes: Atribute[] = []
  const children: T[] = []
  for (const [innerKey, innerValue] of Object.entries(data)) {
    if (isLeaf(innerValue)) {
      if (innerKey.startsWith('@_')) {
        atributes.push({
          key: innerKey.substring('@_'.length),
          value: innerValue as string,
        })
      } else if (innerKey.startsWith('#text')) {
        console.log('Text', { key: innerKey, value: innerValue })
      }
      console.log(
        'Unknown type: ' + JSON.stringify({ key: innerKey, value: innerValue })
      )
    } else if (depth > 0) {
      if (Array.isArray(innerValue)) {
        console.log('Array', { key: innerKey, value: innerValue })
        continue
      }
      children.push(loop(innerKey, innerValue, fn, depth - 1))
    }
  }

  return fn(
    {
      tagName: key,
      atributes,
    },

    children
  )
}

export function felipe() {
  return parse<JSX.Element>(data, (element, children) => {
    return (
      <div id={element.tagName}>
        <span>{`<${element.tagName}`}</span>
        <br />
        {element.atributes.map(atribute => {
          return (
            <>
              <span>{`${atribute.key}="${atribute.value}"`}</span>
              <br />
            </>
          )
        })}
        <span>{`>`}</span>
        {children}
        <br />
        <span>{`</${element.tagName}>`}</span>
      </div>
    )
  })
}
