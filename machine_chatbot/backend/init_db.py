import sqlite3
from datetime import datetime
import uuid

# Connect to SQLite DB (will be created if not exists)
conn = sqlite3.connect("backend/db/machine_metadata.db")
cursor = conn.cursor()

# Create machines table
cursor.execute("""
CREATE TABLE IF NOT EXISTS machines (
    machine_id TEXT PRIMARY KEY,
    machine_name TEXT,
    machine_type TEXT,
    manual_path TEXT,
    created_at TEXT
)
""")

# Insert machine records
machines = [
    ("CNC Machine", "Manufacturing", "data/cnc_machine/cnc_manual.txt"),
    ("Lathe Machine", "Manufacturing", "data/lathe_machine/lathe_manual.txt"),
    ("Drilling Machine", "Manufacturing", "data/drilling_machine/drilling_manual.txt"),
]

for machine in machines:
    cursor.execute("""
    INSERT INTO machines VALUES (?, ?, ?, ?, ?)
    """, (
        str(uuid.uuid4()),
        machine[0],
        machine[1],
        machine[2],
        datetime.now().isoformat()
    ))

conn.commit()
conn.close()

print("✅ Machine metadata database created successfully")
