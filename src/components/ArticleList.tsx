import { useState } from "react";
import { Icon } from '@iconify/react';

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
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');

  const filteredArticles = searchKeyword
    ? articles.filter((article) => article.frontmatter.title.includes(searchKeyword))
    : articles;

  const sortedArticles = [...filteredArticles]
    .sort((a, b) => {
      const aDate = sortType === 'pub'
        ? new Date(a.frontmatter.date).getTime()
        : new Date(a.frontmatter.lastModified).getTime();
      const bDate = sortType === 'pub'
        ? new Date(b.frontmatter.date).getTime()
        : new Date(b.frontmatter.lastModified).getTime();
      return sortOrder === 'desc' ? bDate - aDate : aDate - bDate;
    });

  return (
    <>
      {displayButton && (
        <div className="flex flex-col gap-2 mb-2 justify-between sm:flex-row">
          <div className="flex gap-2 items-center">
            <button
              className={`px-2 py-1 rounded text-sm border border-[#333333] ${sortType === 'pub' ? 'bg-blue-500 text-white' : 'bg-[#e6e8f2] hover:bg-gray-300'}`}
              onClick={() => setSortType('pub')}
            >
              <div className="h-6 flex items-center">
                投稿日
              </div>
            </button>
            <button
              className={`px-2 py-1 rounded text-sm border border-[#333333] ${sortType === 'last' ? 'bg-blue-500 text-white' : 'bg-[#e6e8f2] hover:bg-gray-300'}`}
              onClick={() => setSortType('last')}
            >
              <div className="h-6 flex items-center">
                最終更新
              </div>
            </button>
            <button
              className="px-1 py-1 rounded text-sm border border-[#333333] bg-[#e6e8f2] hover:bg-gray-300"
              onClick={() => setSortOrder((v) => (v === 'desc' ? 'asc' : 'desc'))}
            >
              {sortOrder === 'desc' ?
                <Icon icon="iconamoon:arrow-up-2" width="24" height="24" /> :
                <Icon icon="iconamoon:arrow-down-2" width="24" height="24" />
              }
            </button>
          </div>
          <div className="flex gap-2 items-center">
            <Icon icon="material-symbols:search" width="24" height="24" />
            <input
              type="text"
              id="username"
              name="username"
              className="px-2 py-1 border border-black rounded w-48"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') setSearchKeyword(searchText);
              }}
            />
            <button
              className="px-2 py-1 rounded text-sm border border-[#333333] bg-[#e6e8f2] hover:bg-gray-300"
              onClick={() => setSearchKeyword(searchText)}
            >
              <div className="h-6 flex items-center">
                検索
              </div>
            </button>
          </div>
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
    </>
  );
}
