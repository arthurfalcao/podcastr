import { property } from "@polymer/decorators";
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
};

type MixinProps = {
  player: PlayerState;
  play: (episode: Episode) => void;
  togglePlay: () => void;
  setPlayingState: (isPlaying: boolean) => void;
}

const store = create<PlayerState>(() => ({
  currentEpisodeIndex: 0,
  episodeList: [],
  isPlaying: false,
}));

export function PlayerMixin<T extends Constructor<PolymerElement>>(
  Base: T
): T & Constructor<MixinProps> {
  class Mixin extends Base {
    @property({ type: Object })
    player: PlayerState;

    play(episode: Episode) {
      store.setState({
        currentEpisodeIndex: 0,
        episodeList: [episode],
        isPlaying: true,
      });
    }

    togglePlay() {
      store.setState((state) => ({ isPlaying: !state.isPlaying }));
    }

    setPlayingState(isPlaying: boolean) {
      store.setState({ isPlaying });
    }

    ready() {
      super.ready();

      this.player = store.getState();

      store.subscribe((state) => {
        this.player = state;
      });
    }
  }

  return Mixin;
}
