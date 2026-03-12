import { useState, useRef, useEffect } from "react";

const INITIAL_USERS = [
  { id: 1, username: "aurora.lens", name: "Aurora Lens", avatar: "https://i.pravatar.cc/150?img=1", bio: "📸 Visual storyteller", followers: 12400, following: 342, verified: true },
  { id: 2, username: "drift.wood", name: "Drift Wood", avatar: "https://i.pravatar.cc/150?img=3", bio: "🌊 Ocean chaser", followers: 8900, following: 210, verified: false },
  { id: 3, username: "neon.bloom", name: "Neon Bloom", avatar: "https://i.pravatar.cc/150?img=5", bio: "🌸 Floral & minimal", followers: 24100, following: 89, verified: true },
  { id: 4, username: "you", name: "You", avatar: "https://i.pravatar.cc/150?img=7", bio: "✨ Living the moment", followers: 542, following: 198, verified: false },
];

const INITIAL_POSTS = [
  {
    id: 1, userId: 1,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    caption: "Lost in the mountains 🏔️ Every summit starts with a single step.",
    likes: 1243, likedBy: [], comments: [
      { id: 1, userId: 2, text: "Absolutely breathtaking! 😍", time: "2h" },
      { id: 2, userId: 3, text: "Need to visit this place!", time: "1h" },
    ], time: "3h", saved: false,
  },
  {
    id: 2, userId: 2,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
    caption: "Where the ocean meets my soul 🌊 Sunset vibes only.",
    likes: 876, likedBy: [], comments: [
      { id: 1, userId: 1, text: "The colors here are unreal!", time: "45m" },
    ], time: "5h", saved: false,
  },
  {
    id: 3, userId: 3,
    image: "https://images.unsplash.com/photo-1490750967868-88df5691d1bf?w=600&q=80",
    caption: "Spring is finally here 🌸🌷 Nature's best palette.",
    likes: 2891, likedBy: [], comments: [
      { id: 1, userId: 2, text: "So delicate and beautiful 💕", time: "3h" },
      { id: 2, userId: 1, text: "This made my day 🌸", time: "2h" },
    ], time: "8h", saved: false,
  },
  {
    id: 4, userId: 1,
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80",
    caption: "Stargazing nights hit different 🌌✨",
    likes: 3120, likedBy: [], comments: [], time: "1d", saved: false,
  },
];

const STORIES = [
  { id: 1, userId: 4, seen: false },
  { id: 2, userId: 1, seen: false },
  { id: 3, userId: 2, seen: true },
  { id: 4, userId: 3, seen: false },
];

const getUserById = (id) => INITIAL_USERS.find(u => u.id === id);

function formatCount(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return n.toString();
}

