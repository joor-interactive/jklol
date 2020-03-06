import React, { useContext, useState, useEffect } from "react"
import Prism from 'prismjs'
import { useRequestChars } from "../TextHanders/basicHandler"
import { AppContext } from "../App";
import { scan, map } from 'rxjs/operators';

const javascript = `
const express = require('express')\n
\tconst app = express()\n
\tconst port = 3000\n

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log('Example app listening...'))
`

const CodeWindow = ({charactersPerKeystroke = 3}) => {
    const [text, setText] = useState<string>("")

    const {keyPressObservable} = useContext(AppContext);

    useEffect(() => {
        keyPressObservable
            .pipe(scan((acc, e) => (acc + charactersPerKeystroke) % javascript.length, 0))
            .subscribe((e: number) => {
                setText((curr: string) => curr + javascript.substring(e - charactersPerKeystroke, e))
            })
    }, [keyPressObservable, charactersPerKeystroke])
    
    // when you are ready to emit progress... 
    // snippetProgress.next(progress);

    const html = Prism.highlight(text, Prism.languages.javascript, 'javascript')
    return (
    <pre><code className="language-javascript" dangerouslySetInnerHTML={{ __html: html }}></code></pre>
    )
}

export default CodeWindow