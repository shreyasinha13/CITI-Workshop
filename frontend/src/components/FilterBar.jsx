import React, { useState } from 'react'
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  useTheme,
  alpha,
  Chip,
} from '@mui/material'
import {
  SearchRounded,
  EmojiEventsRounded,
  RefreshRounded,
  AddRounded,
} from '@mui/icons-material'
import { motion } from 'framer-motion'

export default function FilterBar({
  onSearch,
  onHighPerformers,
  onReset,
  onAddEmployee,
  activeFilter,
}) {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'
  const [searchValue, setSearchValue] = useState('')

  const handleSearch = (e) => {
    const val = e.target.value
    setSearchValue(val)
    onSearch(val)
  }

  const handleHighPerformers = () => {
    onHighPerformers()
  }

  const handleReset = () => {
    setSearchValue('')
    onReset()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.2 }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 1.5,
          p: 2,
          borderRadius: '18px',
          background: isDark
            ? 'rgba(15, 23, 42, 0.55)'
            : 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(16px)',
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: isDark ? '0 4px 24px rgba(0,0,0,0.3)' : '0 2px 16px rgba(99,102,241,0.06)',
        }}
      >
        {/* Search Field */}
        <TextField
          size="small"
          placeholder="Filter by skill…"
          value={searchValue}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRounded sx={{ color: theme.palette.text.secondary, fontSize: 18 }} />
              </InputAdornment>
            ),
          }}
          sx={{
            flex: '1 1 220px',
            minWidth: 180,
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              background: isDark
                ? alpha(theme.palette.primary.main, 0.04)
                : alpha(theme.palette.primary.main, 0.03),
              '& fieldset': {
                borderColor: theme.palette.divider,
              },
              '&:hover fieldset': {
                borderColor: alpha(theme.palette.primary.main, 0.4),
              },
              '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.main,
                borderWidth: 1.5,
              },
            },
            '& input': {
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '0.875rem',
            },
          }}
        />

        {/* Active filter chips */}
        {activeFilter === 'high-performers' && (
          <Chip
            label="High Performers"
            size="small"
            icon={<EmojiEventsRounded sx={{ fontSize: '14px !important' }} />}
            sx={{
              background: alpha('#f59e0b', 0.15),
              color: '#f59e0b',
              border: `1px solid ${alpha('#f59e0b', 0.25)}`,
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '0.75rem',
              fontWeight: 500,
            }}
          />
        )}

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', ml: 'auto' }}>
          {/* High Performers Button */}
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant={activeFilter === 'high-performers' ? 'contained' : 'outlined'}
              size="small"
              onClick={handleHighPerformers}
              startIcon={<EmojiEventsRounded sx={{ fontSize: 15 }} />}
              sx={{
                borderRadius: '10px',
                borderColor: '#f59e0b',
                color: activeFilter === 'high-performers' ? '#fff' : '#f59e0b',
                background:
                  activeFilter === 'high-performers'
                    ? 'linear-gradient(135deg, #f59e0b, #fbbf24)'
                    : 'transparent',
                boxShadow:
                  activeFilter === 'high-performers'
                    ? '0 4px 14px rgba(245,158,11,0.35)'
                    : 'none',
                '&:hover': {
                  borderColor: '#f59e0b',
                  background:
                    activeFilter === 'high-performers'
                      ? 'linear-gradient(135deg, #d97706, #f59e0b)'
                      : alpha('#f59e0b', 0.08),
                },
                fontSize: '0.8rem',
                py: 0.8,
                px: 1.5,
              }}
            >
              High Performers
            </Button>
          </motion.div>

          {/* Reset Button */}
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={handleReset}
              startIcon={<RefreshRounded sx={{ fontSize: 15 }} />}
              sx={{
                borderRadius: '10px',
                borderColor: theme.palette.divider,
                color: theme.palette.text.secondary,
                '&:hover': {
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  background: alpha(theme.palette.primary.main, 0.05),
                },
                fontSize: '0.8rem',
                py: 0.8,
                px: 1.5,
              }}
            >
              Reset
            </Button>
          </motion.div>

          {/* Add Employee Button */}
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="contained"
              size="small"
              onClick={onAddEmployee}
              startIcon={<AddRounded sx={{ fontSize: 16 }} />}
              sx={{
                borderRadius: '10px',
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.35)}`,
                '&:hover': {
                  background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                  boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.45)}`,
                },
                fontSize: '0.8rem',
                py: 0.8,
                px: 1.8,
                color: '#fff',
              }}
            >
              Add Employee
            </Button>
          </motion.div>
        </Box>
      </Box>
    </motion.div>
  )
}
