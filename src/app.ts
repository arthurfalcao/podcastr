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

        .content {
          height: calc(100vh - 6.5rem);
          overflow-y: scroll;
        }
      </style>

      <div class="wrapper">
        <main>
          <pcr-header></pcr-header>

          <div class="content">
            <slot></slot>
          </div>
        </main>

        <pcr-player></pcr-player>
      </div>
    `
  }
}

export default App
