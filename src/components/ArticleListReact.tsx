import type { MarkdownInstance } from "astro";
import ArticleCard from "./ArticleCardReact";

export interface Props {
  articles: MarkdownInstance<Record<string, any>>[];
  limit?: number;
}

export default function ArtilceList({ articles, limit }: Props) {
  const sortedArticles = articles
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
    .slice(0, limit ?? articles.length);
  return (
    <div>
      {
        sortedArticles.map((article) => (
          <ArticleCard
            url={article.url ?? ""}
            title={article.frontmatter.title}
            date={article.frontmatter.date}
            lastModified={article.frontmatter.lastModified}
          />
        ))
      }
    </div>
  )
}
