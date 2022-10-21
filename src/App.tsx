import { XMLBuilder } from 'fast-xml-parser'
import { Tag } from './components/Tag'
import './styles/global.css'

import data from './components/Element/data'

type Json = boolean | null | string | number | Array<Json> | {[k in string]: Json}

function App() {

  function isAttribute(key: string): key is `@_${string}`{
    return key.startsWith('@_')
  }/*
  function parse(json: Record<string, unknown | string  >, level = 0) {
    for (let key in json) {
      if (typeof json[key] !== 'object'){
        if (isAttribute(key)) {
     
          console.log('attribute', `${key}="${json[key]}"`)
        } else {
          if (key === '#text') {
            console.log('text', json[key])
          }
        }

      } else if ( Array.isArray(json[key])) {
        // repetidos
        console.log('array')
      } else {
        // filhos
        const keys = Object.keys(json[key])
        for (let i = 0; i < keys.length; i++) {}
      }
    }
  }

  parse(data)*/
  return undefined
}

export { App }
/*
function createParse<T extends number | string | boolean | null >(fn:(value: number | string | boolean  | null,  key: string,   path: string[]) => T) {
  function parse (data: Json, path: string[] = [])  {  
    if (typeof data === "object" && data !== null) {
      const state = new Map()
      for (const [key, value] of Object.entries(data)) {
        state.set(key, parse(value, [...path, key]))
      }
      return Object.fromEntries(state.entries())
    } else {
      return fn(data, path[path.length -1] ?? "",path)
    }
  }

  return (data: Json) => parse(data)
}*/


function createParse(fn:(value: string | number | boolean | null,  key: string,   path: string[]) => {key: string, value: string | number | boolean | null}) {
  function parse (data: Json, path: string[] = []): Json | {key: string | number, value: string | number | boolean | null}  {  
    if (typeof data === "object" && data !== null) {
      const state = new Map<string, Json>()
      for (const [key, value] of Object.entries(data)) {
        const result = parse(value, [...path, key])
        if (typeof result === "object" && result !== null && "key" in result && "value" in result) {
          state.set( result.key as any, parse(result.value, [...path, key]))
          continue
        }
        state.set(key, parse(value, [...path, key]))
      }
      return Object.fromEntries(state.entries())
    } else {
      return fn(data, path[path.length -1] ?? "",path)
    }
  }

  return (data: Record<string, Json>) => parse(data)
}

const parse = createParse((value, key, path) => {
  
  if (key.startsWith("@_")) {
    console.log("atribute",{
      [key.substring("@_".length)]: value,
      path
    })
    
  } else if (key.startsWith("#")) {
    console.log("text",{
      [key.substring("#".length)]: value,
      path
    })
  } else {
    console.log("undefined", {key, value, path}) 
  }
  
  return {key, value}
})

const resultado = parse(data)

console.log("final",resultado)
