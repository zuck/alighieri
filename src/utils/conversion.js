import { Converter } from 'showdown'
import { htmlToText } from 'html-to-text'

const mdConverter = new Converter()
mdConverter.setFlavor('github')

export function convertHtmlToTxt (html) {
  return htmlToText(html || '')
}

export function convertTxtToHtml (txt) {
  return `<!DOCTYPE html><html><body>${txt || ''}</body></html>`
}

export function convertHtmlToMd (html) {
  return mdConverter.makeMarkdown(html || '')
}

export function convertMdToHtml (md) {
  return mdConverter.makeHtml(md || '')
}

export function extractHtmlContent (html) {
  const tokens = (html || '').split('<body>')
  return (tokens.length > 1)
    ? tokens[1].replace('</body>', '').replace('</html>', '')
    : tokens[0]
}
