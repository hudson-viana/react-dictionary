import { SetURLSearchParams } from "react-router-dom";
import { KeyboardEvent } from "react";

type InputSearchProps = {
  setSearchParams: SetURLSearchParams;
  word: string;
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  fetchWord: () => Promise<void>;
};

export default function InputSearch({
  setSearchParams,
  word,
  handleKeyDown,
  fetchWord,
}: InputSearchProps) {
  return (
    <div>
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
        className="mr-4 rounded-full px-4 py-2 placeholder:pl-2 text-gray-700 font-semibold border-2 focus:ring-green-700 focus:border-green-700  bg-gray-100 focus:outline-none focus:ring transition"
      />
      <button onClick={fetchWord}>Search</button>
    </div>
  );
}
