import { addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase";

interface formValue {
  title: string;
  description: string;
}

function CreateForm() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<formValue>();
  const postsRef = collection(db, "posts");
  const [user] = useAuthState(auth);
  const onSubmit = (data: formValue) => {
    addDoc(postsRef, {
      ...data,
      username: user?.displayName,
      id: user?.uid,
      avatar: user?.photoURL,
    })
      .then(() => {
        alert("Post created.");
        navigate("/");
      })
      .catch((err) => {
        alert("Something went wrong");
        console.log(err?.message);
      });
  };
  return (
    <div className="container mt-36 flex items-center justify-center flex-col">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 py-3 appearance-none border-2 border-gray-200 rounded w-full px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
              placeholder="Title"
              required
              {...register("title")}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 py-3 appearance-none border-2 border-gray-200 rounded w-full px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
              placeholder="Description"
              required
              {...register("description")}
            />
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3" />
          <div className="md:w-2/3">
            <button
              className="shadow w-full py-3 bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold px-4 rounded"
              type="submit"
            >
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateForm;
