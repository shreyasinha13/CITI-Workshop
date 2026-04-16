// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const COLORS = {
//   dark: {
//     bg: "#080d1a",
//     surface: "rgba(15,23,42,0.85)",
//     card: "rgba(17,25,50,0.7)",
//     cardBorder: "rgba(99,102,241,0.18)",
//     cardHover: "rgba(99,102,241,0.28)",
//     input: "rgba(15,23,42,0.9)",
//     inputBorder: "rgba(99,102,241,0.3)",
//     text: "#e2e8f0",
//     muted: "#94a3b8",
//     accent1: "#818cf8",
//     accent2: "#22d3ee",
//     accentGrad: "linear-gradient(135deg, #818cf8 0%, #22d3ee 100%)",
//     accentGradBtn: "linear-gradient(135deg, #6366f1 0%, #0ea5e9 100%)",
//     starFilled: "#fbbf24",
//     starEmpty: "rgba(148,163,184,0.25)",
//     badge: "rgba(99,102,241,0.18)",
//     badgeText: "#a5b4fc",
//     success: "rgba(16,185,129,0.15)",
//     successText: "#34d399",
//     danger: "rgba(239,68,68,0.15)",
//     dangerText: "#f87171",
//     navBg: "rgba(8,13,26,0.9)",
//   },
//   light: {
//     bg: "#f1f5f9",
//     surface: "rgba(255,255,255,0.9)",
//     card: "rgba(255,255,255,0.75)",
//     cardBorder: "rgba(99,102,241,0.2)",
//     cardHover: "rgba(99,102,241,0.35)",
//     input: "rgba(255,255,255,0.9)",
//     inputBorder: "rgba(99,102,241,0.35)",
//     text: "#0f172a",
//     muted: "#64748b",
//     accent1: "#6366f1",
//     accent2: "#0ea5e9",
//     accentGrad: "linear-gradient(135deg, #6366f1 0%, #0ea5e9 100%)",
//     accentGradBtn: "linear-gradient(135deg, #6366f1 0%, #0ea5e9 100%)",
//     starFilled: "#f59e0b",
//     starEmpty: "rgba(100,116,139,0.2)",
//     badge: "rgba(99,102,241,0.1)",
//     badgeText: "#4f46e5",
//     success: "rgba(16,185,129,0.1)",
//     successText: "#059669",
//     danger: "rgba(239,68,68,0.1)",
//     dangerText: "#dc2626",
//     navBg: "rgba(255,255,255,0.95)",
//   },
// };

// const StarRating = ({ rating, theme }) => {
//   const c = COLORS[theme];
//   return (
//     <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
//       {[1, 2, 3, 4, 5].map((s) => (
//         <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill={s <= rating ? c.starFilled : c.starEmpty}>
//           <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
//         </svg>
//       ))}
//       <span style={{ fontSize: 12, color: c.muted, marginLeft: 4 }}>{rating}/5</span>
//     </div>
//   );
// };

// const glassStyle = (c) => ({
//   background: c.card,
//   border: `1px solid ${c.cardBorder}`,
//   backdropFilter: "blur(16px)",
//   WebkitBackdropFilter: "blur(16px)",
//   borderRadius: 16,
// });

// const inputStyle = (c) => ({
//   width: "100%",
//   padding: "10px 14px",
//   borderRadius: 10,
//   border: `1px solid ${c.inputBorder}`,
//   background: c.input,
//   color: c.text,
//   fontSize: 14,
//   outline: "none",
//   fontFamily: "'Sora', sans-serif",
//   transition: "border-color 0.2s, box-shadow 0.2s",
//   boxSizing: "border-box",
// });

// const btnBase = {
//   border: "none",
//   cursor: "pointer",
//   fontFamily: "'Sora', sans-serif",
//   fontWeight: 600,
//   fontSize: 13,
//   borderRadius: 10,
//   padding: "10px 18px",
//   transition: "all 0.2s",
//   display: "flex",
//   alignItems: "center",
//   gap: 6,
// };

// const EMPTY_FORM = { name: "", role: "", skill: "", performance_rating: "", training_completed: "" };

// export default function App() {
//   const [theme, setTheme] = useState("dark");
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [form, setForm] = useState(EMPTY_FORM);
//   const [skillFilter, setSkillFilter] = useState("");
//   const [formErrors, setFormErrors] = useState({});
//   const c = COLORS[theme];

//   const fetchEmployees = async (url = "http://127.0.0.1:8000/employees") => {
//     setLoading(true);
//     try {
//       const res = await fetch(url);
//       const data = await res.json();
//       setEmployees(Array.isArray(data) ? data : []);
//     } catch {
//       setEmployees([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchEmployees(); }, []);

//   const validate = () => {
//     const errs = {};
//     if (!form.name.trim()) errs.name = true;
//     if (!form.role.trim()) errs.role = true;
//     if (!form.skill.trim()) errs.skill = true;
//     const r = Number(form.performance_rating);
//     if (!form.performance_rating || r < 1 || r > 5) errs.performance_rating = true;
//     if (!form.training_completed.trim()) errs.training_completed = true;
//     return errs;
//   };

//   const handleSubmit = async () => {
//     const errs = validate();
//     if (Object.keys(errs).length) { setFormErrors(errs); return; }
//     setFormErrors({});
//     setSubmitting(true);
//     try {
//       await fetch("http://127.0.0.1:8000/employees", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...form, performance_rating: Number(form.performance_rating) }),
//       });
//       setForm(EMPTY_FORM);
//       fetchEmployees();
//     } catch {
//       alert("Failed to add employee. Is the backend running?");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleFilter = () => {
//     const url = skillFilter.trim()
//       ? `http://127.0.0.1:8000/employees?skill=${encodeURIComponent(skillFilter)}`
//       : "http://127.0.0.1:8000/employees";
//     fetchEmployees(url);
//   };

//   const handleHighPerformers = () => fetchEmployees("http://127.0.0.1:8000/employees/high-performers");
//   const handleReset = () => { setSkillFilter(""); fetchEmployees(); };

//   const containerStyle = {
//     minHeight: "100vh",
//     background: c.bg,
//     fontFamily: "'Sora', sans-serif",
//     color: c.text,
//     transition: "background 0.4s, color 0.4s",
//     padding: "0 0 60px",
//   };

//   const navStyle = {
//     position: "sticky",
//     top: 0,
//     zIndex: 100,
//     background: c.navBg,
//     backdropFilter: "blur(20px)",
//     WebkitBackdropFilter: "blur(20px)",
//     borderBottom: `1px solid ${c.cardBorder}`,
//     padding: "0 32px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     height: 64,
//   };

//   const contentStyle = {
//     maxWidth: "100%",
//     margin: "0",
//     padding: "36px 24px 0",
//   };

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');
//         * { box-sizing: border-box; margin: 0; padding: 0; }
//         body { margin: 0; }
//         input::placeholder, textarea::placeholder { color: ${c.muted}; opacity: 0.7; }
//         input:focus { border-color: ${c.accent1} !important; box-shadow: 0 0 0 3px ${c.accent1}22 !important; }
//         select:focus { border-color: ${c.accent1} !important; box-shadow: 0 0 0 3px ${c.accent1}22 !important; }
//         ::-webkit-scrollbar { width: 6px; }
//         ::-webkit-scrollbar-track { background: transparent; }
//         ::-webkit-scrollbar-thumb { background: ${c.accent1}55; border-radius: 4px; }
//       `}</style>

//       <div style={containerStyle}>
//         {/* Navbar */}
//         <nav style={navStyle}>
//           <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//             <div style={{
//               width: 34, height: 34, borderRadius: 9,
//               background: c.accentGrad,
//               display: "flex", alignItems: "center", justifyContent: "center",
//             }}>
//               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round">
//                 <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
//                 <circle cx="9" cy="7" r="4" />
//                 <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
//                 <path d="M16 3.13a4 4 0 0 1 0 7.75" />
//               </svg>
//             </div>
//             <div>
//               <div style={{ fontWeight: 700, fontSize: 16, letterSpacing: "-0.02em" }}>Employee Dashboard</div>
//               <div style={{
//                 height: 2, borderRadius: 2, marginTop: 2,
//                 background: c.accentGrad,
//                 width: "100%",
//               }} />
//             </div>
//           </div>

//           <motion.button
//             whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
//             onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}
//             style={{
//               ...btnBase,
//               background: c.badge,
//               color: c.accent1,
//               border: `1px solid ${c.cardBorder}`,
//               padding: "8px 14px",
//               fontSize: 12,
//             }}
//           >
//             {theme === "dark" ? (
//               <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
//                 <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
//                 <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
//                 <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
//                 <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
//               </svg>
//             ) : (
//               <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
//                 <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
//               </svg>
//             )}
//             {theme === "dark" ? "Light Mode" : "Dark Mode"}
//           </motion.button>
//         </nav>

//         <div style={contentStyle}>
//           {/* Page title */}
//           <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
//             style={{ marginBottom: 32 }}>
//             <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
//               <span style={{
//                 fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
//                 color: c.accent1, background: c.badge, padding: "3px 10px", borderRadius: 20,
//               }}>Performance Hub</span>
//             </div>
//             <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15 }}>
//               Team Overview
//               <span style={{ backgroundImage: c.accentGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>.</span>
//             </h1>
//             <p style={{ color: c.muted, marginTop: 6, fontSize: 14 }}>Track, manage and review employee performance in real time.</p>
//           </motion.div>

//           {/* Top grid: form + filter */}
//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>

//             {/* Add Employee Form */}
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
//               style={{ ...glassStyle(c), padding: 24 }}>
//               <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
//                 <div style={{ width: 30, height: 30, borderRadius: 8, background: c.accentGrad, display: "flex", alignItems: "center", justifyContent: "center" }}>
//                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
//                     <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
//                   </svg>
//                 </div>
//                 <h2 style={{ fontSize: 15, fontWeight: 700 }}>Add Employee</h2>
//               </div>

//               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
//                 {[
//                   { key: "name", placeholder: "Full name", label: "Name" },
//                   { key: "role", placeholder: "e.g. Engineer", label: "Role" },
//                   { key: "skill", placeholder: "e.g. Python", label: "Skill" },
//                   { key: "performance_rating", placeholder: "1 – 5", label: "Rating" },
//                 ].map(({ key, placeholder, label }) => (
//                   <div key={key}>
//                     <label style={{ fontSize: 11, color: c.muted, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 5 }}>{label}</label>
//                     <input
//                       value={form[key]}
//                       onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
//                       placeholder={placeholder}
//                       type={key === "performance_rating" ? "number" : "text"}
//                       min={key === "performance_rating" ? 1 : undefined}
//                       max={key === "performance_rating" ? 5 : undefined}
//                       style={{
//                         ...inputStyle(c),
//                         borderColor: formErrors[key] ? "#f87171" : c.inputBorder,
//                         boxShadow: formErrors[key] ? "0 0 0 3px rgba(248,113,113,0.15)" : undefined,
//                       }}
//                     />
//                   </div>
//                 ))}
//                 <div style={{ gridColumn: "1/-1" }}>
//                   <label style={{ fontSize: 11, color: c.muted, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 5 }}>Training Completed</label>
//                   <select
//                     value={form.training_completed}
//                     onChange={e => setForm(f => ({ ...f, training_completed: e.target.value }))}
//                     style={{
//                       ...inputStyle(c),
//                       borderColor: formErrors.training_completed ? "#f87171" : c.inputBorder,
//                       appearance: "none",
//                       cursor: "pointer",
//                     }}
//                   >
//                     <option value="" disabled>Select status…</option>
//                     <option value="Yes">Yes</option>
//                     <option value="No">No</option>
//                     <option value="In Progress">In Progress</option>
//                   </select>
//                 </div>
//               </div>

//               <motion.button
//                 whileHover={{ scale: 1.02, boxShadow: `0 0 20px ${c.accent1}55` }}
//                 whileTap={{ scale: 0.97 }}
//                 onClick={handleSubmit}
//                 disabled={submitting}
//                 style={{
//                   ...btnBase,
//                   width: "100%",
//                   marginTop: 16,
//                   justifyContent: "center",
//                   background: c.accentGradBtn,
//                   color: "#fff",
//                   fontSize: 14,
//                   padding: "12px",
//                   opacity: submitting ? 0.7 : 1,
//                   boxShadow: `0 4px 20px ${c.accent1}33`,
//                 }}
//               >
//                 {submitting ? (
//                   <>
//                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "spin 0.8s linear infinite" }}>
//                       <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
//                     </svg>
//                     Adding…
//                   </>
//                 ) : (
//                   <>
//                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
//                       <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
//                     </svg>
//                     Add Employee
//                   </>
//                 )}
//               </motion.button>
//               <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
//             </motion.div>

//             {/* Filter + Stats Panel */}
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
//               style={{ display: "flex", flexDirection: "column", gap: 16 }}>

//               {/* Filter card */}
//               <div style={{ ...glassStyle(c), padding: 24, flex: 1 }}>
//                 <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
//                   <div style={{ width: 30, height: 30, borderRadius: 8, background: `linear-gradient(135deg, #0ea5e9, #818cf8)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
//                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
//                       <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
//                     </svg>
//                   </div>
//                   <h2 style={{ fontSize: 15, fontWeight: 700 }}>Filter Employees</h2>
//                 </div>

//                 <div style={{ marginBottom: 14 }}>
//                   <label style={{ fontSize: 11, color: c.muted, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 5 }}>Filter by Skill</label>
//                   <input
//                     value={skillFilter}
//                     onChange={e => setSkillFilter(e.target.value)}
//                     onKeyDown={e => e.key === "Enter" && handleFilter()}
//                     placeholder="e.g. Python, React…"
//                     style={inputStyle(c)}
//                   />
//                 </div>

