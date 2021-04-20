import { html } from "@polymer/polymer";

const shared = document.createElement("dom-module");

const styles = html`
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    *::before,
    *::after {
      box-sizing: inherit;
    }

    input,
    textarea,
    button {
      font: 500 1rem sans-serif;
      color: var(--gray-500);
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-weight: 600;
      font-family: Lexend, sans-serif;
      color: var(--gray-800);
    }

    h1 {
      font-size: 2rem;
    }

    h2 {
      font-size: 1.5rem;
    }

    button {
      cursor: pointer;
    }
  </style>
`;

shared.insertAdjacentElement("afterbegin", styles);
shared.register("shared-styles");
