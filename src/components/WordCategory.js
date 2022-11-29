import { useCallback } from 'react'
import { sort } from 'ramda'
import { useSpeechSynthesis } from 'react-speech-kit'

import Button from '@mui/joy/Button'

import * as wordEntity from '../entities/word'
import * as globalOptionsEntity from '../entities/globalOptions'

import { useSelector } from '../store'

const sortAlphabetically = sort(
  (a, b) => a.localeCompare(b)
)

export function WordCategory ({ id }) {
  const { speak } = useSpeechSynthesis()

  const { name, color } = useSelector(
    state => wordEntity.wordCategoryByIdSelector(state, id)
  )

  const words = useSelector(
    state => wordEntity.wordListByCategoryIdSelector(state, id)
  )

  const speakEnabled = useSelector(
    globalOptionsEntity.optionSpeakEnabledSelector
  )

  const handleWordClick = useCallback(e => {
    const clickedWord = e.target.innerText

    if (speakEnabled) {
      speak({ text: clickedWord })
    }
  }, [speak, speakEnabled])

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
          onClick={handleWordClick}
        >
          {word}
        </Button>
      ))}
    </div>
  )
}