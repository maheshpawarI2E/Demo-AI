export const movies = [
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

export const cities = ["Mumbai", "Delhi", "Bangalore", "Pune", "Chennai", "Hyderabad"];

export const dates = ["Today", "Tomorrow", "Wed, 26", "Thu, 27", "Fri, 28", "Sat, 1", "Sun, 2"];

export const timeSlots = ["10:00 AM", "1:15 PM", "4:30 PM", "7:45 PM", "10:30 PM"];

export const cinemas = [
  { name: "PVR ICON", location: "Andheri West", tags: ["Dolby Atmos", "4K"] },
  { name: "INOX Megaplex", location: "Lower Parel", tags: ["IMAX", "Recliner"] },
  { name: "Cinepolis Grand", location: "Thane", tags: ["4DX", "Dolby"] },
];

export const seats = {
  Premium: { price: 0, rows: ["A", "B"], cols: 10 },
  Executive: { price: -50, rows: ["C", "D", "E"], cols: 12 },
  Normal: { price: -100, rows: ["F", "G", "H", "I"], cols: 14 },
};

export const genres = ["All", "Action", "Sci-Fi", "Drama", "Thriller", "Fantasy", "History"];
