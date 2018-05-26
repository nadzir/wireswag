
export const validateMandatoryInput = (program) => {
  if (!program.swagger) {
    console.warn('please specify a swagger file')
    return false
  }
  if (!program.server) {
    console.warn('please specify a servername')
    return false
  }
  return true
}
