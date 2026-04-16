import React, { useState } from 'react'
import {
  Box,
  Typography,
  IconButton,
  Chip,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  useTheme,
  alpha,
} from '@mui/material'
import {
  EditRounded,
  DeleteRounded,
  StarRounded,
  StarBorderRounded,
  WorkRounded,
  CodeRounded,
} from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'

const AVATAR_GRADIENTS = [
  'linear-gradient(135deg, #6366f1, #818cf8)',
  'linear-gradient(135deg, #0891b2, #22d3ee)',
  'linear-gradient(135deg, #7c3aed, #a78bfa)',
  'linear-gradient(135deg, #059669, #34d399)',
  'linear-gradient(135deg, #dc2626, #f87171)',
  'linear-gradient(135deg, #d97706, #fbbf24)',
]

const getGradient = (name) => {
  const idx = (name?.charCodeAt(0) ?? 0) % AVATAR_GRADIENTS.length
  return AVATAR_GRADIENTS[idx]
}

const StarRating = ({ rating }) => {
  const theme = useTheme()
  const stars = Math.round(rating ?? 0)
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
      {[1, 2, 3, 4, 5].map((s) =>
        s <= stars ? (
          <StarRounded key={s} sx={{ color: '#fbbf24', fontSize: 16 }} />
        ) : (
          <StarBorderRounded
            key={s}
            sx={{ color: alpha(theme.palette.text.secondary, 0.4), fontSize: 16 }}
          />
        )
      )}
      <Typography
        variant="caption"
        sx={{
          ml: 0.5,
          color: theme.palette.text.secondary,
          fontSize: '0.72rem',
          fontFamily: '"DM Sans", sans-serif',
        }}
      >
        {rating != null ? Number(rating).toFixed(1) : '—'}
      </Typography>
    </Box>
  )
}

