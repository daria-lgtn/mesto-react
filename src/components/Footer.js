export function Footer() {
  return (
    <footer className="footer">
      <p lang="en" className="footer__info">
        &copy; {(new Date()).getFullYear()}. Mesto Russia
      </p>
    </footer>
  );
}
