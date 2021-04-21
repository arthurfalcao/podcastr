import { html } from "@polymer/polymer";

import "../../../styles/shared";

export default html`
  <style include="shared-styles">
    .wrapper {
      max-width: 45rem;
      padding: 3rem 2rem;
      margin: 0 auto;
    }

    .thumbnail-wrapper {
      position: relative;
    }

    .thumbnail-wrapper .image-wrapper img {
      border-radius: 1rem;
      object-fit: cover;
      width: 100%;
      height: 100%;
    }

    .thumbnail-wrapper .button {
      width: 3rem;
      height: 3rem;
      border-radius: 0.75rem;
      border: 0;
      position: absolute;
      z-index: 5;
      font-size: 0;

      transition: filter 0.2s;
    }

    .thumbnail-wrapper a.button {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .thumbnail-wrapper .button:first-child {
      left: 0;
      top: 50%;
      background: var(--purple-500);
      transform: translate(-50%, -50%);
    }

    .thumbnail-wrapper .button:last-child {
      right: 0;
      top: 50%;
      background: var(--green-500);
      transform: translate(50%, -50%);
    }

    .thumbnail-wrapper .button:hover {
      filter: brightness(0.9);
    }

    header {
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--gray-100);
    }

    header h1 {
      margin-top: 2rem;
      margin-bottom: 1.5rem;
    }

    header span {
      display: inline-block;
      font-size: 0.875rem;
    }

    header span + span {
      margin-left: 1rem;
      padding-left: 1rem;
      position: relative;
    }

    header span + span::before {
      content: '';
      width: 4px;
      height: 4px;
      border-radius: 2px;
      background: #DDD;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    .description {
      margin-top: 2rem;
      line-height: 1.675rem;
      color: var(--gray-800);
    }

    .description p {
      margin: 1.5rem 0;
    }
  </style>
`;
