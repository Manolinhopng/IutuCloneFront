import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Importamos la librería

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar el token en una cookie con opciones para mayor seguridad
        Cookies.set("token", data.token, {
          expires: 7, // Expira en 7 días
          secure: true, // Solo en conexiones seguras (HTTPS)
          sameSite: "Strict", // Mayor seguridad contra CSRF
        });
        // Redirigir al usuario a MyProfile
        navigate("/my-profile");
      } else {
        setError(
          data.message ||
            "Credenciales incorrectas, por favor intenta de nuevo."
        );
      }
    } catch (error) {
      console.error("Error durante el login:", error);
      setError(
        "Hubo un problema con el servidor. Por favor intenta de nuevo más tarde."
      );
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <>
      <header className="login-header">
        <h1>IUTU ClONE</h1>
      </header>
      <div className="login-container">
        <main className="login-main">
          <h2>Inicia sesión</h2>
          <p>Los Peores Videos</p>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-field"
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-field"
              />
            </div>
            <div className="button-group">
              <button type="submit" className="btn-login">
                Entrar
              </button>
              <button
                type="button"
                onClick={handleRegisterRedirect}
                className="btn-register"
              >
                Registrar
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}

export default Login;
