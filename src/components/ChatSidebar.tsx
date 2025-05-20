import React, { useState } from "react";
import {
  Edit,
  Trash2,
  PanelLeftClose,
  PanelLeftOpen,
  SquarePen,
  ChevronDown,
  ChevronRight,
  Plus,
} from "lucide-react";

interface Conversation {
  id?: number;
  title: string;
  messages: any[];
  folder: string; // Added folder property
}

interface ChatSidebarProps {
  sidebarVisible: boolean;
  setSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>;
  conversations: Conversation[];
  conversationId: number | undefined;
  setConversationId: React.Dispatch<React.SetStateAction<number | undefined>>;
  deleteConversation: (id: number) => void;
  editConversationTitle: (id: number, newTitle: string) => void;
  startNewConversation: (folder?: string) => void; // Accept folder
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  sidebarVisible,
  setSidebarVisible,
  conversations,
  conversationId,
  setConversationId,
  deleteConversation,
  editConversationTitle,
  startNewConversation,
}) => {
  const [openFolders, setOpenFolders] = useState<{ [key: string]: boolean }>({
    Tasks: true,
    Reservations: true,
    Helper: true,
  });
  const [folders, setFolders] = useState<string[]>(["Tasks", "Reservations", "Helper"]);
  const [newFolderName, setNewFolderName] = useState("");

  // Dummy chats for dropdown folders (can replace or augment with real data)
  const dummyChats: { [folder: string]: { id: number; title: string }[] } = {
    Tasks: [
      { id: 101, title: "Task 1 - Review documents" },
      { id: 102, title: "Task 2 - Team meeting" },
    ],
    Reservations: [
      { id: 201, title: "Reservation #12345" },
      { id: 202, title: "Reservation #67890" },
    ],
    Helper: [
      { id: 301, title: "Helper Chat - FAQ" },
      { id: 302, title: "Helper Chat - Support" },
    ],
  };

  const toggleFolder = (folder: string) => {
    setOpenFolders((prev) => ({ ...prev, [folder]: !prev[folder] }));
  };

  const handleConversationClick = (id: number | undefined) => {
    setConversationId(id);
    if (window.matchMedia("(max-width: 768px)").matches) {
      setSidebarVisible(false);
    }
  };

  const addFolder = () => {
    if (newFolderName && !folders.includes(newFolderName)) {
      setFolders([...folders, newFolderName]);
      setOpenFolders({ ...openFolders, [newFolderName]: true });
      setNewFolderName("");
    }
  };

  return (
    <>
      {sidebarVisible && (
        <div
          className="md:hidden fixed inset-0 bg-black/30 z-20"
          onClick={() => setSidebarVisible(false)}
        />
      )}
      <div
        className={`
          fixed md:relative
          z-30 md:z-auto
          h-full
          bg-zinc-50
          transition-all duration-300
          ${sidebarVisible ? "w-64 translate-x-0" : "w-0 -translate-x-full md:translate-x-0"}
        `}
      >
        {/* Top buttons */}
        <div className="m-2 flex items-center justify-between sticky top-0 bg-zinc-50 z-10">
          <button
            onClick={() => setSidebarVisible(!sidebarVisible)}
            className="rounded-lg p-[0.4em] hover:bg-zinc-100 hover:cursor-pointer transition-colors text-zinc-600 hover:text-zinc-800"
          >
            {sidebarVisible ? <PanelLeftClose size={20} /> : <></>}
          </button>
          <button
            className="rounded-lg p-[0.4em] hover:bg-zinc-100 hover:cursor-pointer transition-colors text-zinc-600 hover:text-zinc-800"
            onClick={() => startNewConversation()}
          >
            {sidebarVisible ? <SquarePen size={20} />: <></>}
          </button>
        </div>

        {/* Folders + Conversations */}
        <div className="h-[calc(100%-3rem)] overflow-y-scroll scrollbar-thin flex flex-col justify-between border-r border-zinc-200 transition-all duration-300">
          <div className="flex flex-col px-4 pt-3 space-y-3">
            {/* Folders Title */}
            <h2 className="text-lg font-bold text-zinc-800 border-b border-zinc-300 pb-1">
              Folders
            </h2>

            {/* Folder List */}
            <ul className="space-y-2">
              {folders.map((folder) => (
                <li key={folder}>
                  {/* Folder Header */}
                  <div
                    className="flex items-center justify-between px-2 py-1 cursor-pointer hover:bg-zinc-100 rounded"
                    onClick={() => toggleFolder(folder)}
                  >
                    <div className="flex items-center gap-1 text-zinc-700">
                      {openFolders[folder] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      <span className="font-semibold text-sm">{folder}</span>
                    </div>
                    <button
                      className="opacity-60 hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        startNewConversation(folder);
                      }}
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Folder's Dummy Conversations */}
                  {openFolders[folder] && (
                    <ul className="pl-6 mt-1 space-y-1">
                      {(dummyChats[folder] || []).map((chat) => (
                        <li
                          key={chat.id}
                          className={`cursor-pointer p-2 transition-colors rounded-lg hover:bg-zinc-200 text-zinc-600`}
                          onClick={() => handleConversationClick(chat.id)}
                        >
                          <span className="truncate text-sm">{chat.title}</span>
                        </li>
                      ))}

                      {/* Real conversations in that folder */}
                      {conversations
                        .filter((c) => c.folder === folder)
                        .map((conversation) => (
                          <li
                            key={conversation.id}
                            className={`cursor-pointer p-2 transition-colors rounded-lg ${
                              conversation.id === conversationId
                                ? "bg-zinc-200 text-zinc-900"
                                : "hover:bg-zinc-200 text-zinc-600"
                            }`}
                            onClick={() => handleConversationClick(conversation.id)}
                          >
                            <div className="flex items-center justify-between">
                              <span className="truncate flex-grow text-sm">{conversation.title}</span>
                              <div className="flex space-x-2 ml-2">
                                <button
                                  className="opacity-60 hover:opacity-100 transition-opacity"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const newTitle = prompt("Enter new title:", conversation.title);
                                    if (newTitle) editConversationTitle(conversation.id!, newTitle);
                                  }}
                                >
                                  <Edit size={14} />
                                </button>
                                <button
                                  className="opacity-60 hover:opacity-100 transition-opacity"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteConversation(conversation.id!);
                                    setConversationId(undefined);
                                  }}
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>

            {/* Regular Conversations Title */}
            <h2 className="text-lg font-bold text-zinc-800 border-t border-zinc-300 pt-3 mt-4">
              Regular Conversations
            </h2>

            {/* Regular Conversations List */}
            <ul className="space-y-2">
              {conversations
                .filter((c) => !folders.includes(c.folder))
                .map((conversation) => (
                  <li
                    key={conversation.id}
                    className={`cursor-pointer p-2 transition-colors rounded-lg ${
                      conversation.id === conversationId || (!conversationId && !conversation.id)
                        ? "bg-zinc-200 text-zinc-900"
                        : "hover:bg-zinc-200 text-zinc-600"
                    }`}
                    onClick={() => handleConversationClick(conversation.id)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="truncate flex-grow text-sm">{conversation.title}</span>
                      <div className="flex space-x-2 ml-2">
                        <button
                          className="opacity-60 hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            const newTitle = prompt("Enter new title:", conversation.title);
                            if (newTitle) editConversationTitle(conversation.id!, newTitle);
                          }}
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          className="opacity-60 hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteConversation(conversation.id!);
                            setConversationId(undefined);
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>

          {/* Add Folder */}
          <div className="p-4 border-t border-zinc-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="New folder..."
                className="w-full px-2 py-1 border rounded text-sm"
              />
              <button
                className="px-2 py-1 text-sm bg-zinc-200 hover:bg-zinc-300 rounded"
                onClick={addFolder}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatSidebar;
