import { SetURLSearchParams } from "react-router-dom";
import { KeyboardEvent } from "react";
import { FaSearch } from "react-icons/fa";
import { VscLoading } from "react-icons/vsc";

type InputSearchProps = {
  setSearchParams: SetURLSearchParams;
  word: string;
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  fetchWord: () => Promise<void>;
  isLoading: boolean;
};

export default function InputSearch({
  setSearchParams,
  word,
  handleKeyDown,
  fetchWord,
  isLoading,
}: InputSearchProps) {
  return (
    <div className="flex gap-3">
      <input
        type="text"
        name="word"
        placeholder="Search it here..."
        onChange={(e) =>
          setSearchParams(
            (prev) => {
              prev.set("word", e.target.value);
              return prev;
            },
            { replace: true }
          )
        }
        value={word}
        onKeyDown={handleKeyDown}
        className="rounded-full px-4 py-2 placeholder:pl-2 text-gray-700 font-semibold border-2 focus:ring-green-700 focus:border-green-700  bg-gray-100 focus:outline-none focus:ring transition"
      />
      {isLoading ? (
        <button
          disabled={isLoading}
          aria-hidden="true"
          className="animate-spin text-2xl hover:text-white transition"
        >
          <VscLoading />
        </button>
      ) : (
        <button
          onClick={fetchWord}
          disabled={isLoading}
          aria-hidden="true"
          className="text-lg hover:text-white transition"
        >
          <FaSearch />
        </button>
      )}
    </div>
  );
}
