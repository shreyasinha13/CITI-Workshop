import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  useTheme,
  alpha,
  Tooltip,
  Avatar,
} from '@mui/material'
import {
  LightMode,
  DarkMode,
  AutoGraph,
  NotificationsOutlined,
  SettingsOutlined,
} from '@mui/icons-material'
import { motion } from 'framer-motion'

export default function Navbar({ toggleMode, mode }) {
  const theme = useTheme()
  const isDark = mode === 'dark'

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: isDark
          ? 'rgba(5, 9, 20, 0.7)'
          : 'rgba(240, 244, 255, 0.75)',
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${theme.palette.divider}`,
        zIndex: 1200,
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 4 }, py: 1, minHeight: '70px !important' }}>
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: '10px',
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 0 20px ${alpha(theme.palette.primary.main, 0.4)}`,
              }}
            >
              <AutoGraph sx={{ color: '#fff', fontSize: 20 }} />
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1.1,
                }}
              >
                PulseHR
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: theme.palette.text.secondary,
                  fontSize: '0.65rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontFamily: '"DM Sans", sans-serif',
                }}
              >
                Performance Suite
              </Typography>
            </Box>
          </Box>
        </motion.div>

        <Box sx={{ flexGrow: 1 }} />

        {/* Right Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Tooltip title="Notifications">
              <IconButton
                sx={{
                  color: theme.palette.text.secondary,
                  '&:hover': {
                    background: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                  },
                }}
              >
                <NotificationsOutlined fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Settings">
              <IconButton
                sx={{
                  color: theme.palette.text.secondary,
                  '&:hover': {
                    background: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                  },
                }}
              >
                <SettingsOutlined fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
              <IconButton
                onClick={toggleMode}
                sx={{
                  color: theme.palette.text.secondary,
                  '&:hover': {
                    background: alpha(theme.palette.secondary.main, 0.1),
                    color: theme.palette.secondary.main,
                  },
                }}
              >
                {isDark ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
              </IconButton>
            </Tooltip>

            <Box sx={{ ml: 1.5 }}>
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                }}
              >
                A
              </Avatar>
            </Box>
          </Box>
        </motion.div>
      </Toolbar>
    </AppBar>
  )
}
