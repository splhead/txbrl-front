import { Element } from './components/Element'
import './styles/global.css'

import data from './components/Element/data'

function App() {

  return (
    Object.entries(data).map(([name, value], index) => <Element tagname={name} data={value} />)
  )
}

export { App }
