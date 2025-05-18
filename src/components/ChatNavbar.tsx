import React from "react";
import { PanelLeftOpen } from "lucide-react";

interface ChatNavbarProps {
  sidebarVisible: boolean;
  setSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatNavbar: React.FC<ChatNavbarProps> = ({
  sidebarVisible,
  setSidebarVisible,
}) => {
  const logout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/";
  };

  return (
    <div className="sticky top-0 bg-white border-b border-zinc-200 z-10">
      <div className="my-3 mx-2 flex items-center justify-between">
        <div className="flex items-center">
          {!sidebarVisible && (
            <button
              onClick={() => setSidebarVisible(!sidebarVisible)}
              className="rounded-lg p-[0.4em] hover:bg-zinc-100 hover:cursor-pointer mr-2 transition-colors text-zinc-600 hover:text-zinc-800"
            >
              <PanelLeftOpen size={20} />
            </button>
          )}
          <h1 className="text-base font-semibold text-zinc-600 ml-2">
            Drenzzi Chat
          </h1>
        </div>

        <button
          onClick={logout}
          className="bg-red-100 text-red-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-red-200 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ChatNavbar;
