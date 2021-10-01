import { useState } from "react";
import "./Formulario.css";

export const Formulario = () => {
  const params = [
    "nombre",
    "email",
    "edad",
    "sexo",
    "pais",
    "redes_sociales",
    "idiomas",
  ];
  const [formData, setFormData] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const validateFormData = () => {
    for (const param of params) {
      if (!formData[param]) {
        return false;
      }
    }
    return true;
  };

  const handleChange = (e) => {
    let { name, value, type, options, multiple, selectedIndex } = e.target;
    // console.log(name, value, type, Object.values(value), typeof value);
    // console.log("multiple",multiple,selectedIndex,options,typeof options,Object.values(options))

    if (type === "checkbox" && name === "redes_sociales") {
      if (!formData?.redes_sociales) {
        formData.redes_sociales = [];
      }
      if (!formData.redes_sociales.includes(value)) {
        value = [...formData.redes_sociales, value];
      } else {
        value = formData.redes_sociales.filter((red) => red !== value);
      }
      if (!value.length) {
        value = undefined;
      }
    } else if (type === "select-multiple" && name === "idiomas") {
      let selectedOptions = Object.values(options).filter(
        (option) => option.selected
      );
      if (selectedOptions.length > 0) {
        if (formData[name]) {
          value = selectedOptions.map((option) => {
            const interseccionObj = formData[name].find(
              (optionObj) =>
                optionObj.idioma === JSON.parse(option.value).idioma
            );
            if (interseccionObj) {
              return interseccionObj;
            }
            return JSON.parse(option.value);
          });
        } else {
          value = selectedOptions.map((option) => {
            return JSON.parse(option.value);
          });
        }
      } else {
        value = undefined;
      }
    } else if (type === "range" && name === "nivel") {
      let idiomaTarget = e.target.getAttribute("data-idioma");
      let idiomaObj = formData.idiomas.find(
        (idiomaObj) => idiomaObj.idioma === idiomaTarget
      );
      idiomaObj[name] = value;
      value = undefined;
    }
    setFormData({
      ...formData,
      [name]: type == "number" ? Number(value) : value,
    });
  };

  const sexos = ["Masculino", "Femenino"];
  const paises = ["USA", "ECUADOR", "CHILE"];
  const redes_sociales = ["Facebook", "Instagram", "Telegra", "Whatsapp"];
  const idiomas = ["English", "Español", "Frances", "holandes"];

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
            <select onChange={handleChange} name="pais" value={formData.pais}>
              <option hidden selected>
                {formData.pais}
              </option>
              {paises.map((pais, i) => (
                <option key={i} value={pais}>
                  {pais}
                </option>
              ))}
            </select>
          </label>
          <br />

          <label>
            <span>
              <strong>redes sociales:</strong>
            </span>
            <br />
            {redes_sociales.map((red, i) => (
              <div key={i}>
                <label key={i}>
                  <span>{red}</span>
                  <input
                    onChange={handleChange}
                    name="redes_sociales"
                    type="checkbox"
                    value={red}
                    checked={
                      formData.redes_sociales
                        ? formData.redes_sociales.includes(red)
                        : false
                    }
                  />
                </label>
                <br />
              </div>
            ))}
          </label>
          <br />

          <label>
            <span>
              <strong>Idiomas</strong>{" "}
            </span>
            <br />
            <select
              value={
                formData.idiomas
                  ? formData.idiomas.map((idiomaObj) =>
                      JSON.stringify(idiomaObj)
                    )
                  : []
              }
              multiple
              onChange={handleChange}
              name="idiomas"
            >
              {/* <option hidden selected></option> */}
              {idiomas.map((idioma, i) => (
                <option key={i} value={JSON.stringify({ idioma, nivel: 4 })}>
                  {idioma}
                </option>
              ))}
            </select>
          </label>
          <br />
          <br />
          <label>
            <span>
              <strong>Eliga un nivel para cada idioma seleccionado</strong>
            </span>
            <br />
            {formData.idiomas &&
              formData.idiomas.map((idiomaObj, i) => (
                <div key={i}>
                  <span>Idioma:{idiomaObj.idioma}</span>
                  <br />
                  <span>nivel:{idiomaObj.nivel}</span>
                  <input
                    data-idioma={idiomaObj.idioma}
                    name="nivel"
                    onChange={handleChange}
                    value={idiomaObj.nivel}
                    type="range"
                    min="1"
                    max="10"
                  />
                  <br />
                  <br />
                </div>
              ))}
          </label>
          <br />

          <button disabled={!validateFormData()} type="submit">
            Enviar
          </button>
        </form>
        <p>formData: {JSON.stringify(formData)}</p>
      </div>
    </>
  );
};
