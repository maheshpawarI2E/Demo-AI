import { styles } from "../styles/bookmyshow.styles.js";
import { dates, timeSlots, cinemas } from "../data/bookmyshow.data.js";

export function ShowtimeSelectionPage({ selectedCity, selectedDate, setSelectedDate, selectedCinema, setSelectedCinema, selectedTime, setSelectedTime, setPage }) {
  return (
    <div style={styles.app}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&display=swap" rel="stylesheet" />
      <nav style={styles.nav}>
        <div style={styles.logo}>bookmy<span>show</span></div>
        <button style={styles.backBtn} onClick={() => setPage("detail")}>← Back</button>
      </nav>

      {/* Date Picker */}
      <div style={{ padding: "32px 5% 0" }}>
        <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 20 }}>Select Date</h2>
        <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 8 }}>
          {dates.map(d => (
            <button key={d} onClick={() => setSelectedDate(d)}
              style={{ ...styles.filterChip, ...(d === selectedDate ? styles.filterChipActive : {}), whiteSpace: "nowrap", minWidth: 80 }}>
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Cinemas */}
      <div style={{ padding: "32px 5% 60px" }}>
        <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 20 }}>Cinemas in {selectedCity}</h2>
        {cinemas.map(cinema => (
          <div key={cinema.name} style={{ background: "#161618", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 20, marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 16 }}>{cinema.name}</div>
                <div style={{ color: "rgba(240,236,228,0.4)", fontSize: 12, marginTop: 2 }}>{cinema.location}</div>
              </div>
              <div style={{ display: "flex", gap: 6, alignItems: "flex-start" }}>
                {cinema.tags.map(t => (
                  <span key={t} style={{ background: "rgba(255,140,0,0.1)", border: "1px solid rgba(255,140,0,0.2)", color: "#ff8c00", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 8 }}>{t}</span>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {timeSlots.map(t => (
                <button key={t} onClick={() => { setSelectedCinema(cinema); setSelectedTime(t); setPage("seats"); }}
                  style={{
                    border: "1px solid rgba(255,69,0,0.4)", background: "rgba(255,69,0,0.07)",
                    color: "#ff8c00", padding: "8px 14px", borderRadius: 10, cursor: "pointer",
                    fontSize: 13, fontWeight: 700
                  }}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
