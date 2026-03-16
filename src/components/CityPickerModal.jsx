import { styles } from "../styles/bookmyshow.styles.js";
import { cities } from "../data/bookmyshow.data.js";

export function CityPickerModal({ selectedCity, setSelectedCity, setShowCityPicker }) {
  return (
    <div style={{ ...styles.app, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&display=swap" rel="stylesheet" />
      <div style={{ background: "#161618", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: 40, width: 400, maxWidth: "90vw" }}>
        <h2 style={{ margin: "0 0 24px", fontSize: 22, fontWeight: 800 }}>Select Your City</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {cities.map(c => (
            <button key={c} onClick={() => { setSelectedCity(c); setShowCityPicker(false); }}
              style={{ ...styles.filterChip, ...(c === selectedCity ? styles.filterChipActive : {}), textAlign: "center", padding: "12px" }}>
              {c}
            </button>
          ))}
        </div>
        <button onClick={() => setShowCityPicker(false)} style={{ ...styles.backBtn, marginTop: 20, width: "100%" }}>Cancel</button>
      </div>
    </div>
  );
}
