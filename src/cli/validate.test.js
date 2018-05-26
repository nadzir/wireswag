import { validateMandatoryInput } from '.'

describe('validateMantoryInput', () => {
  it('should returns false if swagger props is missing', () => {
    const input = {server: 'server'}
    const output = validateMandatoryInput(input)
    expect(output).toBeFalsy()
  })

  it('should return false if server props is missing', () => {
    const input = {swagger: 'swagger'}
    const output = validateMandatoryInput(input)
    expect(output).toBeFalsy()
  })

  it('should return false if input is empty object', () => {
    const input = {}
    const output = validateMandatoryInput(input)
    expect(output).toBeFalsy()
  })

  it('should return true if swagger and server exist', () => {
    const input = {server: 'server', swagger: 'swagger'}
    const output = validateMandatoryInput(input)
    expect(output).toBeTruthy()
  })
})
