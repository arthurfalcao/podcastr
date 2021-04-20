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

    .wrapper footer.empty {
      opacity: 0.5;
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
    }

    .buttons button.play-button {
      width: 4rem;
      height: 4rem;
      border-radius: 1rem;
      background: var(--purple-400);
    }
  </style>
`;
