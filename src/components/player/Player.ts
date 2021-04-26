import { computed, observe, property } from '@polymer/decorators'
import { html, PolymerElement } from '@polymer/polymer'
import classNames from 'classnames'

import '@polymer/polymer/lib/elements/dom-if'
import '@polymer/paper-slider/paper-slider'

import { PlayerMixin, Episode } from 'mixins/PlayerMixin'
import { convertDurationToTimeString } from 'utils/convertDurationToTimeString'

import styles from './styles'

class Player extends PlayerMixin(PolymerElement) {
  @property({ type: Number })
  progress = 0

  static get template() {
    return html`
      ${styles}

      <div class="wrapper">
        <header>
          <img src="/playing.svg" alt="Playing now" />
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

        <footer class$="[[getFooterClass(episode)]]">
          <div class="progress">
            <span>[[convertDurationToTimeString(progress)]]</span>

            <div class="slider">
              <template is="dom-if" if="[[episode]]">
                <paper-slider
                  max="[[episode.duration]]"
                  value="{{progress}}"
                  on-change="handleSeek"
                ></paper-slider>
              </template>

              <template is="dom-if" if="[[!episode]]">
                <div class="empty-slider"></div>
              </template>
            </div>

            <span>[[convertDurationToTimeString(episode.duration)]]</span>
          </div>

          <div class="buttons">
            <button
              type="button"
              class$="[[getIsActiveClass(player.isShuffling)]]"
              disabled="[[isShuffleDisabled(episode, player.episodeList)]]"
              on-click="toggleShuffle"
            >
              <img src="/shuffle.svg" alt="Shuffle" />
            </button>

            <button
              type="button"
              disabled="[[isPreviousOrNextDisabled(episode, hasPrevious)]]"
              on-click="playPrevious"
            >
              <img src="/play-previous.svg" alt="Play previous" />
            </button>

            <button
              type="button"
              disabled="[[!episode]]"
              class="play-button"
              on-click="togglePlay"
            >
              <template is="dom-if" if="[[player.isPlaying]]">
                <img src="/pause.svg" alt="Pause" />
              </template>

              <template is="dom-if" if="[[!player.isPlaying]]">
                <img src="/play.svg" alt="Play" />
              </template>
            </button>

            <button
              type="button"
              disabled="[[isPreviousOrNextDisabled(episode, hasNext)]]"
              on-click="playNext"
            >
              <img src="/play-next.svg" alt="Play next" />
            </button>

            <button
              type="button"
              disabled="[[!episode]]"
              class$="[[getIsActiveClass(player.isLooping)]]"
              on-click="toggleLoop"
            >
              <img src="/repeat.svg" alt="Repeat" />
            </button>
          </div>
        </footer>
      </div>

      <template is="dom-if" if="[[episode]]">
        <audio
          src="[[episode.url]]"
          autoplay
          loop="[[player.isLooping]]"
          on-play="handlePlay"
          on-pause="handlePause"
          on-ended="handleEpisodeEnded"
          on-loadedmetadata="handleLoadMetadata"
        />
      </template>
    `
  }

  @computed('player')
  get episode() {
    return this.player.episodeList[this.player.currentEpisodeIndex] || null
  }

  @observe('player.isPlaying')
  private onChangePlayState(isPlaying: boolean) {
    const audioEl = this.shadowRoot?.querySelector('audio')
    if (!audioEl) {
      return
    }

    if (isPlaying) {
      audioEl.play()
    } else {
      audioEl.pause()
    }
  }

  private handlePlay() {
    this.setPlayingState(true)
  }

  private handlePause() {
    this.setPlayingState(false)
  }

  private handleEpisodeEnded() {
    if (this.hasNext) {
      this.playNext()
    } else {
      this.clearPlayerState()
    }
  }

  private handleLoadMetadata() {
    const audioEl = this.shadowRoot?.querySelector('audio')

    audioEl?.addEventListener('timeupdate', () => {
      this.progress = Math.floor(audioEl.currentTime)
    })
  }

  private handleSeek() {
    const audioEl = this.shadowRoot?.querySelector('audio')
    const slider = this.shadowRoot?.querySelector('paper-slider')

    if (audioEl && slider?.value) {
      audioEl.currentTime = slider.value
    }
  }

  private convertDurationToTimeString(duration?: number) {
    return convertDurationToTimeString(duration ?? 0)
  }

  private isShuffleDisabled(episode: Episode, episodeList: Episode[]): boolean {
    return !episode || episodeList.length === 1
  }

  private isPreviousOrNextDisabled(
    episode: Episode,
    hasPreviousOrNext: boolean
  ): boolean {
    return !episode || !hasPreviousOrNext
  }

  private getFooterClass(episode: Episode | null): string {
    return classNames({ empty: !episode })
  }

  private getIsActiveClass(isActive: boolean): string {
    return classNames({ 'is-active': isActive })
  }
}

export default Player
