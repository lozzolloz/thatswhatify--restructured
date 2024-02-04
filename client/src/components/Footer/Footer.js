import "./Footer.css";
import { logout } from "../../spotify";

export default function Footer() {
  return (
    <div className="footer">
      <p className="logout-button" onClick={logout}>
        Log Out
      </p>
    </div>
  );
}
