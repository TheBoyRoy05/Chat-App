import useSocket from "../../Store/useSocket";
import useStore from "../../Store/useStore";
import { UserType } from "../../Utils/Types";

interface ConvoProps {
  user: UserType;
  numNotifs: number;
}

const Conversation = ({ user, numNotifs }: ConvoProps) => {
  const { receiver, setReceiver } = useStore();
  const { onlineUserIDs } = useSocket();
  const online = onlineUserIDs.includes(user._id);

  const selected = user._id == receiver._id;
  const bgColor = selected ? "bg-sky-500" : "";
  const hoverColor = selected ? "" : "hover:bg-slate-500";
  const usernameColor = selected ? "text-white" : "text-gray-200";
  const statusColor = selected ? "text-gray-200" : "text-gray-400";

  return (
    <button onClick={() => setReceiver(user)}>
      <div
        className={`flex gap-3 items-center border-b px-2 py-3 cursor-pointer group text-left ${bgColor} ${hoverColor}`}
      >
        <div className={`avatar ${online ? "online" : ""}`}>
          <div className="w-10 rounded-full">
            <img src={user.profilePic} alt="user avatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <p
            className={`text-lg leading-5 group-hover:text-white ${usernameColor}`}
          >
            {user.username}
          </p>
          <span className={`text-sm group-hover:text-gray-200 ${statusColor}`}>
            {"status"}
          </span>
        </div>
        {numNotifs > 0 ? (
          <div className="w-6 h-6 rounded-full bg-green-500 text-gray-50 text-xs font-bold flex justify-center items-center">
            {numNotifs}
          </div>
        ) : (
          <></>
        )}
      </div>
    </button>
  );
};

export default Conversation;
