import { html } from "@polymer/polymer";

import '../../styles/shared'

export default html`
  <style include="shared-styles">
    .wrapper {
      padding: 3rem 4rem;
      width: 26.5rem;
      height: 100vh;

      background: var(--purple-500);
      color: var(--white);

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
    }

    .wrapper header {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .wrapper strong {
      font-family: Lexend, sans-serif;
      font-weight: 600;
    }

    .wrapper footer {
      align-self: stretch;
    }

    .wrapper footer.empty .progress {
      opacity: 0.5;
    }

    .current-episode {
      text-align: center;
    }

    .current-episode img {
      border-radius: 1.5rem;
      object-fit: cover;
      width: 296px;
      height: 296px;
    }

    .current-episode strong {
      display: block;
      margin-top: 2rem;
      font: 600 1.25rem Lexend, sans-serif;
      line-height: 1.75rem;
    }

    .current-episode span {
      display: block;
      margin-top: 1rem;
      opacity: 0.6;
      line-height: 1.5rem;
    }

    .empty-player {
      width: 100%;
      height: 20rem;
      border: 1.5px dashed var(--purple-300);
      border-radius: 1.5rem;
      background: linear-gradient(
        143.8deg,
        rgba(145, 100, 250, 0.8) 0%,
        rgba(0, 0, 0, 0) 100%
      );

      padding: 4rem;
      text-align: center;

      display: flex;
      align-items: center;
      justify-content: center;
    }

    .progress {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
    }

    .progress span {
      display: inline-block;
      width: 4rem;
      text-align: center;
    }

    .progress .slider {
      flex: 1;

      --paper-slider-container-color: var(--purple-300);
      --paper-slider-active-color: var(--green-500);
      --paper-slider-knob-color: var(--green-500);
      --paper-slider-knob-start-color: var(--green-500);
    }

    .progress .slider .empty-slider {
      width: 100%;
      height: 4px;
      background: var(--purple-300);
      border-radius: 2px;
    }

    .buttons {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 2.5rem;
      gap: 1.5rem;
    }

    .buttons button {
      background: transparent;
      border: 0;
      font-size: 0;
      transition: filter 0.2s;
    }

    .buttons button:disabled {
      cursor: default;
      opacity: 0.5;
    }

    .buttons button:hover:not(:disabled) {
      filter: brightness(0.7);
    }

    .buttons button.is-active {
      filter: invert(0.35) sepia(1) saturate(3) hue-rotate(100deg);
    }

    .buttons button.is-active:hover {
      filter: brightness(0.6) invert(0.35) sepia(1) saturate(3) hue-rotate(100deg);
    }

    .buttons button.play-button {
      width: 4rem;
      height: 4rem;
      border-radius: 1rem;
      background: var(--purple-400);
    }

    .buttons button.play-button:hover:not(:disabled) {
      filter: brightness(0.95);
    }
  </style>
`;
