import React, { useContext, useState, useEffect } from "react";
import Prism from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";

import { AppContext } from "../App";
import { scan } from "rxjs/operators";

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

const CodeWindow = ({ charactersPerKeystroke = 3 }) => {
  const [texts, setTexts] = useState<Snippet[]>([
    { language: "javascript", code: "" }
  ]);
  const [snippet, setActiveSnippet] = useState(javascript);

  const { keyPressObservable, focusHiddenInput } = useContext(AppContext);

  useEffect(() => {
    const observable = keyPressObservable
      .pipe(
        scan(
          (acc, e) => (acc + charactersPerKeystroke) % snippet.code.length,
          0
        )
      )
      .subscribe(e => {
        if (e + charactersPerKeystroke >= snippet.code.length) {
          const nextSnippet = getRandomSnippet();
          setActiveSnippet(nextSnippet);
          setTexts(curr => {
            const [, ...rest] = curr;
            return [
              { language: nextSnippet.language, code: "" },
              snippet,
              ...rest
            ];
          });
        } else {
          setTexts((curr: Snippet[]) => {
            const [head, ...rest] = curr;
            const newHead = {
              language: head.language,
              code:
                head.code +
                snippet.code.substring(e - charactersPerKeystroke, e)
            };
            return [newHead, ...rest];
          });
        }
      });
    return () => observable.unsubscribe();
  }, [keyPressObservable, charactersPerKeystroke, snippet]);

  return (
    <>
      {[...texts].reverse().map((text, index) => {
        const html = Prism.highlight(
          text.code,
          Prism.languages[text.language],
          text.language
        );
        return (
          <pre
            className={`language-${text.language}`}
            key={index}
            onClick={() => focusHiddenInput()}
          >
            <code
              className={`language-${text.language}`}
              dangerouslySetInnerHTML={{ __html: html }}
            ></code>
          </pre>
        );
      })}
    </>
  );
};

export default CodeWindow;
