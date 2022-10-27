import { useCallback, useState } from 'react'
import { Attribute as AttributeComponent } from '../Attribute'
import { Attribute } from '../../utils/XBRLParser'

export type State = Readonly<{
  tagName: string
  attributes: Attribute[]
  children: State[] | string
}>

export type Props = Readonly<{
  state: State
  onChange(fn: (state: State) => State): void
}>

export function XBRLElement({ state, onChange }: Props) {
  const toUpperCase = useCallback(() => {
    console.log('Dispatch toUpperCase')
    onChange(state => {
      return {
        ...state,
        tagName: state.tagName.toUpperCase(),
      }
    })
  }, [onChange])

  const onChildChange = useCallback<(id: State) => Props['onChange']>(
    id => update => {
      onChange(state => {
        return {
          ...state,
          children: Array.isArray(state.children)
            ? state.children.map(child => {
                if (child === id) {
                  console.log('Changing child', {
                    from: id,
                    to: update(child),
                  })
                }

                return child === id ? update(child) : child
              })
            : state.children,
        }
      })
    },
    [onChange]
  )

  return (
    <div id={state.tagName}>
      <button onClick={toUpperCase}>change</button>

      <span className="text-cyan-500">{`<${state.tagName}`}</span>

      {state.attributes.map(attribute => (
        <AttributeComponent
          key={attribute.key}
          name={attribute.key}
          value={attribute.value}
          path={['']}
        />
      ))}

      {state.children.length === 0 ? (
        <span className="text-cyan-500">{` />`}</span>
      ) : (
        <>
          <span className="text-cyan-500">{`>`}</span>
          {Array.isArray(state.children)
            ? state.children.map(state => (
                <XBRLElement
                  state={state}
                  onChange={onChildChange(state)}
                ></XBRLElement>
              ))
            : state.children}
          <span className="text-cyan-500">{`</${state.tagName}>`}</span>
        </>
      )}
    </div>
  )
}
