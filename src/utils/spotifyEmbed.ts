import type { ElementContent, Root } from 'hast';
import { visit } from 'unist-util-visit';

const spotifyRegex = /^https:\/\/open\.spotify\.com(?:\/[a-z\-]+)*\/track\/([A-Za-z0-9]+)/;

export default function rehypeSpotifyEmbed() {
  return (tree: Root) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName !== 'a') return;
      const href = node.properties.href;
      if (typeof href !== 'string') return;

      if (
        !node.children ||
        node.children.length !== 1 ||
        node.children[0].type !== 'text' ||
        node.children[0].value !== href
      ) {
        return;
      }

      const spotifyMatch = spotifyRegex.exec(href);
      if (spotifyMatch) {
        const trackId = spotifyMatch[1];
        const src = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator`;
        const iframe: ElementContent = {
          type: 'element',
          tagName: 'iframe',
          properties: {
            style: 'border-radius:12px',
            src,
            width: '100%',
            height: '152',
            frameBorder: '0',
            allowFullScreen: true,
            allow: 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture',
            loading: 'lazy',
          },
          children: [],
        };
        if (parent && typeof index === 'number') {
          parent.children.splice(index, 1, iframe);
        }
        return;
      }
    });
  };
}