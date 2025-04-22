import { htmlToText } from 'html-to-text'
import { Converter } from 'showdown'

const mdConverter = new Converter()
mdConverter.setFlavor('github')

export function parseContent (content, filename) {
  const ext = filename.split('.').pop()
  switch (ext) {
    case 'md':
    case 'markdown':
      return mdConverter.makeHtml(content || '')
    default:
      return content
  }
}

export function serializeContent (content, filename) {
  const ext = filename.split('.').pop()
  switch (ext) {
    case 'md':
      return mdConverter.makeMarkdown(content || '')
    case 'html':
      return content
    default:
      return htmlToText(content)
  }
}
