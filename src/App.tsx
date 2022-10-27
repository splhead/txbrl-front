import './styles/global.css'
import data from './components/Element/data'
import { parse } from './utils/XBRLParser'
import { XBRLElement, State } from './components/XBRLElement'
import { useState } from 'react'

const initialState = parse<State>(data, message => {
  return {
    tagName: 'XML',
    attributes: [],
    children: [],
  }
})

function App() {
  const [state, update] = useState<State>(() => ({
    tagName: 'tag1',
    attributes: [],
    children: [
      {
        tagName: 'tag2',
        attributes: [],
        children: [
          {
            tagName: 'tag3a',
            attributes: [],
            children: [],
          },
          {
            tagName: 'tag3b',
            attributes: [],
            children: [],
          },
          {
            tagName: 'tag3c',
            attributes: [],
            children: [],
          },
          {
            tagName: 'tag3d',
            attributes: [],
            children: [],
          },
        ],
      },
    ],
  }))

  return <XBRLElement state={state} onChange={update} />
}

export { App }
