export const setup = (program) => {
  program
    .version('1.0.0')
    .option('-s, --swagger [file]', 'swagger files')
    .option('-g, --server [servername]', 'servername')
    .option('-w, --wiremock', 'wiremock')
    .parse(process.argv)
}
