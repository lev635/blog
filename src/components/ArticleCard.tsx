export interface Props {
  url: string;
  title: string;
  date: string;
  lastModified: string;
}

export default function ArticleCardReact({ url, title, date, lastModified }: Props) {
  return (
    <div className="flex flex-col border-2 border-gray-800 rounded-md p-4">
      <div>
        <a
          className="font-semibold text-2xl no-underline"
          href={url}
        >
          {title}
        </a>
      </div>
      <div className="flex flex-col mt-3">
        <span>投稿日: {date}</span>
        <span>最終更新: {lastModified}</span>
      </div>
    </div>
  );
}