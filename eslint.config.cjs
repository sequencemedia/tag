const react = require('eslint-plugin-react')
const globals = require('globals')

module.exports = (
  import('@sequencemedia/eslint-config-standard/merge')
    .then(({ default: merge }) => {
      return (
        merge({
          files: [
            '**/*.{mjs,cjs}'
          ],
          ignores: [
            'public'
          ],
          languageOptions: {
            globals: {
              io: 'readonly',
              ...globals.node
            }
          }
        })
          .concat({
            files: [
              'client/**/*.{jsx,mjs,cjs}'
            ],
            ignores: [
              'public'
            ],
            plugins: {
              react
            },
            languageOptions: {
              parserOptions: {
                ecmaFeatures: {
                  jsx: true
                }
              },
              globals: {
                io: 'readonly',
                ...globals.browser
              }
            }
          })
      )
    })
)
