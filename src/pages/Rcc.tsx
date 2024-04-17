import { useEffect, useState } from "react";
export function Rcc() {
  // const navigate = useNavigate();
  // const [time, setTime] = useState("");
  const [rcc, setRcc] = useState<RccCheck>({
    check_rcc: "",
  });

  const [date, setDate] = useState<RccTime>({
    time: "",
  });
  const [rccInPut, setRccInPut] = useState("");

  const createRcc = async () => {
    const response = await fetch(`${import.meta.env.VITE_SERVER}/createRCC`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      setRcc(data);
      console.log(data);
    } else {
      const data = await response.json();
      console.log(data);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const resBody = {
      rcc: rccInPut,
    };
    const response = await fetch(`${import.meta.env.VITE_SERVER}/decodeRCC`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resBody),
    });
    if (response.ok) {
      const data = await response.json();
      setDate(data);
      console.log(data);
    } else {
      const data = await response.json();
      console.log(data);
    }
  };

  useEffect(() => {
    createRcc();
  }, []);

  return (
    <div>
      <div>
        <label className="block text-gray-700 text-sm font-bold ml-4 mt-4">
          Rcc now
        </label>
        <div className=" m-2">{rcc.check_rcc}</div>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 text-sm font-bold ml-4 mt-4">
              Rcc text box
            </label>
            <input
              className="shadow rounded text-gray-700 m-2"
              id="date"
              onChange={(e) => {
                setRccInPut(e.target.value);
              }}
              value={rccInPut}
              placeholder="Enter your Rcc"
              required
            />
          </div>
          <div>
            <button className="btn ml-2" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="m-2">{date.time}</div>
    </div>
  );
}
