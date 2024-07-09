import queryString from "query-string";
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom";
import { SortCategory } from "../InitialSection";

export default function LeftSideBarQuestion() {
  const [open, setOpen] = useState<boolean>(true);
  const location = useLocation();
  const tab = queryString.parse(location.search)?.tab;
  const [section, setSection] = useState<SortCategory>(tab as SortCategory);
  const activeTab = (category: SortCategory) => {
    if (category === section) {
      return "menu-item menu-item-type-custom menu-item-object-custom menu-item-131 current-menu-item";
    } return "menu-item menu-item-type-custom menu-item-object-custom menu-item-131";
  }

  useEffect(() => {
    const tab = queryString.parse(location.search)?.tab;
    setSection(tab as SortCategory);
  }, [location])

  return (
    <li 
      className={"menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-130" + (open ? " nav_menu_open" : "")}>
      <a href="#" onClick={(e) => { e.preventDefault(); setOpen(!open); }}>
        <i className="icon-book-open" />
        Xem câu hỏi
      </a>
      <ul className="sub-menu">
        <li className={activeTab(SortCategory.newest)}>
          <Link to="/home?tab=createdAt">
            Câu hỏi mới
          </Link>
        </li>
        <li className={activeTab(SortCategory.views)}>
          <Link to="/home?tab=views">
            Câu hỏi nên xem
          </Link>
        </li>
        <li className={activeTab(SortCategory.answers)}>
          <Link to="/home?tab=comments">
            Câu hỏi nổi bật
          </Link>
        </li>
        <li className={activeTab(SortCategory.votes)}>
          <Link to="/home?tab=totalVotes">
            Câu hỏi trending
          </Link>
        </li>
      </ul>
    </li>
  )
}