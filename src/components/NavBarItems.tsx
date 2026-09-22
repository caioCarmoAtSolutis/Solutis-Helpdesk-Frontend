import CreateTicketButton from "./CreateTicketButton";

function NavBarItems() {
  return (
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/">
            Dashboard
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/listar-chamados">
            Chamados
          </a>
        </li>
      </ul>
      <CreateTicketButton />
    </div>
  );
}

export default NavBarItems;
