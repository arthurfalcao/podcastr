import { computed, observe } from "@polymer/decorators";
import { html, PolymerElement } from "@polymer/polymer";
import classNames from "classnames";

import '@polymer/polymer/lib/elements/dom-if'
import '@polymer/paper-slider/paper-slider'

import { PlayerMixin, Episode } from "../../mixins/PlayerMixin";

import styles from './styles'

class Player extends PlayerMixin(PolymerElement) {
  static get template() {
    return html`
      ${styles}

      <div class="wrapper">
        <header>
          <img src="/playing.svg" alt="Tocando agora"/>
          <strong>Playing now</strong>
        </header>

        <template is="dom-if" if="[[episode]]">
          <div class="current-episode">
            <img src="[[episode.thumbnail]]" alt="[[episode.title]]" />
            <strong>[[episode.title]]</strong>
            <span>[[episode.members]]</span>
          </div>
        </template>

        <template is="dom-if" if="[[!episode]]">
          <div class="empty-player">
            <strong>Select a podcast to listen</strong>
          </div>
        </template>

        <footer class$="[[footerClass(episode)]]">
          <div class="progress">
            <span>00:00</span>

            <div class="slider">
              <template is="dom-if" if="[[episode]]">
                <paper-slider></paper-slider>
              </template>

              <template is="dom-if" if="[[!episode]]">
                <div class="empty-slider"></div>
              </template>
            </div>

            <span>00:00</span>
          </div>

          <div class="buttons">
            <button type="button" disabled="[[!episode]]">
              <img src="/shuffle.svg" alt="Shuffle" />
            </button>

            <button type="button" disabled="[[!episode]]">
              <img src="/play-previous.svg" alt="Play previous" />
            </button>

            <button type="button" disabled="[[!episode]]" class="play-button" on-click="togglePlay">
              <template is="dom-if" if="[[player.isPlaying]]">
                <img src="/pause.svg" alt="Pause" />
              </template>

              <template is="dom-if" if="[[!player.isPlaying]]">
                <img src="/play.svg" alt="Play" />
              </template>
            </button>

            <button type="button" disabled="[[!episode]]">
              <img src="/play-next.svg" alt="Play next" />
            </button>

            <button type="button" disabled="[[!episode]]">
              <img src="/repeat.svg" alt="Repeat" />
            </button>
          </div>
        </footer>
      </div>

      <template is="dom-if" if="[[episode]]">
        <audio src="[[episode.url]]" autoplay on-play="handlePlay" on-pause="handlePause" />
      </template>
    `
  }

  @computed('player')
  get episode() {
    return this.player.episodeList[this.player.currentEpisodeIndex] || null;
  }

  @observe('player.isPlaying')
  private onChangePlayState(isPlaying: boolean) {
    const audioEl = this.shadowRoot?.querySelector('audio');
    if (!audioEl) {
      return;
    }

    if (isPlaying) {
      audioEl.play()
    } else {
      audioEl.pause()
    }
  }

  private handlePlay() {
    this.setPlayingState(true);
  }

  private handlePause() {
    this.setPlayingState(false)
  }

  private footerClass(episode: Episode | null) {
    return classNames({ 'empty': !episode })
  }
}

export default Player