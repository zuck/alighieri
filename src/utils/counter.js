export function calculateStats (txt) {
  const sentences = txt
    .replace(/(\.+|:|;|\?|!)/g, '$1\n')
    .split(/\n+\s*/)
    .filter(n => n)
  const words = txt.split(/\s+/).filter(n => n)
  const paragraphs = txt
    .split(/\n\n/)
    .filter(n => n)
  const paragraphCount = paragraphs.length
  const sentenceCount = sentences.length
  const wordCount = words.length
  const charCount = words.reduce((total, word) => {
    return total + (word || '').length
  }, 0)
  return {
    paragraphCount,
    sentenceCount,
    wordCount,
    charCount
  }
}
