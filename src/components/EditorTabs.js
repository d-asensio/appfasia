import { useCallback } from 'react'
import { featureFlags } from '../featureFlags'
import Tabs from '@mui/joy/Tabs'
import TabList from '@mui/joy/TabList'
import Tab, { tabClasses } from '@mui/joy/Tab'
import { IconButton } from '@mui/joy'
import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/joy/Box'
import AddIcon from '@mui/icons-material/Add'
import { Editor } from './Editor'
import { useSelector } from '../store'
import * as editorEntity from '../entities/editor'

function EditorTab ({ id }) {
  const { name } = useSelector(
    state => editorEntity.editorByIdSelector(state, id)
  )

  const currentEditorId = useSelector(
    editorEntity.currentEditorSelector
  )

  const isCurrentEditor = id === currentEditorId

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        gap: 1,
        alignItems: 'center',
        px: 2,
        transition: 'background-color 300ms',
        ':hover': {
          bgcolor: 'rgba(10, 107, 222, 0.1)'
        },
        ...(isCurrentEditor
          ? {
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              zIndex: 1,
              bottom: '-1px',
              left: 0,
              right: 0,
              height: '3px',
              borderTopLeftRadius: '3px',
              borderTopRightRadius: '3px',
              bgcolor: 'primary.500'
            }
          }
          : {})
      }}
    >
      <Tab
        value={id}
        sx={{
          flexGrow: 0,
          display: 'flex',
          gap: '0.5em',
          boxShadow: 'none',
          bgcolor: 'transparent',
          ':hover': {
            bgcolor: 'transparent'
          },
          ...(isCurrentEditor
            ? {
              color: 'primary.plainColor',
              fontWeight: 'lg',
              p: 0
            }
            : {})
        }}
      >
        {name}{' '}
      </Tab>
      <IconButton
        sx={{
          "--IconButton-radius": "100%",
          "--IconButton-size": "24px"
        }}
        size="sm"
        variant="plain"
        color="neutral"
      >
        <CloseIcon/>
      </IconButton>
    </Box>
  )
}

function EditorTabList () {
  const editorIdList = useSelector(
    editorEntity.editorIdListSelector
  )

  return (
    <TabList
      variant="plain"
      sx={{
        width: '100%',
        alignItems: 'flex-end'
      }}
    >
      {editorIdList.map(editorId => (
        <EditorTab
          key={editorId}
          id={editorId}
        />
      ))}
      <Box
        sx={{
          width: '100%',
          alignSelf: 'center',
          display: 'flex',
          justifyContent: 'flex-end',
          p: 0.5
        }}
      >
        <IconButton
          size="sm"
          variant="plain"
          color="neutral"
        >
          <AddIcon/>
        </IconButton>
      </Box>
    </TabList>
  )
}

function EditorTabsDivider () {
  return (
    <Box
      sx={(theme) => ({
        '--bg': theme.vars.palette.background.level3,
        height: '1px',
        background: 'var(--bg)',
        boxShadow: '0 0 0 100vmax var(--bg)',
        clipPath: 'inset(0 -100vmax)'
      })}
    />
  )
}

export function EditorTabs () {
  const currentEditorId = useSelector(
    editorEntity.currentEditorSelector
  )

  const handleTabChange = useCallback(
    (event, value) => console.log({ event, value }),
    []
  )

  return (
    <Tabs
      onChange={handleTabChange}
      sx={{ '--Tabs-gap': '0px' }}
    >
      {featureFlags.isEnabled('TABS') && (
        <>
          <EditorTabList/>
          <EditorTabsDivider/>
        </>
      )}
      <Box
        sx={(theme) => ({
          '--bg': theme.vars.palette.background.surface,
          background: 'var(--bg)',
          boxShadow: '0 0 0 100vmax var(--bg)',
          clipPath: 'inset(0 -100vmax)'
        })}
      >
        <Editor id={currentEditorId}/>
      </Box>
    </Tabs>
  )
}