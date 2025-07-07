import { useState } from "react";
import type { MarkdownInstance } from "astro";
import ArticleCard from "./ArticleCardReact";

export interface Props {
  articles: MarkdownInstance<Record<string, any>>[];
  limit?: number;
}

export default function ArticleList({ articles, limit }: Props) {
  const [desc, setDesc] = useState(true);

  const sortedArticles = [...articles]
    .sort((a, b) =>
      desc
        ? new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
        : new Date(a.frontmatter.date).getTime() - new Date(b.frontmatter.date).getTime()
    )
    .slice(0, limit ?? articles.length);

  return (
    <div>
      <button
        className="mb-2 px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm"
        onClick={() => setDesc((v) => !v)}
      >
        {desc ? "新しい順" : "古い順"}で並び替え
      </button>
      <div className="flex flex-col gap-2">
        {sortedArticles.map((article) => (
          <ArticleCard
            key={article.url}
            url={article.url ?? ""}
            title={article.frontmatter.title}
            date={article.frontmatter.date}
            lastModified={article.frontmatter.lastModified}
          />
        ))}
      </div>
    </div>
  );
}