// ---- ICONS ----
const Icon = ({ d, size = 24, fill = "none", stroke = "currentColor", strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const Icons = {
  home: () => <Icon d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10" />,
  homeFill: () => <Icon d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10" fill="currentColor" stroke="currentColor" />,
  search: () => <Icon d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />,
  add: () => <Icon d="M12 5v14M5 12h14" strokeWidth={2.5} />,
  heart: () => <Icon d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />,
  heartFill: () => <Icon d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" fill="#ef4444" stroke="#ef4444" />,
  comment: () => <Icon d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />,
  send: () => <Icon d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />,
  bookmark: () => <Icon d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />,
  bookmarkFill: () => <Icon d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" fill="currentColor" />,
  user: () => <Icon d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />,
  dots: () => <Icon d="M5 12h.01M12 12h.01M19 12h.01" strokeWidth={3} />,
  image: () => <Icon d="M21 19a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h3l2-3h4l2 3h3a2 2 0 012 2z M12 17a4 4 0 100-8 4 4 0 000 8z" />,
  close: () => <Icon d="M18 6L6 18M6 6l12 12" />,
  check: () => <Icon d="M20 6L9 17l-5-5" strokeWidth={2.5} />,
  gear: () => <Icon d="M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />,
  explore: () => <Icon d="M12 2a10 10 0 100 20A10 10 0 0012 2z M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />,
  exploreFill: () => <Icon d="M12 2a10 10 0 100 20A10 10 0 0012 2z M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" fill="currentColor" stroke="currentColor" />,
};

// ---- STORY COMPONENT ----
function StoryRing({ seen, size = 56 }) {
  return (
    <div style={{
      width: size + 4, height: size + 4,
      borderRadius: "50%",
      background: seen ? "#ccc" : "linear-gradient(135deg, #f9a825, #e91e8c, #9c27b0)",
      padding: 2,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{ width: size, height: size, borderRadius: "50%", background: "#fff", padding: 2 }}>
        <div style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden" }} />
      </div>
    </div>
  );
}

// ---- POST CARD ----
function PostCard({ post, currentUserId, onLike, onSave, onComment, onProfileClick }) {
  const user = getUserById(post.userId);
  const liked = post.likedBy.includes(currentUserId);
  const [commentText, setCommentText] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);
  const [heartAnim, setHeartAnim] = useState(false);
  const lastTap = useRef(0);

  const handleDoubleTap = () => {
    if (!liked) {
      setHeartAnim(true);
      setTimeout(() => setHeartAnim(false), 800);
      onLike(post.id);
    } else {
      setHeartAnim(true);
      setTimeout(() => setHeartAnim(false), 800);
    }
  };

  const submitComment = () => {
    if (commentText.trim()) {
      onComment(post.id, commentText.trim());
      setCommentText("");
    }
  };

  const displayedComments = showAllComments ? post.comments : post.comments.slice(0, 2);

  return (
    <div style={{ background: "#fff", borderBottom: "1px solid #f0f0f0", marginBottom: 8 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", padding: "10px 14px", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => onProfileClick(user)}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", overflow: "hidden", background: "linear-gradient(135deg, #f9a825, #e91e8c, #9c27b0)", padding: 2 }}>
            <img src={user.avatar} alt="" style={{ width: "100%", height: "100%", borderRadius: "50%", border: "2px solid white", objectFit: "cover" }} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ fontWeight: 600, fontSize: 13, fontFamily: "'Playfair Display', serif" }}>{user.username}</span>
              {user.verified && <span style={{ color: "#3b82f6", fontSize: 12 }}>✓</span>}
            </div>
            <div style={{ fontSize: 11, color: "#999" }}>{post.time} ago</div>
          </div>
        </div>
        <button style={{ background: "none", border: "none", cursor: "pointer", color: "#333" }}>
          <Icons.dots />
        </button>
      </div>

      {/* Image */}
      <div style={{ position: "relative", cursor: "pointer" }} onDoubleClick={handleDoubleTap}>
        <img src={post.image} alt="" style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover", display: "block" }} />
        {heartAnim && (
          <div style={{
            position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
            animation: "heartPop 0.8s ease forwards",
            pointerEvents: "none",
          }}>
            <span style={{ fontSize: 80, filter: "drop-shadow(0 0 8px rgba(0,0,0,0.3))" }}>❤️</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div style={{ padding: "10px 14px 4px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <div style={{ display: "flex", gap: 16 }}>
            <button onClick={() => onLike(post.id)} style={{ background: "none", border: "none", cursor: "pointer", color: liked ? "#ef4444" : "#333", display: "flex", alignItems: "center", gap: 6, padding: 0, fontSize: 13, fontWeight: 600, transition: "transform 0.1s", transform: liked ? "scale(1.1)" : "scale(1)" }}>
              {liked ? <Icons.heartFill /> : <Icons.heart />}
            </button>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "#333", display: "flex", alignItems: "center", gap: 6, padding: 0 }}>
              <Icons.comment />
            </button>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "#333", padding: 0 }}>
              <Icons.send />
            </button>
          </div>
          <button onClick={() => onSave(post.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#333", padding: 0 }}>
            {post.saved ? <Icons.bookmarkFill /> : <Icons.bookmark />}
          </button>
        </div>

        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{formatCount(post.likes)} likes</div>

        <div style={{ fontSize: 13, marginBottom: 4 }}>
          <span style={{ fontWeight: 600, marginRight: 6, fontFamily: "'Playfair Display', serif", cursor: "pointer" }} onClick={() => onProfileClick(user)}>{user.username}</span>
          {post.caption}
        </div>

        {post.comments.length > 2 && !showAllComments && (
          <div style={{ fontSize: 13, color: "#999", cursor: "pointer", marginBottom: 4 }} onClick={() => setShowAllComments(true)}>
            View all {post.comments.length} comments
          </div>
        )}

        {displayedComments.map(c => {
          const cu = getUserById(c.userId);
          return (
            <div key={c.id} style={{ fontSize: 13, marginBottom: 2 }}>
              <span style={{ fontWeight: 600, marginRight: 6, fontFamily: "'Playfair Display', serif" }}>{cu?.username}</span>
              {c.text}
              <span style={{ color: "#999", fontSize: 11, marginLeft: 8 }}>{c.time}</span>
            </div>
          );
        })}

        {/* Comment input */}
        <div style={{ display: "flex", alignItems: "center", marginTop: 8, borderTop: "1px solid #f5f5f5", paddingTop: 8, gap: 8 }}>
          <img src="https://i.pravatar.cc/150?img=7" alt="" style={{ width: 24, height: 24, borderRadius: "50%", objectFit: "cover" }} />
          <input
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            onKeyDown={e => e.key === "Enter" && submitComment()}
            placeholder="Add a comment..."
            style={{ flex: 1, border: "none", outline: "none", fontSize: 13, color: "#333", background: "transparent", fontFamily: "inherit" }}
          />
          {commentText && (
            <button onClick={submitComment} style={{ background: "none", border: "none", color: "#3b82f6", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>Post</button>
          )}
        </div>
      </div>
    </div>
  );
}

// ---- PROFILE PAGE ----
function ProfilePage({ user, posts, currentUserId, onBack, onFollow, following, onLike, onSave }) {
  const userPosts = posts.filter(p => p.userId === user.id);
  const [tab, setTab] = useState("grid");
  const isCurrentUser = user.id === currentUserId;
  const isFollowing = following.includes(user.id);

  return (
    <div style={{ height: "100%", overflowY: "auto", background: "#fff" }}>
      <div style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderBottom: "1px solid #f0f0f0", position: "sticky", top: 0, background: "#fff", zIndex: 10 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", marginRight: 12, color: "#333" }}>
          <Icon d="M19 12H5M12 5l-7 7 7 7" />
        </button>
        <span style={{ fontWeight: 700, fontFamily: "'Playfair Display', serif", fontSize: 16 }}>{user.username}</span>
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 12 }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, #f9a825, #e91e8c, #9c27b0)", padding: 3 }}>
            <img src={user.avatar} alt="" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", border: "3px solid white" }} />
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            {[["Posts", userPosts.length], ["Followers", formatCount(user.followers)], ["Following", user.following]].map(([label, val]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{val}</div>
                <div style={{ fontSize: 12, color: "#666" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 8 }}>
          <div style={{ fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>{user.name}</div>
          <div style={{ fontSize: 13, color: "#444", marginTop: 2 }}>{user.bio}</div>
        </div>
        {!isCurrentUser && (
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => onFollow(user.id)}
              style={{
                flex: 1, padding: "8px 0", borderRadius: 8, border: isFollowing ? "1px solid #ddd" : "none",
                background: isFollowing ? "#fff" : "linear-gradient(135deg, #f9a825, #e91e8c)",
                color: isFollowing ? "#333" : "#fff", fontWeight: 700, cursor: "pointer", fontSize: 13,
              }}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>
            <button style={{ flex: 1, padding: "8px 0", borderRadius: 8, border: "1px solid #ddd", background: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>Message</button>
          </div>
        )}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}>
        {userPosts.map(p => (
          <img key={p.id} src={p.image} alt="" style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover", cursor: "pointer" }} />
        ))}
      </div>
    </div>
  );
}

// ---- EXPLORE PAGE ----
function ExplorePage({ posts, onProfileClick }) {
  const [search, setSearch] = useState("");
  const filtered = posts.filter(p => {
    const user = getUserById(p.userId);
    return user.username.includes(search.toLowerCase()) || p.caption.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div style={{ height: "100%", overflowY: "auto" }}>
      <div style={{ padding: "12px 16px", position: "sticky", top: 0, background: "#fafafa", zIndex: 10, borderBottom: "1px solid #eee" }}>
        <div style={{ display: "flex", alignItems: "center", background: "#efefef", borderRadius: 10, padding: "8px 12px", gap: 8 }}>
          <Icons.search />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search"
            style={{ background: "transparent", border: "none", outline: "none", fontSize: 14, flex: 1 }}
          />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}>
        {filtered.map((p, i) => (
          <div key={p.id} style={{ position: "relative", gridColumn: i % 7 === 0 ? "span 2" : "span 1", gridRow: i % 7 === 0 ? "span 2" : "span 1" }}>
            <img src={p.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "pointer", display: "block" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- CREATE POST ----
function CreatePost({ onPost, onClose }) {
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [preview, setPreview] = useState("");
  const [step, setStep] = useState(1);

  const SAMPLE_IMAGES = [
    "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80",
    "https://images.unsplash.com/photo-1518791841217-8f162f1912da?w=600&q=80",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
    "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&q=80",
  ];

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#fff", borderRadius: 16, width: "90%", maxWidth: 380, maxHeight: "90vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: "1px solid #eee" }}>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#333" }}><Icons.close /></button>
          <span style={{ fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>New Post</span>
          {step === 2 ? (
            <button onClick={() => { if (preview) { onPost(preview, caption); onClose(); } }} style={{ background: "none", border: "none", color: "#3b82f6", fontWeight: 700, cursor: "pointer" }}>Share</button>
          ) : (
            <button onClick={() => preview && setStep(2)} style={{ background: "none", border: "none", color: preview ? "#3b82f6" : "#aaa", fontWeight: 700, cursor: "pointer" }}>Next</button>
          )}
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
          {step === 1 ? (
            <>
              {preview ? (
                <div style={{ position: "relative" }}>
                  <img src={preview} alt="" style={{ width: "100%", borderRadius: 12, objectFit: "cover" }} />
                  <button onClick={() => setPreview("")} style={{ position: "absolute", top: 8, right: 8, background: "rgba(0,0,0,0.5)", border: "none", borderRadius: "50%", color: "#fff", width: 28, height: 28, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
                </div>
              ) : (
                <div>
                  <p style={{ fontSize: 13, color: "#666", marginBottom: 12, textAlign: "center" }}>Choose a sample image or paste a URL</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
                    {SAMPLE_IMAGES.map((img, i) => (
                      <img key={i} src={img} alt="" onClick={() => setPreview(img)} style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover", borderRadius: 8, cursor: "pointer" }} />
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="Or paste image URL..." style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: "1px solid #ddd", fontSize: 13 }} />
                    <button onClick={() => imageUrl && setPreview(imageUrl)} style={{ padding: "8px 14px", background: "#3b82f6", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" }}>Go</button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                <img src={preview} alt="" style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8 }} />
                <textarea
                  value={caption}
                  onChange={e => setCaption(e.target.value)}
                  placeholder="Write a caption..."
                  style={{ flex: 1, border: "none", outline: "none", resize: "none", fontSize: 14, fontFamily: "inherit", minHeight: 80 }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ---- NOTIFICATIONS ----
function NotificationsPage({ posts, following }) {
  const events = [
    { id: 1, userId: 1, type: "like", postId: 1, time: "2m" },
    { id: 2, userId: 2, type: "follow", time: "10m" },
    { id: 3, userId: 3, type: "comment", postId: 2, text: "Stunning shot! 😍", time: "25m" },
    { id: 4, userId: 1, type: "comment", postId: 1, text: "Love this!", time: "1h" },
  ];

  return (
    <div style={{ height: "100%", overflowY: "auto" }}>
      <div style={{ padding: "16px", borderBottom: "1px solid #eee", position: "sticky", top: 0, background: "#fff", zIndex: 10 }}>
        <h2 style={{ margin: 0, fontFamily: "'Playfair Display', serif", fontSize: 20 }}>Notifications</h2>
      </div>
      {events.map(ev => {
        const user = getUserById(ev.userId);
        return (
          <div key={ev.id} style={{ display: "flex", alignItems: "center", padding: "12px 16px", gap: 12, borderBottom: "1px solid #f5f5f5" }}>
            <img src={user.avatar} alt="" style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover" }} />
            <div style={{ flex: 1, fontSize: 13 }}>
              <span style={{ fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>{user.username}</span>
              {ev.type === "like" && " liked your photo."}
              {ev.type === "follow" && " started following you."}
              {ev.type === "comment" && ` commented: "${ev.text}"`}
              <span style={{ color: "#999", marginLeft: 6 }}>{ev.time}</span>
            </div>
            {ev.type === "follow" && (
              <button style={{ padding: "6px 14px", background: "linear-gradient(135deg, #f9a825, #e91e8c)", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 12 }}>Follow</button>
            )}
            {ev.postId && (
              <img src={posts.find(p => p.id === ev.postId)?.image} alt="" style={{ width: 44, height: 44, objectFit: "cover", borderRadius: 4 }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ---- MAIN APP ----
export default function App() {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [tab, setTab] = useState("home");
  const [showCreate, setShowCreate] = useState(false);
  const [profileUser, setProfileUser] = useState(null);
  const [following, setFollowing] = useState([1, 2, 3]);
  const currentUserId = 4;

  const handleLike = (postId) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      const liked = p.likedBy.includes(currentUserId);
      return {
        ...p,
        likes: liked ? p.likes - 1 : p.likes + 1,
        likedBy: liked ? p.likedBy.filter(id => id !== currentUserId) : [...p.likedBy, currentUserId],
      };
    }));
  };

  const handleSave = (postId) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, saved: !p.saved } : p));
  };

  const handleComment = (postId, text) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      return {
        ...p,
        comments: [...p.comments, { id: Date.now(), userId: currentUserId, text, time: "now" }],
      };
    }));
  };

  const handleFollow = (userId) => {
    setFollowing(prev => prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]);
  };

  const handleNewPost = (image, caption) => {
    setPosts(prev => [{
      id: Date.now(), userId: currentUserId, image, caption,
      likes: 0, likedBy: [], comments: [], time: "just now", saved: false,
    }, ...prev]);
  };

  const currentUser = getUserById(currentUserId);

  return (
    <div style={{ fontFamily: "'Lato', sans-serif", background: "#fafafa", height: "100vh", display: "flex", flexDirection: "column", maxWidth: 480, margin: "0 auto", position: "relative", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lato:wght@300;400;700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 0; }
        @keyframes heartPop {
          0% { opacity: 0; transform: scale(0); }
          30% { opacity: 1; transform: scale(1.2); }
          70% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.9); }
        }
        button:active { opacity: 0.7; }
      `}</style>

      {/* Top Nav - only on home/explore/notif */}
      {!profileUser && (
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "12px 16px", background: "#fff", borderBottom: "1px solid #f0f0f0",
          position: "sticky", top: 0, zIndex: 100,
        }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, letterSpacing: -1, background: "linear-gradient(135deg, #f9a825, #e91e8c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Momento
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "#333", padding: 6 }}><Icons.heart /></button>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "#333", padding: 6 }}><Icons.send /></button>
          </div>
        </div>
      )}

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
        {profileUser ? (
          <ProfilePage
            user={profileUser}
            posts={posts}
            currentUserId={currentUserId}
            onBack={() => setProfileUser(null)}
            onFollow={handleFollow}
            following={following}
            onLike={handleLike}
            onSave={handleSave}
          />
        ) : tab === "home" ? (
          <div>
            {/* Stories */}
            <div style={{ overflowX: "auto", display: "flex", gap: 14, padding: "12px 14px", background: "#fff", borderBottom: "1px solid #f0f0f0" }}>
              {/* Add story */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, minWidth: 60 }}>
                <div style={{ width: 60, height: 60, borderRadius: "50%", border: "2px dashed #ddd", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <img src={currentUser.avatar} alt="" style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover" }} />
                </div>
                <span style={{ fontSize: 11, color: "#333" }}>Your story</span>
              </div>

              {STORIES.map(s => {
                const u = getUserById(s.userId);
                return (
                  <div key={s.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, minWidth: 60, cursor: "pointer" }} onClick={() => setProfileUser(u)}>
                    <div style={{ width: 64, height: 64, borderRadius: "50%", background: s.seen ? "#ccc" : "linear-gradient(135deg, #f9a825, #e91e8c, #9c27b0)", padding: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: 60, height: 60, borderRadius: "50%", background: "#fff", padding: 2 }}>
                        <img src={u.avatar} alt="" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
                      </div>
                    </div>
                    <span style={{ fontSize: 11, color: "#333", maxWidth: 60, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", textAlign: "center" }}>{u.username}</span>
                  </div>
                );
              })}
            </div>

            {/* Posts */}
            {posts.map(p => (
              <PostCard
                key={p.id}
                post={p}
                currentUserId={currentUserId}
                onLike={handleLike}
                onSave={handleSave}
                onComment={handleComment}
                onProfileClick={setProfileUser}
              />
            ))}
          </div>
        ) : tab === "explore" ? (
          <ExplorePage posts={posts} onProfileClick={setProfileUser} />
        ) : tab === "notifications" ? (
          <NotificationsPage posts={posts} following={following} />
        ) : tab === "profile" ? (
          <ProfilePage
            user={currentUser}
            posts={posts}
            currentUserId={currentUserId}
            onBack={() => setTab("home")}
            onFollow={handleFollow}
            following={following}
            onLike={handleLike}
            onSave={handleSave}
          />
        ) : null}
      </div>

      {/* Bottom Nav */}
      {!profileUser && (
        <div style={{
          display: "flex", justifyContent: "space-around", padding: "10px 0 16px",
          background: "#fff", borderTop: "1px solid #f0f0f0", position: "sticky", bottom: 0, zIndex: 100,
        }}>
          {[
            { id: "home", icon: tab === "home" ? <Icons.homeFill /> : <Icons.home /> },
            { id: "explore", icon: tab === "explore" ? <Icons.exploreFill /> : <Icons.explore /> },
            { id: "create", icon: <Icons.add /> },
            { id: "notifications", icon: <Icons.heart /> },
            { id: "profile", avatar: currentUser.avatar },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => item.id === "create" ? setShowCreate(true) : setTab(item.id)}
              style={{
                background: item.id === "create" ? "linear-gradient(135deg, #f9a825, #e91e8c)" : "none",
                border: "none", cursor: "pointer",
                color: tab === item.id ? "#111" : "#888",
                width: item.id === "create" ? 40 : "auto",
                height: item.id === "create" ? 40 : "auto",
                borderRadius: item.id === "create" ? 12 : 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: item.id === "create" ? 0 : 4,
              }}
            >
              {item.avatar ? (
                <img src={item.avatar} alt="" style={{ width: 26, height: 26, borderRadius: "50%", objectFit: "cover", border: tab === "profile" ? "2px solid #e91e8c" : "2px solid transparent" }} />
              ) : item.id === "create" ? (
                <span style={{ color: "#fff", display: "flex" }}>{item.icon}</span>
              ) : item.icon}
            </button>
          ))}
        </div>
      )}

      {showCreate && <CreatePost onPost={handleNewPost} onClose={() => setShowCreate(false)} />}
    </div>
  );
}
