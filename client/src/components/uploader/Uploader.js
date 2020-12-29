import React, { useEffect, useState } from 'react';
import server from '../../api/server';
import { DEFAULT, ERROR, SUCCESS } from '../../constants';
import './Uploader.css';

export default function Uploader() {
  const [submited, setSubmited] = useState({ status: DEFAULT, msg: '' });
  const [file, setFile] = useState(undefined);

  useEffect(() => {
    (async () => {
      if (file) {
        await upload();
      }
    })();
  }, [file]);

  useEffect(() => {
    setTimeout(() => {
      setSubmited({ status: DEFAULT, msg: '' });
    }, 3000);
  }, [submited]);

  const handleUpload = () => {
    document.getElementById('uploader').click();
    document.getElementById('uploader').onchange = (event) => {
      setFile(event.target.files[0]);
    };
  };

  const upload = async () => {
    const data = new FormData();
    data.append('defaulters', file);
    try {
      await server.post('upload', data);
      setSubmited({
        status: SUCCESS,
        msg: 'El excel se ha subido correctamente',
      });
    } catch (error) {
      setSubmited({ status: ERROR, msg: error.msg });
    }
  };

  return (
    <div className="uploader">
      {submited.status === DEFAULT && (
        <div>
          <input id="uploader" type="file" hidden="hidden" />
          <button onClick={handleUpload} className="button button--primary">
            Seleccionar
          </button>
          <span className="span">Ningún excel seleccionado...</span>
        </div>
      )}
      {submited.status === SUCCESS && <p>{submited.msg} ✅</p>}
      {submited.status === ERROR && <p>{submited.msg} ❌</p>}
    </div>
  );
}
