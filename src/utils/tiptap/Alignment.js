import {
  Mark
} from 'tiptap'
import {
  updateMark,
  markInputRule
} from 'tiptap-commands'

export default class Alignment extends Mark {
  get name () {
    return 'alignment'
  }

  get defaultOptions () {
    return {
      levels: ['left', 'center', 'right', 'justify']
    }
  }

  get schema () {
    return {
      attrs: {
        align: {
          default: 'left'
        }
      },
      parseDOM: [{
        style: 'text-align',
        getAttrs: value => ({
          align: value
        })
      }],
      toDOM: mark => {
        return ['span', {
          class: `block text-${mark.attrs.align}`
        }, 0]
      }
    }
  }

  commands ({
    type
  }) {
    return attrs => updateMark(type, attrs)
  }

  inputRules ({
    type
  }) {
    return [
      markInputRule(/(?:\*\*|__)([^*_]+)(?:\*\*|__)$/, type)
    ]
  }
}
