import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export function ShowUser() {
  const [losLogin, setLosLogin] = useState<loslogin>({
    map: () => null,
    rcc: "",
    losnane: "",
    lospassw: "",
    ipin: "",
    seqlose: "",
    alert: "",
  });

  // const [checkboxs, setCheckboxs] = useState<any>({
  //   map: () => null,
  //   filter: () => false,
  //   includes: () => null,
  //   rcc: "",
  // });

  // const handleCheckboxChange = (itemId: string) => {
  //   if (checkboxs.includes(itemId)) {
  //     setCheckboxs(checkboxs.filter((rcc: string) => rcc !== itemId));
  //   } else {
  //     setCheckboxs([...checkboxs, itemId]);
  //   }
  // };

  const [checkboxs, setCheckboxs] = useState<checkboxsLosloginShowUser[]>([]);
  const navigate = useNavigate();

  const handleCheckboxChange = (itemId: any) => {
    if (checkboxs.includes(itemId)) {
      setCheckboxs(checkboxs.filter((rcc: any) => rcc !== itemId));
    } else {
      setCheckboxs([...checkboxs, itemId]);
    }
  };

  const getDataUser = () => {
    fetch(`${import.meta.env.VITE_SERVER}/user`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLosLogin(data);
      });
  };

  const handleSubmitDeleteUser = async () => {
    var checkboxList = checkboxs.map(function (checkbox) {
      const resBody = {
        rcc: checkbox,
      };
      return resBody;
    });

    const response = await fetch(`${import.meta.env.VITE_SERVER}/user/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkboxList),
    });
    if (response.ok) {
      window.location.reload();
    } else {
      window.location.reload();
    }
  };

  useEffect(() => {
    getDataUser();
  }, []);

  console.log(checkboxs);

  return (
    <>
      <div className="grid grid-cols-12 ">
        <div className=" sm:col-span-1"></div>

        <form className="col-span-12 sm:col-span-10 mt-2">
          <div className=" col-span-1 m-1">
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
          <div className="grid grid-cols-12 bg-slate-400">
            <div className="col-span-1 grid justify-items-center content-center border-solid border-2 border-slate-600">
              Checkbox
            </div>
            <div className="col-span-1 grid justify-items-center content-center border-solid border-2 border-slate-600">
              user name
            </div>
            <div className="col-span-3 grid justify-items-center content-center border-solid border-2 border-slate-600">
              drawssap
            </div>
            <div className="col-span-2 grid justify-items-center content-center border-solid border-2 border-slate-600">
              full name
            </div>
            <div className="col-span-3 grid justify-items-center content-center border-solid border-2 border-slate-600">
              level
            </div>
            <div className="col-span-2 grid justify-items-center content-center border-solid border-2 border-slate-600">
              ristory
            </div>
          </div>
          {losLogin.map((losLogin) => (
            <div key={losLogin.rcc} className="grid grid-cols-12 bg-slate-200">
              <div className="col-span-1 grid justify-items-center content-center border-solid border-2 border-slate-600 ">
                <input
                  id="link-checkbox"
                  type="checkbox"
                  className="m-3 w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  checked={checkboxs.includes(losLogin.rcc)}
                  onChange={() => handleCheckboxChange(losLogin.rcc)}
                />
              </div>
              <div className="col-span-1 grid justify-items-center content-center  border-solid border-2 border-slate-600">
                {losLogin.userid}
              </div>
              <div className="col-span-3 grid justify-items-center content-center border-solid border-2 border-slate-600">
                {losLogin.drawssap}
              </div>
              <div className="col-span-2 grid justify-items-center content-center border-solid border-2 border-slate-600">
                {losLogin.fullname}
              </div>
              <div className="col-span-3 grid justify-items-center content-center border-solid border-2 border-slate-600">
                {losLogin.level}
              </div>
              <div className="col-span-2 grid justify-items-center content-center border-solid border-2 border-slate-600">
                {losLogin.ristory}
              </div>
            </div>
          ))}

          <div className="grid grid-cols-1 justify-items-center content-center m-2">
            <div onClick={handleSubmitDeleteUser} className=" btn">
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
