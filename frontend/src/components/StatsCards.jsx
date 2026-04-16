import React from 'react'
import { Box, Typography, useTheme, alpha, Skeleton } from '@mui/material'
import {
  PeopleAlt,
  EmojiEvents,
  StarRounded,
  SchoolRounded,
} from '@mui/icons-material'
import { motion } from 'framer-motion'

const StatCard = ({ icon: Icon, label, value, color, delay, gradient, loading }) => {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      style={{ flex: 1, minWidth: 200 }}
    >
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '20px',
          padding: '1.5rem',
          background: isDark
            ? `rgba(15, 23, 42, 0.6)`
            : `rgba(255,255,255,0.75)`,
          backdropFilter: 'blur(16px)',
          border: `1px solid ${alpha(color, isDark ? 0.2 : 0.15)}`,
          boxShadow: isDark
            ? `0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 ${alpha(color, 0.1)}`
            : `0 4px 24px ${alpha(color, 0.08)}, inset 0 1px 0 rgba(255,255,255,0.8)`,
          cursor: 'default',
        }}
      >
        {/* Glow blob */}
        <Box
          sx={{
            position: 'absolute',
            top: -20,
            right: -20,
            width: 100,
            height: 100,
            borderRadius: '50%',
            background: gradient,
            opacity: isDark ? 0.15 : 0.1,
            filter: 'blur(30px)',
            pointerEvents: 'none',
          }}
        />

        {/* Top bar accent */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: gradient,
            borderRadius: '20px 20px 0 0',
          }}
        />

        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          {/* Icon */}
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '14px',
              background: gradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: `0 4px 16px ${alpha(color, 0.35)}`,
            }}
          >
            <Icon sx={{ color: '#fff', fontSize: 22 }} />
          </Box>

          <Box sx={{ flex: 1, mt: 0.25 }}>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: '0.72rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                mb: 0.5,
              }}
            >
              {label}
            </Typography>
            {loading ? (
              <Skeleton width={60} height={36} sx={{ bgcolor: alpha(color, 0.1) }} />
            ) : (
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  fontSize: '1.9rem',
                  background: gradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1.1,
                }}
              >
                {value ?? '—'}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </motion.div>
  )
}

export default function StatsCards({ stats, loading }) {
  const theme = useTheme()

  const cards = [
    {
      icon: PeopleAlt,
      label: 'Total Employees',
      value: stats?.total_employees ?? stats?.total,
      color: theme.palette.primary.main,
      gradient: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
      delay: 0,
    },
    {
      icon: EmojiEvents,
      label: 'High Performers',
      value: stats?.high_performers,
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
      delay: 0.07,
    },
    {
      icon: StarRounded,
      label: 'Avg. Rating',
      value: stats?.average_rating != null ? Number(stats.average_rating).toFixed(1) : null,
      color: theme.palette.secondary.main,
      gradient: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
      delay: 0.14,
    },
    {
      icon: SchoolRounded,
      label: 'Training Done',
      value: stats?.training_completed,
      color: '#34d399',
      gradient: 'linear-gradient(135deg, #059669, #34d399)',
      delay: 0.21,
    },
  ]

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2.5,
        width: '100%',
      }}
    >
      {cards.map((card) => (
        <StatCard key={card.label} {...card} loading={loading} />
      ))}
    </Box>
  )
}
