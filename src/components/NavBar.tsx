import IconImage from "./IconImage";
import NavBarItems from "./NavBarItems";
import "./NavBar.css";

function NavBar() {
  return (
    <div className="nav-bar">
      <nav className="navbar nav-bar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <IconImage />
          <NavBarItems />
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
