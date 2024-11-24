import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate para redirigir

function Register() {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [email, setEmail] = useState("");
  const [cell, setCell] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Inicializa useNavigate

  async function handleRegister(e) {
    e.preventDefault(); // Previene el envío del formulario

    // Validación de contraseñas
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    const userData = {
      name,
      birthDate,
      idNumber,
      email,
      cell,
      password,
      city,
    };

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json(); // Convertimos la respuesta a JSON

      if (!response.ok) {
        setError(data.message || "Error desconocido");
        return;
      }

      console.log("Usuario registrado:", data);
      alert("Registro exitoso. Redirigiendo al login.");
      navigate("/login"); // Redirige al login después del registro exitoso
    } catch (error) {
      console.error("Error al registrar:", error.message);
      setError("Hubo un problema al registrar el usuario. Intenta más tarde.");
    }
  }

  return (
    <div className="register-container">
      <form
        className="register-box"
        style={{ maxWidth: "600px", margin: "0 auto" }}
        onSubmit={handleRegister}
      >
        {error && <p className="error-message">{error}</p>}
        <h2>Registro de usuario</h2>
        <div style={{ margin: "20px", display: "flex", alignItems: "center" }}>
          <label style={{ width: "150px", fontSize: "18px" }}>
            Nombre completo:
          </label>
          <input
            type="text"
            placeholder="Jhon Doe"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              flex: 1,
              height: "40px",
              fontSize: "18px",
              margin: "10px",
            }}
          />
        </div>
        <div style={{ margin: "20px", display: "flex", alignItems: "center" }}>
          <label style={{ width: "150px", fontSize: "18px" }}>
            Fecha de nacimiento:
          </label>
          <input
            type="date"
            required
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            style={{
              flex: 1,
              height: "40px",
              fontSize: "18px",
              margin: "10px",
            }}
          />
        </div>
        <div style={{ margin: "20px", display: "flex", alignItems: "center" }}>
          <label style={{ width: "150px", fontSize: "18px" }}>Cédula:</label>
          <input
            type="number"
            placeholder="123456789"
            required
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            style={{
              flex: 1,
              height: "40px",
              fontSize: "18px",
              margin: "10px",
            }}
          />
        </div>
        <div style={{ margin: "20px", display: "flex", alignItems: "center" }}>
          <label style={{ width: "150px", fontSize: "18px" }}>
            Correo electrónico:
          </label>
          <input
            type="email"
            placeholder="robo@tuculo.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              flex: 1,
              height: "40px",
              fontSize: "18px",
              margin: "10px",
            }}
          />
        </div>
        <div style={{ margin: "20px", display: "flex", alignItems: "center" }}>
          <label style={{ width: "150px", fontSize: "18px" }}>Celular:</label>
          <input
            type="number"
            placeholder="123123456789"
            required
            value={cell}
            onChange={(e) => setCell(e.target.value)}
            style={{
              flex: 1,
              height: "40px",
              fontSize: "18px",
              margin: "10px",
            }}
          />
        </div>
        <div style={{ margin: "20px", display: "flex", alignItems: "center" }}>
          <label style={{ width: "150px", fontSize: "18px" }}>
            Contraseña:
          </label>
          <input
            type="password"
            placeholder="Contraseña"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              flex: 1,
              height: "40px",
              fontSize: "18px",
              margin: "10px",
            }}
          />
        </div>
        <div style={{ margin: "20px", display: "flex", alignItems: "center" }}>
          <label style={{ width: "150px", fontSize: "18px" }}>
            Confirmar contraseña:
          </label>
          <input
            type="password"
            placeholder="Confirma tu contraseña"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{
              flex: 1,
              height: "40px",
              fontSize: "18px",
              margin: "10px",
            }}
          />
        </div>
        <div style={{ margin: "20px", display: "flex", alignItems: "center" }}>
          <label style={{ width: "150px", fontSize: "18px" }}>Ciudad:</label>
          <input
            type="text"
            placeholder="Cali"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={{
              flex: 1,
              height: "40px",
              fontSize: "18px",
              margin: "10px",
              borderRadius: "10px",
            }}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <button
            type="submit"
            style={{
              fontSize: "24px",
              margin: "10px",
              padding: "10px 20px",
              borderRadius: "10px",
            }}
          >
            Registrarse
          </button>
          <button
            type="button"
            className="btn-salir"
            onClick={() => navigate("/login")}
          >
            Salir
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
