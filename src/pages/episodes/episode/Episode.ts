import { customElement, property } from '@polymer/decorators'
import { html, PolymerElement } from '@polymer/polymer'
import { RouterLocation } from '@vaadin/router'
import { format, parseISO } from 'date-fns'

import { PlayerMixin } from '../../../mixins/PlayerMixin'
import { api } from '../../../services/api'
import { convertDurationToTimeString } from '../../../utils/convertDurationToTimeString'

import styles from './styles'

type EpisodeDto = {
  id: string
  title: string
  members: string
  published_at: string
  thumbnail: string
  description: string
  file: {
    url: string
    type: string
    duration: number
  }
}

type Episode = {
  id: string
  title: string
  thumbnail: string
  description: string
  members: string
  duration: number
  durationAsString: string
  url: string
  publishedAt: string
}

interface EpisodeProps {
  episode: Episode
}

@customElement('pcr-episode-page')
class EpisodePage extends PlayerMixin(PolymerElement) implements EpisodeProps {
  location: RouterLocation

  @property({ type: Object })
  episode: Episode

  static get template() {
    return html`
      ${styles}

      <div class="wrapper">
        <div class="thumbnail-wrapper">
          <a href="/" class="button">
            <img src="/arrow-left.svg" alt="Go back" />
          </a>

          <div class="image-wrapper">
            <img src="[[episode.thumbnail]]" alt="[[episode.title]]" />
          </div>

          <button type="button" class="button" on-click="handlePlay">
            <img src="/play.svg" alt="Play episode" />
          </button>
        </div>

        <header>
          <h1>[[episode.title]]</h1>
          <span>[[episode.members]]</span>
          <span>[[episode.publishedAt]]</span>
          <span>[[episode.durationAsString]]</span>
        </header>

        <div class="description" inner-h-t-m-l="[[episode.description]]"></div>
      </div>
    `
  }

  connectedCallback() {
    super.connectedCallback()

    const { slug } = this.location.params

    const fetchEpisode = async () => {
      const { data } = await api.get<EpisodeDto>(`/episodes/${slug}`)

      const episode: Episode = {
        id: data.id,
        title: data.title,
        thumbnail: data.thumbnail,
        members: data.members,
        description: data.description,
        publishedAt: format(parseISO(data.published_at), 'd MMM yy'),
        duration: data.file.duration,
        durationAsString: convertDurationToTimeString(data.file.duration),
        url: data.file.url
      }

      this.episode = episode
    }

    fetchEpisode()
  }

  private handlePlay() {
    this.play(this.episode)
  }
}

export default EpisodePage
