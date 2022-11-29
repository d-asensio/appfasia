import { CssVarsProvider } from '@mui/joy/styles'
import { CssBaseline } from '@mui/joy'
import { WordList } from './components/WordList'

function App () {
  return (
    <CssVarsProvider>
      <CssBaseline/>
      <WordList />
    </CssVarsProvider>
  )
}

export default App
