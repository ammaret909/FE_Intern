import { useState, useEffect } from "react";

export function LosLogin() {
  const [losLogin, setLosLogin] = useState<loslogin>({
    map: () => null,
    rcc: "",
    losnane: "",
    lospassw: "",
    ipin: "",
    seqlose: "",
    alert: "",
  });
  const [checkboxs, setCheckboxs] = useState<checkboxsLoslogin[]>([]);

  const handleCheckboxChange = (itemId: any) => {
    if (checkboxs.includes(itemId)) {
      setCheckboxs(checkboxs.filter((rcc: any) => rcc !== itemId));
    } else {
      setCheckboxs([...checkboxs, itemId]);
    }
  };

  const getDataLosLogin = () => {
    fetch(`${import.meta.env.VITE_SERVER}/loslogin`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLosLogin(data);
      });
  };

  const handleSubmitDeleteLoslogin = async () => {
    // e.preventDefault();
    var checkboxList = checkboxs.map(function (checkbox) {
      const resBody = {
        rcc: checkbox,
      };
      return resBody;
    });

    const response = await fetch(
      `${import.meta.env.VITE_SERVER}/loslogin/delete`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkboxList),
      }
    );

    if (response.ok) {
      window.location.reload();
    } else {
      window.location.reload();
    }
  };

  useEffect(() => {
    getDataLosLogin();
  }, []);

  return (
    <>
      <div className="grid grid-cols-12 ">
        <div className=" sm:col-span-1"></div>

        <form
          // onSubmit={handleSubmitDeleteLoslogin}
          className="col-span-12 sm:col-span-10 mt-2"
        >
          <div className="grid grid-cols-12 bg-slate-400 ">
            <div className="col-span-1 grid justify-items-center content-center border-solid border-2 border-slate-600">
              Check box
            </div>
            <div className="col-span-1 grid justify-items-center content-center border-solid border-2 border-slate-600">
              Time
            </div>
            <div className="col-span-1 grid justify-items-center content-center border-solid border-2 border-slate-600">
              User
            </div>
            <div className="col-span-4 grid justify-items-center content-center border-solid border-2 border-slate-600">
              Password
            </div>
            <div className="col-span-2 grid justify-items-center content-center border-solid border-2 border-slate-600">
              IP
            </div>
            <div className="col-span-1 grid justify-items-center content-center border-solid border-2 border-slate-600">
              Count
            </div>
            <div className="col-span-2 grid justify-items-center content-center border-solid border-2 border-slate-600">
              Alert
            </div>
          </div>
          {losLogin.map((losLogin: any) => (
            <div key={losLogin.rcc} className="grid grid-cols-12 bg-slate-200">
              <div className="col-span-1 grid justify-items-center content-center border-solid border-2 border-slate-600">
                <input
                  id="link-checkbox"
                  type="checkbox"
                  className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  checked={checkboxs.includes(losLogin.rcc)}
                  onChange={() => handleCheckboxChange(losLogin.rcc)}
                />
              </div>
              <div className="col-span-1 grid justify-items-center content-center  border-solid border-2 border-slate-600">
                {losLogin.time}
              </div>
              <div className="col-span-1 grid justify-items-center content-center border-solid border-2 border-slate-600">
                {losLogin.losname}
              </div>
              <div className="col-span-4 grid justify-items-center content-center border-solid border-2 border-slate-600">
                {losLogin.lospassw}
              </div>
              <div className="col-span-2 grid justify-items-center content-center border-solid border-2 border-slate-600">
                {losLogin.ipin}
              </div>
              <div className="col-span-1 grid justify-items-center content-center border-solid border-2 border-slate-600">
                {losLogin.seqlose}
              </div>
              <div className="col-span-2 grid justify-items-center content-center border-solid border-2 border-slate-600">
                {losLogin.alert}
              </div>
            </div>
          ))}

          <div className="grid grid-cols-1 justify-items-center content-center m-2">
            <div onClick={handleSubmitDeleteLoslogin} className=" btn">
              Delete
            </div>
          </div>
        </form>

        <div className=" sm:col-span-1"></div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
