// src/pages/AddTiming.js
import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './addclasstimings.css';

const STORAGE_KEY = 'classTimings';

export default function AddTiming() {
  /* ─────────── State ─────────── */
  const [form, setForm] = useState({
    noOfPeriods: '',
    timing: '',
    daysOfWeek: '',
    teaBreak: '',
    lunchBreak: '',
  });
  const [timings, setTimings] = useState([]);

  /* ─────────── Load from localStorage ─────────── */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      setTimings(raw ? JSON.parse(raw) : []);
    } catch (err) {
      console.warn('Could not parse saved classTimings, clearing it.');
      localStorage.removeItem(STORAGE_KEY);
      setTimings([]);
    }
  }, []);

  /* ─────────── Persist on every change ─────────── */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(timings));
  }, [timings]);

  /* ─────────── Helpers ─────────── */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.id]: e.target.value });

  const resetForm = () =>
    setForm({
      noOfPeriods: '',
      timing: '',
      daysOfWeek: '',
      teaBreak: '',
      lunchBreak: '',
    });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(form).some((v) => v.trim() === '')) {
      alert('All fields are required');
      return;
    }

    const next = [...timings, { ...form, id: crypto.randomUUID() }];
    setTimings(next);                                           // update UI quickly
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));    // persist immediately
    resetForm();
  };

  const handleDelete = (id) => {
    const next = timings.filter((t) => t.id !== id);
    setTimings(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));    // keep storage in sync
  };

  /* ─────────── UI ─────────── */
  return (
    <div className="page-wrapper">
      <Sidebar />

      <div className="content-area">
        {/* LEFT — Form */}
        <div className="left-pane">
          <h2 className="form-title">Add Class Timing</h2>

          <form onSubmit={handleSubmit} className="timing-form">
            <div className="field-group">
              <label>No. of Periods</label>
              <input
                id="noOfPeriods"
                type="number"
                value={form.noOfPeriods}
                onChange={handleChange}
                placeholder="e.g. 8"
              />
            </div>

            <div className="field-group">
              <label>Overall Timing</label>
              <input
                id="timing"
                type="text"
                value={form.timing}
                onChange={handleChange}
                placeholder="e.g. 8 AM – 3 PM"
              />
            </div>

            <div className="field-group">
              <label>Days of Week</label>
              <input
                id="daysOfWeek"
                type="text"
                value={form.daysOfWeek}
                onChange={handleChange}
                placeholder="Mon – Fri"
              />
            </div>

            <div className="field-group">
              <label>Tea Break</label>
              <input
                id="teaBreak"
                type="text"
                value={form.teaBreak}
                onChange={handleChange}
                placeholder="10:30 AM – 10:45 AM"
              />
            </div>

            <div className="field-group">
              <label>Lunch Break</label>
              <input
                id="lunchBreak"
                type="text"
                value={form.lunchBreak}
                onChange={handleChange}
                placeholder="1 PM – 1:30 PM"
              />
            </div>

            <button className="primary-btn" type="submit">
              <i className="bi bi-plus-circle me-1" /> Add Class Timing
            </button>
          </form>
        </div>

        {/* RIGHT — List */}
        <div className="right-pane">
          <h2 className="list-title">Class Timings List</h2>

          {timings.length === 0 ? (
            <p className="empty-state">No class timings yet.</p>
          ) : (
            timings.map((t) => (
              <div className="card timing-card" key={t.id}>
                <div className="card-body d-flex justify-content-between">
                  <div>
                    <p><strong>Periods:</strong> {t.noOfPeriods}</p>
                    <p><strong>Timing:</strong> {t.timing}</p>
                    <p><strong>Days:</strong> {t.daysOfWeek}</p>
                    <p><strong>Tea Break:</strong> {t.teaBreak}</p>
                    <p><strong>Lunch Break:</strong> {t.lunchBreak}</p>
                  </div>

                  <button
                    className="icon-btn text-danger"
                    title="Delete"
                    onClick={() => handleDelete(t.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
