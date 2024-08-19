import { Result } from "../App";

type WordResultProps = {
  data: Result[],
}

export default function WordResult({data}:WordResultProps) {
  return (
    <>
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
