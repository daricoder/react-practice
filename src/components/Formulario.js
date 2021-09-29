import { useState } from "react";
import "./Formulario.css";

export const Formulario = () => {
  const [formData, setFormData] = useState({redes_sociales:[]});
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    let { name, value, type } = e.target;
    console.log(name, value, type, typeof value);

    if (type==="checkbox" && name==="redes_sociales") {
        if (!formData.redes_sociales.includes(value)) {
            value = [...formData.redes_sociales, value]
        }else{
            value = formData.redes_sociales.filter((red) => red!==value)
        }

    } 
    setFormData({
      ...formData,
      [name]: type == "number" ? Number(value) : value,
    });
  };

  const sexos = ["Masculino", "Femenino"];
  const paises = ["USA", "ECUADOR", "CHILE"];
  const redes_sociales = ["Facebook", "Instagram","Telegra","Whatsapp"];


  return (
    <>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <h4>Soy el Formulario</h4>
          <label>
            <span>nombre</span>
            <input
              onChange={handleChange}
              name="nombre"
              type="text"
              value={formData.nombre}
            />
          </label>
          <br />
          <label>
            <span>email</span>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              value={formData.email}
            />
          </label>
          <br />
          <label>
            <span>edad</span>
            <input
              onChange={handleChange}
              name="edad"
              type="number"
              value={formData.edad}
            />
          </label>
          <br />
          <label>
            <span>sexo:</span>
            {sexos.map((sexo, i) => (
              <div key={i}>
                <strong>{sexo}</strong>
                <input
                  onChange={handleChange}
                  name="sexo"
                  type="radio"
                  value={sexo}
                  checked={formData.sexo === sexo}
                />
              </div>
            ))}
          </label>
          <br />
          <label>
            <span>pais:</span>
            <select
              onChange={handleChange}
              name="paises"
              value={formData.pais}
            >
            
            <option hidden selected>{formData.pais}</option>
            {paises.map((pais, i) => (
              
            <option key={i} value={pais}>{pais}</option>
            
            ))}
            
            </select>
          </label>
          <br />

          <label>
            <span>redes sociales:</span>
            {redes_sociales.map((red, i) => (
                <>
              <label key={i}>
                <strong>{red}</strong>
                <input
                  onChange={handleChange}
                  name="redes_sociales"
                  type="checkbox"
                  value={red}
                  checked={formData.redes_sociales ? formData.redes_sociales.includes(red): false}
                />
              </label>
              <br />
              </>
            ))}
          </label>
          <br />
          <button type="submit">Enviar</button>
        </form>
        <p>formData: {JSON.stringify(formData)}</p>
      </div>
    </>
  );
};
