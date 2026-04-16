import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = {
  dark: {
    bg: "#080d1a",
    surface: "rgba(15,23,42,0.85)",
    card: "rgba(17,25,50,0.7)",
    cardBorder: "rgba(99,102,241,0.18)",
    cardHover: "rgba(99,102,241,0.28)",
    input: "rgba(15,23,42,0.9)",
    inputBorder: "rgba(99,102,241,0.3)",
    text: "#e2e8f0",
    muted: "#94a3b8",
    accent1: "#818cf8",
    accent2: "#22d3ee",
    accentGrad: "linear-gradient(135deg, #818cf8 0%, #22d3ee 100%)",
    accentGradBtn: "linear-gradient(135deg, #6366f1 0%, #0ea5e9 100%)",
    starFilled: "#fbbf24",
    starEmpty: "rgba(148,163,184,0.25)",
    badge: "rgba(99,102,241,0.18)",
    badgeText: "#a5b4fc",
    success: "rgba(16,185,129,0.15)",
    successText: "#34d399",
    danger: "rgba(239,68,68,0.15)",
    dangerText: "#f87171",
    navBg: "rgba(8,13,26,0.9)",
  },
  light: {
    bg: "#f1f5f9",
    surface: "rgba(255,255,255,0.9)",
    card: "rgba(255,255,255,0.75)",
    cardBorder: "rgba(99,102,241,0.2)",
    cardHover: "rgba(99,102,241,0.35)",
    input: "rgba(255,255,255,0.9)",
    inputBorder: "rgba(99,102,241,0.35)",
    text: "#0f172a",
    muted: "#64748b",
    accent1: "#6366f1",
    accent2: "#0ea5e9",
    accentGrad: "linear-gradient(135deg, #6366f1 0%, #0ea5e9 100%)",
    accentGradBtn: "linear-gradient(135deg, #6366f1 0%, #0ea5e9 100%)",
    starFilled: "#f59e0b",
    starEmpty: "rgba(100,116,139,0.2)",
    badge: "rgba(99,102,241,0.1)",
    badgeText: "#4f46e5",
    success: "rgba(16,185,129,0.1)",
    successText: "#059669",
    danger: "rgba(239,68,68,0.1)",
    dangerText: "#dc2626",
    navBg: "rgba(255,255,255,0.95)",
  },
};

const StarRating = ({ rating, theme }) => {
  const c = COLORS[theme];
  return (
    <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill={s <= rating ? c.starFilled : c.starEmpty}>
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
      <span style={{ fontSize: 12, color: c.muted, marginLeft: 4 }}>{rating}/5</span>
    </div>
  );
};

const glassStyle = (c) => ({
  background: c.card,
  border: `1px solid ${c.cardBorder}`,
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  borderRadius: 16,
});

const inputStyle = (c) => ({
  width: "100%",
  padding: "10px 14px",
  borderRadius: 10,
  border: `1px solid ${c.inputBorder}`,
  background: c.input,
  color: c.text,
  fontSize: 14,
  outline: "none",
  fontFamily: "'Sora', sans-serif",
  transition: "border-color 0.2s, box-shadow 0.2s",
  boxSizing: "border-box",
});

const btnBase = {
  border: "none",
  cursor: "pointer",
  fontFamily: "'Sora', sans-serif",
  fontWeight: 600,
  fontSize: 13,
  borderRadius: 10,
  padding: "10px 18px",
  transition: "all 0.2s",
  display: "flex",
  alignItems: "center",
  gap: 6,
};

