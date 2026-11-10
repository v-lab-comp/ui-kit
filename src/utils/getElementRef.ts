import { version, type ReactElement, type Ref } from 'react'

const REACT_MAJOR = Number.parseInt(version, 10)

/**
 * ref дочернего элемента — для обёрток, которые клонируют child и сливают его ref со своим (Tooltip).
 * Одинаково в React 18 и 19: в 18 ref лежит в `element.ref`, в 19 — в `element.props.ref`,
 * а чтение `element.ref` в 19 выдаёт предупреждение «Accessing element.ref was removed in React 19».
 */
export function getElementRef<T>(element: ReactElement): Ref<T> | undefined {
  if (REACT_MAJOR >= 19) return (element.props as { ref?: Ref<T> }).ref
  return (element as ReactElement & { ref?: Ref<T> }).ref
}