export default function EmployeeCard({ employee, onEdit, onDelete }) {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [hovered, setHovered] = useState(false)

  const { id, name, role, skill, rating, training_completed, training_status } = employee
  const initials = name
    ?.split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const isTrainingDone = training_completed === true || training_status === 'completed'
  const avatarGradient = getGradient(name)

  const handleDeleteConfirm = () => {
    setConfirmOpen(false)
    onDelete(id)
  }

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.88 }}
        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ y: -6, transition: { duration: 0.25 } }}
        style={{ display: 'flex' }}
      >
        <Box
          sx={{
            position: 'relative',
            flex: 1,
            borderRadius: '20px',
            overflow: 'hidden',
            background: isDark
              ? 'rgba(15, 23, 42, 0.65)'
              : 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${
              hovered
                ? alpha(theme.palette.primary.main, isDark ? 0.35 : 0.25)
                : theme.palette.divider
            }`,
            boxShadow: hovered
              ? isDark
                ? `0 20px 48px rgba(0,0,0,0.5), 0 0 0 1px ${alpha(theme.palette.primary.main, 0.15)}`
                : `0 12px 40px ${alpha(theme.palette.primary.main, 0.12)}`
              : isDark
              ? '0 4px 24px rgba(0,0,0,0.3)'
              : '0 2px 12px rgba(0,0,0,0.04)',
            transition: 'border-color 0.25s, box-shadow 0.25s',
            cursor: 'default',
            p: 2.5,
          }}
        >
          {/* Subtle top gradient line */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: avatarGradient,
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.3s',
            }}
          />

          {/* Header: Avatar + Name + Actions */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 2 }}>
            {/* Avatar */}
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '14px',
                background: avatarGradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontFamily: '"Sora", sans-serif',
                fontWeight: 700,
                fontSize: '1rem',
                color: '#fff',
                boxShadow: `0 4px 14px ${alpha('#000', 0.2)}`,
              }}
            >
              {initials}
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  color: theme.palette.text.primary,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.2 }}>
                <WorkRounded sx={{ fontSize: 12, color: theme.palette.text.secondary }} />
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '0.78rem',
                    color: theme.palette.text.secondary,
                    fontFamily: '"DM Sans", sans-serif',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {role}
                </Typography>
              </Box>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 0.5, flexShrink: 0 }}>
              <Tooltip title="Edit">
                <motion.div whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.9 }}>
                  <IconButton
                    size="small"
                    onClick={() => onEdit(employee)}
                    sx={{
                      width: 32,
                      height: 32,
                      background: alpha(theme.palette.primary.main, 0.08),
                      color: theme.palette.primary.main,
                      borderRadius: '9px',
                      '&:hover': {
                        background: alpha(theme.palette.primary.main, 0.18),
                      },
                    }}
                  >
                    <EditRounded sx={{ fontSize: 15 }} />
                  </IconButton>
                </motion.div>
              </Tooltip>
              <Tooltip title="Delete">
                <motion.div whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.9 }}>
                  <IconButton
                    size="small"
                    onClick={() => setConfirmOpen(true)}
                    sx={{
                      width: 32,
                      height: 32,
                      background: alpha(theme.palette.error.main, 0.08),
                      color: theme.palette.error.main,
                      borderRadius: '9px',
                      '&:hover': {
                        background: alpha(theme.palette.error.main, 0.18),
                      },
                    }}
                  >
                    <DeleteRounded sx={{ fontSize: 15 }} />
                  </IconButton>
                </motion.div>
              </Tooltip>
            </Box>
          </Box>

          {/* Divider */}
          <Box sx={{ height: 1, background: theme.palette.divider, mb: 2, mx: -0.5 }} />

          {/* Skill + Rating */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
              <CodeRounded sx={{ fontSize: 14, color: theme.palette.text.secondary, flexShrink: 0 }} />
              <Chip
                label={skill}
                size="small"
                sx={{
                  height: 22,
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  fontFamily: '"DM Sans", sans-serif',
                  background: alpha(theme.palette.secondary.main, isDark ? 0.12 : 0.08),
                  color: theme.palette.secondary.main,
                  border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
                  letterSpacing: '0.02em',
                  '& .MuiChip-label': { px: 1 },
                }}
              />
            </Box>

            <StarRating rating={rating} />

            {/* Training badge */}
            <Chip
              label={isTrainingDone ? '✓ Training Completed' : '⏳ In Progress'}
              size="small"
              sx={{
                alignSelf: 'flex-start',
                height: 24,
                fontSize: '0.7rem',
                fontWeight: 600,
                fontFamily: '"DM Sans", sans-serif',
                background: isTrainingDone
                  ? alpha('#34d399', isDark ? 0.12 : 0.08)
                  : alpha('#fbbf24', isDark ? 0.12 : 0.08),
                color: isTrainingDone ? '#34d399' : '#f59e0b',
                border: `1px solid ${
                  isTrainingDone ? alpha('#34d399', 0.25) : alpha('#fbbf24', 0.25)
                }`,
                '& .MuiChip-label': { px: 1.2 },
              }}
            />
          </Box>
        </Box>
      </motion.div>

      {/* Delete Confirmation Dialog */}
      <AnimatePresence>
        {confirmOpen && (
          <Dialog
            open={confirmOpen}
            onClose={() => setConfirmOpen(false)}
            PaperProps={{
              sx: {
                borderRadius: '20px',
                background: isDark ? 'rgba(15, 23, 42, 0.95)' : '#fff',
                backdropFilter: 'blur(20px)',
                border: `1px solid ${theme.palette.divider}`,
                p: 1,
                maxWidth: 380,
              },
            }}
          >
            <DialogTitle sx={{ fontWeight: 700, pb: 0.5, fontSize: '1rem' }}>
              Remove Employee?
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                sx={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '0.875rem',
                  color: theme.palette.text.secondary,
                }}
              >
                Are you sure you want to remove{' '}
                <strong style={{ color: theme.palette.text.primary }}>{name}</strong>? This
                action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ px: 2, pb: 2, gap: 1 }}>
              <Button
                onClick={() => setConfirmOpen(false)}
                variant="outlined"
                size="small"
                sx={{
                  borderRadius: '10px',
                  borderColor: theme.palette.divider,
                  color: theme.palette.text.secondary,
                  '&:hover': { borderColor: theme.palette.primary.main },
                }}
              >
                Cancel
              </Button>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Button
                  onClick={handleDeleteConfirm}
                  variant="contained"
                  size="small"
                  sx={{
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #ef4444, #f87171)',
                    boxShadow: '0 4px 14px rgba(239,68,68,0.35)',
                    '&:hover': { background: 'linear-gradient(135deg, #dc2626, #ef4444)' },
                  }}
                >
                  Delete
                </Button>
              </motion.div>
            </DialogActions>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  )
}
