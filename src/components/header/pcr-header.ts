import Header from './Header'

customElements.define('pcr-header', Header)

declare global {
  interface HTMLElementTagNameMap {
    'pcr-header': Header
  }
}
