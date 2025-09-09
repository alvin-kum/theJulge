export default function Footer() {
  return (
    <footer
      style={{
        height: 60,
        borderTop: "1px solid #eee",
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
      }}
    >
      <small>© {new Date().getFullYear()} The Julge</small>
    </footer>
  );
}
