import { featureFlags } from '../featureFlags'
import { TextField } from '@mui/joy'
import SearchIcon from '@mui/icons-material/Search'

export function SearchBox () {
  if (!featureFlags.isEnabled('SEARCH_BOX')) return null

  return (
    <div
      style={{
        padding: '0.5rem',
        width: '300px'
      }}
    >
      <TextField
        label="Buscar"
        placeholder="Busca una palabra..."
        endDecorator={
          <SearchIcon/>
        }
      />
    </div>
  )
}