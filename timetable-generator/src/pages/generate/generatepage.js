import React, { useRef, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./generatepage.css";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const cols = ["I", "II", "BREAK", "III", "IV", "LUNCH", "V", "VI", "VII"];
const times = [
  "09:00am‑09:50am", "09:50am‑10:40am", "",
  "11:00am‑11:50am", "11:50am‑12:40pm", "",
  "1:30pm‑2:20pm", "2:20pm‑3:10pm", "3:10pm‑4:00pm"
];
const mapCol = { 1: 0, "1": 0, 2: 1, "2": 1, 3: 3, "3": 3, 4: 4, "4": 4, 5: 6, "5": 6, 6: 7, "6": 7, 7: 8, "7": 8 };
const normDay = d => d.trim().toLowerCase().replace(/^\w/, c => c.toUpperCase());

export default function GeneratePage() {
  const sheetRef = useRef(null);
  const { state } = useLocation();
  const navigate = useNavigate();
  const [department, setDepartment] = useState(null);

  const raw = state?.timetable ?? JSON.parse(sessionStorage.getItem("latestTimetable") || "{}").timetable;
  const sessions = Array.isArray(raw) ? raw : [];

  // Get department from localStorage (latest one)
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("departments")) || [];
    if (stored.length > 0) setDepartment(stored[stored.length - 1]);
  }, []);

  if (!sessions.length) {
    return (
      <div className="center-box">
        <p>No timetable.</p>
        <button onClick={() => navigate("/")} className="back-btn">Back</button>
      </div>
    );
  }

  const grid = Array.from({ length: 6 }, () => Array.from({ length: 9 }, () => []));
  sessions.forEach(s => {
    const r = days.indexOf(normDay(s.day));
    const c = mapCol[s.period];
    if (r > -1 && c !== undefined) grid[r][c].push(s);
  });

  const handleDownload = async () => {
    const sheet = sheetRef.current;
    if (!sheet) return;
    sheet.classList.add("downloading");

    try {
      await document.fonts?.ready;
      const logo = sheet.querySelector("img.logo");
      if (logo && !logo.complete) await new Promise(r => (logo.onload = r));

      const canvas = await html2canvas(sheet, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#ffffff",
        scrollY: -window.scrollY,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("Timetable.pdf");
    } catch (err) {
      console.error("PDF export failed:", err);
      alert("Sorry—couldn’t create the PDF. Check the console for details.");
    } finally {
      sheet.classList.remove("downloading");
    }
  };

  return (
    <div ref={sheetRef} className="sheet">
      {/* ---------- Heading & Logo ---------- */}
      <div className="heading">
        <img src="/logo/finalimg.png" alt="logo" className="logo" />
      </div>

      {/* ---------- Department Details ---------- */}
      {department && (
        <div className="dept-details">
          <p><strong>Department:</strong> {department.deptName}</p>
          <p><strong>Degree:</strong> {department.degree}</p>
          <p><strong>Academic Year:</strong> {department.academicYear}</p>
          <p><strong>Semester:</strong> {department.semester}</p>
        </div>
      )}

      {/* ---------- Buttons ---------- */}
      <div className="actions">
        <button onClick={handleDownload} className="download-btn">Download PDF</button>
        <button onClick={() => navigate("/")} className="back-btn">Back</button>
      </div>

      {/* ---------- Timetable ---------- */}
      <div className="table-wrap">
        <table className="tt">
          <thead>
            <tr>
              <th rowSpan="2" className="day-col">Day / Time</th>
              {cols.map(c => (
                <th key={c} className={c === "BREAK" ? "break-col" : c === "LUNCH" ? "lunch-col" : ""}>{c}</th>
              ))}
            </tr>
            <tr className="time-row">
              {times.map((t, i) => (
                <th key={i} className={t === "" ? "blank" : ""}>{t}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {grid.map((row, r) => (
              <tr key={r}>
                <td className="day-name">{days[r]}</td>
                {row.map((cell, c) => {
                  if (c === 2) return <td key={c} className="break-cell">BREAK</td>;
                  if (c === 5) return <td key={c} className="break-cell">LUNCH</td>;
                  return (
                    <td key={c} className="session-cell">
                      {cell.map((s, i) => (
                        <div key={i} className="session">
                          <span className="sub">{s.course_code}</span><br />
                          {(s.teacher_name || s.teacher) && <span className="staff">{s.teacher_name || s.teacher}</span>}
                          {s.room_id && <><br /><span className="room">{s.room_id}</span></>}
                        </div>
                      ))}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------- Legend ---------- */}
      <table className="legend">
        <thead>
          <tr><th>S.No</th><th>Code</th><th>Subject</th><th>Staff</th></tr>
        </thead>
        <tbody>
          {sessions
            .filter((v, i, a) => a.findIndex(x => x.course_code === v.course_code) === i)
            .map((s, i) => (
              <tr key={s.course_code}>
                <td>{i + 1}</td>
                <td>{s.course_code}</td>
                <td>{s.course_title || "—"}</td>
                <td>{s.teacher_name || s.teacher}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
