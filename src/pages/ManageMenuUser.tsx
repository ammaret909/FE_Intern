import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const initUserMenu: UserMenu = {
  rcc: "",
  ristory: "",
  ractive: "",
  menutext: "",
  seq: 0,
  linkurl: "",
  remark: "",
};

export function ManageMenuUser() {
  const [user, setUser] = useState<UserDataForMenu[]>([
    {
      rcc: "",
      userid: "",
      fullname: "",
      level: "",
      secret: "",
    },
  ]);
  const [menu, setMenu] = useState<UserMenu[]>([]);
  const [rcc, setRcc] = useState();
  const [showFrom, setShowFrom] = useState(false);
  const navigate = useNavigate();

  const getAllUser = async () => {
    //3.133.137.68 RemomaxBE
    const response = await fetch(`${import.meta.env.VITE_SERVER}/user`);
    if (response.ok) {
      const data = await response.json();
      setUser(data);
    }
  };

  const getAllMenuByUser = async (urcc: string) => {
    const resBody = {
      search: urcc,
    };
    //3.133.137.68 RemomaxBE
    const response = await fetch(`${import.meta.env.VITE_SERVER}/menu`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resBody),
    });
    if (response.ok) {
      const data = await response.json();
      setMenu([]);
      setMenu(countMenu(data));
    }
  };

  const postDataEditMenu = async () => {
    const resBody = {
      rcc: rcc,
      menu: menu,
    };
    //3.133.137.68 RemomaxBE
    const response = await fetch(`${import.meta.env.VITE_SERVER}/menu/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resBody),
    });
    if (response.ok) {
      alert("success");
      window.location.reload();
    } else {
      alert("fail");
    }
  };

  const countMenu = (menuList: any) => {
    while (menuList.length < 15) {
      menuList.push(initUserMenu);
    }
    return menuList;
  };

  function showFromEdit() {
    if (showFrom !== true) {
      setShowFrom(!showFrom);
    }
  }

  function handleFormChange(
    obj: UserMenu[],
    setFunction: (d: UserMenu[]) => void,
    key: string,
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const temp = obj.map((c: UserMenu, i: Number) => {
      return i === index ? { ...c, [key]: e.target.value } : { ...c };
    });
    setFunction(temp);
  }

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <div className="grid grid-cols-12">
      <div className=" col-span-1"></div>

      <form className="grid col-span-10 grid-cols-2">
        <div className=" col-span-12 mt-2">
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
          Edit Usermemu
        </div>
        <div className="grid justify-items-start m-1 ml-0 col-span-12">
          <select
            onChange={(e) => {
              const data: any = user?.find((f) => f.rcc === e.target.value);
              setRcc(data.rcc);
              getAllMenuByUser(data.rcc);
              showFromEdit();
            }}
            className="btn bg-gray-50 border border-gray-300 text-zinc-600 block text-xs"
          >
            <option selected>Choose a User</option>
            {user.map((user: UserDataForMenu) => (
              <option key={user.rcc} value={user.rcc}>
                {user.userid}
              </option>
            ))}
          </select>
        </div>
        {showFrom ? (
          <form className="grid col-span-12 grid-cols-12">
            <div className="grid col-span-4 mb-1 mt-2 text-sm font-medium text-gray-900">
              Menu Text
            </div>
            <div className="grid col-span-4 mb-1 mt-2 text-sm font-medium text-gray-900">
              Link URL
            </div>
            <div className="grid col-span-4 mb-1 mt-2 text-sm font-medium text-gray-900">
              Description
            </div>
            {menu.map((data, index) => (
              <div className="grid col-span-12 grid-cols-12">
                <div className="grid grid-cols-12 col-span-4 m-1">
                  <input
                    type="text"
                    className=" grid col-span-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                    placeholder="Menu Text"
                    defaultValue={data.menutext}
                    onChange={(e) => {
                      handleFormChange(menu, setMenu, "menutext", index, e);
                    }}
                  />
                </div>
                <div className="grid grid-cols-12 col-span-4 m-1">
                  <input
                    type="text"
                    className=" grid col-span-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                    placeholder="Link URL"
                    defaultValue={data.linkurl}
                    onChange={(e) => {
                      handleFormChange(menu, setMenu, "linkurl", index, e);
                    }}
                  />
                </div>
                <div className="grid grid-cols-12 col-span-4 m-1">
                  <input
                    type="text"
                    className=" grid col-span-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                    placeholder="Description"
                    defaultValue={data.remark}
                    onChange={(e) => {
                      handleFormChange(menu, setMenu, "remark", index, e);
                    }}
                  />
                </div>
              </div>
            ))}
            <div className="col-span-12">
              <div
                className="btn mt-2 mr-2"
                onClick={() => {
                  postDataEditMenu();
                }}
              >
                submit
              </div>
              <div className="btn">cancle</div>
            </div>
          </form>
        ) : null}
      </form>
      <div className=" col-span-1"></div>
    </div>
  );
}
