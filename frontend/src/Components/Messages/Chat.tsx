import { TiMessages } from "react-icons/ti";
import Input from "./Input";
import Messages from "./Messages";
import useConversation from "../../Store/useConversation";

const Chat = () => {
  const { receiver } = useConversation();

  return receiver._id != "" ? (
    <div className="md:min-w-[450px] flex flex-col">
      <div className="bg-slate-500 px-4 py-2 flex items-center">
        <div className="avatar online w-8 rounded-full mr-2">
          <img src={receiver.profilePic} alt="user avatar" />
        </div>
        <span className="text-gray-900 font-bold">{receiver.username}</span>
      </div>
      <Messages />
      <Input />
    </div>
  ) : (
    <NoChat />
  );
};

const NoChat = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-4 sm:text-lg md:text-xl text-gray-200 font-semibold gap-2">
      <p>Welcome Username</p>
      <p>Select a chat to start messaging</p>
      <TiMessages className="text-3xl md:text-6xl text-center" />
    </div>
  );
};

export default Chat;
