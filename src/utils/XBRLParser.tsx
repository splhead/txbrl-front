import '../styles/global.css'

import data from '../components/Element/data'
import { Attribute } from '../components/Attribute'
import { Element } from '../components/Element'

export type Leaf = string | number | boolean

type Tree =
  | Array<Tree>
  | Readonly<{
      [k in string]: Tree | Leaf
    }>

export type Attribute = { key: string; value: string; path: string[] }

type Message<T> = {
  type: 'Element'
  tagName: string
  atributes: Attribute[]
  children: (Leaf | T)[]
  path: string[]
}

type Callback<T> = (message: Message<T>) => T

export function parse<T>(data: Tree, fn: Callback<T>): T {
  return parseLoop('xml', data, fn, 10, [])
}

function isLeaf<T>(data: T | Leaf): data is Leaf {
  return (
    typeof data === 'string' ||
    typeof data === 'number' ||
    typeof data === 'boolean'
  )
}

function parseLoop<T>(
  key: string,
  data: Tree,
  fn: Callback<T>,
  depth: number,
  path: string[]
): T {
  const message: Message<T> = {
    type: 'Element',
    atributes: [],
    children: [],
    tagName: key,
    path,
  }

  for (const [innerKey, innerValue] of Object.entries(data)) {
    if (isLeaf(innerValue)) {
      if (innerKey.startsWith('@_')) {
        //console.log('Attribute', { key: innerKey, value: innerValue })
        message.atributes.push({
          key: innerKey.substring('@_'.length),
          value: innerValue as string,
          path: [...path, innerKey],
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

        const newPath = [...path, innerKey]
        //console.log(newPath)

        message.children.push(
          fn({
            type: 'Element',
            atributes: [],
            children: [innerValue],
            tagName: innerKey,
            path: newPath,
          })
        )
      }
    } else if (depth > 0) {
      if (Array.isArray(innerValue)) {
        //console.log('Array', { key: innerKey, value: innerValue })
        const children = innerValue.map(item => {
          const newPath = [...path, innerKey]
          //console.log(newPath)
          return parseLoop(innerKey, item, fn, depth - 1, newPath)
        })

        message.children.push(...children)
      } else {
        const newPath = [...path, innerKey]
        //console.log(newPath)
        message.children.push(
          parseLoop(innerKey, innerValue, fn, depth - 1, newPath)
        )
      }
    }
  }

  return fn(message)
}
/*
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
            path={message.path}
          />
        )
      }
    }
  })
}*/
