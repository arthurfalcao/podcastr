import { PolymerElement, html } from '@polymer/polymer'
import { customElement } from '@polymer/decorators'

import './components/header/pcr-header'
import './components/player/pcr-player'
import './pages/home/pcr-home'
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
          <pcr-home></pcr-home>
        </main>

        <pcr-player></pcr-player>
      </div>
    `
  }
}

export default App
