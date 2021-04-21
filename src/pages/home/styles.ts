import { html } from "@polymer/polymer";

import "../../styles/shared";

export default html`
  <style include="shared-styles">
    .wrapper {
      padding: 0 4rem;
    }

    .wrapper h2 {
      margin-top: 3rem;
      margin-bottom: 1.5rem;
    }

    .latest-episodes ul {
      list-style: none;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }

    .latest-episodes ul li {
      background: var(--white);
      border: 1px solid var(--gray-100);
      padding: 1.25rem;
      border-radius: 1.5rem;
      position: relative;

      display: flex;
      align-items: center;
    }

    .latest-episodes .image-wrapper > img {
      width: 6rem;
      height: 6rem;
      border-radius: 1rem;
      object-fit: cover;
    }

    .episode-details {
      flex: 1;
      margin-left: 1rem;
    }

    .episode-details a {
      display: block;
      color: var(--gray-800);
      font-family: Lexend, sans-serif;
      font-weight: 600;
      text-decoration: none;
      line-height: 1.4rem;
    }

    .episode-details a:hover {
      text-decoration: none;
    }

    .episode-details p {
      font-size: 0.875rem;
      margin-top: 0.5rem;
      max-width: 70%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .episode-details span {
      display: inline-block;
      margin-top: 0.5rem;
      font-size: 0.875rem;
    }

    .episode-details span:last-child {
      margin-left: 0.5rem;
      padding-left: 0.5rem;
      position: relative;
    }

    .episode-details span:last-child::before {
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

    .latest-episodes button {
      position: absolute;
      right: 2rem;
      bottom: 2rem;

      width: 2.5rem;
      height: 2.5rem;
      background: var(--white);
      border: 1px solid var(--gray-100);
      border-radius: 0.675rem;
      font-size: 0;

      transition: filter 0.2s;
    }

    .latest-episodes button:hover {
      filter: brightness(0.95);
    }

    .latest-episodes button img {
      width: 1.5rem;
      height: 1.5rem;
    }

    .all-episodes {
      padding-bottom: 2rem;
    }

    .all-episodes table {
      width: 100%;
    }

    .all-episodes table th,
    .all-episodes table td {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid var(--gray-100);
    }

    .all-episodes table th {
      color: var(--gray-200);
      text-transform: uppercase;
      font: 500 0.75rem Lexend, sans-serif;
      text-align: left;
    }

    .all-episodes table td {
      font-size: 0.875rem;
    }

    .all-episodes .image-wrapper > img {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 0.5rem;
    }

    .all-episodes table td a {
      color: var(--gray-800);
      font-family: Lexend, sans-serif;
      font-size: 1rem;
      font-weight: 600;
      text-decoration: none;
      line-height: 1.4rem;
    }

    .all-episodes table td a:hover {
      text-decoration: underline;
    }

    .all-episodes table td button {
      width: 2rem;
      height: 2rem;
      background: var(--white);
      border: 1px solid var(--gray-100);
      border-radius: 0.5rem;
      font-size: 0;

      transition: filter 0.2s;
    }

    .all-episodes table td button > img {
      width: 1.25rem;
      height: 1.25rem;
    }

    .all-episodes table td button:hover {
      filter: brightness(0.95);
    }
  </style>
`;
