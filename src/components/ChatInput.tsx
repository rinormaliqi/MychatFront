import React, {
  FormEvent,
  KeyboardEvent,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { Send, Pause, Brain } from "lucide-react";

interface ChatInputProps {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  handleSubmit: (e: FormEvent) => void;
  isLoading: boolean;
  streamStarted: boolean;
  reasoningEnabled: boolean;
  setReasoningEnabled: (enabled: boolean) => void;
  controller: AbortController;
  messagesCount: number;
}

const ChatInput: React.FC<ChatInputProps> = ({
  input,
  setInput,
  handleSubmit,
  isLoading,
  streamStarted,
  reasoningEnabled,
  setReasoningEnabled,
  controller,
  messagesCount,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as FormEvent);
    }
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      setInput((prev: string) => prev + "\n");
    }
  };

  return (
    <div className="relative rounded-lg border border-zinc-200 bg-white shadow-sm">
      <form
        onSubmit={handleSubmit}
        className={`w-full items-center ${messagesCount === 0 ? "" : "flex"}`}
      >
        <textarea
          ref={textareaRef}
          value={input}
          rows={1}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full flex-1 p-3 bg-transparent resize-none focus:outline-none"
          placeholder={
            messagesCount === 0 ? "Ask anything..." : "Type your message..."
          }
          style={{ maxHeight: "200px" }}
        />
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => setReasoningEnabled(!reasoningEnabled)}
            className={`m-2 flex items-center gap-2 px-3 py-1.5 rounded-lg border
              ${
                reasoningEnabled
                  ? "border-blue-500 bg-blue-200"
                  : "border-zinc-200 bg-white"
              }
              hover:bg-blue-100 
              ${reasoningEnabled ? "text-blue-700" : "text-zinc-900"}`}
            title={
              reasoningEnabled ? "Reasoning enabled" : "Reasoning disabled"
            }
          >
            <Brain size={18} />
            <span className="text-sm">Reasoning</span>
          </button>
          <button
            type={isLoading && streamStarted ? "button" : "submit"}
            onClick={
              isLoading && streamStarted ? () => controller.abort() : undefined
            }
            className="m-2 hover:bg-zinc-100 rounded-lg p-2 text-zinc-600 hover:text-zinc-900"
            disabled={!isLoading && !input.trim()}
          >
            {isLoading && streamStarted ? (
              <Pause size={20} />
            ) : (
              <Send size={20} />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
