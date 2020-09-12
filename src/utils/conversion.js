export function convertHtmlToTxt (html) {
  return (html || '')
    .replace(/<p(?:.|\n)*?>/gm, '\n\n')
    .replace(/<h\d+(?:.|\n)*?>/gm, '\n\n')
    .replace(/<li(?:.|\n)*?>/gm, '\n\n')
    .replace(/<br\s*\/*>/g, '\n')
    .replace(/\n\n\n/g, '\n\n')
    .replace(/<(?:.|\n)*?>/gm, '')
    .trim()
}
