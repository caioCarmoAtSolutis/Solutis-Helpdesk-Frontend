import "./ContentBox.css";
import type React from "react";

interface ContentBoxProps {
  children: React.ReactNode;
}

function ContentBox(props: ContentBoxProps) {
  return <div className="content-box">{props.children}</div>;
}

export default ContentBox;
