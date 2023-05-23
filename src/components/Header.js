import logo from "../images/logo.svg";

export function Header(props) {
  const { children } = props;

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип 'Место'" />
      {children}
    </header>
  );
}
