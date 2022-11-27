import { CssVarsProvider } from '@mui/joy/styles'
import './App.css'
import 'normalize.css'
import { CssBaseline } from '@mui/joy'
import { Editor } from './components/Editor'
import { SearchBox } from './components/SearchBox'
import { EditorTabs } from './components/EditorTabs'
import { WordList } from './components/WordList'

function App () {
  return (
    <CssVarsProvider>
      <CssBaseline/>
      <div className="App">
        <EditorTabs/>
        <Editor id='c13f8f60-1c78-4743-881f-b52940f15fe7'/>
        <SearchBox/>
        <WordList />
      </div>
    </CssVarsProvider>
  )
}

export default App
