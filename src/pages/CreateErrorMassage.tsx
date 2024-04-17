import { useState } from "react";
import { useNavigate } from "react-router-dom";
export function CreateErrorMassage() {
  const [massage, setMassage] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const createMessage = async () => {
    const resBodyErrorMassage = {
      massage: massage,
      description: description,
    };
    const response = await fetch(`${import.meta.env.VITE_SERVER}/massage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resBodyErrorMassage),
    });
    if (response.ok) {
      alert("success");
      window.location.reload();
    } else {
      alert("fail");
    }
  };

  return (
    <div className="grid grid-cols-12">
      <div className=" col-span-1"></div>
      <div className="col-span-10 mt-2">
        <button
          type="submit"
          className="btn text-xl"
          onClick={() => {
            navigate("/menu/test");
          }}
        >
          &larr;
        </button>
        <div className="mt-2 mb-2 text-4xl font-extrabold leading-none tracking-tight">
          Create Error massage
        </div>

        <form className="grid col-span-10 grid-cols-12">
          <div className="grid col-span-12 mb-1 mt-2 text-sm font-medium text-gray-900">
            Massage
          </div>
          <div className="grid grid-cols-11 col-span-12 ">
            <input
              type="text"
              className=" grid col-span-11 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
              value={massage}
              onChange={(e) => {
                setMassage(e.target.value);
              }}
              placeholder="Massage"
              required
            />
          </div>
          <div className="grid col-span-12 mb-1 mt-2 text-sm font-medium text-gray-900">
            Description
          </div>
          <div className="grid grid-cols-11 col-span-12 ">
            <input
              type="text"
              className=" grid col-span-11 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder="Description"
            />
          </div>
          <div className="col-span-12">
            <div
              className="btn mt-2 mr-2"
              onClick={() => {
                createMessage();
              }}
            >
              submit
            </div>
            <div className="btn">cancle</div>
          </div>
        </form>
      </div>
    </div>
  );
}
