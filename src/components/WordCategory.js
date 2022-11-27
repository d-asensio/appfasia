import { useSelector } from '../store'
import * as wordEntity from '../entities/word'
import Button from '@mui/joy/Button'
import { sort } from 'ramda'

const sortAlphabetically = sort(
  (a, b) => a.localeCompare(b)
)

export function WordCategory ({ id, onWordClick }) {
  const { name, color } = useSelector(
    state => wordEntity.wordCategoryByIdSelector(state, id)
  )

  const words = useSelector(
    state => wordEntity.wordListByCategoryIdSelector(state, id)
  )

  return (
    <div>
      <h4>{name}</h4>
      {sortAlphabetically(words).map(word => (
        <Button
          sx={{
            background: color,
            margin: '0.25rem'
          }}
          size="lg"
          color="primary"
          variant="solid"
          key={word}
          onClick={onWordClick}
        >
          {word}
        </Button>
      ))}
    </div>
  )
}