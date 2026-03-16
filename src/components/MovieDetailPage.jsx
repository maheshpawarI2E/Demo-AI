import { styles } from "../styles/bookmyshow.styles.js";

export function MovieDetailPage({ selectedMovie, setPage }) {
  return (
    <div style={styles.app}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&display=swap" rel="stylesheet" />
      <nav style={styles.nav}>
        <div style={styles.logo}>bookmy<span>show</span></div>
        <button style={styles.backBtn} onClick={() => setPage("home")}>← Back</button>
      </nav>
      <div style={{ position: "relative" }}>
        <img src={selectedMovie.image} alt={selectedMovie.title}
          style={{ width: "100%", height: 420, objectFit: "cover", display: "block", filter: "brightness(0.3)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0d0d0f 40%, transparent)" }} />
        <div style={{ position: "absolute", bottom: 0, left: "5%", padding: "0 0 40px" }}>
          <div style={{ marginBottom: 12 }}>
            {selectedMovie.genre.map(g => (
              <span key={g} style={{ border: "1px solid rgba(255,255,255,0.2)", padding: "3px 10px", borderRadius: 10, fontSize: 11, marginRight: 8, color: "rgba(240,236,228,0.6)" }}>{g}</span>
            ))}
          </div>
          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)", fontWeight: 900, letterSpacing: -1, marginBottom: 10 }}>{selectedMovie.title}</h1>
          <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
            <div style={styles.rating}>⭐ {selectedMovie.rating}/10 • {selectedMovie.votes} Votes</div>
            <span style={{ color: "rgba(240,236,228,0.4)", fontSize: 13 }}>⏱ {selectedMovie.duration}</span>
            <span style={{ color: "rgba(240,236,228,0.4)", fontSize: 13 }}>{selectedMovie.language.join(" • ")}</span>
          </div>
        </div>
      </div>
      <div style={{ padding: "40px 5%" }}>
        <p style={{ color: "rgba(240,236,228,0.5)", lineHeight: 1.7, maxWidth: 600, marginBottom: 32 }}>
          An epic cinematic experience that pushes the boundaries of storytelling. Experience the magic of cinema in its full glory with stunning visuals, an immersive soundtrack, and a narrative that will stay with you long after the credits roll.
        </p>
        <button style={{ ...styles.primaryBtn, fontSize: 16, padding: "14px 36px" }} onClick={() => setPage("showtime")}>
          Book Tickets →
        </button>
      </div>
    </div>
  );
}
