import { styles } from "../styles/bookmyshow.styles.js";
import { movies, genres } from "../data/bookmyshow.data.js";

export function HomePage({ selectedCity, searchQuery, setSearchQuery, setShowCityPicker, filterGenre, setFilterGenre, setSelectedMovie, setPage, isAuthenticated, userName, setShowLoginModal, handleLogout }) {
  const filteredMovies = movies.filter(m => {
    const matchSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchGenre = filterGenre === "All" || m.genre.includes(filterGenre);
    return matchSearch && matchGenre;
  });

  return (
    <div style={styles.app}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&display=swap" rel="stylesheet" />
      <nav style={styles.nav}>
        <div style={styles.logo}>bookmy<span>show</span></div>
        <input
          style={styles.searchBar}
          placeholder="🔍 Search movies..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button style={styles.cityBtn} onClick={() => setShowCityPicker(true)}>
            📍 {selectedCity}
          </button>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            paddingLeft: 12,
            borderLeft: "1px solid rgba(255,255,255,0.1)"
          }}>
            {isAuthenticated ? (
              <>
                <span style={{ fontSize: 13, color: "rgba(240,236,228,0.7)" }}>
                  👤 {userName}
                </span>
                <button
                  onClick={handleLogout}
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "#f0ece4",
                    padding: "6px 12px",
                    borderRadius: 20,
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: 12,
                    transition: "all 0.3s"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "rgba(255,69,0,0.2)";
                    e.target.style.borderColor = "rgba(255,69,0,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "rgba(255,255,255,0.08)";
                    e.target.style.borderColor = "rgba(255,255,255,0.12)";
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                style={{
                  background: "linear-gradient(135deg, #ff4500, #ff8c00)",
                  border: "none",
                  color: "#fff",
                  padding: "8px 16px",
                  borderRadius: 20,
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: 12,
                  transition: "all 0.3s"
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                }}
              >
                🎟️ Login
              </button>
            )}
          </div>
        </div>
      </nav>

      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>
          <span style={{ background: "linear-gradient(135deg, #ff4500, #ff8c00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Movies.
          </span>{" "}
          Events. Experiences.
        </h1>
        <p style={styles.heroSub}>Book the best seats in the house</p>
        <div style={styles.filterRow}>
          {genres.map(g => (
            <button key={g} style={{ ...styles.filterChip, ...(g === filterGenre ? styles.filterChipActive : {}) }}
              onClick={() => setFilterGenre(g)}>
              {g}
            </button>
          ))}
        </div>
      </div>

      {filteredMovies.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "rgba(240,236,228,0.3)" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🎬</div>
          No movies found
        </div>
      ) : (
        <div style={styles.grid}>
          {filteredMovies.map(m => (
            <div key={m.id} style={styles.card}
              onClick={() => { setSelectedMovie(m); setPage("detail"); }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 20px 60px rgba(255,69,0,0.2)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ position: "relative" }}>
                <img src={m.image} alt={m.title} style={styles.cardImg} />
                <div style={styles.cardTag}>{m.tag}</div>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #161618 0%, transparent 50%)" }} />
              </div>
              <div style={styles.cardBody}>
                <div style={styles.rating}>⭐ {m.rating}</div>
                <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 6, lineHeight: 1.2 }}>{m.title}</div>
                <div style={{ color: "rgba(240,236,228,0.4)", fontSize: 11, marginBottom: 14 }}>
                  {m.genre.join(" · ")} • {m.duration}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 700, color: "#ff8c00", fontSize: 14 }}>₹{m.price}</span>
                  <button style={{ ...styles.primaryBtn, padding: "7px 16px", fontSize: 12 }}
                    onClick={e => { e.stopPropagation(); setSelectedMovie(m); setPage("showtime"); }}>
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
