import React, { useEffect, useState, useContext } from 'react';
import server from '../../api/server';
import { DEFAULT, ERROR, SUCCESS } from '../../constants';
import './Uploader.scss';
import { Context as UsersContext } from '../../context/UsersContext';

export default function Uploader() {
  const { buildReport } = useContext(
    UsersContext
  );
  const [submited, setSubmited] = useState({ status: DEFAULT, msg: '' });
  const [file, setFile] = useState(undefined);
  const [isLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (file) {
        await upload();
        buildReport()
      }
    })();
  }, [file]);

  useEffect(() => {
    let timer;
    if (submited.status !== DEFAULT) {
      timer = setTimeout(() => {
        setSubmited({ status: DEFAULT, msg: '' });
      }, 6000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
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
      const [errormsg] = error.response.data.errors;
      setSubmited({
        status: ERROR,
        msg: `Field: ${errormsg.field} Msg: ${errormsg.message}`,
      });
    }
  };

  return (
    <div>
      <div className="uploader">
        {submited.status === DEFAULT && !isLoading && (
          <div>
            <input id="uploader" type="file" hidden="hidden" />
            <button onClick={handleUpload} className="button button--primary">
              Seleccionar
            </button>
            <span className="span">Ningún excel seleccionado...</span>
          </div>
        )}
        {submited.status === SUCCESS && !isLoading && <p>{submited.msg} ✅</p>}
        {submited.status === ERROR && !isLoading && <p>{submited.msg} ❌</p>}
      </div>
    </div>
  );
}
