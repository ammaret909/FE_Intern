import { useState } from "react";
import { useNavigate } from "react-router-dom";
const errorMassageData: DataErrorMassage = {
  rcc: "",
  id: 0,
  massage: "",
  description: "",
};

export function ManageErrorMassage() {
  const [search, setSearch] = useState("");
  const [ErrorMassage, setErrorMassage] = useState<DataErrorMassage[]>([]);
  const [showErrorMassage, setshowErrorMassage] = useState(true);
  const [showFrom, setShowFrom] = useState(false);
  const [rcc, setRcc] = useState("");
  const [id, setId] = useState("");
  const [massage, setMassage] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const searchErrorMassage = async () => {
    const searchBodyMassage = {
      search: search,
    };

    const response = await fetch(
      `${import.meta.env.VITE_SERVER}/massage/search`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchBodyMassage),
      }
    );
    if (response.ok) {
      const data = await response.json();
      setErrorMassage(data);
    }
  };

  const getDataEdit = async (rcc: string) => {
    const searchBodyMassage = {
      search: rcc,
    };

    const response = await fetch(
      `${import.meta.env.VITE_SERVER}/massage/data`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchBodyMassage),
      }
    );
    if (response.ok) {
      const data = await response.json();
      setRcc(data.rcc);
      setId(data.id);
      setMassage(data.massage);
      setDescription(data.description);
    }
  };

  const postDataEdit = async () => {
    // e.preventDefault();
    const resBodyErrorMassage = {
      rcc: rcc,
      id: id,
      massage: massage,
      description: description,
    };
    const response = await fetch(
      `${import.meta.env.VITE_SERVER}/massage/edit`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resBodyErrorMassage),
      }
    );
    if (response.ok) {
      alert("success");
      window.location.reload();
    } else {
      alert("fail");
    }
  };

  function showDataSearch() {
    if (showErrorMassage !== true) {
      setshowErrorMassage(!showErrorMassage);
    }
  }

  function hiddenDataSearch() {
    if (showErrorMassage !== false) {
      setshowErrorMassage(!showErrorMassage);
    }
  }
  function showFromEdit() {
    if (showFrom !== true) {
      setShowFrom(!showFrom);
    }
  }

  function hiddenFromEdit() {
    if (showFrom !== false) {
      setShowFrom(!showFrom);
    }
  }

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
          Search Error massage
        </div>
        <form className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Error massage"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => {
              searchErrorMassage();
              showDataSearch();
              hiddenFromEdit();
            }}
          >
            Search
          </button>
        </form>
        {showErrorMassage ? (
          <div className="grid grid-cols-4 mt-2">
            {ErrorMassage && Array.isArray(ErrorMassage) ? (
              ErrorMassage.map((data) => (
                <div
                  className="btn md:col-span-2 col-span-4 grid grid-cols-12 m-1"
                  key={data.rcc}
                  onClick={() => {
                    showFromEdit();
                    getDataEdit(data.rcc);
                    hiddenDataSearch();
                  }}
                >
                  <div className="col-span-4">ID :</div>
                  <div className="col-span-8">{data.id}</div>
                  <div className="col-span-4">Massage :</div>
                  <div className="col-span-8">{data.massage}</div>
                </div>
              ))
            ) : (
              <div></div>
            )}
          </div>
        ) : null}
        {showFrom ? (
          <form className="grid col-span-10 grid-cols-12">
            <div className="col-span-12 rounded-box shadow-xl bg-white p-6 mt-2">
              <div className=" text-2xl font-medium text-gray-900">
                ID Error Massage
              </div>
              <div className="text-sm font-medium text-gray-900">{id}</div>
            </div>
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
                  postDataEdit();
                }}
              >
                submit
              </div>
              <div className="btn">cancle</div>
            </div>
          </form>
        ) : null}
      </div>
    </div>
  );
}
