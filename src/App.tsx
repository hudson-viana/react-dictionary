import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import WordResult from "./components/WordResult";
import InputSearch from "./components/InputSearch";
import { KeyboardEvent } from "react";
import "./App.css";

export type Result = {
  word: string;
  meanings: [
    {
      partOfSpeech: string;
      definitions: [
        {
          definition: string;
        }
      ];
      synonyms: string[];
      antonyms: string[];
    }
  ];
  license: {
    name: string;
    url: string;
  };
  sourceUrls: string[];
};

function App() {
  const [searchParams, setSearchParams] = useSearchParams({ word: "" });

  const word = searchParams.get("word") || "";

  const [data, setData] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const fetchWord = async () => {
    try {
      setHasError(false);
      setIsLoading(true);
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );

      if (response.status === 404) {
        setHasError(true);
        console.error("The error is: 404 Not Found");
        return;
      }

      const jsonData = (await response.json()) as Result[];
      setData(jsonData);
    } catch (error) {
      console.error("The error is: ", error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      fetchWord();
    }
  };

  if (isLoading) {
    return (
      <>
        <h1 className="text-3xl font-black text-gray-300 mb-8 ">
          English Dictionary
        </h1>

        <InputSearch
          setSearchParams={setSearchParams}
          word={word}
          handleKeyDown={handleKeyDown}
          fetchWord={fetchWord}
          isLoading={isLoading}
        />
      </>
    );
  }

  if (hasError) {
    return (
      <>
        <h1 className="text-3xl font-black text-gray-300 mb-8">
          English Dictionary
        </h1>

        <InputSearch
          setSearchParams={setSearchParams}
          word={word}
          handleKeyDown={handleKeyDown}
          fetchWord={fetchWord}
          isLoading={isLoading}
        />
        <h2 className="text-xl mt-10 text-center max-w-[50%]">
          A error happened or the API used do not have a definition for this
          word. Try another word.
        </h2>
      </>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-black text-gray-300 mb-8">
        English Dictionary
      </h1>

      <InputSearch
        setSearchParams={setSearchParams}
        word={word}
        handleKeyDown={handleKeyDown}
        fetchWord={fetchWord}
        isLoading={isLoading}
      />
      <WordResult data={data} />
    </>
  );
}

export default App;
