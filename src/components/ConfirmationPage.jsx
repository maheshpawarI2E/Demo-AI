import { styles } from "../styles/bookmyshow.styles.js";
import { generateConfirmationNumber } from "../utils/bookmyshow.utils.js";

export function ConfirmationPage({ selectedMovie, selectedDate, selectedTime, selectedCinema, selectedSeats, totalPrice, setPage, setSelectedMovie, setSelectedSeats, setSelectedCinema, setSelectedTime, setBookingDone }) {
  const confNum = generateConfirmationNumber();

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
