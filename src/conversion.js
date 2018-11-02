import showdown from 'showdown'
import TurndownService from 'turndown'
import { gfm } from 'turndown-plugin-gfm'

const mdToHtmlConverter = new showdown.Converter({
  simplifiedAutoLink: true,
  strikethrough: true,
  tables: true,
  tasklists: true,
  simpleLineBreaks: true
})

const htmlToMdConverter = new TurndownService({
  defaultReplacement: function (innerHTML, node) {
    return node.isBlock ? '\n\n' + node.outerHTML + '\n\n' : node.outerHTML
  }
})
htmlToMdConverter.use(gfm)

const convertMdToHtml = md => mdToHtmlConverter.makeHtml(md)

const convertHtmlToMd = html => htmlToMdConverter.turndown(html)

const convertTxtToHtml = txt => mdToHtmlConverter.makeHtml(txt)

const convertHtmlToTxt = html =>
  (html || '')
    .replace(/<p(?:.|\n)*?>/gm, '\n\n')
    .replace(/<h\d+(?:.|\n)*?>/gm, '\n\n')
    .replace(/<li(?:.|\n)*?>/gm, '\n\n')
    .replace(/<br\s*\/*>/g, '\n')
    .replace(/\n\n\n/g, '\n\n')
    .replace(/<(?:.|\n)*?>/gm, '')
    .trim()

export { convertMdToHtml, convertHtmlToMd, convertTxtToHtml, convertHtmlToTxt }
