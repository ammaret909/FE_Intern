import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
export function UserDashBoardUser() {
  const navigate = useNavigate();
  const { user } = useParams();
  const [dashBoard, setDashBoard] = useState<DashBoardByUser[]>([]);

  const getDataLoginLogout = () => {
    fetch(`${import.meta.env.SERVER}/dashboard/login_logout/${user}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDashBoard(data);
      });
  };

  useEffect(() => {
    getDataLoginLogout();
  }, []);
  return (
    <>
      <div className="grid grid-cols-12 ">
        <div className=" sm:col-span-1"></div>
        <form className="col-span-12 sm:col-span-10 mt-2">
          <div className=" col-span-1 mt-2">
            <button
              type="submit"
              className="btn text-xl col-span-12"
              onClick={() => {
                navigate("/dashboard_user");
              }}
            >
              &larr;
            </button>
          </div>
          <div className="grid grid-cols-9 bg-slate-400 ">
            <div className="col-span-3 grid justify-items-center content-center border-solid border-2 border-slate-600">
              Login
            </div>
            <div className="col-span-3 grid justify-items-center content-center border-solid border-2 border-slate-600">
              Logout
            </div>
            <div className="col-span-3 grid justify-items-center content-center border-solid border-2 border-slate-600">
              IP
            </div>
          </div>
          {dashBoard.map((dashBoard: any) => (
            <div
              key={dashBoard.login}
              className="grid grid-cols-9 bg-slate-200"
            >
              <div className="col-span-3 grid justify-items-center content-center border-solid border-2 border-slate-600 ">
                {dashBoard.login}
              </div>
              <div className="col-span-3 grid justify-items-center content-center border-solid border-2 border-slate-600">
                {dashBoard.logout}
              </div>
              <div className="col-span-3 grid justify-items-center content-center border-solid border-2 border-slate-600">
                {dashBoard.ip}
              </div>
            </div>
          ))}
        </form>
        <div className=" sm:col-span-1"></div>
      </div>
    </>
  );
}
