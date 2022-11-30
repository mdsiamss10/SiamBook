import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useLocation } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import Navbar from "./Navbar";
import Post from "./Post";
function Main() {
  const postRef = collection(db, "posts");
  const provider = new GoogleAuthProvider();
  const [user] = useAuthState(auth);
  const [posts, setPosts] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();
  useEffect(() => {
    setLoading(true);
    const uns = onSnapshot(postRef, (doc) => {
      let nPosts: any = [];
      doc.forEach((e: any) => {
        nPosts.push({ ...e.data(), docId: e.id });
      });
      setLoading(false);
      setPosts(nPosts);
    });
    return uns;
  }, []);
  const userSignIn = () => {
    signInWithPopup(auth, provider).catch((err) => {
      alert("Something went wrong.");
    });
  };
  return (
    <>
      <div className="main__container">
        {location.pathname != "/" && (
          <div className="navbar">
            <Navbar />
          </div>
        )}
        <div className="main__content">
          {!user ? (
            <>
              <div className="home__contaienr flex flex-col pt-28 items-center justify-center">
                <h1 className="text-3xl mx-1 text-center md:mx-0 leading-10 md:text-4xl md:leading-none font-bold text-gray-700 mt-20">
                  Hello! Welcome to SiamBook.
                </h1>
                <button
                  onClick={userSignIn}
                  className="bg-purple-500 py-2 text-white font-bold rounded-full px-10 mx-auto mt-5 md:mt-10"
                >
                  Sign in
                </button>
              </div>
            </>
          ) : (
            <div className="posts my-5 space-y-4 w-full flex flex-col items-center">
              <div className="add__post min-w-[28rem] px-7 md:px-0">
                <Link to="/newpost">
                  <button className="w-full py-3 text-white font-bold rounded-full bg-purple-500">
                    Create Post
                  </button>
                </Link>
              </div>
              {posts?.map((post: any) => (
                <Post key={post.id} post={post} />
              ))}
            </div>
          )}
          {loading && (
            <h1 className="text-3xl mx-1 md:mx-0 leading-10 md:text-4xl md:leading-none font-bold text-center text-gray-700 mt-20">
              Loading...
            </h1>
          )}
        </div>
      </div>
    </>
  );
}

export default Main;