const EMPTY_FORM = { name: "", role: "", skill: "", performance_rating: "", training_completed: "" };

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [skillFilter, setSkillFilter] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const c = COLORS[theme];

  const fetchEmployees = async (url = "http://127.0.0.1:8000/employees") => {
    setLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      setEmployees(Array.isArray(data) ? data : []);
    } catch {
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEmployees(); }, []);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = true;
    if (!form.role.trim()) errs.role = true;
    if (!form.skill.trim()) errs.skill = true;
    const r = Number(form.performance_rating);
    if (!form.performance_rating || r < 1 || r > 5) errs.performance_rating = true;
    if (!form.training_completed.trim()) errs.training_completed = true;
    return errs;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length) { setFormErrors(errs); return; }
    setFormErrors({});
    setSubmitting(true);
    try {
      await fetch("http://127.0.0.1:8000/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, performance_rating: Number(form.performance_rating) }),
      });
      setForm(EMPTY_FORM);
      fetchEmployees();
    } catch {
      alert("Failed to add employee. Is the backend running?");
    } finally {
      setSubmitting(false);
    }
  };

  const handleFilter = () => {
    const url = skillFilter.trim()
      ? `http://127.0.0.1:8000/employees?skill=${encodeURIComponent(skillFilter)}`
      : "http://127.0.0.1:8000/employees";
    fetchEmployees(url);
  };

  const handleHighPerformers = () => fetchEmployees("http://127.0.0.1:8000/employees/high-performers");
  const handleReset = () => { setSkillFilter(""); fetchEmployees(); };

  const containerStyle = {
    minHeight: "100vh",
    background: c.bg,
    fontFamily: "'Sora', sans-serif",
    color: c.text,
    transition: "background 0.4s, color 0.4s",
    padding: "0 0 60px",
  };

  const navStyle = {
    position: "sticky",
    top: 0,
    zIndex: 100,
    background: c.navBg,
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderBottom: `1px solid ${c.cardBorder}`,
    padding: "0 32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 64,
  };

  const contentStyle = {
    maxWidth: "100%",
    margin: "0",
    padding: "36px 24px 0",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { margin: 0; }
        input::placeholder, textarea::placeholder { color: ${c.muted}; opacity: 0.7; }
        input:focus { border-color: ${c.accent1} !important; box-shadow: 0 0 0 3px ${c.accent1}22 !important; }
        select:focus { border-color: ${c.accent1} !important; box-shadow: 0 0 0 3px ${c.accent1}22 !important; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${c.accent1}55; border-radius: 4px; }
      `}</style>

      <div style={containerStyle}>
        {/* Navbar */}
        <nav style={navStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 9,
              background: c.accentGrad,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, letterSpacing: "-0.02em" }}>Employee Dashboard</div>
              <div style={{
                height: 2, borderRadius: 2, marginTop: 2,
                background: c.accentGrad,
                width: "100%",
              }} />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}
            style={{
              ...btnBase,
              background: c.badge,
              color: c.accent1,
              border: `1px solid ${c.cardBorder}`,
              padding: "8px 14px",
              fontSize: 12,
            }}
          >
            {theme === "dark" ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </motion.button>
        </nav>

        <div style={contentStyle}>
          {/* Page title */}
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <span style={{
                fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
                color: c.accent1, background: c.badge, padding: "3px 10px", borderRadius: 20,
              }}>Performance Hub</span>
            </div>
            <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15 }}>
              Team Overview
              <span style={{ backgroundImage: c.accentGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>.</span>
            </h1>
            <p style={{ color: c.muted, marginTop: 6, fontSize: 14 }}>Track, manage and review employee performance in real time.</p>
          </motion.div>

          {/* Top grid: form + filter */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>

            {/* Add Employee Form */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ ...glassStyle(c), padding: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: c.accentGrad, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                </div>
                <h2 style={{ fontSize: 15, fontWeight: 700 }}>Add Employee</h2>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  { key: "name", placeholder: "Full name", label: "Name" },
                  { key: "role", placeholder: "e.g. Engineer", label: "Role" },
                  { key: "skill", placeholder: "e.g. Python", label: "Skill" },
                  { key: "performance_rating", placeholder: "1 – 5", label: "Rating" },
                ].map(({ key, placeholder, label }) => (
                  <div key={key}>
                    <label style={{ fontSize: 11, color: c.muted, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 5 }}>{label}</label>
                    <input
                      value={form[key]}
                      onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                      placeholder={placeholder}
                      type={key === "performance_rating" ? "number" : "text"}
                      min={key === "performance_rating" ? 1 : undefined}
                      max={key === "performance_rating" ? 5 : undefined}
                      style={{
                        ...inputStyle(c),
                        borderColor: formErrors[key] ? "#f87171" : c.inputBorder,
                        boxShadow: formErrors[key] ? "0 0 0 3px rgba(248,113,113,0.15)" : undefined,
                      }}
                    />
                  </div>
                ))}
                <div style={{ gridColumn: "1/-1" }}>
                  <label style={{ fontSize: 11, color: c.muted, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 5 }}>Training Completed</label>
                  <select
                    value={form.training_completed}
                    onChange={e => setForm(f => ({ ...f, training_completed: e.target.value }))}
                    style={{
                      ...inputStyle(c),
                      borderColor: formErrors.training_completed ? "#f87171" : c.inputBorder,
                      appearance: "none",
                      cursor: "pointer",
                    }}
                  >
                    <option value="" disabled>Select status…</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="In Progress">In Progress</option>
                  </select>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: `0 0 20px ${c.accent1}55` }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSubmit}
                disabled={submitting}
                style={{
                  ...btnBase,
                  width: "100%",
                  marginTop: 16,
                  justifyContent: "center",
                  background: c.accentGradBtn,
                  color: "#fff",
                  fontSize: 14,
                  padding: "12px",
                  opacity: submitting ? 0.7 : 1,
                  boxShadow: `0 4px 20px ${c.accent1}33`,
                }}
              >
                {submitting ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "spin 0.8s linear infinite" }}>
                      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                    </svg>
                    Adding…
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    Add Employee
                  </>
                )}
              </motion.button>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </motion.div>

            {/* Filter + Stats Panel */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Filter card */}
              <div style={{ ...glassStyle(c), padding: 24, flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: `linear-gradient(135deg, #0ea5e9, #818cf8)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                    </svg>
                  </div>
                  <h2 style={{ fontSize: 15, fontWeight: 700 }}>Filter Employees</h2>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 11, color: c.muted, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 5 }}>Filter by Skill</label>
                  <input
                    value={skillFilter}
                    onChange={e => setSkillFilter(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleFilter()}
                    placeholder="e.g. Python, React…"
                    style={inputStyle(c)}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={handleFilter}
                    style={{ ...btnBase, background: c.accentGradBtn, color: "#fff", justifyContent: "center", boxShadow: `0 4px 16px ${c.accent1}33` }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                    Filter
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={handleReset}
                    style={{ ...btnBase, background: c.badge, color: c.accent1, border: `1px solid ${c.cardBorder}`, justifyContent: "center" }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>
                    </svg>
                    Reset
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.03, boxShadow: "0 4px 20px rgba(251,191,36,0.35)" }} whileTap={{ scale: 0.97 }}
                    onClick={handleHighPerformers}
                    style={{ ...btnBase, gridColumn: "1/-1", background: "linear-gradient(135deg, #f59e0b, #fbbf24)", color: "#000", justifyContent: "center", fontWeight: 700 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                    </svg>
                    High Performers
                  </motion.button>
                </div>
              </div>

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  { label: "Total", value: employees.length, grad: c.accentGrad },
                  { label: "High Performers", value: employees.filter(e => e.performance_rating >= 4).length, grad: "linear-gradient(135deg, #f59e0b, #fbbf24)" },
                  { label: "Avg Rating", value: employees.length ? (employees.reduce((a, e) => a + (e.performance_rating || 0), 0) / employees.length).toFixed(1) : "—", grad: "linear-gradient(135deg, #34d399, #22d3ee)" },
                  { label: "Trained", value: employees.filter(e => e.training_completed === "Yes").length, grad: "linear-gradient(135deg, #818cf8, #c084fc)" },
                ].map(({ label, value, grad }) => (
                  <motion.div key={label} whileHover={{ scale: 1.03 }}
                    style={{ ...glassStyle(c), padding: "14px 16px" }}>
                    <div style={{ fontSize: 11, color: c.muted, fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 6 }}>{label}</div>
                    <div style={{ fontSize: 26, fontWeight: 800, backgroundImage: grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{value}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Employee Grid */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
              <h2 style={{ fontSize: 17, fontWeight: 700 }}>
                Employees
                <span style={{ marginLeft: 10, fontSize: 12, fontWeight: 600, color: c.accent1, background: c.badge, padding: "2px 10px", borderRadius: 20 }}>
                  {employees.length}
                </span>
              </h2>
              {loading && (
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: c.muted }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c.accent1} strokeWidth="2.5" strokeLinecap="round" style={{ animation: "spin 0.8s linear infinite" }}>
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                  </svg>
                  Loading…
                </div>
              )}
            </div>

            <AnimatePresence mode="wait">
              {!loading && employees.length === 0 ? (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ ...glassStyle(c), padding: "48px 24px", textAlign: "center" }}>
                  <div style={{ fontSize: 40, marginBottom: 12, opacity: 0.4 }}>👥</div>
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>No employees found</div>
                  <div style={{ fontSize: 13, color: c.muted }}>Try resetting the filter or adding a new employee above.</div>
                </motion.div>
              ) : (
                <motion.div key="grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
                  {employees.map((emp, i) => (
                    <motion.div key={emp.id ?? i}
                      initial={{ opacity: 0, y: 24, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35, delay: i * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                      whileHover={{ y: -4, boxShadow: `0 16px 40px ${c.accent1}22` }}
                      style={{
                        ...glassStyle(c),
                        padding: 20,
                        cursor: "default",
                        transition: "border-color 0.2s",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      {/* Card top accent */}
                      <div style={{
                        position: "absolute", top: 0, left: 0, right: 0, height: 2,
                        background: c.accentGrad,
                        borderRadius: "16px 16px 0 0",
                      }} />

                      {/* Avatar + name */}
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                        <div style={{
                          width: 42, height: 42, borderRadius: 12,
                          background: c.accentGrad,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 15, fontWeight: 800, color: "#fff", flexShrink: 0,
                          letterSpacing: "-0.01em",
                        }}>
                          {(emp.name || "?").split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase()}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontWeight: 700, fontSize: 14, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{emp.name}</div>
                          <div style={{ fontSize: 12, color: c.muted, marginTop: 2 }}>{emp.role}</div>
                        </div>
                      </div>

                      {/* Divider */}
                      <div style={{ height: 1, background: c.cardBorder, marginBottom: 14 }} />

                      {/* Meta */}
                      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <span style={{ fontSize: 11, color: c.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em" }}>Skill</span>
                          <span style={{
                            fontSize: 12, fontWeight: 600,
                            background: c.badge, color: c.badgeText,
                            padding: "2px 10px", borderRadius: 20,
                          }}>{emp.skill}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <span style={{ fontSize: 11, color: c.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em" }}>Training</span>
                          <span style={{
                            fontSize: 12, fontWeight: 600, borderRadius: 20, padding: "2px 10px",
                            background: emp.training_completed === "Yes" ? c.success : emp.training_completed === "In Progress" ? "rgba(251,191,36,0.15)" : c.danger,
                            color: emp.training_completed === "Yes" ? c.successText : emp.training_completed === "In Progress" ? "#fbbf24" : c.dangerText,
                          }}>
                            {emp.training_completed}
                          </span>
                        </div>
                      </div>

                      <StarRating rating={emp.performance_rating} theme={theme} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}

// (FULL FILE — CLEAN + FIXED + STATS CONNECTED)

// import { useState, useEffect } from "react";

// const BASE_URL = "http://127.0.0.1:8000";

// export default function App() {
//   const emptyForm = {
//     name: "",
//     role: "",
//     skill: "",
//     performance_rating: "",
//     training_completed: "",
//   };

//   const [employees, setEmployees] = useState([]);
//   const [stats, setStats] = useState({
//     total: 0,
//     high_performers: 0,
//     average_rating: 0,
//     trained: 0,
//   });

//   const [form, setForm] = useState(emptyForm);
//   const [editingId, setEditingId] = useState(null);
//   const [skillFilter, setSkillFilter] = useState("");

//   // FETCH
//   const fetchEmployees = async (url = `${BASE_URL}/employees`) => {
//     const res = await fetch(url);
//     const data = await res.json();
//     setEmployees(data);
//   };

//   const fetchStats = async () => {
//     const res = await fetch(`${BASE_URL}/employees/stats`);
//     const data = await res.json();
//     setStats(data);
//   };

//   useEffect(() => {
//     fetchEmployees();
//     fetchStats();
//   }, []);

//   // ADD
//   const addEmployee = async () => {
//     await fetch(`${BASE_URL}/employees`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         ...form,
//         performance_rating: Number(form.performance_rating),
//       }),
//     });

//     setForm(emptyForm);
//     fetchEmployees();
//     fetchStats();
//   };

//   // DELETE
//   const deleteEmployee = async (id) => {
//     await fetch(`${BASE_URL}/employees/${id}`, {
//       method: "DELETE",
//     });

//     fetchEmployees();
//     fetchStats();
//   };

//   // EDIT
//   const handleEdit = (emp) => {
//     setForm(emp);
//     setEditingId(emp.id);
//   };

//   const updateEmployee = async () => {
//     await fetch(`${BASE_URL}/employees/${editingId}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         ...form,
//         performance_rating: Number(form.performance_rating),
//       }),
//     });

//     setEditingId(null);
//     setForm(emptyForm);

//     fetchEmployees();
//     fetchStats();
//   };

//   // FILTERS
//   const handleFilter = () => {
//     const url = skillFilter
//       ? `${BASE_URL}/employees?skill=${skillFilter}`
//       : `${BASE_URL}/employees`;

//     fetchEmployees(url);
//   };

//   const handleHighPerformers = () => {
//     fetchEmployees(`${BASE_URL}/employees/high-performers`);
//   };

//   const handleReset = () => {
//     setSkillFilter("");
//     fetchEmployees();
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         width: "100%",
//         background: "#0b0f1a",
//         color: "white",
//         padding: "30px",
//         fontFamily: "Inter, sans-serif",
//       }}
//     >
//       {/* HEADER */}
//       <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>
//         Employee Dashboard
//       </h1>

//       {/* GRID */}
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//           gap: "20px",
//         }}
//       >
//         {/* FORM */}
//         <div style={card}>
//           <h2>{editingId ? "Edit Employee" : "Add Employee"}</h2>

//           <input
//             style={input}
//             placeholder="Name"
//             value={form.name}
//             onChange={(e) => setForm({ ...form, name: e.target.value })}
//           />
//           <input
//             style={input}
//             placeholder="Role"
//             value={form.role}
//             onChange={(e) => setForm({ ...form, role: e.target.value })}
//           />
//           <input
//             style={input}
//             placeholder="Skill"
//             value={form.skill}
//             onChange={(e) => setForm({ ...form, skill: e.target.value })}
//           />
//           <input
//             style={input}
//             placeholder="Rating"
//             value={form.performance_rating}
//             onChange={(e) =>
//               setForm({ ...form, performance_rating: e.target.value })
//             }
//           />
//           <input
//             style={input}
//             placeholder="Training"
//             value={form.training_completed}
//             onChange={(e) =>
//               setForm({ ...form, training_completed: e.target.value })
//             }
//           />

//           <button style={buttonPrimary} onClick={editingId ? updateEmployee : addEmployee}>
//             {editingId ? "Update Employee" : "Add Employee"}
//           </button>
//         </div>

//         {/* FILTER + STATS */}
//         <div style={card}>
//           <h2>Filters</h2>

//           <input
//             style={input}
//             placeholder="Filter by Skill"
//             value={skillFilter}
//             onChange={(e) => setSkillFilter(e.target.value)}
//           />

//           <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
//             <button style={button} onClick={handleFilter}>Filter</button>
//             <button style={button} onClick={handleReset}>Reset</button>
//             <button style={buttonHighlight} onClick={handleHighPerformers}>
//               High Performers
//             </button>
//           </div>

//           <hr style={{ margin: "20px 0" }} />

//           <h3>Stats</h3>
//           <p>Total: {stats.total}</p>
//           <p>High Performers: {stats.high_performers}</p>
//           <p>Avg Rating: {stats.average_rating}</p>
//           <p>Trained: {stats.trained}</p>
//         </div>
//       </div>

//       {/* EMPLOYEES */}
//       <div style={{ marginTop: "30px" }}>
//         <h2>Employees</h2>

//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//             gap: "15px",
//           }}
//         >
//           {employees.map((emp) => (
//             <div key={emp.id} style={card}>
//               <h3>{emp.name}</h3>
//               <p>Role: {emp.role}</p>
//               <p>Skill: {emp.skill}</p>
//               <p>Rating: {emp.performance_rating}</p>

//               <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
//                 <button style={button} onClick={() => handleEdit(emp)}>
//                   Edit
//                 </button>
//                 <button style={buttonDanger} onClick={() => deleteEmployee(emp.id)}>
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// // STYLES
// const card = {
//   padding: "20px",
//   borderRadius: "10px",
//   border: "1px solid #222",
//   background: "#111827",
// };

// const input = {
//   width: "100%",
//   padding: "10px",
//   marginBottom: "10px",
//   borderRadius: "6px",
//   border: "1px solid #333",
//   background: "#0b0f1a",
//   color: "white",
// };

// const button = {
//   padding: "8px 14px",
//   background: "#1f2937",
//   border: "none",
//   borderRadius: "6px",
//   color: "white",
//   cursor: "pointer",
// };

// const buttonPrimary = {
//   ...button,
//   background: "#2563eb",
// };

// const buttonDanger = {
//   ...button,
//   background: "#dc2626",
// };

// const buttonHighlight = {
//   ...button,
//   background: "#f59e0b",
// };