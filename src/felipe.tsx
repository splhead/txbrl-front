import './styles/global.css'

import data from './components/Element/data'
import { Attribute } from './components/Attribute'
import { Element } from './components/Element'

export type Leaf = string | number | boolean

type Tree =
  | Array<Tree>
  | Readonly<{
      [k in string]: Tree | Leaf
    }>

export type Attribute = { key: string; value: string }

type Message<T> = {
  type: 'Element'
  tagName: string
  atributes: Attribute[]
  children: (Leaf | T)[]
}

type ParseCallback<T> = (message: Message<T>) => T

function parse<T>(data: Tree, fn: ParseCallback<T>): T {
  return parseLoop('xml', data, fn, 10)
}

function isLeaf(data: Tree | Leaf): data is Leaf {
  return (
    typeof data === 'string' ||
    typeof data === 'number' ||
    typeof data === 'boolean'
  )
}

function parseLoop<T>(
  key: string,
  data: Tree,
  fn: ParseCallback<T>,
  depth: number
): T {
  const message: Message<T> = {
    type: 'Element',
    atributes: [],
    children: [],
    tagName: key,
  }

  for (const [innerKey, innerValue] of Object.entries(data)) {
    if (isLeaf(innerValue)) {
      if (innerKey.startsWith('@_')) {
        //console.log('Attribute', { key: innerKey, value: innerValue })
        message.atributes.push({
          key: innerKey.substring('@_'.length),
          value: innerValue as string,
        })
      } else if (innerKey.startsWith('#text')) {
        //console.log('Text', { key: innerKey, value: innerValue })
        message.children.push(innerValue)
      } else {
        // console.log('Unknown', {
        //   outerkey: key,
        //   key: innerKey,
        //   value: innerValue,
        // })

        message.children.push(
          fn({
            type: 'Element',
            atributes: [],
            children: [innerValue],
            tagName: innerKey,
          })
        )
      }
    } else if (depth > 0) {
      if (Array.isArray(innerValue)) {
        //console.log('Array', { key: innerKey, value: innerValue })
        const children = innerValue.map(item => {
          return parseLoop(innerKey, item, fn, depth - 1)
        })

        message.children.push(...children)
      } else {
        message.children.push(parseLoop(innerKey, innerValue, fn, depth - 1))
      }
    }
  }

  return fn(message)
}

export function felipe() {
  return parse<JSX.Element>(data, message => {
    switch (message.type) {
      case 'Element': {
        return (
          <Element
            key={message.tagName}
            tagname={message.tagName}
            attributes={message.atributes}
            children={message.children}
          />
        )
      }
    }
  })
}
