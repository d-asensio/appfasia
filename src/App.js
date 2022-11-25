import './App.css';
import 'normalize.css';
import { useCallback, useState } from 'react'

const initialState = {
  text: '',
  words: [
    'Yo',
    'Quiero',
    'Pancake'
  ]
}

function App() {
  const [text, setText] = useState(initialState.text)
  const [words] = useState(initialState.words)

  const handleWordClick = useCallback(e => {
    const clickedWord = e.target.innerText

    setText(`${text} ${clickedWord}`)
  }, [text])

  return (
    <div className="App">
      <textarea className='input-area' value={text} />
      <div className='word-options'>
        {words.map(word => (
          <button key={word} onClick={handleWordClick}>{word}</button>
        ))}
      </div>
    </div>
  );
}

export default App;
