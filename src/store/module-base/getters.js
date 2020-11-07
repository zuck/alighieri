import { name, version, description, productName, author } from '../../../package.json'

export function appInfo () {
  return {
    name,
    version,
    description,
    productName,
    author
  }
}

export function settings (state) {
  return {
    darkMode: state.darkMode,
    parSpaceBetween: state.parSpaceBetween,
    parIndentFirstLine: state.parIndentFirstLine
  }
}
