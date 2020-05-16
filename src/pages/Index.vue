<template>
  <q-page class="flex">
    <vue-medium-editor
      id="editor"
      custom-tag="div"
      :text="$store.state.contentHTML"
      :options="meOptions"
      :class="$store.state.settings"
      @edit="processEditOperation"
    />
  </q-page>
</template>

<style>
</style>

<script>
import VueMediumEditor from 'vue2-medium-editor'
import MediumEditorAutoList from 'medium-editor-autolist'
import MediumEditorAutoHR from 'medium-editor-autohr'
import MediumEditorAutoAngleQuotes from 'medium-editor-autoanglequotes'

import 'medium-editor/dist/css/medium-editor.min.css'
import * as INFO from '../../package.json'

const CONTENT_BACKUP_KEY = INFO.name + '-content-backup'

export default {
  name: 'PageIndex',

  components: {
    VueMediumEditor
  },

  data () {
    return {
      meOptions: {
        buttonLabels: 'fontawesome',
        placeholder: false,
        spellcheck: false,
        autoLink: false,
        extensions: {
          autolist: new MediumEditorAutoList(),
          autohr: new MediumEditorAutoHR(),
          autoangles: new MediumEditorAutoAngleQuotes()
        },
        toolbar: {
          static: true,
          align: 'center',
          sticky: true,
          buttons: [
            {
              name: 'h1',
              action: 'append-h1',
              aria: this.$t('Header 1'),
              tagNames: ['h1'],
              contentFA: '<i class="fa fa-heading"><sub>1</sub></i>'
            },
            {
              name: 'h2',
              action: 'append-h2',
              aria: this.$t('Header 2'),
              tagNames: ['h2'],
              contentFA: '<i class="fa fa-heading"><sub>2</sub></i>'
            },
            {
              name: 'h3',
              action: 'append-h3',
              aria: this.$t('Header 3'),
              tagNames: ['h3'],
              contentFA: '<i class="fa fa-heading"><sub>3</sub></i>'
            },
            'subscript',
            'superscript',
            'bold',
            'italic',
            'underline',
            'strikethrough',
            'anchor',
            'quote',
            'pre',
            'justifyLeft',
            'justifyCenter',
            'justifyRight'
          ]
        }
      }
    }
  },

  mounted () {
    // Get last session content
    const html = this.$q.localStorage.getItem(CONTENT_BACKUP_KEY) || ''
    this.$store.dispatch('updateContent', html)

    // Focus editor
    document.querySelector('#editor').focus()
  },

  methods: {
    processEditOperation (operation) {
      if (operation && operation.api && operation.api.getFocusedElement) {
        const domElement = operation.api.getFocusedElement()
        if (domElement) {
          const html = domElement.innerHTML
          this.$nextTick(() => {
            this.$store.dispatch('updateContent', html)
          })
        }
      }
    }
  }
}
</script>

