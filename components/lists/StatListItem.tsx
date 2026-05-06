import icon_eye from '@/assets/images/icon-stat-eye.svg';
import icon_arrow_down from '@/assets/images/icon-stat-arrow-down.svg';
import icon_search from '@/assets/images/icon-stat-search.svg';

export default function StatListItem({
  icon_type,
  content,
  count
}: {
  icon_type: "eye" | "arrow_down" | "search"
  content: string;
  count: number;
}) {
  return <>
    <div className="stat-list-item">
      <div className="icon">
        {
          icon_type === "eye" && <img src={icon_eye.src} alt="icon-eye" />
        }
        {
          icon_type === "arrow_down" && <img src={icon_arrow_down.src} alt="icon-arrow-down" />
        }
        {
          icon_type === "search" && <img src={icon_search.src} alt="icon-search" />
        }
      </div>
      <div className="content">
        {content}
      </div>
      <div className="count">
        {count}
      </div>
    </div>
  </>
}