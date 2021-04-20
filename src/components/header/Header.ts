import { property } from "@polymer/decorators";
import { html, PolymerElement } from "@polymer/polymer";
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR'

import styles from './styles'

class Header extends PolymerElement {
  @property({ type: String })
  currentDate = format(new Date(), 'EEEEEE, d MMM', { locale: ptBR })

  static get template() {
    return html`
      ${styles}

      <header class="wrapper">
        <img src="/logo.svg" alt="Podcastr" />

        <p>The best for you to listen, always</p>

        <span>[[currentDate]]</span>
      </header>
    `
  }
}

export default Header