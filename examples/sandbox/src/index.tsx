/* @refresh reload */
import { render } from 'solid-js/web'
// import 'solid-devtools'
// import { useLocator } from 'solid-devtools'
import { DevtoolsOverlay } from '@solid-devtools/overlay'

import App from './App'
import { ThemeProvider } from './Theme'
import './locator'

export const disposeApp = render(
  () => (
    <>
      <ThemeProvider>
        <App />
      </ThemeProvider>
      <DevtoolsOverlay defaultOpen={true} />
    </>
  ),
  document.getElementById('root')!,
)
