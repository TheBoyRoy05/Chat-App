import useSocket from "../../Store/useSocket";
import useConversation from "../../Store/useConversation";
import { ConversationType, emptyUser } from "../../Utils/Types";
import useFriends from "../../Store/useFriends";
import { FaUserFriends } from "react-icons/fa";
import { getConversationName, hashIDToColor } from "../../Utils/Functions";

interface ChatProps {
  conversation: ConversationType;
  numNotifs: number;
}

const Conversation = ({ conversation, numNotifs }: ChatProps) => {
  const {
    authUser,
    conversation: selectedConversation,
    setConversation,
    setLastMessageTime,
  } = useConversation();
  const { setShowFriendsPage } = useFriends();

  const { onlineUserIDs } = useSocket();
  const receiver = conversation.participants.find((p) => p._id !== authUser._id) || emptyUser;
  const online = onlineUserIDs.includes(receiver._id);

  const isGroupChat = conversation.participants.length > 2;
  const selected = conversation._id == selectedConversation._id;
  const bgColor = selected ? "bg-sky-500" : "hover:bg-slate-500";
  const nameColor = selected ? "text-white" : "text-gray-200";
  const statusColor = selected ? "text-gray-200" : "text-gray-400";

  const handleClick = () => {
    if (selected) return;
    setLastMessageTime(Date.now());
    setConversation(conversation);
    setShowFriendsPage(false);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex gap-3 items-center border-b px-2 py-3 cursor-pointer group text-left max-w-72 ${bgColor}`}
    >
      {isGroupChat ? (
        <div
          className="flex justify-center items-center w-10 h-10 rounded-full"
          style={{ backgroundColor: hashIDToColor(conversation._id) }}
        >
          <FaUserFriends className="text-white" />
        </div>
      ) : (
        <div className={`avatar ${online ? "online" : ""}`}>
          <div className="w-10 rounded-full">
            <img src={receiver.profilePic} alt="user avatar" />
          </div>
        </div>
      )}
      <div className="flex flex-col flex-1 max-w-[220px] truncate">
        <p className={`text-lg leading-6 group-hover:text-white ${nameColor} truncate`}>
          {getConversationName(conversation, authUser)}
        </p>
        <span className={`text-sm group-hover:text-gray-200 ${statusColor}`}>
          {isGroupChat ? `${conversation.participants.length} members` : "status"}
        </span>
      </div>
      {numNotifs > 0 ? (
        <div className="w-6 h-6 rounded-full bg-green-500 text-gray-50 text-xs font-bold flex justify-center items-center">
          {numNotifs}
        </div>
      ) : (
        <></>
      )}
    </button>
  );
};

export default Conversation;
