import { useState } from "react";
import type { MarkdownInstance } from "astro";
import ArticleCard from "./ArticleCard";

export interface Props {
  articles: MarkdownInstance<Record<string, any>>[];
  displayButton?: boolean
}

type SortOrder = 'asc' | 'desc';
type SortType = 'pub' | 'last';

export default function ArticleList({ articles, displayButton }: Props) {
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [sortType, setSortType] = useState<SortType>('pub');

  const sortedArticles = [...articles]
    .sort((a, b) => {
      const aDate = sortType === 'pub'
        ? new Date(a.frontmatter.date).getTime()
        : new Date(a.frontmatter.lastModified).getTime();
      const bDate = sortType === 'pub'
        ? new Date(b.frontmatter.date).getTime()
        : new Date(b.frontmatter.lastModified).getTime();
      return sortOrder === 'desc' ? bDate - aDate : aDate - bDate;
    })

  return (
    <div>
      {displayButton && (
        <div className="flex gap-2 mb-2">
          <button
            className={`px-3 py-1 rounded text-sm ${sortType === 'pub' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            onClick={() => setSortType('pub')}
          >
            発表日
          </button>
          <button
            className={`px-3 py-1 rounded text-sm ${sortType === 'last' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            onClick={() => setSortType('last')}
          >
            最終更新
          </button>
          <button
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm"
            onClick={() => setSortOrder((v) => (v === 'desc' ? 'asc' : 'desc'))}
          >
            {sortOrder === 'desc' ? "新しい順" : "古い順"}で並び替え
          </button>
        </div>
      )}
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
