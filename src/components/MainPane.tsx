import "./MainPane.css";

interface ContentProps {
  children: React.ReactNode;
}

function MainPane(props: ContentProps) {
  return <div className="container-fluid main-pane">{props.children}</div>;
}

export default MainPane;
