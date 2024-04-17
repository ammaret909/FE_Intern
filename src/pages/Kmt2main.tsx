import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import ButtonMenu from "../components/ButtonMenu";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export function Kmt2main() {
  const [, setCurrentPage] = useState("kmt2main");
  const [dataPage, setDataPage] = useState<DataPage>({
    rcc: "",
    namePage: "",
    title: "",
    subTitleH1: "",
    subTitleH2: "",
    subTitleH3: "",
    header1DTOoutList: [],
    header2DTOoutList: [],
    header3DTOoutList: [],
  });
  const [history, setHistory] = useState(["kmt2main"]);
  const [show, setShow] = useState(false);
  const [showH1, setShowH1] = useState(false);
  const [showH2, setShowH2] = useState(false);
  const navigate = useNavigate();

  const getDataPage = async (nextPage: string) => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER}/pages/${nextPage}`
    );
    // .then((response) => {
    //   return response.json();
    // })
    // .then((data: DataPage) => {
    //   setDataPage(data);
    //   Cookies.set("Page", data.namePage);
    // });
    // if (response.ok) {
    const data = await response.json();
    setDataPage(data);
    Cookies.set("Page", data.namePage);
    // }
  };

  //header

  function close_dropdown() {
    if (show !== false) {
      setShow(!show);
    }
  }

  async function logout() {
    const receiveLogoutBody = {
      rcc: Cookies.get("RCC"),
    };
    const receiveLogout = await fetch(
      `${import.meta.env.VITE_SERVER}/receive/logout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(receiveLogoutBody),
      }
    );
    if (receiveLogout.ok) {
      Cookies.remove("RCC");
      Cookies.remove("USERID");
      Cookies.remove("Page");
      navigate("/");
    }
  }

  useEffect(() => {
    getDataPage(history[history.length - 1]);
  }, [history]);

  return (
    <div className=" bg-white">
      {/* header */}
      <div className="navbar rmx_blue grid grid-cols-12">
        <div className="drawer sm:hidden grid col-span-2 sm:col-span-1 justify-start">
          <input
            id="my-drawer"
            type="checkbox"
            onClick={() => close_dropdown()}
            className="drawer-toggle"
          />
          <div className="drawer-content">
            <label
              htmlFor="my-drawer"
              className="btn drawer-button rmx_green hover:rmx_green text-zinc-600"
            >
              <svg
                className="w-6 h-6 text-gray-800 "
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="M16 0H4a2 2 0 0 0-2 2v1H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM13.929 17H7.071a.5.5 0 0 1-.5-.5 3.935 3.935 0 1 1 7.858 0 .5.5 0 0 1-.5.5Z" />
              </svg>
            </label>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer" className="drawer-overlay "></label>
            <div className="menu p-4 w-60 bg-base-200 top-auto rmx_blue text-white">
              <div>
                <div className="grid justify-items-center m-1">
                  <select
                    defaultValue="1"
                    className="btn w-full bg-gray-50 border border-gray-300 text-zinc-600 rounded-lg block text-xs "
                  >
                    <option value="1">Choose a Role</option>
                    <option value="admin1">Admin1</option>
                    <option value="admin2">Admin2</option>
                    <option value="admin3">Admin3</option>
                    <option value="admin4">Admin4</option>
                  </select>
                </div>
              </div>
              <div className="border-b-2 m-3"></div>
              <div>
                <div className="justify-items-center">
                  <ButtonMenu topic="Sales & Marketing" />
                  <ButtonMenu topic="Purchase" />
                  <ButtonMenu topic="Inventory-Stores" />
                  <ButtonMenu topic="Finance-Accouting" />
                  <ButtonMenu topic="HR & Payroll" />
                  <ButtonMenu topic="Manufacturing Control" />
                  <ButtonMenu topic="Logistic" />
                  <ButtonMenu topic="Maintenance" />
                  <ButtonMenu topic="Registration" />
                  <ButtonMenu topic="CRM" />
                  <ButtonMenu topic="Administration" />
                  <ButtonMenu topic="Infrastructure" />
                  <ButtonMenu topic="Installation" />
                  <ButtonMenu topic="เข่งส่งงาน" />
                  <ButtonMenu topic="Antique" />
                  <ButtonMenu topic="KMT" />
                  <ButtonMenu topic="แม่แบบ" />
                  <ButtonMenu topic="TEST" next="/menu/test" />
                  <ButtonMenu topic="Type responsive" next="/kmt2main" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid col-span-3 sm:col-span-2 ml-2 md:ml-0 justify-center">
          <div>
            <img src="miti.jpg" alt="Logo"></img>
          </div>
        </div>

        <div className="hidden md:grid sm:col-span-10 ">
          <div className="grid grid-cols-12">
            <div className="col-span-11 ">
              {/* h2 */}
              {dataPage.header2DTOoutList &&
              Array.isArray(dataPage.header2DTOoutList) ? (
                dataPage.header2DTOoutList.map((item) => (
                  <div
                    key={item.rcc}
                    className="hover:rmx_sky btn rmx_blue rounded-btn text-white text-xs"
                    onClick={() => {
                      setCurrentPage(item.file_name);
                      setHistory([...history, item.file_name]);
                    }}
                  >
                    {item.header_name}
                  </div>
                ))
              ) : (
                <div></div>
              )}
            </div>

            <div className="grid col-span-1 content-center">
              <div className="dropdown dropdown-hover dropdown-left justify-self-center">
                <label className="btn m-1bg-current rmx_green hover:rmx_green text-zinc-600">
                  <svg
                    className="w-6 h-6 text-gray-800"
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 14 8"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
                    />
                  </svg>
                </label>
                <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                  {/* h3 */}
                  {dataPage.header3DTOoutList &&
                  Array.isArray(dataPage.header3DTOoutList) ? (
                    dataPage.header3DTOoutList.map((item) => (
                      <li>
                        <div
                          key={item.rcc}
                          className=" col-span-6 w-48"
                          onClick={() => {
                            setCurrentPage(item.file_name);
                            setHistory([...history, item.file_name]);
                          }}
                        >
                          {item.header_name}
                        </div>
                      </li>
                    ))
                  ) : (
                    <div></div>
                  )}
                  <div className="border-b-2"></div>
                  <li>
                    <div>{Cookies.get("USERID")}</div>
                  </li>
                  <li>
                    <div onClick={() => logout()}>LOGOUT</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="md:hidden grid col-span-7 sm:col-span-10 justify-end">
          <div
            className="btn rmx_green hover:rmx_green text-zinc-600"
            onClick={() => setShow(!show)}
          >
            <svg
              className="w-6 h-6 text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 17 14"
            >
              <path d="M16 2H1a1 1 0 0 1 0-2h15a1 1 0 1 1 0 2Zm0 6H1a1 1 0 0 1 0-2h15a1 1 0 1 1 0 2Zm0 6H1a1 1 0 0 1 0-2h15a1 1 0 0 1 0 2Z" />
            </svg>
          </div>
        </div>

        <div className="grid col-span-12">
          {show ? (
            <div className=" grid grid-cols-1 rmx_blue hidden_lx">
              <div className=" col-span-1 justify-center shadow-md ">
                {/* data */}
                <div
                  onClick={() => setShowH1(!showH1)}
                  className="btn grid content-center px-4 text-sm btn-ghost runded-btn text-white hover:rmx_blue"
                >
                  {/* h2 mobile */}
                  H2
                </div>
                {showH1 ? (
                  <div>
                    {dataPage.header2DTOoutList &&
                    Array.isArray(dataPage.header2DTOoutList) ? (
                      dataPage.header2DTOoutList.map((item) => (
                        <div
                          key={item.rcc}
                          className="btn grid content-center px-4 text-sm hover:rmx_blue rmx_blue text-white"
                          onClick={() => {
                            setCurrentPage(item.file_name);
                            setHistory([...history, item.file_name]);
                          }}
                        >
                          {item.header_name}
                        </div>
                      ))
                    ) : (
                      <div></div>
                    )}
                  </div>
                ) : null}
              </div>

              <div className=" col-span-1 justify-center shadow-md">
                {/* data */}
                <div
                  onClick={() => setShowH2(!showH2)}
                  className="btn grid content-center px-4 text-sm btn-ghost runded-btn text-white hover:rmx_blue"
                >
                  {/* h3 mobile */}
                  H3
                </div>
                {showH2 ? (
                  <div>
                    {dataPage.header3DTOoutList &&
                    Array.isArray(dataPage.header3DTOoutList) ? (
                      dataPage.header3DTOoutList.map((item) => (
                        <div
                          key={item.rcc}
                          className="btn grid content-center px-4 text-sm hover:rmx_blue rmx_blue text-white"
                          onClick={() => {
                            setCurrentPage(item.file_name);
                            setHistory([...history, item.file_name]);
                          }}
                        >
                          {item.header_name}
                        </div>
                      ))
                    ) : (
                      <div></div>
                    )}

                    <div>{Cookies.get("USERID")}</div>
                    <div
                      className="btn grid content-center px-4 text-sm hover:rmx_blue rmx_blue text-white"
                      onClick={() => logout()}
                    >
                      Logout
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* body */}
      <div className=" grid grid-cols-12 min-h-screen">
        {/* memubar */}
        <div className="hidden sm:block col-span-3 lg:col-span-2 lx:grid rmx_blue">
          <div className="">
            <div className="grid justify-items-center m-1 mt-0 ">
              <select
                defaultValue="1"
                className="btn w-full bg-gray-50 border border-gray-300 text-zinc-600 rounded-lg block text-xs "
              >
                <option value="1">Choose a Role</option>
                <option value="admin1">Admin1</option>
                <option value="admin2">Admin2</option>
                <option value="admin3">Admin3</option>
                <option value="admin4">Admin4</option>
              </select>
            </div>
          </div>
          <div className="border-b-2 m-3"></div>
          <div>
            <div className="menu">
              <ButtonMenu topic="Sales & Marketing" />
              <ButtonMenu topic="Purchase" />
              <ButtonMenu topic="Inventory-Stores" />
              <ButtonMenu topic="Finance-Accouting" />
              <ButtonMenu topic="HR & Payroll" />
              <ButtonMenu topic="Manufacturing Control" />
              <ButtonMenu topic="Logistic" />
              <ButtonMenu topic="Maintenance" />
              <ButtonMenu topic="Registration" />
              <ButtonMenu topic="CRM" />
              <ButtonMenu topic="Administration" />
              <ButtonMenu topic="Infrastructure" />
              <ButtonMenu topic="Installation" />
              <ButtonMenu topic="เข่งส่งงาน" />
              <ButtonMenu topic="Antique" />
              <ButtonMenu topic="KMT" />
              <ButtonMenu topic="แม่แบบ" />
              <ButtonMenu topic="TEST" next="/menu/test" />
              <ButtonMenu topic="Type responsive" next="/kmt2main" />
            </div>
          </div>
        </div>

        <div className="col-span-12 sm:col-span-9 md:col-span-9 lg:col-span-10 w-base-200 rounded-box ">
          <div className="grid grid-cols-1 text-zinc-600 text-sm">
            <div className="rounded-box shadow-xl bg-white p-6 row m-2 grid grid-cols-12">
              {history.length > 1 && (
                <div
                  onClick={() => {
                    setHistory(history.slice(0, -1));
                  }}
                  className=" text-xl col-span-2 sm:col-span-1 btn rounded-box shadow-xl bg-white row flex items-center"
                >
                  &larr;
                </div>
              )}
              <div className="text-xl ml-4 col-span-10 flex items-center">
                {dataPage.title}
              </div>
            </div>
          </div>
          {/* {history.length > 1 && (
            <div
              onClick={() => {
                console.log("back");
                setHistory(history.slice(0, -1));
              }}
              className="btn rounded-box shadow-xl bg-white row m-2"
            >
              Back
            </div>
          )} */}

          <div className="grid lg:grid-cols-5 sm:grid-cols-3 ounded-box h1">
            {dataPage.header1DTOoutList &&
            Array.isArray(dataPage.header1DTOoutList) ? (
              dataPage.header1DTOoutList.map((item) => (
                <div
                  key={item.rcc}
                  className=" btn shadow-md bg-[#6d8aaa] hover:bg-[#607a96] m-2 p-10 grid content-center"
                  onClick={() => {
                    // if (item.popup == "checked") {
                    //   window
                    //     .open("http://localhost:3000/#/home")
                    //     .TrustedScript(
                    //       setCurrentPage(item.file_name),
                    //       setHistory([...history, item.file_name])
                    //     );
                    // } else {
                    setCurrentPage(item.file_name);
                    setHistory([...history, item.file_name]);
                    // }
                  }}
                >
                  <div className=" text-sm text-white">{item.header_name}</div>
                </div>
              ))
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
