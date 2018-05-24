import get from 'lodash/get'

export const getInput = (param) => {
  const paramInput = param.paramInput
  const type = get(paramInput, 'type')

  switch (type) {
    case 'number': return NumberInput(paramInput)
    default: return []
  }
}

const NumberInput = (input) => {
  return [].concat(input.values)
}