//                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
//                   <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
//                     onClick={handleFilter}
//                     style={{ ...btnBase, background: c.accentGradBtn, color: "#fff", justifyContent: "center", boxShadow: `0 4px 16px ${c.accent1}33` }}>
//                     <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
//                       <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
//                     </svg>
//                     Filter
//                   </motion.button>
//                   <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
//                     onClick={handleReset}
//                     style={{ ...btnBase, background: c.badge, color: c.accent1, border: `1px solid ${c.cardBorder}`, justifyContent: "center" }}>
//                     <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
//                       <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>
//                     </svg>
//                     Reset
//                   </motion.button>
//                   <motion.button whileHover={{ scale: 1.03, boxShadow: "0 4px 20px rgba(251,191,36,0.35)" }} whileTap={{ scale: 0.97 }}
//                     onClick={handleHighPerformers}
//                     style={{ ...btnBase, gridColumn: "1/-1", background: "linear-gradient(135deg, #f59e0b, #fbbf24)", color: "#000", justifyContent: "center", fontWeight: 700 }}>
//                     <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
//                       <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
//                     </svg>
//                     High Performers
//                   </motion.button>
//                 </div>
//               </div>

//               {/* Stats */}
//               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
//                 {[
//                   { label: "Total", value: employees.length, grad: c.accentGrad },
//                   { label: "High Performers", value: employees.filter(e => e.performance_rating >= 4).length, grad: "linear-gradient(135deg, #f59e0b, #fbbf24)" },
//                   { label: "Avg Rating", value: employees.length ? (employees.reduce((a, e) => a + (e.performance_rating || 0), 0) / employees.length).toFixed(1) : "—", grad: "linear-gradient(135deg, #34d399, #22d3ee)" },
//                   { label: "Trained", value: employees.filter(e => e.training_completed === "Yes").length, grad: "linear-gradient(135deg, #818cf8, #c084fc)" },
//                 ].map(({ label, value, grad }) => (
//                   <motion.div key={label} whileHover={{ scale: 1.03 }}
//                     style={{ ...glassStyle(c), padding: "14px 16px" }}>
//                     <div style={{ fontSize: 11, color: c.muted, fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 6 }}>{label}</div>
//                     <div style={{ fontSize: 26, fontWeight: 800, backgroundImage: grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{value}</div>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>
//           </div>

//           {/* Employee Grid */}
//           <div style={{ marginBottom: 16 }}>
//             <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
//               <h2 style={{ fontSize: 17, fontWeight: 700 }}>
//                 Employees
//                 <span style={{ marginLeft: 10, fontSize: 12, fontWeight: 600, color: c.accent1, background: c.badge, padding: "2px 10px", borderRadius: 20 }}>
//                   {employees.length}
//                 </span>
//               </h2>
//               {loading && (
//                 <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: c.muted }}>
//                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c.accent1} strokeWidth="2.5" strokeLinecap="round" style={{ animation: "spin 0.8s linear infinite" }}>
//                     <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
//                   </svg>
//                   Loading…
//                 </div>
//               )}
//             </div>

//             <AnimatePresence mode="wait">
//               {!loading && employees.length === 0 ? (
//                 <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//                   style={{ ...glassStyle(c), padding: "48px 24px", textAlign: "center" }}>
//                   <div style={{ fontSize: 40, marginBottom: 12, opacity: 0.4 }}>👥</div>
//                   <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>No employees found</div>
//                   <div style={{ fontSize: 13, color: c.muted }}>Try resetting the filter or adding a new employee above.</div>
//                 </motion.div>
//               ) : (
//                 <motion.div key="grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
//                   {employees.map((emp, i) => (
//                     <motion.div key={emp.id ?? i}
//                       initial={{ opacity: 0, y: 24, scale: 0.96 }}
//                       animate={{ opacity: 1, y: 0, scale: 1 }}
//                       exit={{ opacity: 0, scale: 0.95 }}
//                       transition={{ duration: 0.35, delay: i * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
//                       whileHover={{ y: -4, boxShadow: `0 16px 40px ${c.accent1}22` }}
//                       style={{
//                         ...glassStyle(c),
//                         padding: 20,
//                         cursor: "default",
//                         transition: "border-color 0.2s",
//                         position: "relative",
//                         overflow: "hidden",
//                       }}
//                     >
//                       {/* Card top accent */}
//                       <div style={{
//                         position: "absolute", top: 0, left: 0, right: 0, height: 2,
//                         background: c.accentGrad,
//                         borderRadius: "16px 16px 0 0",
//                       }} />

//                       {/* Avatar + name */}
//                       <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
//                         <div style={{
//                           width: 42, height: 42, borderRadius: 12,
//                           background: c.accentGrad,
//                           display: "flex", alignItems: "center", justifyContent: "center",
//                           fontSize: 15, fontWeight: 800, color: "#fff", flexShrink: 0,
//                           letterSpacing: "-0.01em",
//                         }}>
//                           {(emp.name || "?").split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase()}
//                         </div>
//                         <div style={{ minWidth: 0 }}>
//                           <div style={{ fontWeight: 700, fontSize: 14, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{emp.name}</div>
//                           <div style={{ fontSize: 12, color: c.muted, marginTop: 2 }}>{emp.role}</div>
//                         </div>
//                       </div>

//                       {/* Divider */}
//                       <div style={{ height: 1, background: c.cardBorder, marginBottom: 14 }} />

//                       {/* Meta */}
//                       <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
//                         <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//                           <span style={{ fontSize: 11, color: c.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em" }}>Skill</span>
//                           <span style={{
//                             fontSize: 12, fontWeight: 600,
//                             background: c.badge, color: c.badgeText,
//                             padding: "2px 10px", borderRadius: 20,
//                           }}>{emp.skill}</span>
//                         </div>
//                         <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//                           <span style={{ fontSize: 11, color: c.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em" }}>Training</span>
//                           <span style={{
//                             fontSize: 12, fontWeight: 600, borderRadius: 20, padding: "2px 10px",
//                             background: emp.training_completed === "Yes" ? c.success : emp.training_completed === "In Progress" ? "rgba(251,191,36,0.15)" : c.danger,
//                             color: emp.training_completed === "Yes" ? c.successText : emp.training_completed === "In Progress" ? "#fbbf24" : c.dangerText,
//                           }}>
//                             {emp.training_completed}
//                           </span>
//                         </div>
//                       </div>

//                       <StarRating rating={emp.performance_rating} theme={theme} />
//                     </motion.div>
//                   ))}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

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


/**
 * ╔══════════════════════════════════════════════════════════════════╗
 *  EMPLOYEE PERFORMANCE MANAGEMENT SYSTEM — Complete App.jsx
 *
 *  ► PASTE INTO:  src/App.jsx  (replace everything)
 *
 *  ► INSTALL DEPS:
 *      npm install axios framer-motion react-hot-toast react-router-dom
 *
 *  ► ADD TO index.html <head>:
 *      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;600;700&family=Syne:wght@700;800&display=swap" rel="stylesheet">
 *
 *  ► src/index.css can be left empty — all styles injected here.
 *
 *  BACKEND: http://127.0.0.1:8000  (FastAPI + PostgreSQL + JWT)
 * ╚══════════════════════════════════════════════════════════════════╝
 */

import React, {
  useState, useEffect, useCallback, useMemo, useRef, createContext, useContext
} from 'react';
import axios from 'axios';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import {
  BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation, Link
} from 'react-router-dom';

/* ═══════════════════════════════════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════════════════════════════════ */
const T = {
  pink:   '#FFB6C1',
  pinkM:  '#F4849A',
  pinkD:  '#E05070',
  cream:  '#FFF8F5',
  paper:  '#FFF0EB',
  sand:   '#FAE8DF',
  ink:    '#1A0A10',
  inkM:   '#3D1A25',
  inkL:   '#7A4455',
  red:    '#FF2D55',
  yellow: '#FFD60A',
  teal:   '#00C9AD',
  blue:   '#D4E4FF',
  green:  '#C8F5E8',
  purple: '#E8D4FF',
  f1: "'Bebas Neue', sans-serif",
  f2: "'IBM Plex Mono', monospace",
  f3: "'Syne', sans-serif",
};

/* ═══════════════════════════════════════════════════════════════════
   AXIOS INSTANCE + API
═══════════════════════════════════════════════════════════════════ */
const http = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  timeout: 12000,
  headers: { 'Content-Type': 'application/json' },
});

// Attach token on every request
http.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

// Global error handling
http.interceptors.response.use(
  r => r,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('email');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

function parseErr(err) {
  if (err.response?.data?.detail) {
    const d = err.response.data.detail;
    if (Array.isArray(d)) return d.map(e => `${e.loc?.slice(-1)[0]}: ${e.msg}`).join(' | ');
    return String(d);
  }
  if (err.code === 'ECONNABORTED') return 'Request timed out.';
  if (!err.response) return 'Cannot reach server — is backend running on :8000?';
  return err.message || 'Unknown error';
}

function sanitizeEmp(d) {
  return {
    name:               String(d.name  || '').trim(),
    role:               String(d.role  || '').trim(),
    skill:              String(d.skill || '').trim(),
    performance_rating: Math.min(10, Math.max(1, Math.floor(parseInt(d.performance_rating, 10) || 1))),
    training_completed: (d.training_completed === true || d.training_completed === 'Yes') ? 'Yes' : 'No',
  };
}

const api = {
  // Auth
  login:    async (d) => { try { return (await http.post('/login', d)).data; }    catch(e){ throw new Error(parseErr(e)); }},
  register: async (d) => { try { return (await http.post('/register', d)).data; } catch(e){ throw new Error(parseErr(e)); }},

  // Employees
  getEmployees:  async (p={}) => { try { return (await http.get('/employees', { params: p })).data; }        catch(e){ throw new Error(parseErr(e)); }},
  createEmp:     async (d)    => { try { return (await http.post('/employees', sanitizeEmp(d))).data; }       catch(e){ throw new Error(parseErr(e)); }},
  updateEmp:     async (id,d) => { try { return (await http.put(`/employees/${id}`, sanitizeEmp(d))).data; }  catch(e){ throw new Error(parseErr(e)); }},
  deleteEmp:     async (id)   => { try { return (await http.delete(`/employees/${id}`)).data; }               catch(e){ throw new Error(parseErr(e)); }},
  getStats:      async ()     => { try { return (await http.get('/employees/stats')).data; }                   catch(e){ return null; }},
  getHighPerf:   async ()     => { try { return (await http.get('/employees/high-performers')).data; }         catch(e){ throw new Error(parseErr(e)); }},

  // Reviews
  getReviews:      async (empId) => { try { return (await http.get(`/reviews/${empId}`)).data; }    catch(e){ throw new Error(parseErr(e)); }},
  getAllReviews:    async ()      => { try { return (await http.get('/reviews')).data; }             catch(e){ throw new Error(parseErr(e)); }},
  createReview:    async (d)     => { try { return (await http.post('/reviews', d)).data; }         catch(e){ throw new Error(parseErr(e)); }},
  deleteReview:    async (id)    => { try { return (await http.delete(`/reviews/${id}`)).data; }    catch(e){ throw new Error(parseErr(e)); }},

  // Dev Plans
  getPlans:    async (empId) => { try { return (await http.get(`/development-plans/${empId}`)).data; } catch(e){ throw new Error(parseErr(e)); }},
  createPlan:  async (d)     => { try { return (await http.post('/development-plans', d)).data; }      catch(e){ throw new Error(parseErr(e)); }},

  // Competencies
  getComps:    async (empId) => { try { return (await http.get(`/competencies/${empId}`)).data; } catch(e){ throw new Error(parseErr(e)); }},
  createComp:  async (d)     => { try { return (await http.post('/competencies', d)).data; }      catch(e){ throw new Error(parseErr(e)); }},

  // Trainings
  getTrainings:   async (empId) => { try { return (await http.get(`/trainings/${empId}`)).data; } catch(e){ throw new Error(parseErr(e)); }},
  createTraining: async (d)     => { try { return (await http.post('/trainings', d)).data; }      catch(e){ throw new Error(parseErr(e)); }},
};

/* ═══════════════════════════════════════════════════════════════════
   AUTH CONTEXT
═══════════════════════════════════════════════════════════════════ */
const AuthCtx = createContext(null);
function useAuth() { return useContext(AuthCtx); }

function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [role,  setRole]  = useState(() => localStorage.getItem('role') || '');
  const [email, setEmail] = useState(() => localStorage.getItem('email') || '');

  const login = useCallback((data) => {
    localStorage.setItem('token', data.access_token);
    localStorage.setItem('role',  data.role);
    localStorage.setItem('email', data.email || '');
    setToken(data.access_token);
    setRole(data.role);
    setEmail(data.email || '');
  }, []);

  const logout = useCallback(() => {
    localStorage.clear();
    setToken(null); setRole(''); setEmail('');
  }, []);

  const isAdmin = role === 'admin';
  const isAuth  = !!token;

  return (
    <AuthCtx.Provider value={{ token, role, email, isAdmin, isAuth, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ROUTE GUARDS
═══════════════════════════════════════════════════════════════════ */
function Protected({ children }) {
  const { isAuth } = useAuth();
  const loc = useLocation();
  if (!isAuth) return <Navigate to="/login" state={{ from: loc }} replace />;
  return children;
}

function AdminOnly({ children }) {
  const { isAdmin } = useAuth();
  if (!isAdmin) return <AccessDenied />;
  return children;
}

/* ═══════════════════════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════════════════════ */
function useCountUp(target, ms = 900) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (target === null || target === undefined) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / ms, 1);
      setV(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, ms]);
  return v;
}

function useVisible(ref) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return vis;
}

