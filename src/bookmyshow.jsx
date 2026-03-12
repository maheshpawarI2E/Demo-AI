import { useState } from "react";

const movies = [
  {
    id: 1,
    title: "Dune: Part Two",
    genre: ["Sci-Fi", "Adventure"],
    rating: 8.8,
    duration: "2h 46m",
    language: ["English", "Hindi"],
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=560&fit=crop",
    price: 250,
    votes: "42K",
    tag: "Blockbuster",
  },
  {
    id: 2,
    title: "Oppenheimer",
    genre: ["Drama", "History"],
    rating: 8.9,
    duration: "3h 0m",
    language: ["English", "Hindi"],
    image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=560&fit=crop",
    price: 300,
    votes: "88K",
    tag: "Oscar Winner",
  },
  {
    id: 3,
    title: "Avatar: Fire & Ash",
    genre: ["Action", "Fantasy"],
    rating: 7.9,
    duration: "2h 30m",
    language: ["English", "Hindi", "Tamil"],
    image: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=400&h=560&fit=crop",
    price: 350,
    votes: "55K",
    tag: "3D",
  },
  {
    id: 4,
    title: "The Batman Returns",
    genre: ["Action", "Thriller"],
    rating: 8.3,
    duration: "2h 50m",
    language: ["English", "Hindi"],
    image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=560&fit=crop",
    price: 280,
    votes: "61K",
    tag: "Trending",
  },
  {
    id: 5,
    title: "Sholay Redux",
    genre: ["Action", "Drama"],
    rating: 9.0,
    duration: "2h 20m",
    language: ["Hindi"],
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=560&fit=crop",
    price: 200,
    votes: "120K",
    tag: "Classic",
  },
  {
    id: 6,
    title: "Interstellar 2",
    genre: ["Sci-Fi", "Drama"],
    rating: 8.6,
    duration: "2h 55m",
    language: ["English", "Hindi"],
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=560&fit=crop",
    price: 320,
    votes: "38K",
    tag: "New",
  },
];

const cities = ["Mumbai", "Delhi", "Bangalore", "Pune", "Chennai", "Hyderabad"];
const dates = ["Today", "Tomorrow", "Wed, 26", "Thu, 27", "Fri, 28", "Sat, 1", "Sun, 2"];
const timeSlots = ["10:00 AM", "1:15 PM", "4:30 PM", "7:45 PM", "10:30 PM"];

const cinemas = [
  { name: "PVR ICON", location: "Andheri West", tags: ["Dolby Atmos", "4K"] },
  { name: "INOX Megaplex", location: "Lower Parel", tags: ["IMAX", "Recliner"] },
  { name: "Cinepolis Grand", location: "Thane", tags: ["4DX", "Dolby"] },
];

const seats = {
  Premium: { price: 0, rows: ["A", "B"], cols: 10 },
  Executive: { price: -50, rows: ["C", "D", "E"], cols: 12 },
  Normal: { price: -100, rows: ["F", "G", "H", "I"], cols: 14 },
};

function generateSeats() {
  const taken = new Set();
  for (let i = 0; i < 25; i++) {
    const cats = Object.values(seats);
    const cat = cats[Math.floor(Math.random() * cats.length)];
    const row = cat.rows[Math.floor(Math.random() * cat.rows.length)];
    const col = Math.floor(Math.random() * cat.cols) + 1;
    taken.add(`${row}${col}`);
  }
  return taken;
}

const takenSeats = generateSeats();

