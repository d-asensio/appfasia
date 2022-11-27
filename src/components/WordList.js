import { useSelector } from '../store'
import * as wordEntity from '../entities/word'
import { WordCategory } from './WordCategory'
import styled from '@emotion/styled'

const WordOptions = styled.div`
  margin: 0.5rem;
  text-align: start;

  > * {
    margin: 0.25rem;
  }
`

export function WordList () {
  const categoryIds = useSelector(
    wordEntity.wordCategoryIdListSelector
  )

  return (
    <WordOptions>
      {categoryIds.map(categoryId => (
        <WordCategory
          key={categoryId}
          id={categoryId}
        />
      ))}
    </WordOptions>
  )
}