/* ═══════════════════════════════════════════════════════════════════
   SHARED UI PRIMITIVES
═══════════════════════════════════════════════════════════════════ */
function Btn({ children, onClick, bg = T.pink, color = T.ink, shadow = `3px 3px 0 ${T.ink}`, disabled = false, style: extra = {}, type = 'button' }) {
  return (
    <motion.button type={type} onClick={onClick} disabled={disabled}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        padding: '10px 20px', background: bg, color, border: `2.5px solid ${T.ink}`,
        borderRadius: 8, fontFamily: T.f2, fontSize: 12, fontWeight: 700, letterSpacing: 0.5,
        cursor: disabled ? 'not-allowed' : 'pointer', boxShadow: shadow,
        opacity: disabled ? 0.6 : 1, transition: 'box-shadow 0.12s', ...extra }}
      whileHover={!disabled ? { y: -2, boxShadow: `6px 6px 0 ${T.ink}` } : {}}
      whileTap={!disabled ? { scale: 0.97, boxShadow: `2px 2px 0 ${T.ink}` } : {}}
    >{children}</motion.button>
  );
}

function InlineSpinner() {
  return <span style={{ display: 'inline-block', width: 13, height: 13,
    border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff',
    borderRadius: '50%', animation: 'spin 0.7s linear infinite', flexShrink: 0 }} />;
}

function PageLoader() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 80, gap: 24 }}>
      <div style={{ position: 'relative', width: 60, height: 60 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{ position: 'absolute', inset: i * 8,
            border: `2.5px solid ${[T.pink, T.pinkM, T.pinkD][i]}`,
            borderTopColor: T.ink, borderRadius: '50%',
            animation: `spin ${0.9 - i * 0.15}s linear infinite${i % 2 ? ' reverse' : ''}` }} />
        ))}
      </div>
      <p style={{ fontFamily: T.f2, fontSize: 11, color: T.inkL, letterSpacing: 3 }}>LOADING_DATA...</p>
    </div>
  );
}

