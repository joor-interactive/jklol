import React, {useContext, useEffect, useState} from "react";
import Prism from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";

import {AppContext} from "../App";
import {map} from "rxjs/operators";

type Snippet = {
  language: string;
  code: string;
};
const javascript: Snippet = {
  language: "javascript",
  code: `const express = require('express')\n
\tconst app = express()\n
\tconst port = 3000\n

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log('Example app listening...'))
`
};

const python: Snippet = {
  language: "python",
  code: `import sys
import calendar
 
year = 2013
if len(sys.argv) > 1:
    try:
        year = int(sys.argv[-1])
    except ValueError:
        pass
 
for month in range(1, 13):
    last_sunday = max(week[-1] for week in calendar.monthcalendar(year, month))
    print('{}-{}-{:2}'.format(year, calendar.month_abbr[month], last_sunday))
`
};

const snippets: Record<string, Snippet> = {
  javascript,
  python
};

const getRandomSnippet = () =>
  Object.values(snippets)[
    Math.floor(Math.random() * Object.keys(snippets).length)
  ];

const CodeWindow = () => {
  const [texts, setTexts] = useState<Snippet[]>([
    { language: "javascript", code: "" }
  ]);
  const [snippet, setActiveSnippet] = useState(javascript);
  const { gameEvents } = useContext(AppContext);

  useEffect(() => {
    const observable = gameEvents.$OnProgressUpdate
      .pipe(map(e => e.percentToPr))
      .subscribe(e => {
         setTexts((curr: Snippet[]) => {
            const [head, ...rest] = curr;
            const newHead = {
              language: head.language,
              code: snippet.code.substring(0, e * snippet.code.length)
            };
            return [newHead, ...rest];
          });
      });

    const observable2 = gameEvents.$OnPullRequest
      .subscribe(() => {
         const nextSnippet = getRandomSnippet();
         setActiveSnippet(nextSnippet);
          setTexts(curr => {
             return [
              { language: nextSnippet.language, code: "" },
              ...curr
            ];
          });
      });

    return () => {
      observable.unsubscribe();
      observable2.unsubscribe();
    }
  }, [snippet]);

  return (
    <>
      {texts.map((text, index) => {
        const html = Prism.highlight(
          text.code,
          Prism.languages[text.language],
          text.language
        );
        return (
          <pre
            className={`language-${text.language}`}
            key={index}
          >
            <code
              className={`language-${text.language}`}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </pre>
        );
      })}
    </>
  );
};

export default CodeWindow;
