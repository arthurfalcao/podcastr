import Player from './Player'

customElements.define('pcr-player', Player)

declare global {
  interface HTMLElementTagNameMap {
    'pcr-player': Player
  }
}
