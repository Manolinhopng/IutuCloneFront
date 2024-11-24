import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Para navegación entre páginas
import axios from "axios";

const Dashboard = () => {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");

  const fetchVideos = async () => {
    const response = await axios.get("/api/videos");
    return response.data.videos;
  };

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const data = await fetchVideos();
        setVideos(data);
      } catch (error) {
        console.error("Error loading videos:", error);
      }
    };

    loadVideos();
  }, []);

  const filteredVideos = videos.filter((video) =>
    video.key.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Topbar */}
      <div className="topbar">
        <div className="topbar-left">
          <Link to="/profile" className="topbar-link">
            My Profile
          </Link>
        </div>
        <div className="topbar-right">
          <Link to="/dashboard" className="topbar-link">
            Dashboard
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        <h1>Videos</h1>
        <input
          type="text"
          placeholder="Buscar video..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="video-list">
          {filteredVideos.map((video) => (
            <div key={video.key} className="video-item">
              <h3>{video.key}</h3>
              <video controls src={video.url} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
