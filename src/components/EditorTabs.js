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

function EditorTab () {
  return (
    <Tab
      sx={{
        flexGrow: 0,
        display: 'flex',
        gap: '0.5em',
        ...({
          color: 'primary.plainColor',
          fontWeight: 'lg',
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            zIndex: 1,
            bottom: '-1px',
            left: 'var(--List-item-paddingLeft)',
            right: 'var(--List-item-paddingRight)',
            height: '3px',
            borderTopLeftRadius: '3px',
            borderTopRightRadius: '3px',
            bgcolor: 'primary.500'
          }
        })
      }}
    >
      Pestaña 1{' '}
      <IconButton size="sm" variant="plain" color="neutral">
        <CloseIcon/>
      </IconButton>
    </Tab>
  )
}

function EditorTabList () {
  return (
    <TabList
      variant="plain"
      sx={{
        width: '100%',
        pt: 2,
        alignItems: 'flex-end',
        alignSelf: 'flex-start',
        [`& .${tabClasses.root}`]: {
          bgcolor: 'transparent',
          boxShadow: 'none',
          '&:hover': {
            bgcolor: 'transparent'
          }
        }
      }}
    >
      <EditorTab/>
      <Box
        sx={{
          alignSelf: 'center',
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <IconButton size="sm" variant="plain" color="neutral">
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