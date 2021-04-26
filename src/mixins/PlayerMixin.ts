import { computed, property } from "@polymer/decorators";
import { PolymerElement } from "@polymer/polymer";
import create from "zustand/vanilla";

type Constructor<T = Record<string, unknown>> = {
  new (...args: any[]): T;
  prototype: T;
};

export type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

export type PlayerState = {
  currentEpisodeIndex: number;
  episodeList: Episode[];
  isPlaying: boolean;
  isLooping: boolean;
  isShuffling: boolean;
};

type MixinProps = {
  player: PlayerState;
  play: (episode: Episode) => void;
  playList: (list: Episode[], index: number) => void;
  togglePlay: () => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  setPlayingState: (isPlaying: boolean) => void;
  playNext: () => void;
  playPrevious: () => void;
  clearPlayerState: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
};

const store = create<PlayerState>(() => ({
  currentEpisodeIndex: 0,
  episodeList: [],
  isPlaying: false,
  isLooping: false,
  isShuffling: false,
}));

export function PlayerMixin<T extends Constructor<PolymerElement>>(
  Base: T
): T & Constructor<MixinProps> {
  class Mixin extends Base {
    unsubscribe?: () => void;

    @property({ type: Object })
    player = store.getState();

    @computed("player")
    get hasPrevious() {
      return this.player.currentEpisodeIndex > 0;
    }

    @computed("player")
    get hasNext() {
      const { currentEpisodeIndex, episodeList, isShuffling } = this.player;
      return isShuffling || currentEpisodeIndex + 1 < episodeList.length;
    }

    play(episode: Episode) {
      store.setState({
        currentEpisodeIndex: 0,
        episodeList: [episode],
        isPlaying: true,
      });
    }

    playList(list: Episode[], index: number) {
      store.setState({
        currentEpisodeIndex: index,
        episodeList: list,
        isPlaying: true,
      });
    }

    togglePlay() {
      store.setState((state) => ({ isPlaying: !state.isPlaying }));
    }

    toggleLoop() {
      store.setState((state) => ({ isLooping: !state.isLooping }));
    }

    toggleShuffle() {
      store.setState((state) => ({ isShuffling: !state.isShuffling }));
    }

    setPlayingState(isPlaying: boolean) {
      store.setState({ isPlaying });
    }

    clearPlayerState() {
      store.setState({
        currentEpisodeIndex: 0,
        episodeList: []
      });
    }

    playNext() {
      store.setState((state) => {
        if (state.isShuffling) {
          const nextRandomEpisodeIndex = Math.floor(
            Math.random() * state.episodeList.length
          );
          return { currentEpisodeIndex: nextRandomEpisodeIndex };
        }
        if (!this.hasNext) return { ...state };
        return { currentEpisodeIndex: state.currentEpisodeIndex + 1 };
      });
    }

    playPrevious() {
      store.setState((state) => {
        if (!this.hasPrevious) return { ...state };
        return { currentEpisodeIndex: state.currentEpisodeIndex - 1 };
      });
    }

    connectedCallback() {
      super.connectedCallback();

      this.unsubscribe = store.subscribe((state) => {
        this.player = state;
      });
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this.unsubscribe?.();
    }
  }

  return Mixin;
}
