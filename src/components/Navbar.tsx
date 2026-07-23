import { NavLink } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import { logout } from "../store/authSlice";
import styles from "./Navbar.module.css";

function Navbar() {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };


  const navClass = ({ isActive }: { isActive: boolean }) =>
  `${styles.link} ${isActive ? styles.linkActive : ""}`;



  return (
    <nav className={styles.nav}>
      <NavLink to="/" className={styles.brand}>
        ShopHub
      </NavLink>
      <NavLink to="/categories" className={navClass}>
        Categories
      </NavLink>

      <div className={styles.links} >
        <NavLink to="/boutiques" className={navClass}>
          Browse Boutiques
        </NavLink>

        {isAuthenticated ? (
          <>
    {user?.role === "OWNER" && (
  <>
    <NavLink to="/dashboard" end className={navClass}>
      Dashboard
    </NavLink>
    
    <NavLink to="/dashboard/boutique" className={navClass}>
      My Boutique
    </NavLink>
    
    <NavLink to="/dashboard/products" className={navClass}>
      Products
    </NavLink>
  </>
)}
            <span className={styles.userName}>Hello, {user?.name}</span>
            <button onClick={handleLogout} className={styles.logoutBtn}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={navClass}>
              Login
            </NavLink>
            <NavLink to="/register" className={styles.registerBtn}>
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;