<style lang="stylus">
#editor {
  display: block;
  box-sizing: border-box;
  min-width: calc(320px - 3rem);
  width: 100%;
  min-height: 100%;
  padding: 0 0 6rem;
  padding-left: calc(50% - 320px - 1.5rem);
  padding-right: calc(50% - 320px - 1.5rem);
  margin: 0 1.5rem;
  outline: none;
  border: none;
  line-height: 1.5;
  font-family: 'Spectral', serif;
  font-size: 16pt;

  a {
    color: $primary;
  }

  h1, h2, h3 {
    margin: 3em 0 2em;
    line-height: 1;

    &:first-child {
      margin-top: 0.75em;
    }
  }

  h1 {
    font-size: 1.4em;
  }

  h1+h2 {
    margin-top: -2em;
  }

  h2 {
    font-size: 1em;
  }

  h3 {
    font-size: 0.75em;
    font-family: 'Spectral SC', serif;
  }

  blockquote, pre, table, dl, ul, ol {
    margin: 1.5em 0;
  }

  blockquote {
    font-size: 0.8em;
    border-color: $neutral;
    border-width: 6px;

    p:last-child {
      margin-bottom: 0;
    }
  }

  hr {
    padding: 0;
    margin: 3em 0;
    border: none;
    height: 0;
    border-top: 1px solid $neutral;
  }

  table {
    width: 100%;
    margin-bottom: 1rem;
    border-collapse: collapse;

    thead {
      text-align: left;
    }

    td, th {
      padding: 0.5rem;
      border-bottom: 1px solid $neutral;
      vertical-align: top;
    }

    thead td, thead th {
      border-color: $accent;
    }

    @media screen and (max-width: $breakpoint-xs) {
      tr {
        display: flex;
        flex-direction: column;
      }

      td, th {
        min-width: 100%;
      }

      td:not(:last-of-type), th:not(:last-of-type) {
        border-bottom: none;
      }
    }
  }

  pre {
    padding: 1rem;
    border-radius: 0.25rem;
    overflow: auto;
    background-color: $neutral;
    font-size: 0.75em;

    code {
      background-color: transparent;
      white-space: pre-wrap;
    }
  }

  code {
    padding: 0.25rem;
    white-space: nowrap;
    background-color: $neutral;
  }

  &:not(.parSpaceBetween) p {
    margin-bottom: 0;
  }

  &.parIndentFirstLine p {
    text-indent: 2rem;
  }

/*
  &.darkMode {
    hr, blockquote {
      border-color: lighten($accent, 10%);
    }

    pre {
      background-color: lighten($accent, 10%);
    }
  }
*/

  @media screen and (min-width: $breakpoint-sm-min) {
    h1 {
      font-size: 2.5em;
    }

    h1+h2 {
      margin-top: -2.5em;
    }

    h2 {
      font-size: 1.5em;
    }

    h3 {
      font-size: 1em;
    }
  }

  /* Printing */
  @media print {
    display: inline;
    padding: 0;
    font-size: 12pt;
    color: #000 !important;
    background: #fff !important;

    h1:not(:first-child) {
      page-break-before: always;
    }

    hr {
      display: block;
      margin: 0;
      padding: 0;
      border: none;
      visibility: hidden;
      page-break-before: always;
    }

    h1, h2, h3, h4, h5, h6 {
      page-break-after: avoid;
    }

    p+h1, table+h1, pre+h1 {
      margin-top: 0;
    }

    table, figure, blockquote {
      width: 100%;
      page-break-inside: avoid;
    }
  }
}

.medium-toolbar-arrow-under:after {
  border-top-color: $grey-4;
  color: transparent;
}

.medium-editor-toolbar {
  background-color: transparent;
  color: $grey-6;
  border-radius: 1rem;
  padding: 0 0.5rem;
}

.medium-editor-toolbar li {
  padding: 0;
}

.medium-editor-action {
  min-width: 50px;
  height: 100%;
  border: none;
  color: $grey-6;
  background-color: transparent;
  transition: background-color 0.2s ease-in, color 0.2s linear;

  &:hover {
    color: $grey-10;
  }
}

.medium-editor-button-active {
  color: $primary;
}

.medium-editor-toolbar-form, a, .medium-editor-toolbar-input {
  padding: 0.25rem;
  font-size: 1rem;
  background: transparent;
  color: $grey-10;
}

.medium-editor-toolbar-input {
  &::-webkit-input-placeholder, &:-moz-placeholder, &::-moz-placeholder, &:-ms-input-placeholder {
    color: $grey-8;
  }
}

.medium-editor-toolbar-anchor-preview {
  border-radius: 1rem;
  padding: 0 0.5rem;
  background-color: $grey-4;

  &, a {
    color: $grey-10;
    text-decoration: none;
  }
}

.medium-toolbar-arrow-over::before {
  border-bottom-color: $grey-4;
  color: transparent;
}

.dark-mode ~ .medium-editor-toolbar .medium-editor-action:not(.medium-editor-button-active) {
  color: $grey-6;

  &:hover {
    color: $grey-4;
  }
}
</style>
