import { name, version, description, productName, author } from '../../../package.json'

export function appInfo (/* state */) {
  return {
    name,
    version,
    description,
    productName,
    author
  }
}
