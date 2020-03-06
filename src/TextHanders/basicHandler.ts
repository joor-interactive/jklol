import { useState } from "react"


const getRandomSnippet = () => 
  Object.keys(snippets)[Math.floor(Math.random() * Object.keys(snippets).length)]


const useRequestChars = () => {
  const [currentPos, setCurrentPos] = useState(0)
  const [snippet, setSnippet] = useState(php)
  const [charsToReturn, setCharsToReturn] = useState(1)

  const nextPos = (charsToReturn + currentPos <= snippet.length) ? charsToReturn + currentPos : snippet.length
  const next = snippet.substr(currentPos, nextPos)

  if (nextPos >= snippet.length) {
    setCurrentPos(0)
    setSnippet(getRandomSnippet())
  }

  return {
    progress: next.length,
    complete: nextPos === snippet.length,
    next
  }
}

const javascript = `
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log('Example app listening...'))
`

const python = `
import sys
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

const php = `
<?php
// src/Model/Table/ArticlesTable.php
namespace App\\Model\\Table;

use Cake\\ORM\\Table;

class ArticlesTable extends Table
{
    public function initialize(array $config)
    {
        $this->addBehavior('Timestamp');
    }
}
`

const snippets = {
  javascript,
  python,
  php
}

export { useRequestChars };