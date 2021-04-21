import { PolymerElement, html } from '@polymer/polymer'
import { customElement } from '@polymer/decorators'

import './components/header/pcr-header'
import './components/player/pcr-player'
import './styles/shared'

@customElement('pcr-shell')
class App extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        .wrapper {
          display: flex;
        }

        .wrapper main {
          flex: 1;
        }
      </style>

      <div class="wrapper">
        <main>
          <pcr-header></pcr-header>
          <slot></slot>
        </main>

        <pcr-player></pcr-player>
      </div>
    `
  }
}

export default App