export default function BookMyShow() {
  const [page, setPage] = useState("home");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedCity, setSelectedCity] = useState("Mumbai");
  const [showCityPicker, setShowCityPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState("Today");
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookingDone, setBookingDone] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGenre, setFilterGenre] = useState("All");

  const genres = ["All", "Action", "Sci-Fi", "Drama", "Thriller", "Fantasy", "History"];

  const filteredMovies = movies.filter(m => {
    const matchSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchGenre = filterGenre === "All" || m.genre.includes(filterGenre);
    return matchSearch && matchGenre;
  });

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

  const totalPrice = selectedMovie
    ? selectedSeats.reduce((sum, s) => {
        const { data } = getSeatCategory(s) || { data: { price: 0 } };
        return sum + selectedMovie.price + data.price;
      }, 0)
    : 0;

  function handleBook() {
    setBookingDone(true);
    setPage("confirmation");
  }

  const styles = {
    app: {
      fontFamily: "'Syne', 'Poppins', sans-serif",
      background: "#0d0d0f",
      minHeight: "100vh",
      color: "#f0ece4",
    },
    nav: {
      background: "linear-gradient(180deg, #1a0a00 0%, rgba(13,13,15,0) 100%)",
      padding: "0 5%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: 64,
      position: "sticky",
      top: 0,
      zIndex: 100,
      backdropFilter: "blur(10px)",
      borderBottom: "1px solid rgba(255,69,0,0.15)",
    },
    logo: {
      fontSize: 22,
      fontWeight: 800,
      letterSpacing: "-1px",
      background: "linear-gradient(135deg, #ff4500, #ff8c00)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    cityBtn: {
      background: "rgba(255,69,0,0.1)",
      border: "1px solid rgba(255,69,0,0.3)",
      color: "#ff8c00",
      padding: "6px 14px",
      borderRadius: 20,
      cursor: "pointer",
      fontSize: 13,
      fontWeight: 600,
    },
    searchBar: {
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: 24,
      padding: "8px 18px",
      color: "#f0ece4",
      fontSize: 14,
      width: 260,
      outline: "none",
    },
    hero: {
      padding: "60px 5% 40px",
      textAlign: "center",
    },
    heroTitle: {
      fontSize: "clamp(2rem, 5vw, 4rem)",
      fontWeight: 900,
      letterSpacing: "-2px",
      lineHeight: 1,
      marginBottom: 12,
    },
    heroSub: {
      color: "rgba(240,236,228,0.5)",
      fontSize: 15,
      marginBottom: 32,
    },
    filterRow: {
      display: "flex",
      gap: 10,
      justifyContent: "center",
      flexWrap: "wrap",
      marginBottom: 40,
    },
    filterChip: {
      padding: "6px 18px",
      borderRadius: 20,
      border: "1px solid rgba(255,255,255,0.12)",
      background: "rgba(255,255,255,0.05)",
      color: "rgba(240,236,228,0.7)",
      cursor: "pointer",
      fontSize: 13,
      fontWeight: 600,
      transition: "all 0.2s",
    },
    filterChipActive: {
      background: "linear-gradient(135deg, #ff4500, #ff8c00)",
      border: "1px solid transparent",
      color: "#fff",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      gap: 24,
      padding: "0 5% 60px",
    },
    card: {
      borderRadius: 16,
      overflow: "hidden",
      cursor: "pointer",
      background: "#161618",
      border: "1px solid rgba(255,255,255,0.06)",
      transition: "transform 0.25s, box-shadow 0.25s",
      position: "relative",
    },
    cardImg: {
      width: "100%",
      height: 280,
      objectFit: "cover",
      display: "block",
    },
    cardTag: {
      position: "absolute",
      top: 12,
      left: 12,
      background: "linear-gradient(135deg, #ff4500, #ff8c00)",
      color: "#fff",
      fontSize: 10,
      fontWeight: 800,
      padding: "3px 9px",
      borderRadius: 10,
      letterSpacing: "0.5px",
    },
    cardBody: {
      padding: 14,
    },
    rating: {
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      background: "rgba(255,140,0,0.12)",
      border: "1px solid rgba(255,140,0,0.2)",
      padding: "2px 8px",
      borderRadius: 8,
      fontSize: 12,
      color: "#ff8c00",
      fontWeight: 700,
      marginBottom: 8,
    },
    primaryBtn: {
      background: "linear-gradient(135deg, #ff4500, #ff8c00)",
      color: "#fff",
      border: "none",
      padding: "12px 28px",
      borderRadius: 28,
      fontWeight: 800,
      fontSize: 14,
      cursor: "pointer",
      letterSpacing: "0.5px",
    },
    backBtn: {
      background: "rgba(255,255,255,0.08)",
      border: "1px solid rgba(255,255,255,0.12)",
      color: "#f0ece4",
      padding: "8px 18px",
      borderRadius: 20,
      cursor: "pointer",
      fontWeight: 600,
      fontSize: 13,
    },
    seatLegend: {
      display: "flex",
      gap: 20,
      justifyContent: "center",
      marginBottom: 24,
      flexWrap: "wrap",
    },
    legendItem: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      fontSize: 12,
      color: "rgba(240,236,228,0.6)",
    },
  };

  // City Picker Modal
  if (showCityPicker) {
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

  // Confirmation Page
  if (page === "confirmation") {
    const confNum = "BMS" + Math.random().toString(36).substr(2, 8).toUpperCase();
    return (
      <div style={styles.app}>
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&display=swap" rel="stylesheet" />
        <nav style={styles.nav}>
          <div style={styles.logo}>bookmy<span>show</span></div>
        </nav>
        <div style={{ maxWidth: 480, margin: "60px auto", padding: "0 20px", textAlign: "center" }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
          <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 8 }}>Booking Confirmed!</h1>
          <p style={{ color: "rgba(240,236,228,0.5)", marginBottom: 32 }}>Get ready for an amazing experience</p>
          <div style={{ background: "#161618", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: 28, marginBottom: 24, textAlign: "left" }}>
            <div style={{ fontSize: 11, color: "#ff8c00", fontWeight: 800, letterSpacing: 2, marginBottom: 16 }}>BOOKING DETAILS</div>
            {[
              ["Movie", selectedMovie?.title],
              ["Date & Time", `${selectedDate}, ${selectedTime}`],
              ["Venue", `${selectedCinema?.name}, ${selectedCinema?.location}`],
              ["Seats", selectedSeats.join(", ")],
              ["Amount Paid", `₹${totalPrice}`],
              ["Booking ID", confNum],
            ].map(([label, val]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontSize: 14 }}>
                <span style={{ color: "rgba(240,236,228,0.5)" }}>{label}</span>
                <span style={{ fontWeight: 700 }}>{val}</span>
              </div>
            ))}
          </div>
          <button style={styles.primaryBtn} onClick={() => {
            setPage("home"); setSelectedMovie(null); setSelectedSeats([]);
            setSelectedCinema(null); setSelectedTime(null); setBookingDone(false);
          }}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Seat Selection Page
  if (page === "seats") {
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

  // Showtime Selection Page
  if (page === "showtime") {
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

  // Movie Detail Page
  if (page === "detail" && selectedMovie) {
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

  // Home Page
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
        <button style={styles.cityBtn} onClick={() => setShowCityPicker(true)}>
          📍 {selectedCity}
        </button>
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
