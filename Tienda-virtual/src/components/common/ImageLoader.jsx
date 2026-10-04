import { LoadingOutlined } from '@ant-design/icons';
import PropType from 'prop-types';
import React, { useState } from 'react';

const fallbackStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  minHeight: '8rem',
  padding: '1rem',
  background: '#f2f2f2',
  color: '#777',
  fontSize: '0.85rem',
  textAlign: 'center'
};

const ImageLoader = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  // Si la imagen no se puede descargar (p. ej. 403 de Storage), mostrar un recuadro
  // con el nombre en lugar de dejar el spinner girando para siempre.
  if (failed) {
    return (
      <div className={className || ''} role="img" aria-label={alt || ''} style={fallbackStyle}>
        {alt || ''}
      </div>
    );
  }

  return (
    <>
      {!loaded && (
        <LoadingOutlined style={{
          position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, margin: 'auto'
        }}
        />
      )}
      <img
        alt={alt || ''}
        className={`${className || ''} ${loaded ? 'is-img-loaded' : 'is-img-loading'}`}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        src={src}
      />
    </>
  );
};

ImageLoader.defaultProps = {
  className: 'image-loader'
};

ImageLoader.propTypes = {
  src: PropType.string.isRequired,
  alt: PropType.string,
  className: PropType.string
};

export default ImageLoader;
