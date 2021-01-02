export async function importFile (filters) {
  return new Promise((resolve, reject) => {
    const rootEl = document.body
    const loadFile = (evt) => {
      const inputEl = evt.target
      const file = inputEl.files[0]
      const reader = new FileReader()
      reader.onload = () => {
        resolve({
          name: file.name,
          type: file.type,
          size: file.size,
          lastModifiedDate: file.lastModifiedDate,
          content: reader.result
        })
      }
      reader.onerror = reject
      reader.readAsText(file)
    }
    const inputEl = document.createElement('input')
    inputEl.type = 'file'
    inputEl.style = 'visibility:hidden'
    if (filters) {
      inputEl.accept = filters.join(',')
    }
    inputEl.onchange = loadFile
    rootEl.appendChild(inputEl)
    inputEl.click()
    // rootEl.removeChild(inputEl)
  })
}
