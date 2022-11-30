import { Delete } from "@mui/icons-material";
import { deleteDoc, doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase/firebase";
interface Post {
  post: any;
}
function Post({ post }: Post) {
  const [user]: any = useAuthState(auth);
  const docRef = doc(db, "posts", post?.docId);
  const deletePost = () => {
    if (confirm("Are you sure you want to delete this post?")) {
      deleteDoc(docRef)
        .then(() => {
          console.log("Post deleted.");
        })
        .catch((err) => {
          alert("Something went wrong.");
        });
    }
  };
  return (
    <>
      <div className="post md:min-w-[28rem] md:px-0 min-w-full px-4 max-w-md relative">
        <div className="flex bg-white shadow-lg rounded-lg">
          <div className="flex flex-col items-start px-4 py-6 w-full">
            <div className="top__menu flex items-center justify-between pr-4 w-full">
              <div className="profile flex items-center mb-2">
                <img
                  className="w-12 h-12 rounded-full object-cover mr-4 shadow"
                  src={
                    post.avatar ||
                    "https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                  }
                />
                <h2 className="text-lg font-semibold text-gray-900 -mt-1">
                  {post.username}
                </h2>
              </div>
              {user.uid === post.id && (
                <div className="delet__icon">
                  <Delete
                    onClick={deletePost}
                    className="text-red-500 cursor-pointer"
                  />
                </div>
              )}
            </div>
            <div className="w-full">
              <div className="flex items-center justify-between break-words"></div>
              <p className="mt-3 text-gray-700 text-sm">{post.title}</p>

              <hr className="my-2" />

              <p className="text-gray-700 text-sm leading-6 text-justify font-medium">
                {post.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
