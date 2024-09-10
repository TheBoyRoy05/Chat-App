import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../Store/useConversation";

const useGetUsers = () => {
  const [loading, setLoading] = useState(false);
  const { conversations, setConversations } = useConversation();

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("jwt");
        const res = await fetch("/api/users", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (data.error) throw new Error(data.error);

        setConversations(data);
      } catch (error) {
        console.error(error);
        toast.error(
          error instanceof Error
            ? error.message
            : "An unexpected error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, [setConversations]);

  return { loading, users: conversations };
};

export default useGetUsers;
