import { useState } from "react";
import { useNavigate } from "react-router-dom";
export function CreatePage() {
  const [title, setTitle] = useState("");
  const [namePage, setNamePage] = useState("");
  const navigate = useNavigate();

  const postCreatePage = async () => {
    const resBodyPage = {
      title: title,
      namePage: namePage,
    };

    const response = await fetch(`${import.meta.env.VITE_SERVER}/create/page`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resBodyPage),
    });
    if (response.ok) {
      // console.log("success");
      alert("success");
      window.location.reload();
    } else {
      // console.log("fail");
      alert("fail");
    }
  };

  return (
    <div className="grid grid-cols-12">
      <div className=" col-span-1"></div>

      <form className="grid col-span-10 grid-cols-12">
        <button
          type="submit"
          className="btn text-xl"
          onClick={() => {
            navigate("/admin");
          }}
        >
          &larr;
        </button>
        <div className="col-span-12 mt-2 mb-2 text-4xl font-extrabold leading-none tracking-tight">
          Create Page
        </div>
        <div className="grid col-span-12 mb-1 mt-2 text-sm font-medium text-gray-900">
          Title And Name Page
        </div>
        <div className="grid grid-cols-12 col-span-12 mr-1">
          <input
            type="text"
            className="mr-1 grid col-span-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Title"
          />
          <input
            type="text"
            className="mr-1 grid col-span-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
            value={namePage}
            onChange={(e) => {
              setNamePage(e.target.value);
            }}
            placeholder="Name Page"
          />
        </div>

        <div className="col-span-12">
          <div
            className="btn mt-2 mr-2"
            onClick={() => {
              postCreatePage();
            }}
          >
            submit
          </div>
          <div className="btn">cancle</div>
        </div>
      </form>

      <div className=" col-span-1"></div>
    </div>
  );
}
