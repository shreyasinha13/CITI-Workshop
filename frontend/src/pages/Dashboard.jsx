import React, { useState, useEffect, useCallback } from 'react'
import {
  Box,
  Container,
  Typography,
  useTheme,
  alpha,
  CircularProgress,
  Skeleton,
} from '@mui/material'
import { InboxRounded } from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'
import { useSnackbar } from 'notistack'

import Navbar from '../components/Navbar'
import StatsCards from '../components/StatsCards'
import FilterBar from '../components/FilterBar'
import EmployeeCard from '../components/EmployeeCard'
import EmployeeForm from '../components/EmployeeForm'

import {
  getEmployees,
  getHighPerformers,
  getStats,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '../services/api'

const BG_ORBS_DARK = [
  { top: '-15%', left: '-10%', color: '#6366f1', size: 600 },
  { top: '40%', right: '-8%', color: '#22d3ee', size: 500 },
  { bottom: '-10%', left: '30%', color: '#818cf8', size: 400 },
]

const BG_ORBS_LIGHT = [
  { top: '-10%', left: '-5%', color: '#6366f1', size: 500 },
  { top: '50%', right: '-5%', color: '#0891b2', size: 400 },
]

export default function Dashboard({ toggleMode, mode }) {
  const theme = useTheme()
  const isDark = mode === 'dark'
  const { enqueueSnackbar } = useSnackbar()

  const [employees, setEmployees] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [statsLoading, setStatsLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')

  const [formOpen, setFormOpen] = useState(false)
  const [editEmployee, setEditEmployee] = useState(null)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getEmployees()
      setEmployees(Array.isArray(data) ? data : data?.employees ?? [])
    } catch (err) {
      enqueueSnackbar(`Failed to load employees: ${err.message}`, { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }, [enqueueSnackbar])

  const fetchStats = useCallback(async () => {
    setStatsLoading(true)
    try {
      const data = await getStats()
      setStats(data)
    } catch {
      // Stats are non-critical
    } finally {
      setStatsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAll()
    fetchStats()
  }, [fetchAll, fetchStats])

  const handleSearch = useCallback(
    async (skill) => {
      if (!skill.trim()) {
        setActiveFilter('all')
        return fetchAll()
      }
      setActiveFilter('skill')
      setLoading(true)
      try {
        const data = await getEmployees({ skill })
        setEmployees(Array.isArray(data) ? data : data?.employees ?? [])
      } catch (err) {
        enqueueSnackbar(`Search failed: ${err.message}`, { variant: 'error' })
      } finally {
        setLoading(false)
      }
    },
    [fetchAll, enqueueSnackbar]
  )

  const handleHighPerformers = useCallback(async () => {
    if (activeFilter === 'high-performers') {
      setActiveFilter('all')
      return fetchAll()
    }
    setActiveFilter('high-performers')
    setLoading(true)
    try {
      const data = await getHighPerformers()
      setEmployees(Array.isArray(data) ? data : data?.employees ?? [])
    } catch (err) {
      enqueueSnackbar(`Failed to load high performers: ${err.message}`, { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }, [activeFilter, fetchAll, enqueueSnackbar])

  const handleReset = useCallback(() => {
    setActiveFilter('all')
    fetchAll()
    fetchStats()
  }, [fetchAll, fetchStats])

  const handleFormSubmit = useCallback(
    async (data) => {
      try {
        if (editEmployee) {
          await updateEmployee(editEmployee.id, data)
          enqueueSnackbar('Employee updated successfully!', { variant: 'success' })
        } else {
          await createEmployee(data)
          enqueueSnackbar('Employee added successfully!', { variant: 'success' })
        }
        fetchAll()
        fetchStats()
      } catch (err) {
        enqueueSnackbar(`Error: ${err.message}`, { variant: 'error' })
        throw err
      }
    },
    [editEmployee, fetchAll, fetchStats, enqueueSnackbar]
  )

  const handleEdit = useCallback((employee) => {
    setEditEmployee(employee)
    setFormOpen(true)
  }, [])

  const handleDelete = useCallback(
    async (id) => {
      try {
        await deleteEmployee(id)
        enqueueSnackbar('Employee removed.', { variant: 'info' })
        fetchAll()
        fetchStats()
      } catch (err) {
        enqueueSnackbar(`Failed to delete: ${err.message}`, { variant: 'error' })
      }
    },
    [fetchAll, fetchStats, enqueueSnackbar]
  )

  const handleAddEmployee = () => {
    setEditEmployee(null)
    setFormOpen(true)
  }

  const orbs = isDark ? BG_ORBS_DARK : BG_ORBS_LIGHT

  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        background: isDark ? '#050914' : '#f0f4ff',
        overflowX: 'hidden',
      }}
    >
      {/* Background ambient orbs */}
      {orbs.map((orb, i) => (
        <Box
          key={i}
          sx={{
            position: 'fixed',
            width: orb.size,
            height: orb.size,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(orb.color, 0.12)}, transparent 65%)`,
            top: orb.top,
            left: orb.left,
            right: orb.right,
            bottom: orb.bottom,
            pointerEvents: 'none',
            zIndex: 0,
            filter: 'blur(2px)',
          }}
        />
      ))}

      {/* Subtle dot grid */}
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          backgroundImage: isDark
            ? 'radial-gradient(circle, rgba(148,163,184,0.04) 1px, transparent 1px)'
            : 'radial-gradient(circle, rgba(99,102,241,0.06) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Navbar */}
      <Box sx={{ position: 'relative', zIndex: 10 }}>
        <Navbar toggleMode={toggleMode} mode={mode} />
      </Box>

      {/* Main Content */}
      <Container
        maxWidth="xl"
        sx={{ px: { xs: 2, sm: 3, md: 4 }, py: 4, position: 'relative', zIndex: 1 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Page Header */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '1.6rem', md: '2.1rem' },
                background: isDark
                  ? `linear-gradient(135deg, #f1f5f9 30%, ${alpha(theme.palette.primary.light, 0.85)})`
                  : `linear-gradient(135deg, #0f172a, ${theme.palette.primary.dark})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 0.5,
              }}
            >
              Employee Dashboard
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '0.9rem',
              }}
            >
              Track performance, skills, and training across your team.
            </Typography>
          </Box>

          {/* Stats Row */}
          <Box sx={{ mb: 4 }}>
            <StatsCards stats={stats} loading={statsLoading} />
          </Box>

          {/* FilterBar */}
          <Box sx={{ mb: 3.5 }}>
            <FilterBar
              onSearch={handleSearch}
              onHighPerformers={handleHighPerformers}
              onReset={handleReset}
              onAddEmployee={handleAddEmployee}
              activeFilter={activeFilter}
            />
          </Box>

          {/* Employee Grid */}
          {loading ? (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                  lg: 'repeat(4, 1fr)',
                },
                gap: 2.5,
              }}
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton
                  key={i}
                  variant="rectangular"
                  height={200}
                  sx={{
                    borderRadius: '20px',
                    bgcolor: isDark
                      ? alpha(theme.palette.primary.main, 0.06)
                      : alpha(theme.palette.primary.main, 0.04),
                  }}
                />
              ))}
            </Box>
          ) : employees.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  py: 10,
                  gap: 2,
                  borderRadius: '24px',
                  background: isDark
                    ? alpha(theme.palette.primary.main, 0.03)
                    : alpha(theme.palette.primary.main, 0.02),
                  border: `2px dashed ${theme.palette.divider}`,
                }}
              >
                <Box
                  sx={{
                    width: 72,
                    height: 72,
                    borderRadius: '20px',
                    background: alpha(theme.palette.primary.main, 0.08),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <InboxRounded sx={{ fontSize: 36, color: alpha(theme.palette.primary.main, 0.4) }} />
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                    No employees found
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      fontFamily: '"DM Sans", sans-serif',
                    }}
                  >
                    {activeFilter !== 'all'
                      ? 'Try adjusting your filters or reset to see all.'
                      : 'Get started by adding your first team member.'}
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          ) : (
            <motion.div layout>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                    lg: 'repeat(4, 1fr)',
                  },
                  gap: 2.5,
                }}
              >
                <AnimatePresence mode="popLayout">
                  {employees.map((emp) => (
                    <EmployeeCard
                      key={emp.id}
                      employee={emp}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
                </AnimatePresence>
              </Box>
            </motion.div>
          )}
        </motion.div>
      </Container>

      {/* Form Dialog */}
      <EmployeeForm
        open={formOpen}
        onClose={() => {
          setFormOpen(false)
          setEditEmployee(null)
        }}
        onSubmit={handleFormSubmit}
        editData={editEmployee}
      />
    </Box>
  )
}
