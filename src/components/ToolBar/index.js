import { memo } from 'react'
import Box from '@mui/joy/Box'
import { PlayTextTool } from './PlayTextTool'
import { ToggleSpeakTool } from './ToggleSpeakTool'
import { ClipboardCopyTool } from './ClipboardCopyTool'
import { DeleteEditorTool } from './DeleteEditorTool'

export const ToolBar = memo(function ({ editorId }) {
  return (
    <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'right', width: '100%' }}>
      <PlayTextTool editorId={editorId}/>
      <ToggleSpeakTool/>
      <ClipboardCopyTool editorId={editorId}/>
      <DeleteEditorTool editorId={editorId}/>
    </Box>
  )
})