import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function EditUser() {
  const [user, setUser] = useState<UserData>({
    find: () => false,
    map: () => null,
    rcc: "",
    userid: "",
    fullname: "",
    level: "",
    secret: "",
  });

  const [rcc, setRcc] = useState("");
  const [userId, setUserId] = useState("");
  const [drawssap, setDrawssap] = useState("");
  const [fullName, setFullName] = useState("");
  const [level, setLevel] = useState("");
  const navigate = useNavigate();

  const resBody = {
    rcc: rcc,
    userid: userId,
    fullname: fullName,
    level: level,
    drawssap: drawssap,
  };

  const getAllUser = async () => {
    //3.133.137.68 RemomaxBE
    const response = await fetch(`${import.meta.env.VITE_SERVER}/user`);
    if (response.ok) {
      const data = await response.json();
      setUser(data);
    }
  };

  const editUser = async () => {
    //3.133.137.68 RemomaxBE
    const response = await fetch(`${import.meta.env.VITE_SERVER}/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resBody),
    });
    if (response.ok) {
      alert("success");
      window.location.reload();
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

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
          Edit User
        </div>
        <div className="grid justify-items-start m-1 ml-0 col-span-2">
          <select
            onChange={(e) => {
              const data: any = user?.find((f) => f.rcc === e.target.value);
              setRcc(data.rcc);
              setUserId(data.userid);
              setFullName(data.fullname);
              setLevel(data.level);
              setDrawssap(data.secret);
            }}
            className="btn bg-gray-50 border border-gray-300 text-zinc-600 block text-xs"
          >
            {/* value={null} */}
            <option selected>Choose a Role</option>
            {user.map((user) => (
              <option key={user.rcc} value={user.rcc}>
                {user.userid}
              </option>
            ))}
          </select>
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
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
            required
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
            value={level}
            onChange={(e) => {
              setLevel(e.target.value);
            }}
            required
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
            value={userId}
            onChange={(e) => {
              setUserId(e.target.value);
            }}
            required
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
            value={drawssap}
            onChange={(e) => {
              setDrawssap(e.target.value);
            }}
            required
          />
        </div>
        <div className=" col-span-2">
          <div className="btn mt-2 mr-2" onClick={editUser}>
            submit
          </div>
          <div className="btn">cancle</div>
        </div>
      </form>

      <div className=" col-span-1"></div>
    </div>
  );
}
