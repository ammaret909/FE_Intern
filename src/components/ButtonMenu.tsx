import { useNavigate } from "react-router-dom";

interface ButtonMenuProps {
  next?: string;
  topic: string;
}

export default function ButtonMenu({ topic, next }: ButtonMenuProps) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`${next}`);
      }}
      className=" btn btn-ghost rounded-btn hover:bg-gray-100 border-white shadow-xl bg-white text-zinc-600 text-center m-1 grid content-center btn-sm"
    >
      <div className=" text-xs text-zinc-600">{topic}</div>
    </div>
  );
}
