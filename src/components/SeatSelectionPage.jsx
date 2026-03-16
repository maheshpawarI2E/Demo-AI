import { styles } from "../styles/bookmyshow.styles.js";
import { seats } from "../data/bookmyshow.data.js";
import { calculateTotalPrice } from "../utils/bookmyshow.utils.js";

export function SeatSelectionPage({ selectedMovie, selectedCinema, selectedDate, selectedTime, selectedSeats, setSelectedSeats, takenSeats, setPage, handleBook }) {
  function toggleSeat(id) {
    setSelectedSeats(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : prev.length < 6 ? [...prev, id] : prev
    );
  }

  function getSeatCategory(seatId) {
    const row = seatId[0];
    for (const [cat, data] of Object.entries(seats)) {
      if (data.rows.includes(row)) return { cat, data };
    }
  }

  const totalPrice = calculateTotalPrice(selectedMovie, selectedSeats);

  return (
    <div style={styles.app}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&display=swap" rel="stylesheet" />
      <nav style={styles.nav}>
        <div style={styles.logo}>bookmy<span>show</span></div>
        <button style={styles.backBtn} onClick={() => setPage("showtime")}>← Back</button>
      </nav>
      <div style={{ maxWidth: 700, margin: "40px auto", padding: "0 20px" }}>
        <h2 style={{ textAlign: "center", fontSize: 22, fontWeight: 800, marginBottom: 6 }}>{selectedMovie?.title}</h2>
        <p style={{ textAlign: "center", color: "rgba(240,236,228,0.4)", fontSize: 13, marginBottom: 32 }}>
          {selectedCinema?.name} • {selectedDate} • {selectedTime}
        </p>

        {/* Screen */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ background: "linear-gradient(180deg, rgba(255,69,0,0.3), transparent)", height: 4, borderRadius: 4, marginBottom: 6 }} />
          <span style={{ fontSize: 11, color: "rgba(240,236,228,0.3)", letterSpacing: 4 }}>SCREEN</span>
        </div>

        {/* Legend */}
        <div style={styles.seatLegend}>
          {[["Available", "#2a2a2e"], ["Selected", "#ff4500"], ["Taken", "#333"]].map(([l, c]) => (
            <div key={l} style={styles.legendItem}>
              <div style={{ width: 14, height: 14, borderRadius: 4, background: c, border: c === "#2a2a2e" ? "1px solid rgba(255,255,255,0.2)" : "none" }} />
              {l}
            </div>
          ))}
        </div>

        {/* Seats */}
        {Object.entries(seats).map(([cat, data]) => (
          <div key={cat} style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 12 }}>
              <span style={{ color: "#ff8c00", fontWeight: 700 }}>{cat}</span>
              <span style={{ color: "rgba(240,236,228,0.4)" }}>₹{selectedMovie.price + data.price}</span>
            </div>
            {data.rows.map(row => (
              <div key={row} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6, justifyContent: "center" }}>
                <span style={{ fontSize: 11, color: "rgba(240,236,228,0.3)", width: 16 }}>{row}</span>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap", justifyContent: "center" }}>
                  {Array.from({ length: data.cols }, (_, i) => {
                    const id = `${row}${i + 1}`;
                    const taken = takenSeats.has(id);
                    const selected = selectedSeats.includes(id);
                    return (
                      <div key={id} onClick={() => !taken && toggleSeat(id)}
                        title={id}
                        style={{
                          width: 22, height: 22, borderRadius: 5,
                          background: taken ? "#2a2a2e" : selected ? "#ff4500" : "#2a2a2e",
                          border: taken ? "1px solid #222" : selected ? "none" : "1px solid rgba(255,255,255,0.18)",
                          cursor: taken ? "not-allowed" : "pointer",
                          opacity: taken ? 0.4 : 1,
                          transition: "all 0.15s",
                        }} />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ))}

        {/* Sticky Footer */}
        {selectedSeats.length > 0 && (
          <div style={{
            position: "sticky", bottom: 20, background: "#161618",
            border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20,
            padding: "16px 24px", display: "flex", justifyContent: "space-between",
            alignItems: "center", marginTop: 32, boxShadow: "0 20px 60px rgba(0,0,0,0.5)"
          }}>
            <div>
              <div style={{ fontSize: 11, color: "rgba(240,236,228,0.4)", marginBottom: 4 }}>
                {selectedSeats.length} seat{selectedSeats.length > 1 ? "s" : ""} • {selectedSeats.join(", ")}
              </div>
              <div style={{ fontWeight: 800, fontSize: 20 }}>₹{totalPrice}</div>
            </div>
            <button style={styles.primaryBtn} onClick={handleBook}>Pay Now →</button>
          </div>
        )}
      </div>
    </div>
  );
}
