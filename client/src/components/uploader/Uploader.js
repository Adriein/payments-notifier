import React, { useState } from 'react';
import './Uploader.css';

export default function Uploader() {
  const [submited, setSubmited] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
      <form onSubmit={handleSubmit} class="uploader">
        <input type="file" hidden="hidden" />
        <button className="button button--primary">Seleccionar</button>
        <span className="span">Ningún excel seleccionado...</span>
      </form>
  );
}
