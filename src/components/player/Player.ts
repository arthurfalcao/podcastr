import { html, PolymerElement } from "@polymer/polymer";

import styles from './styles'

class Player extends PolymerElement {
  static get template() {
    return html`
      ${styles}

      <div class="wrapper">
        <header>
          <img src="/playing.svg" alt="Tocando agora"/>
          <strong>Playing now</strong>
        </header>

        <div class="empty-player">
          <strong>Select a podcast to listen</strong>
        </div>

        <footer>
          <div class="progress">
            <span>00:00</span>

            <div class="slider">
              <div class="empty-slider"></div>
            </div>

            <span>00:00</span>
          </div>

          <div class="buttons">
            <button type="button">
              <img src="/shuffle.svg" alt="Shuffle" />
            </button>

            <button type="button">
              <img src="/play-previous.svg" alt="Play previous" />
            </button>

            <button type="button" class="play-button">
              <img src="/play.svg" alt="Play" />
            </button>

            <button type="button">
              <img src="/play-next.svg" alt="Play next" />
            </button>

            <button type="button">
              <img src="/repeat.svg" alt="Repeat" />
            </button>
          </div>
        </footer>
      </div>
    `
  }
}

export default Player