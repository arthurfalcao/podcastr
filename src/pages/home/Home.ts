import { customElement, property } from "@polymer/decorators";
import { html, PolymerElement } from "@polymer/polymer";
import { parseISO, format } from 'date-fns'

import '@polymer/polymer/lib/elements/dom-repeat'

import { PlayerMixin } from "../../mixins/PlayerMixin";
import { api } from '../../services/api'
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString'

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
  duration: number;
  durationAsString: string
  url: string
  publishedAt: string
}

interface HomeProps {
  latestEpisodes: Episode[]
  allEpisodes: Episode[]
}

@customElement('pcr-home-page')
class Home extends PlayerMixin(PolymerElement) implements HomeProps {
  @property({ type: Array })
  latestEpisodes: Episode[]

  @property({ type: Array })
  allEpisodes: Episode[]

  static get template() {
    return html`
      ${styles}

      <div class="wrapper">
        <section class="latest-episodes">
          <h2>Latest episodes</h2>

          <ul>
            <template is="dom-repeat" items="[[latestEpisodes]]" as="episode">
              <li>
                <div class="image-wrapper">
                  <img src="[[episode.thumbnail]]" alt="[[episode.title]]" />
                </div>

                <div class="episode-details">
                  <a href$="/episodes/[[episode.id]]">[[episode.title]]</a>
                  <p>[[episode.members]]</p>
                  <span>[[episode.publishedAt]]</span>
                  <span>[[episode.durationAsString]]</span>
                </div>

                <button type="button" on-click="handleClickPlay">
                  <img src="/play-green.svg" alt="Play episode" />
                </button>
              </li>
            </template>
          </ul>
        </section>

        <section class="all-episodes">
          <h2>All episodes</h2>

          <table cellspacing="0">
            <thead>
              <th></th>
              <th>Podcast</th>
              <th>Members</th>
              <th>Date</th>
              <th>Duration</th>
              <th></th>
            </thead>
            <tbody>
              <template is="dom-repeat" items="[[allEpisodes]]" as="episode">
                <tr>
                  <td style="width: 72px;">
                    <div class="image-wrapper">
                      <img src="[[episode.thumbnail]]" alt="[[episode.title]]" />
                    </div>
                  </td>
                  <td>
                    <a href$="/episodes/[[episode.id]]">[[episode.title]]</a>
                  </td>
                  <td>[[episode.members]]</td>
                  <td style="width: 100px;">[[episode.publishedAt]]</td>
                  <td>[[episode.durationAsString]]</td>
                  <td>
                    <button type="button">
                      <img src="/play-green.svg" alt="Play episode" />
                    </button>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </section>
      </div>
    `
  }

  connectedCallback() {
    super.connectedCallback();

    const fetchEpisodes = async () => {
      const { data } = await api.get<EpisodeDto[]>('/episodes', {
        params: {
          _limit: 12,
          _sort: 'published_at',
          _order: 'desc'
        }
      })

      const episodes = data.map<Episode>((episode) => ({
        id: episode.id,
        title: episode.title,
        thumbnail: episode.thumbnail,
        members: episode.members,
        description: episode.description,
        publishedAt: format(parseISO(episode.published_at), 'd MMM yy'),
        durationAsString: convertDurationToTimeString(episode.file.duration),
        duration: episode.file.duration,
        url: episode.file.url
      }))

      const latestEpisodes = episodes.slice(0, 2);
      const allEpisodes = episodes.slice(2, episodes.length)

      this.latestEpisodes = latestEpisodes
      this.allEpisodes = allEpisodes
    }

    fetchEpisodes()
  }

  private handleClickPlay(e: MouseEvent) {
    // @ts-ignore
    this.play(e.model.episode as Episode);
  }
}

export default Home
