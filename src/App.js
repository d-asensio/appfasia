import { CssVarsProvider } from '@mui/joy/styles'
import './App.css'
import 'normalize.css'
import { CssBaseline } from '@mui/joy'
import { SearchBox } from './components/SearchBox'
import { WordList } from './components/WordList'

function App () {
  return (
    <CssVarsProvider>
      <CssBaseline/>
      <div className="App">
        <SearchBox/>
        <WordList />
      </div>
    </CssVarsProvider>
  )
}

export default App
