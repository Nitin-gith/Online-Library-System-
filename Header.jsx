import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../Firebase/firebaseconfig";
import { useTheme } from "../../../context/ThemeContext";

export default function Header() {

  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  const userType = localStorage.getItem("userType"); // "1" = admin, "2" = student
  const userName = localStorage.getItem("name") || "User";

  const profilePath = userType === "1" ? "/admin/profile" : "/student/profile";
  const settingsPath = userType === "1" ? "/admin/settings" : "/student/settings";

  async function handleSignOut() {
    try {
      await signOut(auth);
    } catch (err) {
      console.log("Error signing out: ", err);
    } finally {
      localStorage.clear();
      navigate("/login");
    }
  }

  function toggleSidebar(){
    const isDesktop = window.matchMedia("(min-width: 992px)").matches;
    if(isDesktop){
      document.body.classList.toggle("sidebar-mini");
    }else{
      document.body.classList.toggle("sidebar-open");
    }
  }

  return (
    <>
      <nav className="navbar admin-navbar navbar-expand bg-white">
        <div className="container-fluid px-3 px-lg-4">
          <button className="sidebar-toggle" type="button" onClick={toggleSidebar} data-sidebar-toggle aria-controls="adminSidebar" aria-expanded="true" aria-label="Toggle sidebar">
            <span />
            <span />
            <span />
          </button>

          <div className="navbar-actions ms-auto">
            <button
              className="icon-button theme-toggle"
              type="button"
              onClick={toggleTheme}
              aria-label="Switch color theme"
              title="Switch color theme"
            >
              <i className={`bi ${isDark ? "bi-sun" : "bi-moon-stars"}`} aria-hidden="true" />
            </button>
            <div className="dropdown">
              <button className="icon-button" type="button" data-bs-toggle="dropdown" aria-expanded="false" aria-label="Notifications">
                <span className="notification-dot" />
                <i className="bi bi-bell" aria-hidden="true" />
              </button>
              <div className="dropdown-menu dropdown-menu-end notification-menu">
                <div className="dropdown-header fw-bold text-body">Notifications</div>
                <a className="dropdown-item" href="users.html">
                  <span className="notification-title">New user registered</span>
                  <span className="notification-time">4 minutes ago</span>
                </a>

                <a className="dropdown-item" href="settings.html">
                  <span className="notification-title">Security review completed</span>
                  <span className="notification-time">1 hour ago</span>
                </a>
              </div>
            </div>
            <div className="dropdown">
              <button className="profile-button dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img className="avatar-img avatar-sm" src="/assets/images/avatar/avatar.jpg" alt={userName} />
                <span className="profile-name d-none d-sm-inline">{userName}</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><button className="dropdown-item" type="button" onClick={() => navigate(profilePath)}>Profile</button></li>
                <li><button className="dropdown-item" type="button" onClick={() => navigate(settingsPath)}>Account settings</button></li>
                <li><hr className="dropdown-divider" /></li>
                <li><button className="dropdown-item" type="button" onClick={handleSignOut}>Sign out</button></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
