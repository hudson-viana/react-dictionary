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
        <InputSearch
          setSearchParams={setSearchParams}
          word={word}
          handleKeyDown={handleKeyDown}
          fetchWord={fetchWord}
          isLoading={isLoading}
        />
        <span className="mt-10">Loading...</span>
      </>
    );
  }

  if (hasError) {
    return (
      <>
        <InputSearch
          setSearchParams={setSearchParams}
          word={word}
          handleKeyDown={handleKeyDown}
          fetchWord={fetchWord}
        />
        <h1 className="text-3xl mt-10">A error happened, try again.</h1>
      </>
    );
  }

  return (
    <>
      <InputSearch
        setSearchParams={setSearchParams}
        word={word}
        handleKeyDown={handleKeyDown}
        fetchWord={fetchWord}
      />
      <WordResult 
      data={data}
      />
    </>
  );
}

export default App;
