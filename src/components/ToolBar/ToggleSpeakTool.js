import { useSelector } from '../../store'
import * as globalOptionsEntity from '../../entities/globalOptions'
import { useCallback } from 'react'
import { run } from '@regenerate/core'
import { speechService } from '../../services/speechService'
import { IconButton, Tooltip } from '@mui/joy'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'

export function ToggleSpeakTool () {
  const speakEnabled = useSelector(
    globalOptionsEntity.optionSpeakEnabledSelector
  )

  const handleSpeakToggleClick = useCallback(() => {
    run(
      speechService.toggleSpeakEnabledOption()
    )
  }, [])

  return (
    <Tooltip
      placement="bottom"
      arrow
      title={speakEnabled ? 'Desactivar audio' : 'Activar audio'}
    >
      <IconButton
        size="lg"
        variant="outlined"
        color="neutral"
        onClick={handleSpeakToggleClick}
      >
        {speakEnabled
          ? <VolumeUpIcon/>
          : <VolumeOffIcon/>}
      </IconButton>
    </Tooltip>
  )
}
