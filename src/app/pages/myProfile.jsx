import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Para navegación entre páginas
import axios from "axios";

const MyProfile = () => {
  const [videos, setVideos] = useState([]); // Lista de videos subidos
  const [file, setFile] = useState(null); // Archivo seleccionado para subir

  // Cargar videos subidos por el usuario
  const fetchUserVideos = async () => {
    try {
      const response = await axios.get("/api/my-videos"); // Ruta para obtener videos del usuario
      setVideos(response.data.videos);
    } catch (error) {
      console.error("Error fetching user videos:", error);
    }
  };

  // Subir video
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Por favor selecciona un archivo para subir.");
      return;
    }

    const formData = new FormData();
    formData.append("video", file);

    try {
      await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Video subido con éxito.");
      setFile(null);
      fetchUserVideos(); // Recargar lista de videos después de subir
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("Hubo un error al subir el video.");
    }
  };

  // Actualizar lista de videos al cargar el componente
  useEffect(() => {
    fetchUserVideos();
  }, []);

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

      {/* Contenido principal */}
      <div className="profile-content">
        <h1>My Profile</h1>

        {/* Formulario para subir video */}
        <form onSubmit={handleUpload} className="upload-form">
          <label htmlFor="videoUpload">Subir video:</label>
          <input
            type="file"
            id="videoUpload"
            accept="video/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button type="submit">Subir</button>
        </form>

        {/* Lista de videos subidos */}
        <div className="video-list">
          <h2>Mis Videos</h2>
          {videos.length === 0 && <p>No has subido videos aún.</p>}
          {videos.map((video) => (
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

export default MyProfile;
