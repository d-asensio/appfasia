import { useState } from 'react'
import { featureFlags } from '../featureFlags'
import Tabs from '@mui/joy/Tabs'
import TabList from '@mui/joy/TabList'
import Tab, { tabClasses } from '@mui/joy/Tab'
import { IconButton } from '@mui/joy'
import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/joy/Box'
import AddIcon from '@mui/icons-material/Add'
import TabPanel from '@mui/joy/TabPanel'

export function EditorTabs () {
  const [index, setIndex] = useState(0)

  if (!featureFlags.isEnabled('TABS')) return null

  return (
    <Tabs
      aria-label="Pipeline"
      value={index}
      onChange={(event, value) => setIndex(value)}
      sx={{ '--Tabs-gap': '0px' }}
    >
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
            },
            [`&.${tabClasses.selected}`]: {
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
            }
          }
        }}
      >
        <Tab
          sx={{
            flexGrow: 0,
            display: 'flex',
            gap: '0.5em'
          }}
        >
          Pestaña 1{' '}
          <IconButton size="sm" variant="plain" color="neutral">
            <CloseIcon/>
          </IconButton>
        </Tab>
        <Tab
          sx={{
            flexGrow: 0,
            display: 'flex',
            gap: '0.5em'
          }}
        >
          Pestaña 2{' '}
          <IconButton size="sm" variant="plain" color="neutral">
            <CloseIcon/>
          </IconButton>
        </Tab>
        <Tab
          sx={{
            flexGrow: 0,
            display: 'flex',
            gap: '0.5em'
          }}
        >
          Pestaña 3{' '}
          <IconButton size="sm" variant="plain" color="neutral">
            <CloseIcon/>
          </IconButton>
        </Tab>
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
      <Box
        sx={(theme) => ({
          '--bg': theme.vars.palette.background.level3,
          height: '1px',
          background: 'var(--bg)',
          boxShadow: '0 0 0 100vmax var(--bg)',
          clipPath: 'inset(0 -100vmax)'
        })}
      />
      <Box
        sx={(theme) => ({
          '--bg': theme.vars.palette.background.surface,
          background: 'var(--bg)',
          boxShadow: '0 0 0 100vmax var(--bg)',
          clipPath: 'inset(0 -100vmax)'
          // px: 4,
          // py: 2
        })}
      >
        <TabPanel value={0}></TabPanel>
        <TabPanel value={1}></TabPanel>
        <TabPanel value={2}></TabPanel>
      </Box>
    </Tabs>
  )
}