function AccessDenied() {
  return (
    <div style={{ textAlign: 'center', padding: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <div style={{ fontSize: 60 }}>🔒</div>
      <div style={{ fontFamily: T.f1, fontSize: 32, color: T.ink, letterSpacing: 2 }}>ACCESS_DENIED</div>
      <p style={{ fontFamily: T.f2, fontSize: 12, color: T.inkL }}>// Admin privileges required.</p>
    </div>
  );
}

function EmptyMsg({ msg = 'No data found.' }) {
  return (
    <div style={{ textAlign: 'center', padding: '48px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <div style={{ fontSize: 40 }}>📭</div>
      <p style={{ fontFamily: T.f2, fontSize: 12, color: T.inkL }}>// {msg}</p>
    </div>
  );
}

/* ─── Modal wrapper ─── */
function Modal({ open, onClose, title, subtitle, children, maxWidth = 520 }) {
  if (!open) return null;
  return (
    <AnimatePresence>
      <motion.div
        style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(26,10,16,0.65)',
          backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          style={{ background: T.cream, border: `3px solid ${T.ink}`, borderRadius: 18,
            width: '100%', maxWidth, maxHeight: '92vh', overflowY: 'auto',
            boxShadow: `12px 12px 0 ${T.ink}` }}
          initial={{ opacity: 0, y: 50, rotate: -1 }} animate={{ opacity: 1, y: 0, rotate: 0 }}
          exit={{ opacity: 0, y: 30, scale: 0.96 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '24px 26px 0', marginBottom: 20 }}>
            <div>
              <div style={{ fontFamily: T.f1, fontSize: 28, color: T.ink, letterSpacing: 2, lineHeight: 1 }}>{title}</div>
              {subtitle && <div style={{ fontFamily: T.f2, fontSize: 10, color: T.inkL, marginTop: 4 }}>{subtitle}</div>}
            </div>
            <button onClick={onClose}
              style={{ width: 36, height: 36, borderRadius: 7, background: '#FFE0E0', border: `2px solid ${T.ink}`,
                fontFamily: T.f2, fontSize: 13, fontWeight: 700, color: T.pinkD, cursor: 'pointer',
                boxShadow: `3px 3px 0 ${T.ink}` }}>✕</button>
          </div>
          <div style={{ padding: '0 26px 26px' }}>{children}</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── Field wrapper ─── */
function Field({ label, error, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', fontFamily: T.f2, fontSize: 10, fontWeight: 700,
        color: T.inkL, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 7 }}>
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ fontFamily: T.f2, fontSize: 10, color: T.pinkD, marginTop: 4 }}>{error}</motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputStyle = (hasErr = false) => ({
  width: '100%', height: 44, background: T.paper,
  border: `2px solid ${hasErr ? T.pinkD : T.ink}`, borderRadius: 8,
  padding: '0 14px', fontFamily: T.f2, fontSize: 13, color: T.ink, outline: 'none', letterSpacing: 0.3,
});

const selectStyle = () => ({
  width: '100%', height: 44, background: T.paper,
  border: `2px solid ${T.ink}`, borderRadius: 8,
  padding: '0 14px', fontFamily: T.f2, fontSize: 13, color: T.ink, outline: 'none',
});

/* ─── Confirm Delete dialog ─── */
function ConfirmDel({ open, label, onOk, onCancel, loading }) {
  if (!open) return null;
  return (
    <Modal open={open} onClose={onCancel} title="CONFIRM_DELETE" maxWidth={380}>
      <div style={{ textAlign: 'center', paddingTop: 8 }}>
        <div style={{ fontSize: 44, marginBottom: 12 }}>⚠</div>
        <p style={{ fontFamily: T.f2, fontSize: 12, color: T.inkL, lineHeight: 1.8, marginBottom: 24 }}>
          Delete <strong style={{ fontFamily: T.f3, color: T.ink }}>{label}</strong>?
          <br />// This cannot be undone.
        </p>
        <div style={{ display: 'flex', gap: 10 }}>
          <Btn onClick={onCancel} disabled={loading} bg={T.cream} style={{ flex: 1, height: 42 }}>CANCEL</Btn>
          <motion.button onClick={onOk} disabled={loading}
            style={{ flex: 1, height: 42, borderRadius: 8, background: T.pinkD, border: `2.5px solid ${T.ink}`,
              fontFamily: T.f2, fontSize: 12, fontWeight: 700, color: '#fff',
              cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1,
              boxShadow: `4px 4px 0 ${T.ink}`, display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: 6, transition: 'box-shadow 0.12s' }}
            whileHover={!loading ? { y: -2, boxShadow: `5px 5px 0 ${T.ink}` } : {}}
            whileTap={!loading ? { scale: 0.97 } : {}}>
            {loading ? <><InlineSpinner />DELETING...</> : '✕ DELETE'}
          </motion.button>
        </div>
      </div>
    </Modal>
  );
}

/* ─── Page header ─── */
function PageHeader({ title, subtitle, action }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 16, marginBottom: 28 }}>
      <div>
        <div style={{ fontFamily: T.f2, fontSize: 10, color: T.inkL, letterSpacing: 3, marginBottom: 6 }}>
          // {subtitle}
        </div>
        <h1 style={{ fontFamily: T.f1, fontSize: 'clamp(32px,4vw,52px)', color: T.ink, letterSpacing: 2, lineHeight: 1 }}>
          {title}
        </h1>
      </div>
      {action}
    </motion.div>
  );
}

/* ─── Card ─── */
function Card({ children, style: extra = {}, animate = true }) {
  const base = {
    background: T.paper, border: `2.5px solid ${T.ink}`, borderRadius: 14,
    padding: 20, boxShadow: `5px 5px 0 ${T.ink}`, ...extra,
  };
  if (!animate) return <div style={base}>{children}</div>;
  return (
    <motion.div style={base}
      whileHover={{ y: -4, boxShadow: `8px 8px 0 ${T.ink}` }}
      transition={{ duration: 0.2 }}>
      {children}
    </motion.div>
  );
}

/* ─── Badge ─── */
function Badge({ label, color = T.pink, textColor = T.ink }) {
  return (
    <span style={{ fontFamily: T.f2, fontSize: 9, fontWeight: 700, letterSpacing: 0.5,
      background: color, border: `1.5px solid ${T.ink}`, borderRadius: 5, padding: '3px 9px',
      color: textColor, display: 'inline-block' }}>
      {label}
    </span>
  );
}

/* ─── Table ─── */
function Table({ headers, rows }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} style={{ fontFamily: T.f2, fontSize: 10, fontWeight: 700, color: T.inkL,
                letterSpacing: 1.5, textTransform: 'uppercase', textAlign: 'left',
                padding: '10px 14px', borderBottom: `2px solid ${T.ink}`, whiteSpace: 'nowrap' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <motion.tr key={i}
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              style={{ borderBottom: `1.5px solid rgba(26,10,16,0.1)` }}
              whileHover={{ background: T.sand }}>
              {row.map((cell, j) => (
                <td key={j} style={{ fontFamily: T.f2, fontSize: 12, color: T.ink,
                  padding: '12px 14px', verticalAlign: 'middle' }}>
                  {cell}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   BACKGROUND
═══════════════════════════════════════════════════════════════════ */
function Bg() {
  const blobs = [
    { w: 340, h: 260, top: '3%',  left: '62%', bg: T.pink,   del: 0,   dur: 12, op: 0.45 },
    { w: 220, h: 220, top: '60%', left: '1%',  bg: T.yellow, del: 2,   dur: 15, op: 0.4  },
    { w: 180, h: 180, top: '75%', left: '68%', bg: T.teal,   del: 1,   dur: 14, op: 0.28 },
    { w: 120, h: 120, top: '35%', left: '30%', bg: T.pinkM,  del: 3,   dur: 18, op: 0.2  },
    { w: 90,  h: 90,  top: '18%', left: '18%', bg: T.blue,   del: 1.5, dur: 20, op: 0.28 },
  ];
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none', background: T.cream }}>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.1 }}>
        <defs><pattern id="bg-grid" width="52" height="52" patternUnits="userSpaceOnUse">
          <path d="M52 0L0 0 0 52" fill="none" stroke={T.ink} strokeWidth="1" />
        </pattern></defs>
        <rect width="100%" height="100%" fill="url(#bg-grid)" />
      </svg>
      {blobs.map((b, i) => (
        <motion.div key={i}
          animate={{ y: [0, -28, 0], x: [0, 16, 0], rotate: [0, 6, 0] }}
          transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut', delay: b.del }}
          style={{ position: 'absolute', top: b.top, left: b.left, width: b.w, height: b.h,
            opacity: b.op, background: b.bg, filter: 'blur(1.5px)',
            border: `2px solid ${T.ink}`,
            borderRadius: '42% 58% 52% 48% / 48% 42% 58% 52%' }} />
      ))}
      <div style={{ position: 'absolute', top: '8%', left: '5%', opacity: 0.18 }}><Cube s={68} /></div>
      <div style={{ position: 'absolute', top: '63%', right: '5%', opacity: 0.14 }}><Cube s={48} /></div>
    </div>
  );
}

function Cube({ s }) {
  const h = s * 0.5, q = h * 0.5;
  return (
    <svg width={s * 1.5} height={s * 1.5} viewBox={`0 0 ${s * 1.5} ${s * 1.5}`}>
      <polygon points={`${q},${h} ${q+s},${h} ${q+s},${h+s} ${q},${h+s}`} fill={T.pink} stroke={T.ink} strokeWidth="2.5" />
      <polygon points={`${q},${h} ${q+s},${h} ${q+s+q},${q} ${q*1.5},${q}`} fill={T.cream} stroke={T.ink} strokeWidth="2.5" />
      <polygon points={`${q+s},${h} ${q+s+q},${q} ${q+s+q},${q+s} ${q+s},${h+s}`} fill={T.pinkM} stroke={T.ink} strokeWidth="2.5" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SIDEBAR
═══════════════════════════════════════════════════════════════════ */
const NAV_ITEMS = [
  { path: '/dashboard',    label: 'DASHBOARD',     icon: '📊' },
  { path: '/employees',    label: 'EMPLOYEES',     icon: '👥' },
  { path: '/reviews',      label: 'REVIEWS',       icon: '⭐' },
  { path: '/plans',        label: 'DEV_PLANS',     icon: '🗺' },
  { path: '/competencies', label: 'COMPETENCIES',  icon: '🧠' },
  { path: '/trainings',    label: 'TRAININGS',     icon: '🎓' },
];

function Sidebar({ mobileOpen, onClose }) {
  const { logout, email, role, isAdmin } = useAuth();
  const loc = useLocation();
  const nav = useNavigate();

  const handleLogout = () => { logout(); nav('/login'); };

  const content = (
    <div style={{ width: 240, height: '100%', background: T.ink, borderRight: `3px solid ${T.ink}`,
      display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
      {/* Logo */}
      <div style={{ padding: '20px 20px 16px', borderBottom: `2px solid rgba(255,182,193,0.2)` }}>
        <div style={{ fontFamily: T.f1, fontSize: 26, letterSpacing: 3, color: T.pink, lineHeight: 1 }}>
          PULSE<span style={{ color: T.pinkD }}>HR</span>
        </div>
        <div style={{ fontFamily: T.f2, fontSize: 9, color: 'rgba(255,182,193,0.5)', letterSpacing: 1, marginTop: 3 }}>
          // PERFORMANCE_SYSTEM
        </div>
      </div>

      {/* User info */}
      <div style={{ padding: '14px 20px', borderBottom: `2px solid rgba(255,182,193,0.1)` }}>
        <div style={{ fontFamily: T.f2, fontSize: 10, color: 'rgba(255,182,193,0.5)', letterSpacing: 1 }}>LOGGED_IN_AS</div>
        <div style={{ fontFamily: T.f2, fontSize: 11, color: T.pink, marginTop: 3, wordBreak: 'break-all' }}>{email || 'user'}</div>
        <div style={{ marginTop: 6 }}>
          <Badge label={isAdmin ? 'ADMIN' : 'EMPLOYEE'} color={isAdmin ? T.red : T.teal} textColor="#fff" />
        </div>
      </div>

      {/* Nav items */}
      <nav style={{ flex: 1, padding: '10px 12px', overflowY: 'auto' }}>
        {NAV_ITEMS.map(item => {
          const active = loc.pathname === item.path || loc.pathname.startsWith(item.path + '/');
          return (
            <Link key={item.path} to={item.path} onClick={onClose}
              style={{ textDecoration: 'none', display: 'block', marginBottom: 4 }}>
              <motion.div
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
                  borderRadius: 8, background: active ? T.pink : 'transparent',
                  border: active ? `2px solid ${T.pinkD}` : '2px solid transparent',
                  fontFamily: T.f2, fontSize: 11, fontWeight: active ? 700 : 400,
                  color: active ? T.ink : 'rgba(255,182,193,0.7)',
                  letterSpacing: active ? 0.5 : 0.3, cursor: 'pointer',
                  transition: 'all 0.15s' }}
                whileHover={{ background: active ? T.pink : 'rgba(255,182,193,0.12)', color: active ? T.ink : T.pink }}
              >
                <span style={{ fontSize: 15 }}>{item.icon}</span>
                {item.label}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding: '14px 12px', borderTop: `2px solid rgba(255,182,193,0.15)` }}>
        <motion.button onClick={handleLogout}
          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
            borderRadius: 8, background: 'rgba(224,80,112,0.15)', border: `2px solid ${T.pinkD}`,
            fontFamily: T.f2, fontSize: 11, fontWeight: 700, color: T.pinkM,
            cursor: 'pointer', letterSpacing: 0.5 }}
          whileHover={{ background: 'rgba(224,80,112,0.28)', y: -1 }}
          whileTap={{ scale: 0.97 }}>
          <span>🚪</span> LOGOUT
        </motion.button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <div style={{ display: 'none' }} className="sidebar-desktop">{content}</div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'fixed', inset: 0, zIndex: 150, background: 'rgba(26,10,16,0.7)', backdropFilter: 'blur(4px)' }}
              onClick={onClose} />
            <motion.div initial={{ x: -240 }} animate={{ x: 0 }} exit={{ x: -240 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 160, width: 240 }}>
              {content}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   TOPBAR
═══════════════════════════════════════════════════════════════════ */
function Topbar({ onMenuClick }) {
  const { scrollY } = useScroll();
  const shadow = useTransform(scrollY, [0, 60], [`0 0 0 0 transparent`, `0 3px 0 0 ${T.ink}`]);
  const loc = useLocation();
  const nav = NAV_ITEMS.find(n => loc.pathname.startsWith(n.path));

  return (
    <motion.div style={{ position: 'sticky', top: 0, zIndex: 90, background: T.paper,
      borderBottom: `3px solid ${T.ink}`, boxShadow: shadow, height: 62,
      display: 'flex', alignItems: 'center', gap: 16, padding: '0 24px' }}>
      {/* Hamburger */}
      <motion.button onClick={onMenuClick}
        style={{ width: 38, height: 38, borderRadius: 7, background: T.pink,
          border: `2px solid ${T.ink}`, fontFamily: T.f2, fontSize: 16, cursor: 'pointer',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
          boxShadow: `3px 3px 0 ${T.ink}`, flexShrink: 0 }}
        whileHover={{ y: -1, boxShadow: `4px 4px 0 ${T.ink}` }}
        whileTap={{ scale: 0.95 }}>
        {[0,1,2].map(i => <span key={i} style={{ width: 14, height: 2, background: T.ink, borderRadius: 1, display: 'block' }} />)}
      </motion.button>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: T.f1, fontSize: 22, color: T.ink, letterSpacing: 2, lineHeight: 1 }}>
          {nav?.label || 'PULSEHR'}
        </div>
        <div style={{ fontFamily: T.f2, fontSize: 9, color: T.inkL, letterSpacing: 1 }}>// PERFORMANCE_DASHBOARD</div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   APP SHELL (authenticated layout)
═══════════════════════════════════════════════════════════════════ */
function AppShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
      <Bg />

      {/* Sidebar — desktop always visible */}
      <div style={{ position: 'relative', zIndex: 10, flexShrink: 0 }}>
        <div style={{ width: 240, height: '100%', position: 'sticky', top: 0 }}>
          <SidebarDesktop onClose={() => setSidebarOpen(false)} />
        </div>
      </div>

      {/* Mobile sidebar */}
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, position: 'relative', zIndex: 1 }}>
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <main style={{ flex: 1, padding: '36px 28px 80px', maxWidth: 1200, width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
          <AnimatePresence mode="wait">
            {children}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

/* Desktop sidebar — always visible */
function SidebarDesktop({ onClose }) {
  const { logout, email, role, isAdmin } = useAuth();
  const loc = useLocation();
  const nav = useNavigate();
  const handleLogout = () => { logout(); nav('/login'); };

  return (
    <div style={{ width: 240, minHeight: '100vh', background: T.ink,
      borderRight: `3px solid ${T.ink}`, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '22px 20px 16px', borderBottom: `2px solid rgba(255,182,193,0.2)` }}>
        <div style={{ fontFamily: T.f1, fontSize: 26, letterSpacing: 3, color: T.pink, lineHeight: 1 }}>
          PULSE<span style={{ color: T.pinkD }}>HR</span>
        </div>
        <div style={{ fontFamily: T.f2, fontSize: 9, color: 'rgba(255,182,193,0.45)', letterSpacing: 1, marginTop: 3 }}>
          // PERFORMANCE_SYSTEM
        </div>
      </div>

      <div style={{ padding: '14px 20px', borderBottom: `2px solid rgba(255,182,193,0.12)` }}>
        <div style={{ fontFamily: T.f2, fontSize: 9, color: 'rgba(255,182,193,0.45)', letterSpacing: 1 }}>LOGGED_IN_AS</div>
        <div style={{ fontFamily: T.f2, fontSize: 11, color: T.pink, marginTop: 3, wordBreak: 'break-all' }}>{email || 'user'}</div>
        <div style={{ marginTop: 7 }}>
          <Badge label={isAdmin ? 'ADMIN' : 'EMPLOYEE'} color={isAdmin ? T.red : T.teal} textColor="#fff" />
        </div>
      </div>

      <nav style={{ flex: 1, padding: '10px 12px', overflowY: 'auto' }}>
        {NAV_ITEMS.map(item => {
          const active = loc.pathname === item.path || loc.pathname.startsWith(item.path + '/');
          return (
            <Link key={item.path} to={item.path} onClick={onClose}
              style={{ textDecoration: 'none', display: 'block', marginBottom: 4 }}>
              <motion.div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
                borderRadius: 8, background: active ? T.pink : 'transparent',
                border: active ? `2px solid ${T.pinkD}` : '2px solid transparent',
                fontFamily: T.f2, fontSize: 11, fontWeight: active ? 700 : 400,
                color: active ? T.ink : 'rgba(255,182,193,0.7)', letterSpacing: 0.5, cursor: 'pointer' }}
                whileHover={{ background: active ? T.pink : 'rgba(255,182,193,0.12)', color: active ? T.ink : T.pink }}>
                <span style={{ fontSize: 15 }}>{item.icon}</span>
                {item.label}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div style={{ padding: '14px 12px', borderTop: `2px solid rgba(255,182,193,0.12)` }}>
        <motion.button onClick={handleLogout}
          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
            borderRadius: 8, background: 'rgba(224,80,112,0.15)', border: `2px solid ${T.pinkD}`,
            fontFamily: T.f2, fontSize: 11, fontWeight: 700, color: T.pinkM,
            cursor: 'pointer', letterSpacing: 0.5 }}
          whileHover={{ background: 'rgba(224,80,112,0.3)', y: -1 }}
          whileTap={{ scale: 0.97 }}>
          <span>🚪</span> LOGOUT
        </motion.button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   LOGIN PAGE
═══════════════════════════════════════════════════════════════════ */
function LoginPage() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.email.trim()) errs.email = 'Email required';
    if (!form.password)      errs.password = 'Password required';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      const data = await api.login(form);
      // store email separately since backend returns token + role
      data.email = form.email;
      login(data);
      toast.success('✓ Welcome back!');
      nav('/dashboard');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', padding: 20 }}>
      <Bg />
      <motion.div initial={{ opacity: 0, y: 40, rotate: -1 }} animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'relative', zIndex: 2, background: T.cream, border: `3px solid ${T.ink}`,
          borderRadius: 20, width: '100%', maxWidth: 440, padding: '36px 36px 32px',
          boxShadow: `12px 12px 0 ${T.ink}` }}>

        <div style={{ marginBottom: 28 }}>
          <div style={{ fontFamily: T.f1, fontSize: 40, color: T.ink, letterSpacing: 3, lineHeight: 1, marginBottom: 6 }}>
            PULSE<span style={{ color: T.pinkD }}>HR</span>
          </div>
          <div style={{ fontFamily: T.f2, fontSize: 10, color: T.inkL, letterSpacing: 2 }}>// LOGIN_TO_CONTINUE</div>
        </div>

        <form onSubmit={submit}>
          <Field label="EMAIL_ADDRESS" error={errors.email}>
            <input style={inputStyle(!!errors.email)} type="email" placeholder="you@company.com"
              value={form.email} onChange={e => set('email', e.target.value)} />
          </Field>
          <Field label="PASSWORD" error={errors.password}>
            <input style={inputStyle(!!errors.password)} type="password" placeholder="••••••••"
              value={form.password} onChange={e => set('password', e.target.value)} />
          </Field>

          <motion.button type="submit" disabled={loading}
            style={{ width: '100%', height: 46, marginTop: 8, borderRadius: 9, background: T.red,
              border: `2.5px solid ${T.ink}`, fontFamily: T.f2, fontSize: 13, fontWeight: 700,
              color: '#fff', cursor: loading ? 'not-allowed' : 'pointer', letterSpacing: 0.5,
              boxShadow: `5px 5px 0 ${T.ink}`, opacity: loading ? 0.7 : 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            whileHover={!loading ? { y: -2, boxShadow: `7px 7px 0 ${T.ink}` } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}>
            {loading ? <><InlineSpinner />LOGGING_IN...</> : 'LOGIN →'}
          </motion.button>
        </form>

        <div style={{ marginTop: 20, textAlign: 'center', fontFamily: T.f2, fontSize: 11, color: T.inkL }}>
          No account?{' '}
          <Link to="/register" style={{ color: T.pinkD, fontWeight: 700, textDecoration: 'none' }}>
            REGISTER_HERE
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   REGISTER PAGE
═══════════════════════════════════════════════════════════════════ */
function RegisterPage() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', role: 'employee' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.email.trim())  errs.email    = 'Email required';
    if (!form.password)       errs.password = 'Password required (min 6)';
    else if (form.password.length < 6) errs.password = 'Min 6 characters';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      await api.register(form);
      toast.success('✓ Registered! Please log in.');
      nav('/login');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', padding: 20 }}>
      <Bg />
      <motion.div initial={{ opacity: 0, y: 40, rotate: 1 }} animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'relative', zIndex: 2, background: T.cream, border: `3px solid ${T.ink}`,
          borderRadius: 20, width: '100%', maxWidth: 440, padding: '36px 36px 32px',
          boxShadow: `12px 12px 0 ${T.ink}` }}>

        <div style={{ marginBottom: 28 }}>
          <div style={{ fontFamily: T.f1, fontSize: 40, color: T.ink, letterSpacing: 3, lineHeight: 1, marginBottom: 6 }}>
            REGISTER
          </div>
          <div style={{ fontFamily: T.f2, fontSize: 10, color: T.inkL, letterSpacing: 2 }}>// CREATE_YOUR_ACCOUNT</div>
        </div>

        <form onSubmit={submit}>
          <Field label="EMAIL_ADDRESS" error={errors.email}>
            <input style={inputStyle(!!errors.email)} type="email" placeholder="you@company.com"
              value={form.email} onChange={e => set('email', e.target.value)} />
          </Field>
          <Field label="PASSWORD" error={errors.password}>
            <input style={inputStyle(!!errors.password)} type="password" placeholder="Min 6 characters"
              value={form.password} onChange={e => set('password', e.target.value)} />
          </Field>
          <Field label="ROLE">
            <select style={selectStyle()} value={form.role} onChange={e => set('role', e.target.value)}>
              <option value="employee">EMPLOYEE</option>
              <option value="admin">ADMIN</option>
            </select>
          </Field>

          <motion.button type="submit" disabled={loading}
            style={{ width: '100%', height: 46, marginTop: 8, borderRadius: 9, background: T.teal,
              border: `2.5px solid ${T.ink}`, fontFamily: T.f2, fontSize: 13, fontWeight: 700,
              color: T.ink, cursor: loading ? 'not-allowed' : 'pointer', letterSpacing: 0.5,
              boxShadow: `5px 5px 0 ${T.ink}`, opacity: loading ? 0.7 : 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            whileHover={!loading ? { y: -2, boxShadow: `7px 7px 0 ${T.ink}` } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}>
            {loading ? <><InlineSpinner />REGISTERING...</> : 'CREATE_ACCOUNT →'}
          </motion.button>
        </form>

        <div style={{ marginTop: 20, textAlign: 'center', fontFamily: T.f2, fontSize: 11, color: T.inkL }}>
          Have account?{' '}
          <Link to="/login" style={{ color: T.pinkD, fontWeight: 700, textDecoration: 'none' }}>
            LOGIN_HERE
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   AVATAR
═══════════════════════════════════════════════════════════════════ */
function Avatar({ name, size = 44 }) {
  const initials = (name || '?').split(' ').slice(0, 2).map(w => w[0]?.toUpperCase()).join('');
  const pal = ['#FFB6C1', '#FFD6B0', '#B0E8D6', '#D4E4FF', '#E8D4FF', '#FFE8B0', '#C8F5E8'];
  const bg = pal[(name || '').charCodeAt(0) % pal.length];
  return (
    <div style={{ width: size, height: size, borderRadius: 8, background: bg,
      border: `2px solid ${T.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: T.f1, fontSize: size * 0.42, color: T.ink, flexShrink: 0,
      boxShadow: `3px 3px 0 ${T.ink}`, letterSpacing: 1 }}>{initials}</div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   RATING BAR
═══════════════════════════════════════════════════════════════════ */
function RatingBar({ rating }) {
  const pct = (rating / 10) * 100;
  const barColor = rating >= 8 ? T.teal : rating >= 5 ? T.yellow : T.pinkD;
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 5 }}>
        <span style={{ fontFamily: T.f2, fontSize: 9, color: T.inkL, letterSpacing: 2 }}>RATING</span>
        <span style={{ fontFamily: T.f1, fontSize: 24, color: T.ink }}>
          {rating}<span style={{ fontFamily: T.f2, fontSize: 10, color: T.inkL }}>/10</span>
        </span>
      </div>
      <div style={{ height: 8, background: '#E8D0D8', border: `1.5px solid ${T.ink}`, borderRadius: 4, overflow: 'hidden' }}>
        <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: '100%', background: barColor }} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   STAT CARD
═══════════════════════════════════════════════════════════════════ */
function StatCard({ label, value, sub = '', color, icon, delay, decimal = false }) {
  const ref = useRef(null);
  const vis = useVisible(ref);
  const n = useCountUp(vis ? (typeof value === 'number' ? value : 0) : 0);
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, boxShadow: `8px 8px 0 ${T.ink}`, rotate: -0.5 }}
      style={{ background: color, border: `2.5px solid ${T.ink}`, borderRadius: 12,
        padding: '20px 22px', boxShadow: `5px 5px 0 ${T.ink}`,
        transition: 'box-shadow 0.15s', cursor: 'default' }}>
      <div style={{ fontSize: 26, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontFamily: T.f1, fontSize: 48, color: T.ink, lineHeight: 1, letterSpacing: 1, marginBottom: 5 }}>
        {value === null || value === undefined ? '—' : decimal ? n.toFixed(1) : Math.round(n)}
        {sub && <span style={{ fontFamily: T.f2, fontSize: 14, color: T.inkL, marginLeft: 3 }}>{sub}</span>}
      </div>
      <div style={{ fontFamily: T.f2, fontSize: 10, color: T.inkL, letterSpacing: 2 }}>{label}</div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   DASHBOARD PAGE
═══════════════════════════════════════════════════════════════════ */
function DashboardPage() {
  const [employees, setEmployees] = useState([]);
  const [highPerf, setHighPerf]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [stats, setStats]         = useState(null);
  const { isAdmin } = useAuth();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const [emps, hp, st] = await Promise.all([
          api.getEmployees({ limit: 100 }),
          api.getHighPerf().catch(() => []),
          api.getStats().catch(() => null),
        ]);
        const list = Array.isArray(emps) ? emps : [];
        setEmployees(list);
        setHighPerf(Array.isArray(hp) ? hp : []);

        // Use backend stats if available, else derive
        if (st && st.total !== undefined) {
          setStats({
            total_employees:    st.total,
            high_performers:    st.high_performers,
            average_rating:     parseFloat((st.average_rating || 0).toFixed(1)),
            training_completed: st.trained,
          });
        } else {
          const total   = list.length;
          const high    = list.filter(e => e.performance_rating >= 8).length;
          const avg     = total ? list.reduce((s, e) => s + (e.performance_rating || 0), 0) / total : 0;
          const trained = list.filter(e => e.training_completed === 'Yes').length;
          setStats({ total_employees: total, high_performers: high,
            average_rating: parseFloat(avg.toFixed(1)), training_completed: trained });
        }
      } catch (e) {
        toast.error(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <PageHeader title="DASHBOARD" subtitle="OVERVIEW & METRICS" />

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 18, marginBottom: 36 }}>
        <StatCard label="TOTAL_EMPLOYEES"    value={stats?.total_employees}    color={T.pink}   icon="👥" delay={0}    />
        <StatCard label="HIGH_PERFORMERS"    value={stats?.high_performers}    color={T.yellow} icon="⚡" delay={0.08} />
        <StatCard label="AVG_RATING"         value={stats?.average_rating}     color={T.green}  icon="📊" delay={0.16} sub="/10" decimal />
        <StatCard label="TRAINING_COMPLETED" value={stats?.training_completed} color={T.blue}   icon="🎓" delay={0.24} />
      </div>

      {/* High performers section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div style={{ fontFamily: T.f1, fontSize: 24, color: T.ink, letterSpacing: 2, marginBottom: 16 }}>
          ⚡ HIGH_PERFORMERS
          <span style={{ fontFamily: T.f2, fontSize: 11, color: T.inkL, marginLeft: 12, letterSpacing: 1 }}>
            (rating ≥ 8)
          </span>
        </div>
        {highPerf.length === 0 ? (
          <EmptyMsg msg="No high performers found." />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
            {highPerf.map((emp, i) => (
              <motion.div key={emp.id}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -4, boxShadow: `8px 8px 0 ${T.ink}` }}
                style={{ background: T.paper, border: `2.5px solid ${T.ink}`, borderRadius: 12,
                  padding: '16px 18px', boxShadow: `5px 5px 0 ${T.ink}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <Avatar name={emp.name} size={40} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontFamily: T.f3, fontSize: 15, fontWeight: 800, color: T.ink,
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{emp.name}</div>
                    <div style={{ fontFamily: T.f2, fontSize: 10, color: T.inkL, marginTop: 2 }}>{emp.role}</div>
                  </div>
                  <span style={{ marginLeft: 'auto', fontFamily: T.f1, fontSize: 28, color: T.ink }}>
                    {emp.performance_rating}
                    <span style={{ fontFamily: T.f2, fontSize: 10, color: T.inkL }}>/10</span>
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <Badge label={emp.skill} color={T.yellow} />
                  <Badge label={emp.training_completed === 'Yes' ? '✓ TRAINED' : '✗ PENDING'}
                    color={emp.training_completed === 'Yes' ? T.green : '#FFE0E0'}
                    textColor={emp.training_completed === 'Yes' ? '#006B4F' : T.pinkD} />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Recent employees */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ marginTop: 36 }}>
        <div style={{ fontFamily: T.f1, fontSize: 24, color: T.ink, letterSpacing: 2, marginBottom: 16 }}>
          👥 RECENT_EMPLOYEES
        </div>
        {employees.length === 0 ? (
          <EmptyMsg msg="No employees yet." />
        ) : (
          <Card animate={false}>
            <Table
              headers={['ID', 'NAME', 'ROLE', 'SKILL', 'RATING', 'TRAINING']}
              rows={employees.slice(0, 8).map(e => [
                <span style={{ fontFamily: T.f2, fontSize: 10, color: T.inkL }}>#{String(e.id).padStart(4, '0')}</span>,
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Avatar name={e.name} size={32} />
                  <span style={{ fontFamily: T.f3, fontWeight: 700, fontSize: 13 }}>{e.name}</span>
                </div>,
                e.role,
                <Badge label={e.skill} color={T.pink} />,
                <span style={{ fontFamily: T.f1, fontSize: 22 }}>{e.performance_rating}<span style={{ fontFamily: T.f2, fontSize: 10, color: T.inkL }}>/10</span></span>,
                <Badge label={e.training_completed === 'Yes' ? '✓ YES' : '✗ NO'}
                  color={e.training_completed === 'Yes' ? T.green : '#FFE0E0'}
                  textColor={e.training_completed === 'Yes' ? '#006B4F' : T.pinkD} />,
              ])}
            />
          </Card>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   EMPLOYEE FORM (shared add/edit)
═══════════════════════════════════════════════════════════════════ */
const EMPTY_EMP = { name: '', role: '', skill: '', performance_rating: 5, training_completed: false };

function EmpForm({ employee, onSubmit, loading }) {
  const [form, setForm] = useState(() => employee ? {
    name: employee.name, role: employee.role, skill: employee.skill,
    performance_rating: parseInt(employee.performance_rating, 10) || 5,
    training_completed: employee.training_completed === 'Yes',
  } : EMPTY_EMP);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (Object.keys(touched).length) {
      const errs = {};
      if (!form.name.trim())  errs.name  = 'Name required';
      else if (form.name.trim().length < 2) errs.name = 'Min 2 chars';
      if (!form.role.trim())  errs.role  = 'Role required';
      if (!form.skill.trim()) errs.skill = 'Skill required';
      setErrors(errs);
    }
  }, [form]);

  const set = (k, v) => { setForm(p => ({ ...p, [k]: v })); setTouched(p => ({ ...p, [k]: true })); };

  const submit = () => {
    const errs = {};
    if (!form.name.trim())  errs.name  = 'Name required';
    else if (form.name.trim().length < 2) errs.name = 'Min 2 chars';
    if (!form.role.trim())  errs.role  = 'Role required';
    if (!form.skill.trim()) errs.skill = 'Skill required';
    setErrors(errs); setTouched({ name: true, role: true, skill: true });
    if (Object.keys(errs).length) return;
    onSubmit({
      name: form.name.trim(), role: form.role.trim(), skill: form.skill.trim(),
      performance_rating: Math.floor(parseInt(form.performance_rating, 10)),
      training_completed: form.training_completed ? 'Yes' : 'No',
    });
  };

  return (
    <div>
      <Field label="FULL_NAME" error={touched.name && errors.name}>
        <input style={inputStyle(touched.name && !!errors.name)} type="text"
          placeholder="e.g. Alice Johnson" value={form.name}
          onChange={e => set('name', e.target.value)}
          onBlur={() => setTouched(p => ({ ...p, name: true }))} autoFocus />
      </Field>
      <Field label="ROLE" error={touched.role && errors.role}>
        <input style={inputStyle(touched.role && !!errors.role)} type="text"
          placeholder="e.g. Senior Engineer" value={form.role}
          onChange={e => set('role', e.target.value)}
          onBlur={() => setTouched(p => ({ ...p, role: true }))} />
      </Field>
      <Field label="SKILL" error={touched.skill && errors.skill}>
        <input style={inputStyle(touched.skill && !!errors.skill)} type="text"
          placeholder="e.g. React, Python, DevOps" value={form.skill}
          onChange={e => set('skill', e.target.value)}
          onBlur={() => setTouched(p => ({ ...p, skill: true }))} />
      </Field>

      {/* Rating buttons */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <label style={{ fontFamily: T.f2, fontSize: 10, fontWeight: 700, color: T.inkL, letterSpacing: 1.5, textTransform: 'uppercase' }}>
            PERFORMANCE_RATING
          </label>
          <span style={{ fontFamily: T.f1, fontSize: 32, color: T.ink }}>
            {form.performance_rating}<span style={{ fontFamily: T.f2, fontSize: 11, color: T.inkL }}>/10</span>
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10,1fr)', gap: 5 }}>
          {[1,2,3,4,5,6,7,8,9,10].map(n => {
            const active = n <= form.performance_rating;
            const col = n >= 8 ? T.teal : n >= 5 ? T.yellow : T.pink;
            return (
              <motion.button key={n} type="button"
                style={{ height: 36, borderRadius: 6,
                  background: active ? col : T.cream,
                  border: `2px solid ${active ? T.ink : '#C8A8B8'}`,
                  fontFamily: T.f2, fontSize: 11, fontWeight: 700, color: T.ink,
                  cursor: 'pointer',
                  boxShadow: n === form.performance_rating ? `2px 2px 0 ${T.ink}` : 'none' }}
                onClick={() => set('performance_rating', n)}
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                {n}
              </motion.button>
            );
          })}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
          <span style={{ fontFamily: T.f2, fontSize: 9, color: T.inkL }}>POOR</span>
          <span style={{ fontFamily: T.f2, fontSize: 9, color: T.inkL }}>EXCELLENT</span>
        </div>
      </div>

      {/* Training toggle */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
        background: T.paper, border: `2px solid ${T.ink}`, borderRadius: 10, padding: '14px 16px', marginBottom: 20 }}>
        <div>
          <div style={{ fontFamily: T.f2, fontSize: 10, fontWeight: 700, color: T.inkL, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 3 }}>
            TRAINING_COMPLETED
          </div>
          <div style={{ fontFamily: T.f2, fontSize: 10, color: T.inkL }}>Has this employee finished training?</div>
        </div>
        <button type="button"
          style={{ width: 52, height: 28, borderRadius: 14, flexShrink: 0, position: 'relative',
            background: form.training_completed ? T.teal : '#E8D0D8',
            border: `2px solid ${T.ink}`, cursor: 'pointer', transition: 'background 0.2s' }}
          onClick={() => set('training_completed', !form.training_completed)}>
          <motion.div animate={{ x: form.training_completed ? 24 : 2 }}
            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            style={{ position: 'absolute', top: 3, width: 20, height: 20, borderRadius: '50%',
              background: '#fff', border: `1.5px solid ${T.ink}` }} />
        </button>
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <motion.button type="button" onClick={submit} disabled={loading}
          style={{ flex: 1, height: 44, borderRadius: 9, background: T.red, border: `2.5px solid ${T.ink}`,
            fontFamily: T.f2, fontSize: 12, fontWeight: 700, color: '#fff',
            cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1,
            boxShadow: `4px 4px 0 ${T.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          whileHover={!loading ? { y: -2, boxShadow: `6px 6px 0 ${T.ink}` } : {}}
          whileTap={!loading ? { scale: 0.97 } : {}}>
          {loading ? <><InlineSpinner />{employee ? 'SAVING...' : 'ADDING...'}</> : employee ? 'SAVE_CHANGES' : 'ADD_EMPLOYEE'}
        </motion.button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   EMPLOYEES PAGE
═══════════════════════════════════════════════════════════════════ */
function EmployeesPage() {
  const { isAdmin } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState('');
  const [skill, setSkill]         = useState('');
  const [highOnly, setHighOnly]   = useState(false);
  const [page, setPage]           = useState(0);
  const [addOpen, setAddOpen]     = useState(false);
  const [editEmp, setEditEmp]     = useState(null);
  const [delTarget, setDelTarget] = useState(null);
  const [fLoad, setFLoad]         = useState(false);
  const [dLoad, setDLoad]         = useState(false);
  const [viewEmp, setViewEmp]     = useState(null);

  const PER_PAGE = 9;

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getEmployees({ limit: 200 });
      setEmployees(Array.isArray(data) ? data : []);
    } catch (e) { toast.error(e.message); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchEmployees(); }, [fetchEmployees]);

  const skills = useMemo(() => [...new Set(employees.map(e => e.skill).filter(Boolean))].sort(), [employees]);

  const filtered = useMemo(() => {
    let l = [...employees];
    if (highOnly) l = l.filter(e => e.performance_rating >= 8);
    if (skill)    l = l.filter(e => e.skill?.toLowerCase() === skill.toLowerCase());
    if (search) {
      const q = search.toLowerCase();
      l = l.filter(e => e.name?.toLowerCase().includes(q) || e.role?.toLowerCase().includes(q)
        || e.skill?.toLowerCase().includes(q) || String(e.id).includes(q));
    }
    return l;
  }, [employees, highOnly, skill, search]);

  const pages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  const handleAdd = async (data) => {
    setFLoad(true);
    try {
      await api.createEmp(data);
      toast.success(`✓ ${data.name} added`);
      setAddOpen(false);
      await fetchEmployees();
    } catch (e) { toast.error(e.message); }
    finally { setFLoad(false); }
  };

  const handleEdit = async (data) => {
    setFLoad(true);
    try {
      await api.updateEmp(editEmp.id, data);
      toast.success(`✓ ${data.name} updated`);
      setEditEmp(null);
      await fetchEmployees();
    } catch (e) { toast.error(e.message); }
    finally { setFLoad(false); }
  };

  const handleDelete = async () => {
    setDLoad(true);
    try {
      await api.deleteEmp(delTarget.id);
      toast.success(`✓ ${delTarget.name} removed`);
      setDelTarget(null);
      await fetchEmployees();
    } catch (e) { toast.error(e.message); }
    finally { setDLoad(false); }
  };

  const resetFilters = () => { setSearch(''); setSkill(''); setHighOnly(false); setPage(0); };

  return (
    <motion.div key="employees" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <PageHeader title="EMPLOYEES" subtitle="TEAM_MANAGEMENT"
        action={isAdmin && (
          <Btn onClick={() => setAddOpen(true)} bg={T.red} color="#fff" shadow={`4px 4px 0 ${T.ink}`}>
            + ADD_EMPLOYEE
          </Btn>
        )} />

      {/* Filters */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
          background: T.paper, border: `2.5px solid ${T.ink}`, borderRadius: 10,
          padding: '14px 18px', marginBottom: 24, boxShadow: `4px 4px 0 ${T.ink}` }}>
        <div style={{ position: 'relative', flex: '1 1 200px', minWidth: 160 }}>
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
            fontSize: 16, color: T.inkL, pointerEvents: 'none' }}>⌕</span>
          <input style={{ ...inputStyle(), paddingLeft: 34, height: 40 }}
            placeholder="SEARCH_NAME_ROLE_SKILL_ID..."
            value={search} onChange={e => { setSearch(e.target.value); setPage(0); }} />
        </div>
        <select style={{ ...selectStyle(), height: 40, minWidth: 130 }}
          value={skill} onChange={e => { setSkill(e.target.value); setPage(0); }}>
          <option value="">ALL_SKILLS</option>
          {skills.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <motion.button
          style={{ height: 40, padding: '0 14px', background: highOnly ? T.yellow : T.cream,
            border: `2px solid ${T.ink}`, borderRadius: 7, fontFamily: T.f2, fontSize: 11,
            fontWeight: 700, color: T.ink, cursor: 'pointer', boxShadow: `3px 3px 0 ${T.ink}` }}
          onClick={() => { setHighOnly(p => !p); setPage(0); }}
          whileHover={{ y: -1, boxShadow: `4px 4px 0 ${T.ink}` }} whileTap={{ scale: 0.96 }}>
          ⚡ HIGH_PERFORMERS
        </motion.button>
        {(search || skill || highOnly) && (
          <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            style={{ height: 40, padding: '0 14px', background: '#FFE0E0', border: `2px solid ${T.ink}`,
              borderRadius: 7, fontFamily: T.f2, fontSize: 11, fontWeight: 700,
              color: T.pinkD, cursor: 'pointer', boxShadow: `3px 3px 0 ${T.ink}` }}
            onClick={resetFilters} whileHover={{ y: -1 }} whileTap={{ scale: 0.96 }}>
            ✕ RESET
          </motion.button>
        )}
      </motion.div>

      {/* Count */}
      <p style={{ fontFamily: T.f2, fontSize: 10, color: T.inkL, letterSpacing: 2, marginBottom: 18 }}>
        // SHOWING {filtered.length} OF {employees.length} EMPLOYEES
      </p>

      {loading ? <PageLoader /> : filtered.length === 0 ? <EmptyMsg msg="No employees match your search." /> : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 18, marginBottom: 28 }}>
            <AnimatePresence mode="popLayout">
              {paginated.map((emp, i) => (
                <motion.div key={emp.id} layout
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  whileHover={{ y: -5, boxShadow: `8px 8px 0 ${T.ink}` }}
                  style={{ position: 'relative', background: T.paper, border: `2.5px solid ${T.ink}`,
                    borderRadius: 14, padding: '18px 18px 16px', display: 'flex', flexDirection: 'column',
                    gap: 12, boxShadow: `5px 5px 0 ${T.ink}`, transition: 'box-shadow 0.15s' }}>

                  {/* ID */}
                  <div style={{ position: 'absolute', top: -1, right: 14, background: T.ink,
                    borderRadius: '0 0 6px 6px', padding: '3px 9px' }}>
                    <span style={{ fontFamily: T.f2, fontSize: 9, color: T.pink, letterSpacing: 1 }}>
                      #{String(emp.id).padStart(4, '0')}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingRight: 50 }}>
                    <Avatar name={emp.name} size={46} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: T.f3, fontSize: 16, fontWeight: 800, color: T.ink,
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{emp.name}</div>
                      <div style={{ fontFamily: T.f2, fontSize: 10, color: T.inkL, marginTop: 2 }}>{emp.role}</div>
                    </div>
                    <Badge label={emp.training_completed === 'Yes' ? '✓ TRAINED' : '✗ PENDING'}
                      color={emp.training_completed === 'Yes' ? T.green : '#FFE0E0'}
                      textColor={emp.training_completed === 'Yes' ? '#006B4F' : T.pinkD} />
                  </div>

                  <div style={{ height: 1, background: T.ink, opacity: 0.1 }} />

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: T.f2, fontSize: 9, color: T.inkL, letterSpacing: 2 }}>SKILL</span>
                    <Badge label={emp.skill} color={T.pink} />
                  </div>

                  <RatingBar rating={emp.performance_rating} />

                  <div style={{ height: 1, background: T.ink, opacity: 0.1 }} />

                  <div style={{ display: 'flex', gap: 8 }}>
                    <Btn onClick={() => setViewEmp(emp)} bg={T.blue} style={{ flex: 1, padding: '7px 0', fontSize: 11 }}>👁 VIEW</Btn>
                    {isAdmin && (
                      <>
                        <Btn onClick={() => setEditEmp(emp)} bg={T.pink} style={{ flex: 1, padding: '7px 0', fontSize: 11 }}>✏ EDIT</Btn>
                        <Btn onClick={() => setDelTarget(emp)} bg="#FFE0E0" color={T.pinkD} style={{ flex: 1, padding: '7px 0', fontSize: 11 }}>✕ DEL</Btn>
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Pagination */}
          {pages > 1 && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
              <Btn onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} bg={T.cream} style={{ padding: '8px 16px', fontSize: 11 }}>
                ← PREV
              </Btn>
              {Array.from({ length: pages }).map((_, i) => (
                <motion.button key={i}
                  style={{ width: 38, height: 38, borderRadius: 7, fontFamily: T.f2, fontSize: 12, fontWeight: 700,
                    background: i === page ? T.ink : T.cream, color: i === page ? T.pink : T.ink,
                    border: `2px solid ${T.ink}`, cursor: 'pointer', boxShadow: `2px 2px 0 ${T.ink}` }}
                  onClick={() => setPage(i)} whileHover={{ y: -1 }} whileTap={{ scale: 0.95 }}>
                  {i + 1}
                </motion.button>
              ))}
              <Btn onClick={() => setPage(p => Math.min(pages - 1, p + 1))} disabled={page === pages - 1} bg={T.cream} style={{ padding: '8px 16px', fontSize: 11 }}>
                NEXT →
              </Btn>
            </div>
          )}
        </>
      )}

      {/* Add modal */}
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="NEW_EMPLOYEE" subtitle="// fill in all fields">
        <EmpForm onSubmit={handleAdd} loading={fLoad} />
      </Modal>

      {/* Edit modal */}
      <Modal open={!!editEmp} onClose={() => setEditEmp(null)} title="EDIT_EMPLOYEE" subtitle={`// updating: ${editEmp?.name}`}>
        {editEmp && <EmpForm employee={editEmp} onSubmit={handleEdit} loading={fLoad} />}
      </Modal>

      {/* View modal */}
      <Modal open={!!viewEmp} onClose={() => setViewEmp(null)} title="EMPLOYEE_PROFILE" subtitle={`// #${String(viewEmp?.id || 0).padStart(4, '0')}`}>
        {viewEmp && <EmpProfile emp={viewEmp} />}
      </Modal>

      {/* Delete confirm */}
      <ConfirmDel open={!!delTarget} label={delTarget?.name} onOk={handleDelete} onCancel={() => setDelTarget(null)} loading={dLoad} />
    </motion.div>
  );
}

/* Employee profile detail view */
function EmpProfile({ emp }) {
  const [reviews,   setReviews]   = useState([]);
  const [plans,     setPlans]     = useState([]);
  const [comps,     setComps]     = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [loading,   setLoading]   = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const [r, p, c, t] = await Promise.all([
          api.getReviews(emp.id).catch(() => []),
          api.getPlans(emp.id).catch(() => []),
          api.getComps(emp.id).catch(() => []),
          api.getTrainings(emp.id).catch(() => []),
        ]);
        setReviews(r); setPlans(p); setComps(c); setTrainings(t);
      } finally { setLoading(false); }
    })();
  }, [emp.id]);

  if (loading) return <PageLoader />;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
        <Avatar name={emp.name} size={56} />
        <div>
          <div style={{ fontFamily: T.f3, fontSize: 20, fontWeight: 800, color: T.ink }}>{emp.name}</div>
          <div style={{ fontFamily: T.f2, fontSize: 11, color: T.inkL }}>{emp.role}</div>
          <div style={{ display: 'flex', gap: 6, marginTop: 7, flexWrap: 'wrap' }}>
            <Badge label={emp.skill} color={T.pink} />
            <Badge label={emp.training_completed === 'Yes' ? '✓ TRAINED' : '✗ PENDING'}
              color={emp.training_completed === 'Yes' ? T.green : '#FFE0E0'}
              textColor={emp.training_completed === 'Yes' ? '#006B4F' : T.pinkD} />
          </div>
        </div>
        <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
          <div style={{ fontFamily: T.f1, fontSize: 40, color: T.ink, lineHeight: 1 }}>
            {emp.performance_rating}<span style={{ fontFamily: T.f2, fontSize: 12, color: T.inkL }}>/10</span>
          </div>
        </div>
      </div>

      <RatingBar rating={emp.performance_rating} />

      {/* Reviews summary */}
      <Section title="REVIEWS" count={reviews.length}>
        {reviews.length === 0 ? <EmptyMsg msg="No reviews." /> :
          reviews.slice(0, 3).map((r, i) => (
            <div key={r.id} style={{ padding: '10px 0', borderBottom: i < reviews.length - 1 ? `1px solid rgba(26,10,16,0.1)` : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <Badge label={`Rating: ${r.rating}/10`} color={T.yellow} />
                <span style={{ fontFamily: T.f2, fontSize: 10, color: T.inkL }}>{r.review_date}</span>
              </div>
              <p style={{ fontFamily: T.f2, fontSize: 11, color: T.inkM, lineHeight: 1.6 }}>{r.feedback}</p>
            </div>
          ))}
      </Section>

      {/* Dev plans */}
      <Section title="DEV_PLANS" count={plans.length}>
        {plans.length === 0 ? <EmptyMsg msg="No plans." /> :
          plans.slice(0, 3).map((p, i) => (
            <div key={p.id} style={{ padding: '10px 0', borderBottom: i < plans.length - 1 ? `1px solid rgba(26,10,16,0.1)` : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontFamily: T.f2, fontSize: 11, fontWeight: 700, color: T.ink }}>{p.goal}</span>
                <Badge label={p.progress} color={T.blue} />
              </div>
              <span style={{ fontFamily: T.f2, fontSize: 10, color: T.inkL }}>Deadline: {p.deadline}</span>
            </div>
          ))}
      </Section>
    </div>
  );
}

function Section({ title, count, children }) {
  return (
    <div style={{ marginTop: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <span style={{ fontFamily: T.f1, fontSize: 16, color: T.ink, letterSpacing: 2 }}>{title}</span>
        <Badge label={String(count)} color={T.pink} />
      </div>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   REVIEWS PAGE
═══════════════════════════════════════════════════════════════════ */
function ReviewsPage() {
  const { isAdmin } = useAuth();
  const [reviews, setReviews]     = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [addOpen, setAddOpen]     = useState(false);
  const [delTarget, setDelTarget] = useState(null);
  const [fLoad, setFLoad]         = useState(false);
  const [dLoad, setDLoad]         = useState(false);
  const [form, setForm]           = useState({ employee_id: '', rating: 7, feedback: '', review_date: '' });
  const [errors, setErrors]       = useState({});

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [revs, emps] = await Promise.all([
        isAdmin ? api.getAllReviews() : Promise.resolve([]),
        api.getEmployees({ limit: 200 }),
      ]);
      setReviews(Array.isArray(revs) ? revs : []);
      setEmployees(Array.isArray(emps) ? emps : []);
    } catch (e) { toast.error(e.message); }
    finally { setLoading(false); }
  }, [isAdmin]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const empName = (id) => employees.find(e => e.id === id)?.name || `#${id}`;

  const submitReview = async () => {
    const errs = {};
    if (!form.employee_id) errs.employee_id = 'Employee required';
    if (!form.feedback.trim()) errs.feedback = 'Feedback required';
    if (!form.review_date) errs.review_date = 'Date required';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setFLoad(true);
    try {
      await api.createReview({
        employee_id: parseInt(form.employee_id, 10),
        rating: parseInt(form.rating, 10),
        feedback: form.feedback.trim(),
        review_date: form.review_date,
      });
      toast.success('✓ Review added');
      setAddOpen(false);
      setForm({ employee_id: '', rating: 7, feedback: '', review_date: '' });
      fetchData();
    } catch (e) { toast.error(e.message); }
    finally { setFLoad(false); }
  };

  const handleDelete = async () => {
    setDLoad(true);
    try {
      await api.deleteReview(delTarget.id);
      toast.success('✓ Review deleted');
      setDelTarget(null); fetchData();
    } catch (e) { toast.error(e.message); }
    finally { setDLoad(false); }
  };

  return (
    <motion.div key="reviews" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <PageHeader title="REVIEWS" subtitle="PERFORMANCE_REVIEWS"
        action={isAdmin && (
          <Btn onClick={() => setAddOpen(true)} bg={T.red} color="#fff" shadow={`4px 4px 0 ${T.ink}`}>
            + ADD_REVIEW
          </Btn>
        )} />

      {loading ? <PageLoader /> : !isAdmin ? (
        <div>
          <p style={{ fontFamily: T.f2, fontSize: 12, color: T.inkL, marginBottom: 20 }}>// Select an employee to view their reviews.</p>
          <EmpReviewPicker employees={employees} />
        </div>
      ) : reviews.length === 0 ? <EmptyMsg msg="No reviews found." /> : (
        <Card animate={false}>
          <Table
            headers={['ID', 'EMPLOYEE', 'RATING', 'FEEDBACK', 'DATE', 'ACTIONS']}
            rows={reviews.map(r => [
              <span style={{ fontFamily: T.f2, fontSize: 10, color: T.inkL }}>#{r.id}</span>,
              <span style={{ fontFamily: T.f3, fontWeight: 700, fontSize: 13 }}>{empName(r.employee_id)}</span>,
              <Badge label={`${r.rating}/10`} color={r.rating >= 8 ? T.green : r.rating >= 5 ? T.yellow : '#FFE0E0'} />,
              <span style={{ maxWidth: 220, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.feedback}</span>,
              r.review_date,
              isAdmin && (
                <Btn onClick={() => setDelTarget(r)} bg="#FFE0E0" color={T.pinkD}
                  style={{ padding: '5px 12px', fontSize: 10 }}>✕ DEL</Btn>
              ),
            ])}
          />
        </Card>
      )}

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="ADD_REVIEW" subtitle="// create a performance review">
        <Field label="EMPLOYEE" error={errors.employee_id}>
          <select style={selectStyle()} value={form.employee_id} onChange={e => setForm(p => ({ ...p, employee_id: e.target.value }))}>
            <option value="">Select employee...</option>
            {employees.map(e => <option key={e.id} value={e.id}>{e.name} — {e.role}</option>)}
          </select>
        </Field>
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <label style={{ fontFamily: T.f2, fontSize: 10, fontWeight: 700, color: T.inkL, letterSpacing: 1.5, textTransform: 'uppercase' }}>RATING</label>
            <span style={{ fontFamily: T.f1, fontSize: 28, color: T.ink }}>{form.rating}<span style={{ fontFamily: T.f2, fontSize: 10, color: T.inkL }}>/10</span></span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10,1fr)', gap: 4 }}>
            {[1,2,3,4,5,6,7,8,9,10].map(n => {
              const active = n <= form.rating;
              const col = n >= 8 ? T.teal : n >= 5 ? T.yellow : T.pink;
              return (
                <motion.button key={n} type="button"
                  style={{ height: 34, borderRadius: 5, background: active ? col : T.cream,
                    border: `2px solid ${active ? T.ink : '#C8A8B8'}`, fontFamily: T.f2, fontSize: 10,
                    fontWeight: 700, color: T.ink, cursor: 'pointer' }}
                  onClick={() => setForm(p => ({ ...p, rating: n }))}
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>{n}</motion.button>
              );
            })}
          </div>
        </div>
        <Field label="FEEDBACK" error={errors.feedback}>
          <textarea style={{ ...inputStyle(!!errors.feedback), height: 100, padding: '10px 14px', resize: 'vertical', lineHeight: 1.5 }}
            placeholder="Write your feedback here..."
            value={form.feedback} onChange={e => setForm(p => ({ ...p, feedback: e.target.value }))} />
        </Field>
        <Field label="REVIEW_DATE" error={errors.review_date}>
          <input style={inputStyle(!!errors.review_date)} type="date"
            value={form.review_date} onChange={e => setForm(p => ({ ...p, review_date: e.target.value }))} />
        </Field>
        <Btn onClick={submitReview} disabled={fLoad} bg={T.red} color="#fff" shadow={`4px 4px 0 ${T.ink}`}
          style={{ width: '100%', height: 44, marginTop: 4 }}>
          {fLoad ? <><InlineSpinner />SAVING...</> : 'SUBMIT_REVIEW'}
        </Btn>
      </Modal>

      <ConfirmDel open={!!delTarget} label={`Review #${delTarget?.id}`} onOk={handleDelete} onCancel={() => setDelTarget(null)} loading={dLoad} />
    </motion.div>
  );
}

function EmpReviewPicker({ employees }) {
  const [empId, setEmpId] = useState('');
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async (id) => {
    setEmpId(id); if (!id) return;
    setLoading(true);
    try { setReviews(await api.getReviews(parseInt(id, 10))); }
    catch (e) { toast.error(e.message); }
    finally { setLoading(false); }
  };

  return (
    <div>
      <div style={{ marginBottom: 20, maxWidth: 360 }}>
        <select style={selectStyle()} value={empId} onChange={e => load(e.target.value)}>
          <option value="">Select employee...</option>
          {employees.map(e => <option key={e.id} value={e.id}>{e.name} — {e.role}</option>)}
        </select>
      </div>
      {loading ? <PageLoader /> : reviews.length === 0 ? empId ? <EmptyMsg msg="No reviews for this employee." /> : null : (
        <Card animate={false}>
          <Table
            headers={['RATING', 'FEEDBACK', 'DATE']}
            rows={reviews.map(r => [
              <Badge label={`${r.rating}/10`} color={r.rating >= 8 ? T.green : r.rating >= 5 ? T.yellow : '#FFE0E0'} />,
              r.feedback,
              r.review_date,
            ])}
          />
        </Card>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   DEVELOPMENT PLANS PAGE
═══════════════════════════════════════════════════════════════════ */
function PlansPage() {
  const { isAdmin } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [selEmpId, setSelEmpId]   = useState('');
  const [plans, setPlans]         = useState([]);
  const [loading, setLoading]     = useState(false);
  const [addOpen, setAddOpen]     = useState(false);
  const [fLoad, setFLoad]         = useState(false);
  const [form, setForm]           = useState({ employee_id: '', goal: '', progress: 'In Progress', deadline: '' });
  const [errors, setErrors]       = useState({});

  useEffect(() => {
    api.getEmployees({ limit: 200 }).then(d => setEmployees(Array.isArray(d) ? d : [])).catch(() => {});
  }, []);

  const loadPlans = async (id) => {
    setSelEmpId(id); if (!id) { setPlans([]); return; }
    setLoading(true);
    try { setPlans(await api.getPlans(parseInt(id, 10))); }
    catch (e) { toast.error(e.message); }
    finally { setLoading(false); }
  };

  const submitPlan = async () => {
    const errs = {};
    if (!form.employee_id) errs.employee_id = 'Employee required';
    if (!form.goal.trim()) errs.goal = 'Goal required';
    if (!form.deadline)    errs.deadline = 'Deadline required';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setFLoad(true);
    try {
      await api.createPlan({ employee_id: parseInt(form.employee_id, 10), goal: form.goal.trim(), progress: form.progress, deadline: form.deadline });
      toast.success('✓ Plan created');
      setAddOpen(false);
      setForm({ employee_id: '', goal: '', progress: 'In Progress', deadline: '' });
      if (form.employee_id === selEmpId) loadPlans(selEmpId);
    } catch (e) { toast.error(e.message); }
    finally { setFLoad(false); }
  };

  const empName = (id) => employees.find(e => e.id === id)?.name || `#${id}`;

  return (
    <motion.div key="plans" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <PageHeader title="DEV_PLANS" subtitle="DEVELOPMENT_PLANS"
        action={isAdmin && (
          <Btn onClick={() => setAddOpen(true)} bg={T.red} color="#fff" shadow={`4px 4px 0 ${T.ink}`}>+ ADD_PLAN</Btn>
        )} />

      <div style={{ maxWidth: 380, marginBottom: 24 }}>
        <select style={selectStyle()} value={selEmpId} onChange={e => loadPlans(e.target.value)}>
          <option value="">Select employee to view plans...</option>
          {employees.map(e => <option key={e.id} value={e.id}>{e.name} — {e.role}</option>)}
        </select>
      </div>

      {loading ? <PageLoader /> : plans.length === 0 ? selEmpId ? <EmptyMsg msg="No development plans for this employee." /> : (
        <EmptyMsg msg="Select an employee above." />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 16 }}>
          {plans.map((p, i) => (
            <motion.div key={p.id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -4, boxShadow: `8px 8px 0 ${T.ink}` }}
              style={{ background: T.paper, border: `2.5px solid ${T.ink}`, borderRadius: 12,
                padding: '18px 18px', boxShadow: `5px 5px 0 ${T.ink}` }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: 12 }}>
                <div style={{ fontFamily: T.f3, fontSize: 14, fontWeight: 800, color: T.ink, flex: 1 }}>{p.goal}</div>
                <Badge label={p.progress}
                  color={p.progress === 'Completed' ? T.green : p.progress === 'In Progress' ? T.yellow : T.blue} />
              </div>
              <div style={{ fontFamily: T.f2, fontSize: 10, color: T.inkL, letterSpacing: 1 }}>
                📅 DEADLINE: {p.deadline}
              </div>
              <div style={{ fontFamily: T.f2, fontSize: 10, color: T.inkL, marginTop: 6 }}>
                👤 {empName(p.employee_id)}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="ADD_PLAN" subtitle="// create a development plan">
        <Field label="EMPLOYEE" error={errors.employee_id}>
          <select style={selectStyle()} value={form.employee_id} onChange={e => setForm(p => ({ ...p, employee_id: e.target.value }))}>
            <option value="">Select employee...</option>
            {employees.map(e => <option key={e.id} value={e.id}>{e.name} — {e.role}</option>)}
          </select>
        </Field>
        <Field label="GOAL" error={errors.goal}>
          <input style={inputStyle(!!errors.goal)} type="text" placeholder="e.g. Complete React certification"
            value={form.goal} onChange={e => setForm(p => ({ ...p, goal: e.target.value }))} />
        </Field>
        <Field label="PROGRESS_STATUS">
          <select style={selectStyle()} value={form.progress} onChange={e => setForm(p => ({ ...p, progress: e.target.value }))}>
            <option value="Not Started">NOT_STARTED</option>
            <option value="In Progress">IN_PROGRESS</option>
            <option value="Completed">COMPLETED</option>
          </select>
        </Field>
        <Field label="DEADLINE" error={errors.deadline}>
          <input style={inputStyle(!!errors.deadline)} type="date"
            value={form.deadline} onChange={e => setForm(p => ({ ...p, deadline: e.target.value }))} />
        </Field>
        <Btn onClick={submitPlan} disabled={fLoad} bg={T.red} color="#fff"
          shadow={`4px 4px 0 ${T.ink}`} style={{ width: '100%', height: 44, marginTop: 4 }}>
          {fLoad ? <><InlineSpinner />SAVING...</> : 'CREATE_PLAN'}
        </Btn>
      </Modal>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   COMPETENCIES PAGE
═══════════════════════════════════════════════════════════════════ */
function CompetenciesPage() {
  const { isAdmin } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [selEmpId, setSelEmpId]   = useState('');
  const [comps, setComps]         = useState([]);
  const [loading, setLoading]     = useState(false);
  const [addOpen, setAddOpen]     = useState(false);
  const [fLoad, setFLoad]         = useState(false);
  const [form, setForm]           = useState({ employee_id: '', skill: '', level: 'Intermediate' });
  const [errors, setErrors]       = useState({});

  useEffect(() => {
    api.getEmployees({ limit: 200 }).then(d => setEmployees(Array.isArray(d) ? d : [])).catch(() => {});
  }, []);

  const loadComps = async (id) => {
    setSelEmpId(id); if (!id) { setComps([]); return; }
    setLoading(true);
    try { setComps(await api.getComps(parseInt(id, 10))); }
    catch (e) { toast.error(e.message); }
    finally { setLoading(false); }
  };

  const submitComp = async () => {
    const errs = {};
    if (!form.employee_id) errs.employee_id = 'Employee required';
    if (!form.skill.trim()) errs.skill = 'Skill required';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setFLoad(true);
    try {
      await api.createComp({ employee_id: parseInt(form.employee_id, 10), skill: form.skill.trim(), level: form.level });
      toast.success('✓ Competency added');
      setAddOpen(false);
      setForm({ employee_id: '', skill: '', level: 'Intermediate' });
      if (form.employee_id === selEmpId) loadComps(selEmpId);
    } catch (e) { toast.error(e.message); }
    finally { setFLoad(false); }
  };

  const levelColor = { Beginner: T.blue, Intermediate: T.yellow, Advanced: T.teal, Expert: T.pinkD };

  return (
    <motion.div key="comps" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <PageHeader title="COMPETENCIES" subtitle="SKILL_COMPETENCIES"
        action={isAdmin && (
          <Btn onClick={() => setAddOpen(true)} bg={T.red} color="#fff" shadow={`4px 4px 0 ${T.ink}`}>+ ADD_COMPETENCY</Btn>
        )} />

      <div style={{ maxWidth: 380, marginBottom: 24 }}>
        <select style={selectStyle()} value={selEmpId} onChange={e => loadComps(e.target.value)}>
          <option value="">Select employee to view competencies...</option>
          {employees.map(e => <option key={e.id} value={e.id}>{e.name} — {e.role}</option>)}
        </select>
      </div>

      {loading ? <PageLoader /> : comps.length === 0 ? selEmpId ? <EmptyMsg msg="No competencies recorded." /> : <EmptyMsg msg="Select an employee above." /> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
          {comps.map((c, i) => (
            <motion.div key={c.id}
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4, boxShadow: `7px 7px 0 ${T.ink}` }}
              style={{ background: T.paper, border: `2.5px solid ${T.ink}`, borderRadius: 12,
                padding: '16px 18px', boxShadow: `5px 5px 0 ${T.ink}`, textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>🧠</div>
              <div style={{ fontFamily: T.f3, fontSize: 16, fontWeight: 800, color: T.ink, marginBottom: 8 }}>{c.skill}</div>
              <Badge label={c.level.toUpperCase()} color={levelColor[c.level] || T.blue}
                textColor={c.level === 'Expert' ? '#fff' : T.ink} />
            </motion.div>
          ))}
        </div>
      )}

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="ADD_COMPETENCY" subtitle="// record a skill competency">
        <Field label="EMPLOYEE" error={errors.employee_id}>
          <select style={selectStyle()} value={form.employee_id} onChange={e => setForm(p => ({ ...p, employee_id: e.target.value }))}>
            <option value="">Select employee...</option>
            {employees.map(e => <option key={e.id} value={e.id}>{e.name} — {e.role}</option>)}
          </select>
        </Field>
        <Field label="SKILL_NAME" error={errors.skill}>
          <input style={inputStyle(!!errors.skill)} type="text" placeholder="e.g. TypeScript, Leadership"
            value={form.skill} onChange={e => setForm(p => ({ ...p, skill: e.target.value }))} />
        </Field>
        <Field label="PROFICIENCY_LEVEL">
          <select style={selectStyle()} value={form.level} onChange={e => setForm(p => ({ ...p, level: e.target.value }))}>
            <option value="Beginner">BEGINNER</option>
            <option value="Intermediate">INTERMEDIATE</option>
            <option value="Advanced">ADVANCED</option>
            <option value="Expert">EXPERT</option>
          </select>
        </Field>
        <Btn onClick={submitComp} disabled={fLoad} bg={T.red} color="#fff"
          shadow={`4px 4px 0 ${T.ink}`} style={{ width: '100%', height: 44, marginTop: 4 }}>
          {fLoad ? <><InlineSpinner />SAVING...</> : 'ADD_COMPETENCY'}
        </Btn>
      </Modal>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   TRAININGS PAGE
═══════════════════════════════════════════════════════════════════ */
function TrainingsPage() {
  const { isAdmin } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [selEmpId, setSelEmpId]   = useState('');
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading]     = useState(false);
  const [addOpen, setAddOpen]     = useState(false);
  const [fLoad, setFLoad]         = useState(false);
  const [form, setForm]           = useState({ employee_id: '', training_name: '', status: 'Enrolled', date: '' });
  const [errors, setErrors]       = useState({});

  useEffect(() => {
    api.getEmployees({ limit: 200 }).then(d => setEmployees(Array.isArray(d) ? d : [])).catch(() => {});
  }, []);

  const loadTrainings = async (id) => {
    setSelEmpId(id); if (!id) { setTrainings([]); return; }
    setLoading(true);
    try { setTrainings(await api.getTrainings(parseInt(id, 10))); }
    catch (e) { toast.error(e.message); }
    finally { setLoading(false); }
  };

  const submitTraining = async () => {
    const errs = {};
    if (!form.employee_id) errs.employee_id = 'Employee required';
    if (!form.training_name.trim()) errs.training_name = 'Training name required';
    if (!form.date) errs.date = 'Date required';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setFLoad(true);
    try {
      await api.createTraining({ employee_id: parseInt(form.employee_id, 10), training_name: form.training_name.trim(), status: form.status, date: form.date });
      toast.success('✓ Training record added');
      setAddOpen(false);
      setForm({ employee_id: '', training_name: '', status: 'Enrolled', date: '' });
      if (form.employee_id === selEmpId) loadTrainings(selEmpId);
    } catch (e) { toast.error(e.message); }
    finally { setFLoad(false); }
  };

  const statusColor = { Enrolled: T.blue, 'In Progress': T.yellow, Completed: T.green, Dropped: '#FFE0E0' };
  const statusText  = { Dropped: T.pinkD };

  const empName = (id) => employees.find(e => e.id === id)?.name || `#${id}`;

  return (
    <motion.div key="trainings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <PageHeader title="TRAININGS" subtitle="TRAINING_RECORDS"
        action={isAdmin && (
          <Btn onClick={() => setAddOpen(true)} bg={T.red} color="#fff" shadow={`4px 4px 0 ${T.ink}`}>+ ADD_TRAINING</Btn>
        )} />

      <div style={{ maxWidth: 380, marginBottom: 24 }}>
        <select style={selectStyle()} value={selEmpId} onChange={e => loadTrainings(e.target.value)}>
          <option value="">Select employee to view trainings...</option>
          {employees.map(e => <option key={e.id} value={e.id}>{e.name} — {e.role}</option>)}
        </select>
      </div>

      {loading ? <PageLoader /> : trainings.length === 0 ? selEmpId ? <EmptyMsg msg="No training records found." /> : <EmptyMsg msg="Select an employee above." /> : (
        <Card animate={false}>
          <Table
            headers={['ID', 'TRAINING', 'STATUS', 'DATE']}
            rows={trainings.map(t => [
              <span style={{ fontFamily: T.f2, fontSize: 10, color: T.inkL }}>#{t.id}</span>,
              <span style={{ fontFamily: T.f3, fontWeight: 700 }}>{t.training_name}</span>,
              <Badge label={t.status.toUpperCase()} color={statusColor[t.status] || T.blue}
                textColor={statusText[t.status] || T.ink} />,
              t.date,
            ])}
          />
        </Card>
      )}

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="ADD_TRAINING" subtitle="// add a training record">
        <Field label="EMPLOYEE" error={errors.employee_id}>
          <select style={selectStyle()} value={form.employee_id} onChange={e => setForm(p => ({ ...p, employee_id: e.target.value }))}>
            <option value="">Select employee...</option>
            {employees.map(e => <option key={e.id} value={e.id}>{e.name} — {e.role}</option>)}
          </select>
        </Field>
        <Field label="TRAINING_NAME" error={errors.training_name}>
          <input style={inputStyle(!!errors.training_name)} type="text" placeholder="e.g. AWS Cloud Practitioner"
            value={form.training_name} onChange={e => setForm(p => ({ ...p, training_name: e.target.value }))} />
        </Field>
        <Field label="STATUS">
          <select style={selectStyle()} value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>
            <option value="Enrolled">ENROLLED</option>
            <option value="In Progress">IN_PROGRESS</option>
            <option value="Completed">COMPLETED</option>
            <option value="Dropped">DROPPED</option>
          </select>
        </Field>
        <Field label="DATE" error={errors.date}>
          <input style={inputStyle(!!errors.date)} type="date"
            value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} />
        </Field>
        <Btn onClick={submitTraining} disabled={fLoad} bg={T.red} color="#fff"
          shadow={`4px 4px 0 ${T.ink}`} style={{ width: '100%', height: 44, marginTop: 4 }}>
          {fLoad ? <><InlineSpinner />SAVING...</> : 'ADD_TRAINING'}
        </Btn>
      </Modal>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ROUTER + ROOT
═══════════════════════════════════════════════════════════════════ */
function AppRoutes() {
  const { isAuth } = useAuth();

  return (
    <Routes>
      <Route path="/login"    element={!isAuth ? <LoginPage />    : <Navigate to="/dashboard" replace />} />
      <Route path="/register" element={!isAuth ? <RegisterPage /> : <Navigate to="/dashboard" replace />} />

      <Route path="/" element={<Protected><AppShell children={null} /></Protected>}>
        {/* nested — but we render AppShell per-page for simpler layout */}
      </Route>

      <Route path="/dashboard"    element={<Protected><AppShell><DashboardPage /></AppShell></Protected>} />
      <Route path="/employees"    element={<Protected><AppShell><EmployeesPage /></AppShell></Protected>} />
      <Route path="/reviews"      element={<Protected><AppShell><ReviewsPage /></AppShell></Protected>} />
      <Route path="/plans"        element={<Protected><AppShell><PlansPage /></AppShell></Protected>} />
      <Route path="/competencies" element={<Protected><AppShell><CompetenciesPage /></AppShell></Protected>} />
      <Route path="/trainings"    element={<Protected><AppShell><TrainingsPage /></AppShell></Protected>} />

      <Route path="*" element={<Navigate to={isAuth ? '/dashboard' : '/login'} replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <>
      <style>{CSS}</style>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
          <Toaster position="bottom-right" toastOptions={{
            style: { background: T.ink, color: T.pink, fontFamily: T.f2, fontSize: 12,
              border: `2px solid ${T.pinkM}`, borderRadius: 8, letterSpacing: 0.5 },
            success: { iconTheme: { primary: T.teal, secondary: T.ink } },
            error:   { iconTheme: { primary: T.pinkD, secondary: T.ink } },
          }} />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   GLOBAL CSS
═══════════════════════════════════════════════════════════════════ */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:ital,wght@0,400;0,600;0,700;1,400&family=Syne:wght@700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    background: #FFF8F5;
    color: #1A0A10;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }
  #root { min-height: 100vh; }

  @keyframes spin { to { transform: rotate(360deg); } }

  ::-webkit-scrollbar { width: 7px; }
  ::-webkit-scrollbar-track { background: #FFF0EB; }
  ::-webkit-scrollbar-thumb { background: #FFB6C1; border-radius: 4px; border: 2px solid #1A0A10; }

  ::selection { background: #FFB6C1; color: #1A0A10; }

  input:focus, select:focus, textarea:focus {
    outline: none !important;
    border-color: #1A0A10 !important;
    box-shadow: 3px 3px 0 #1A0A10 !important;
  }

  input::placeholder, textarea::placeholder { color: #B890A0; font-family: 'IBM Plex Mono', monospace; font-size: 12px; }
  select option { background: #FFF8F5; color: #1A0A10; }
  button { font-family: 'IBM Plex Mono', monospace; cursor: pointer; }
  textarea { font-family: 'IBM Plex Mono', monospace; resize: vertical; }
  a { text-decoration: none; color: inherit; }

  /* Responsive: hide desktop sidebar on small screens */
  @media (max-width: 768px) {
    .sidebar-desktop { display: none !important; }
  }
`;