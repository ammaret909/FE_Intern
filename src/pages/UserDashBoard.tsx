import { useState, useEffect } from "react";
export function UserDashBoard() {
  const [user, setUser] = useState<UserDashBoard>({
    map: () => null,
    userid: "",
    loginRCC: "",
    countLogin: 0,
    logoutRCC: "",
    countLogout: 0,
  });

  const getDataUser = () => {
    fetch(`${import.meta.env.VITE_SERVER}/dashboard/login_logout`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUser(data);
      });
  };

  useEffect(() => {
    getDataUser();
  }, []);
  return (
    <>
      <div className="grid grid-cols-12 ">
        <div className=" sm:col-span-1"></div>

        <form className="col-span-12 sm:col-span-10 mt-2">
          <div className="grid grid-cols-9 bg-slate-400 ">
            <div className="col-span-3 grid justify-items-center content-center border-solid border-2 border-slate-600">
              User Account
            </div>
            <div className="col-span-2 grid justify-items-center content-center border-solid border-2 border-slate-600">
              Login
            </div>
            <div className="col-span-1 grid justify-items-center content-center border-solid border-2 border-slate-600">
              Total
            </div>
            <div className="col-span-2 grid justify-items-center content-center border-solid border-2 border-slate-600">
              Logout
            </div>
            <div className="col-span-1 grid justify-items-center content-center border-solid border-2 border-slate-600">
              Total
            </div>
          </div>
          {user.map((user: any) => (
            <div key={user.userid} className="grid grid-cols-9 bg-slate-200">
              <div className="col-span-3 grid justify-items-center content-center border-solid border-2 border-slate-600">
                {user.userid}
              </div>
              <div className="col-span-2 grid justify-items-center content-center border-solid border-2 border-slate-600">
                {user.loginRCC}
              </div>
              <div className="col-span-1 grid justify-items-center content-center border-solid border-2 border-slate-600">
                {user.countLogin}
              </div>
              <div className="col-span-2 grid justify-items-center content-center border-solid border-2 border-slate-600">
                {user.logoutRCC}
              </div>
              <div className="col-span-1 grid justify-items-center content-center border-solid border-2 border-slate-600">
                {user.countLogout}
              </div>
            </div>
          ))}
        </form>

        <div className=" sm:col-span-1"></div>
      </div>
    </>
  );
}
