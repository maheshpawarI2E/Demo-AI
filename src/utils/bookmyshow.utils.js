import { seats } from "../data/bookmyshow.data.js";

export function generateSeats() {
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

export function getSeatCategory(seatId) {
  const row = seatId[0];
  for (const [cat, data] of Object.entries(seats)) {
    if (data.rows.includes(row)) return { cat, data };
  }
}

export function calculateTotalPrice(selectedMovie, selectedSeats) {
  if (!selectedMovie) return 0;
  return selectedSeats.reduce((sum, s) => {
    const { data } = getSeatCategory(s) || { data: { price: 0 } };
    return sum + selectedMovie.price + data.price;
  }, 0);
}

export function generateConfirmationNumber() {
  return "BMS" + Math.random().toString(36).substr(2, 8).toUpperCase();
}
