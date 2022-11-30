import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";

function Navbar() {
  const provider = new GoogleAuthProvider();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const userSignOut = () => {
    if (confirm("Do you want to sign out?")) {
      signOut(auth)
        .then(() => {
          navigate("/");
        })
        .catch(() => {
          alert("Something went wrong.");
        });
    } else {
      return;
    }
  };
  const userSignIn = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        alert("Something went wrong.");
      });
  };
  return (
    <nav className="flex top-0 w-full z-10 py-7 md:py-5 md:py-4 bg-purple-500 shadow-md items-center justify-end text-white">
      <div className="nav_content md:space-y-0 w-full flex items-center justify-between px-5 md:pr-5 ml-0">
        <div className="nav_link">
          <ul className="flex space-x-4">
            <NavLink to="/">
              <li className="font-bold">Home</li>
            </NavLink>
            {!user ? (
              <li onClick={userSignIn} className="font-bold cursor-pointer">
                Login
              </li>
            ) : (
              <>
                {/* <NavLink to="/newpost">
                  <li className="font-bold cursor-pointer">Create post</li>
                </NavLink> */}
                <li onClick={userSignOut} className="font-bold cursor-pointer">
                  Logout
                </li>
              </>
            )}
          </ul>
        </div>
        {user && (
          <div className="profile flex items-center space-x-4">
            <h1 className="font-bold">{user?.displayName}</h1>
            <img src={user?.photoURL || ""} className="w-9 h-9 rounded-full" />
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
