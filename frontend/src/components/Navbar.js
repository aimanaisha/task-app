import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const handleClick = () => {
    logout();
  };

  return (
    <header className="bg-emerald-200">
      <div className="container py-3 px-10 bg-emerald-200 w-[100%] flex justify-between">
        <Link to="/">
          <h1>TaskVault</h1>
        </Link>
        {user && <span>{user.email}</span>}
        {user && (
          <div>
            <button onClick={handleClick}>Logout</button>
          </div>
        )}
        {!user && (
          <div className="flex justify-between">
            <div>
              <Link className="mx-2" to="/login">
                Login
              </Link>
            </div>
            <div>
              <Link className="mx-2" to="/signup">
                Signup
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
