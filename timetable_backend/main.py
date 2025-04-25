from flask import Flask, request, jsonify
from flask_cors import CORS
from app.timetable_generator import generate_timetable
import json, traceback

app = Flask(__name__)
CORS(app)              # allow all origins

@app.route("/api/generate-timetable", methods=["POST"])
def generate():
    try:
        data = request.get_json()
        print("📦 Received:", json.dumps(data, indent=2))

        if not data:
            return jsonify({"status": "error", "message": "No data provided"}), 400

        # ── call core solver ───────────────────────────────────────────────
        timetable = generate_timetable(data)

        if timetable is None:
            return jsonify({
                "status":  "error",
                "message": ("No feasible timetable could be generated. "
                            "Check course durations, available slots, or "
                            "teacher / classroom constraints.")
            }), 400

        # ── reshape for the frontend ──────────────────────────────────────
        result = [
            {
                "day"        : e["day"],
                "period"     : e["period"],
                "course_code": e["course_code"],           # short code  (CS 3245)
                "course_title": e.get("course_title", ""), # long title (optional)
                "teacher"    : e.get("teacher_name", "N/A"),
                "classroom"  : e.get("room_id", "N/A"),
            }
            for e in timetable
        ]

        return jsonify({"status": "success", "timetable": result}), 200

    except Exception as exc:
        print("❌ Error:", exc)
        traceback.print_exc()
        return jsonify({"status": "error", "message": str(exc)}), 500


if __name__ == "__main__":
    app.run(debug=True)
