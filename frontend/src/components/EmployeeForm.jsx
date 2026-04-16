import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Switch,
  Slider,
  useTheme,
  alpha,
  IconButton,
  Divider,
} from '@mui/material'
import { CloseRounded, PersonAddAlt1Rounded, EditNoteRounded } from '@mui/icons-material'
import { motion } from 'framer-motion'

const INITIAL = {
  name: '',
  role: '',
  skill: '',
  rating: 3,
  training_completed: false,
}

const fieldSx = (theme, isDark) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    fontFamily: '"DM Sans", sans-serif',
    background: isDark
      ? alpha(theme.palette.primary.main, 0.04)
      : alpha(theme.palette.primary.main, 0.02),
    '& fieldset': { borderColor: theme.palette.divider },
    '&:hover fieldset': { borderColor: alpha(theme.palette.primary.main, 0.5) },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      borderWidth: 1.5,
    },
    '&.Mui-error fieldset': { borderColor: theme.palette.error.main },
  },
  '& .MuiInputLabel-root': {
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '0.875rem',
  },
  '& input': { fontFamily: '"DM Sans", sans-serif', fontSize: '0.875rem' },
})

export default function EmployeeForm({ open, onClose, onSubmit, editData }) {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'
  const isEdit = !!editData

  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (editData) {
      setForm({
        name: editData.name ?? '',
        role: editData.role ?? '',
        skill: editData.skill ?? '',
        rating: editData.rating ?? 3,
        training_completed:
          editData.training_completed ?? editData.training_status === 'completed' ?? false,
      })
    } else {
      setForm(INITIAL)
    }
    setErrors({})
  }, [editData, open])

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.role.trim()) e.role = 'Role is required'
    if (!form.skill.trim()) e.skill = 'Skill is required'
    return e
  }

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const handleSubmit = async () => {
    const e = validate()
    if (Object.keys(e).length) {
      setErrors(e)
      return
    }
    setLoading(true)
    try {
      await onSubmit(form)
      onClose()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '24px',
          background: isDark ? 'rgba(10, 16, 32, 0.97)' : 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(24px)',
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: isDark
            ? '0 32px 80px rgba(0,0,0,0.6)'
            : '0 16px 48px rgba(99,102,241,0.12)',
          overflow: 'visible',
        },
      }}
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: 'blur(8px)',
            background: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(15,23,42,0.3)',
          },
        },
      }}
    >
      {/* Header */}
      <DialogTitle sx={{ px: 3, pt: 3, pb: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '12px',
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.4)}`,
              }}
            >
              {isEdit ? (
                <EditNoteRounded sx={{ color: '#fff', fontSize: 20 }} />
              ) : (
                <PersonAddAlt1Rounded sx={{ color: '#fff', fontSize: 20 }} />
              )}
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, fontSize: '1rem', lineHeight: 1.2 }}
              >
                {isEdit ? 'Edit Employee' : 'Add New Employee'}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: theme.palette.text.secondary,
                  fontSize: '0.72rem',
                  fontFamily: '"DM Sans", sans-serif',
                }}
              >
                {isEdit ? 'Update employee details' : 'Fill in the details below'}
              </Typography>
            </Box>
          </Box>

          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              color: theme.palette.text.secondary,
              background: alpha(theme.palette.text.secondary, 0.05),
              borderRadius: '10px',
              '&:hover': {
                background: alpha(theme.palette.error.main, 0.1),
                color: theme.palette.error.main,
              },
            }}
          >
            <CloseRounded fontSize="small" />
          </IconButton>
        </Box>
      </DialogTitle>

      <Divider sx={{ mx: 3, mt: 2.5, mb: 0 }} />

      <DialogContent sx={{ px: 3, py: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Name */}
          <TextField
            label="Full Name"
            value={form.name}
            onChange={handleChange('name')}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
            size="small"
            sx={fieldSx(theme, isDark)}
          />

          {/* Role */}
          <TextField
            label="Role / Position"
            value={form.role}
            onChange={handleChange('role')}
            error={!!errors.role}
            helperText={errors.role}
            fullWidth
            size="small"
            sx={fieldSx(theme, isDark)}
          />

          {/* Skill */}
          <TextField
            label="Primary Skill"
            value={form.skill}
            onChange={handleChange('skill')}
            error={!!errors.skill}
            helperText={errors.skill}
            fullWidth
            size="small"
            placeholder="e.g. React, Python, Design"
            sx={fieldSx(theme, isDark)}
          />

          {/* Rating Slider */}
          <Box
            sx={{
              p: 2,
              borderRadius: '14px',
              background: isDark
                ? alpha(theme.palette.primary.main, 0.04)
                : alpha(theme.palette.primary.main, 0.02),
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '0.8rem',
                  color: theme.palette.text.secondary,
                }}
              >
                Performance Rating
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {form.rating} / 5
              </Typography>
            </Box>
            <Slider
              value={form.rating}
              onChange={(_, v) => setForm((prev) => ({ ...prev, rating: v }))}
              min={1}
              max={5}
              step={0.5}
              marks
              sx={{
                color: theme.palette.primary.main,
                '& .MuiSlider-thumb': {
                  width: 18,
                  height: 18,
                  boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.15)}`,
                },
                '& .MuiSlider-rail': {
                  opacity: 0.2,
                },
              }}
            />
          </Box>

          {/* Training Toggle */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 1.5,
              borderRadius: '14px',
              background: isDark
                ? alpha('#34d399', 0.05)
                : alpha('#34d399', 0.04),
              border: `1px solid ${alpha('#34d399', form.training_completed ? 0.25 : 0.1)}`,
              transition: 'border-color 0.25s',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '0.85rem',
                color: theme.palette.text.primary,
                fontWeight: 500,
              }}
            >
              Training Completed
            </Typography>
            <Switch
              checked={form.training_completed}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, training_completed: e.target.checked }))
              }
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: '#34d399',
                  '& + .MuiSwitch-track': { backgroundColor: '#34d399' },
                },
              }}
            />
          </Box>
        </Box>
      </DialogContent>

      <Divider sx={{ mx: 3 }} />

      <DialogActions sx={{ px: 3, py: 2.5, gap: 1.5 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderRadius: '12px',
            borderColor: theme.palette.divider,
            color: theme.palette.text.secondary,
            flex: 1,
            '&:hover': { borderColor: theme.palette.primary.main },
          }}
        >
          Cancel
        </Button>
        <motion.div style={{ flex: 2 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={loading}
            fullWidth
            sx={{
              borderRadius: '12px',
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
              py: 1.2,
              fontWeight: 700,
              fontSize: '0.875rem',
              color: '#fff',
              '&:hover': {
                background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
              },
              '&.Mui-disabled': {
                background: alpha(theme.palette.primary.main, 0.3),
                color: alpha('#fff', 0.5),
              },
            }}
          >
            {loading ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Employee'}
          </Button>
        </motion.div>
      </DialogActions>
    </Dialog>
  )
}
