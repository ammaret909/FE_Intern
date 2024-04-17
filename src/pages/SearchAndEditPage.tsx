import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const initHeader: HeaderAllPage = {
  rcc: "",
  headerNumber: 0,
  file_name: "",
  header_name: "",
  popup: "",
  sequence: 0,
};

export function SearchAndEditPage() {
  const [Pages, setPages] = useState("");
  const [search, setSearch] = useState("");
  const [rcc, setRcc] = useState("");
  const [title, setTitle] = useState("");
  const [namePage, setNamePage] = useState("");
  const [h1, setH1] = useState<HeaderAllPage[]>([initHeader]);
  const [h2, setH2] = useState<HeaderAllPage[]>([initHeader]);
  const [h3, setH3] = useState<HeaderAllPage[]>([initHeader]);
  const [showFrom, setShowFrom] = useState(false);
  const [showSearch, setShowSearch] = useState(true);
  const navigate = useNavigate();

  const searchBodyPage = {
    namePage: search,
  };

  const searchPages = async () => {
    setH1([]);
    setH2([]);
    setH3([]);
    const response = await fetch(`${import.meta.env.VITE_SERVER}/search/page`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchBodyPage),
    });
    if (response.ok) {
      const data = await response.json();
      setPages(data);
    } else {
      console.log("fail");
    }
  };

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

  function hiddenDataSearch() {
    if (showSearch !== false) {
      setShowSearch(!showSearch);
    }
  }

  function showDataSearch() {
    if (showSearch !== true) {
      setShowSearch(!showSearch);
    }
  }

  const countHeader = (headerList: any) => {
    while (headerList.length < 10) {
      headerList.push(initHeader);
    }
    return headerList;
  };

  const getDataEdit = async (rcc: string) => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER}/edit/page/${rcc}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      setRcc(data.rcc);
      setTitle(data.title);
      setNamePage(data.namePage);
      setH1(countHeader(data.header1DTOoutList));
      setH2(countHeader(data.header2DTOoutList));
      setH3(countHeader(data.header3DTOoutList));
    }
  };

  const postDataEdit = async () => {
    // e.preventDefault();
    const resBodyPage = {
      rcc: rcc,
      namePage: namePage,
      title: title,
      subTitleH1: "",
      subTitleH2: "",
      subTitleH3: "",
      header1DTOoutList: h1,
      header2DTOoutList: h2,
      header3DTOoutList: h3,
    };
    const response = await fetch(`${import.meta.env.VITE_SERVER}/edit/data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resBodyPage),
    });
    if (response.ok) {
      alert("success");
      window.location.reload();
    } else {
      alert("fail");
    }
  };

  function handleFormChange(
    obj: HeaderAllPage[],
    setFunction: (d: HeaderAllPage[]) => void,
    key: string,
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const temp = obj.map((c: HeaderAllPage, i: Number) => {
      return i === index ? { ...c, [key]: e.target.value } : { ...c };
    });
    setFunction(temp);
  }

  function handleCheckboxChange(
    obj: HeaderAllPage[],
    setFunction: (d: HeaderAllPage[]) => void,
    key: string,
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const checkedValue = e.target.checked ? "checked" : "";
    const temp = obj.map((c: HeaderAllPage, i: Number) => {
      return i === index ? { ...c, [key]: checkedValue } : { ...c };
    });
    setFunction(temp);
  }

  return (
    <div>
      <div className="grid grid-cols-12">
        <div className=" col-span-1"></div>
        <div className="col-span-10 mt-2">
          <button
            type="submit"
            className="btn text-xl"
            onClick={() => {
              navigate("/admin");
            }}
          >
            &larr;
          </button>
          <div className="mt-2 mb-2 text-4xl font-extrabold leading-none tracking-tight">
            Search Page
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
              placeholder="Search Page"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => {
                searchPages();
                showDataSearch();
                hiddenFromEdit();
              }}
            >
              Search
            </button>
          </form>
          {showSearch ? (
            <div className="grid grid-cols-4 mt-2">
              {Pages && Array.isArray(Pages) ? (
                Pages.map((item) => (
                  <div
                    className="btn md:col-span-2 col-span-4 m-1 grid grid-cols-5"
                    key={item.rcc}
                    onClick={() => {
                      showFromEdit();
                      getDataEdit(item.rcc);
                      hiddenDataSearch();
                    }}
                  >
                    <div className="col-span-1">Title :</div>
                    <div className="col-span-4">{item.title}</div>
                    <div className="col-span-1">Page :</div>
                    <div className="col-span-4">{item.namePage}</div>
                  </div>
                ))
              ) : (
                <div></div>
              )}
            </div>
          ) : null}
          {showFrom ? (
            <form className="grid col-span-10 grid-cols-12">
              {/* <div className="col-span-12 mt-2 mb-2 text-4xl font-extrabold leading-none tracking-tight ">
                Edit Page
              </div> */}
              <div className="col-span-12 rounded-box shadow-xl bg-white p-6 mt-2">
                <div className=" text-2xl font-medium text-gray-900">
                  Name Page
                </div>
                <div className="text-sm font-medium text-gray-900">
                  {namePage}
                </div>
              </div>
              <div className="grid col-span-12 mb-1 mt-2 text-sm font-medium text-gray-900">
                Title
              </div>
              <div className="grid grid-cols-12 col-span-12 mr-1">
                <input
                  type="text"
                  className="mr-1 grid col-span-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
              {/* <div className="grid col-span-12 mb-1 mt-2 text-sm font-medium text-gray-900">
                Name Page
              </div>
              <div className="grid grid-cols-11 col-span-12 mr-1">
                <input
                  type="text"
                  className="mr-1 grid col-span-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                  value={namePage}
                  onChange={(e) => {
                    setNamePage(e.target.value);
                  }}
                />
              </div> */}
              <div className="grid col-span-12 mt-2 text-sm font-medium text-gray-900">
                Header 1
              </div>
              <div className="grid col-span-5 mt-2 text-sm font-medium text-gray-900">
                Title Page
              </div>
              <div className="grid col-span-5 mt-2 text-sm font-medium text-gray-900">
                Name Page
              </div>
              {h1.map((data, index) => (
                <div
                  key={data.rcc}
                  className="grid grid-cols-12 col-span-12  mt-2"
                >
                  <input
                    type="text"
                    className="mr-1 grid col-span-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                    defaultValue={data.header_name}
                    onChange={(e) => {
                      handleFormChange(h1, setH1, "header_name", index, e);
                    }}
                  />
                  <input
                    type="text"
                    className="mr-1 grid col-span-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                    defaultValue={data.file_name}
                    onChange={(e) => {
                      handleFormChange(h1, setH1, "file_name", index, e);
                    }}
                  />
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      defaultChecked={data.popup === "checked"}
                      onChange={(e) => {
                        handleCheckboxChange(h1, setH1, "popup", index, e);
                      }}
                    />
                    <label
                      htmlFor="default-checkbox"
                      className="col-span-2 ml-1 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Popup
                    </label>
                  </div>
                </div>
              ))}
              <div className="grid col-span-12 mt-2 text-sm font-medium text-gray-900">
                Header 2
              </div>
              <div className="grid col-span-5 mt-2 text-sm font-medium text-gray-900">
                Title Page
              </div>
              <div className="grid col-span-5 mt-2 text-sm font-medium text-gray-900">
                Name Page
              </div>
              {h2.map((data, index) => (
                <div
                  key={data.rcc}
                  className="grid grid-cols-11 col-span-11 mr-1 mt-2"
                >
                  <input
                    type="text"
                    className="mr-1 grid col-span-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                    defaultValue={data.header_name}
                    onChange={(e) => {
                      handleFormChange(h2, setH2, "header_name", index, e);
                    }}
                  />
                  <input
                    type="text"
                    className="mr-1 grid col-span-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                    defaultValue={data.file_name}
                    onChange={(e) => {
                      handleFormChange(h2, setH2, "file_name", index, e);
                    }}
                  />
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      defaultChecked={data.popup === "checked"}
                      onChange={(e) => {
                        handleCheckboxChange(h2, setH2, "popup", index, e);
                      }}
                    />
                    <label
                      htmlFor="default-checkbox"
                      className="col-span-2 ml-1 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Pop up
                    </label>
                  </div>
                </div>
              ))}
              <div className="grid col-span-12 mt-2 text-sm font-medium text-gray-900">
                Header 3
              </div>
              <div className="grid col-span-5 mt-2 text-sm font-medium text-gray-900">
                Title Page
              </div>
              <div className="grid col-span-5 mt-2 text-sm font-medium text-gray-900">
                Name Page
              </div>
              {h3.map((data, index) => (
                <div
                  key={data.rcc}
                  className="grid grid-cols-11 col-span-11 mr-1 mt-2"
                >
                  <input
                    type="text"
                    className="mr-1 grid col-span-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                    defaultValue={data.header_name}
                    onChange={(e) => {
                      handleFormChange(h3, setH3, "header_name", index, e);
                    }}
                  />
                  <input
                    type="text"
                    className="mr-1 grid col-span-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                    defaultValue={data.file_name}
                    onChange={(e) => {
                      handleFormChange(h3, setH3, "file_name", index, e);
                    }}
                  />
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      defaultChecked={data.popup === "checked"}
                      onChange={(e) => {
                        handleCheckboxChange(h3, setH3, "popup", index, e);
                      }}
                    />
                    <label
                      htmlFor="default-checkbox"
                      className="col-span-2 ml-1 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Pop up
                    </label>
                  </div>
                </div>
              ))}
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
        <div className=" col-span-1"></div>
      </div>
    </div>
  );
}
