import { useState } from "react";
import { useSearchParams } from "react-router-dom";

type Result = {
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

export default function WordResult() {
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

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      fetchWord();
    }
  };

  if (isLoading) {
    return (
      <>
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
        <span className="mt-10">Loading...</span>
      </>
    );
  }

  if (hasError) {
    return (
      <>
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

        <h1 className="text-3xl mt-10">A error happened, try again.</h1>
      </>
    );
  }

  return (
    <>
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
      {data.length > 0 && (
        <article className="mx-40 max-w-[70%] mt-14">
          <ul>
            {data.map((d, dataIndex) => (
              // each word do not have a unique id, so index is used
              <li key={dataIndex} className="mb-14">
                <h1 className="text-5xl font-extrabold mb-5 text-white">
                  {d.word}
                </h1>
                <ul>
                  {d.meanings.map((meaning, meaningsIndex) => (
                    <li key={meaningsIndex} className="mb-10">
                      <h2 className="text-2xl italic mb-4 text-white">
                        {meaning.partOfSpeech}
                      </h2>
                      <ol className="list-decimal list-inside ml-5 mb-8">
                        {meaning.definitions.map((def, meaningIndex) => (
                          <li key={meaningIndex} className="mb-3">
                            <p className="pl-2 inline">{def.definition}</p>
                          </li>
                        ))}
                      </ol>
                      {meaning.synonyms?.length > 0 && (
                        <section className="flex mb-5">
                          <h3 className="font-bold ml-5">Synonyms: </h3>
                          <ul className="ml-3 flex flex-wrap">
                            {meaning.synonyms.map((synonym, synonymsIndex) => (
                              <li
                                key={synonymsIndex}
                                className="inline mr-4 opacity-75 text-sm italic"
                              >
                                {synonym};
                              </li>
                            ))}
                          </ul>
                        </section>
                      )}

                      {meaning.antonyms?.length > 0 && (
                        <section className="flex mb-5">
                          <h3 className="font-bold ml-5">Antonyms: </h3>
                          <ul className="ml-3 flex flex-wrap">
                            {meaning.antonyms.map((antonym, antonymsIndex) => (
                              <li
                                key={antonymsIndex}
                                className="inline mr-4 opacity-75 text-sm italic"
                              >
                                {antonym};
                              </li>
                            ))}
                          </ul>
                        </section>
                      )}
                    </li>
                  ))}
                </ul>
                <aside className="mt-10">
                  {d.sourceUrls?.length > 0 && (
                    <div className="text-sm opacity-45 flex gap-2">
                      <p>Sources of the definitions: </p>
                      <ul className="flex gap-3 list-decimal list-inside">
                        {d.sourceUrls.map((sourceUrl, sourceUrlsIndex) => (
                          <li key={sourceUrlsIndex}>
                            <a href={sourceUrl}> {sourceUrl}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <a href={d.license.url} className="text-sm opacity-45">
                    License: {d.license.name}
                  </a>
                </aside>
              </li>
            ))}
          </ul>
        </article>
      )}
    </>
  );
}
