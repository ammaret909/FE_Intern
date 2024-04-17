import { useState } from "react";
import { useNavigate } from "react-router-dom";
export function Register() {
  const [fullName, setFullName] = useState("");
  const [level, setLevel] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const resBody = {
      fullname: fullName,
      level: level,
      userid: userName,
      drawssap: password,
    };
    //3.133.137.68 RemomaxBE
    const postUserName = await fetch(`${import.meta.env.VITE_SERVER}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resBody),
    });
    if (postUserName.ok) {
      alert("success");
      window.location.reload();
    } else {
      alert("failed");
      window.location.reload();
    }
  };

  return (
    <div className="grid grid-cols-12">
      <div className=" col-span-1"></div>

      <form className="grid col-span-10 grid-cols-2">
        <div className=" col-span-1 mt-2">
          <button
            type="submit"
            className="btn text-xl col-span-12"
            onClick={() => {
              navigate("/admin");
            }}
          >
            &larr;
          </button>
        </div>
        <div className="col-span-2 mt-2 mb-2 text-4xl font-extrabold leading-none tracking-tight">
          Create User
        </div>
        <div className="col-span-2 sm:col-span-1 mr-1">
          <label
            htmlFor="first_name"
            className="block mb-1 mt-2 text-sm font-medium text-gray-900"
          >
            Full Name
          </label>
          <input
            type="text"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5"
            placeholder="Full name"
            onChange={(e) => {
              setFullName(e.target.value);
            }}
            value={fullName}
          />
        </div>
        <div className="col-span-2 sm:col-span-1 mr-1">
          <label
            htmlFor="last_name"
            className="block mb-1 mt-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            User Level
          </label>
          <input
            type="text"
            id="last_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5"
            placeholder="User level"
            onChange={(e) => {
              setLevel(e.target.value);
            }}
            value={level}
          />
        </div>
        <div className="col-span-2 sm:col-span-1 mr-1">
          <label
            htmlFor="first_name"
            className="block mb-1 mt-2 text-sm font-medium text-gray-900"
          >
            User Name
          </label>
          <input
            type="text"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5"
            placeholder="User name"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            value={userName}
          />
        </div>
        <div className="col-span-2 sm:col-span-1 mr-1">
          <label
            htmlFor="last_name"
            className="block mb-1 mt-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="text"
            id="last_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
        </div>
        <div className=" col-span-2">
          <div className="btn mt-2 mr-2" onClick={handleSubmit}>
            submit
          </div>
          <div className="btn">cancle</div>
        </div>
      </form>

      <div className=" col-span-1"></div>
    </div>
  );
}
