import type { ElementContent, Root } from 'hast';
import { visit } from 'unist-util-visit';

const youtubeRegex = /^https:\/\/youtu\.be\/([A-Za-z0-9_-]+)(?:\?([^#]*))?/;

function getStartSeconds(query: string | undefined): number | undefined {
  if (!query) return undefined;
  const params = new URLSearchParams(query);
  let t = params.get('t');
  if (!t) return undefined;
  if (/^\d+$/.test(t)) return Number(t);
  const match = /(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/.exec(t);
  if (!match) return undefined;
  const hours = Number(match[1] || 0);
  const minutes = Number(match[2] || 0);
  const seconds = Number(match[3] || 0);
  return hours * 3600 + minutes * 60 + seconds;
}

export default function rehypeYoutubeEmbed() {
  return (tree: Root) => {
    traverseAndReplace(tree, 'a', (node, href) => {
      const youtubeMatch = youtubeRegex.exec(href);
      if (youtubeMatch) {
        const videoId = youtubeMatch[1];
        const query = youtubeMatch[2];
        const start = getStartSeconds(query);
        const src =
          start !== undefined
            ? `https://www.youtube.com/embed/${videoId}?start=${start}`
            : `https://www.youtube.com/embed/${videoId}`;
        return {
          type: 'element',
          tagName: 'iframe',
          properties: {
            width: '560',
            height: '315',
            src,
            title: 'YouTube video player',
            frameBorder: '0',
            allow:
              'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
            allowFullScreen: true,
            loading: 'lazy',
          },
          children: [],
        };
      }
      return null;
    });
  };
}