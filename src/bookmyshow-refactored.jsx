import { useState } from "react";
import { HomePage } from "./components/HomePage.jsx";
import { MovieDetailPage } from "./components/MovieDetailPage.jsx";
import { ShowtimeSelectionPage } from "./components/ShowtimeSelectionPage.jsx";
import { SeatSelectionPage } from "./components/SeatSelectionPage.jsx";
import { ConfirmationPage } from "./components/ConfirmationPage.jsx";
import { CityPickerModal } from "./components/CityPickerModal.jsx";
import { generateSeats } from "./utils/bookmyshow.utils.js";

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

  function handleBook() {
    setBookingDone(true);
    setPage("confirmation");
  }

  // City Picker Modal
  if (showCityPicker) {
    return (
      <CityPickerModal
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        setShowCityPicker={setShowCityPicker}
      />
    );
  }

  // Confirmation Page
  if (page === "confirmation") {
    return (
      <ConfirmationPage
        selectedMovie={selectedMovie}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        selectedCinema={selectedCinema}
        selectedSeats={selectedSeats}
        totalPrice={selectedSeats.reduce((sum, s) => {
          // Calculate total price here
          const row = s[0];
          const seats = {
            Premium: { price: 0, rows: ["A", "B"], cols: 10 },
            Executive: { price: -50, rows: ["C", "D", "E"], cols: 12 },
            Normal: { price: -100, rows: ["F", "G", "H", "I"], cols: 14 },
          };
          for (const [cat, data] of Object.entries(seats)) {
            if (data.rows.includes(row)) return sum + selectedMovie.price + data.price;
          }
          return sum;
        }, 0)}
        setPage={setPage}
        setSelectedMovie={setSelectedMovie}
        setSelectedSeats={setSelectedSeats}
        setSelectedCinema={setSelectedCinema}
        setSelectedTime={setSelectedTime}
        setBookingDone={setBookingDone}
      />
    );
  }

  // Seat Selection Page
  if (page === "seats") {
    return (
      <SeatSelectionPage
        selectedMovie={selectedMovie}
        selectedCinema={selectedCinema}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        selectedSeats={selectedSeats}
        setSelectedSeats={setSelectedSeats}
        takenSeats={takenSeats}
        setPage={setPage}
        handleBook={handleBook}
      />
    );
  }

  // Showtime Selection Page
  if (page === "showtime") {
    return (
      <ShowtimeSelectionPage
        selectedCity={selectedCity}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedCinema={selectedCinema}
        setSelectedCinema={setSelectedCinema}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        setPage={setPage}
      />
    );
  }

  // Movie Detail Page
  if (page === "detail" && selectedMovie) {
    return (
      <MovieDetailPage
        selectedMovie={selectedMovie}
        setPage={setPage}
      />
    );
  }

  // Home Page (Default)
  return (
    <HomePage
      selectedCity={selectedCity}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      setShowCityPicker={setShowCityPicker}
      filterGenre={filterGenre}
      setFilterGenre={setFilterGenre}
      setSelectedMovie={setSelectedMovie}
      setPage={setPage}
    />
  );
}
