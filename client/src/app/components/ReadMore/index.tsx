import parse from 'html-react-parser';
import { useState } from "react";

interface Props {
  htmlText: string;
}

export default function ReadMore(props: Props) {
  const [expanded, setExpanded] = useState(!(props.htmlText.length > 200));
  const toggleReadMore = () => {
      setExpanded(!expanded);
  };
  return (
    <>
    <div
      style={expanded ? { 
      }: {
        overflow: "hidden",
        display: '-webkit-box',
        WebkitLineClamp: 5,
        WebkitBoxOrient: "vertical",        
      }}
    >
        <div dangerouslySetInnerHTML={{ __html: props.htmlText }} />
    </div>
            { props.htmlText.length > 200 && 
            <span
                onClick={toggleReadMore}
                className="read-or-hide"
                style={{ color: "#2d6ff7" }}
            >
            {!expanded ? " ...xem thêm" : " ẩn bớt"}
            </span>
            }
    </>
  )
}