import React, { useState } from 'react';
import imageSources from '../../data/product-images.json';

const originalPhotos = Object.fromEntries(
  Object.values(imageSources).map(({ path, source }) => [path, source])
);

// Retry the very same photograph if a local asset cannot be loaded.
export const CatalogImage = ({ src, ...props }) => (
  <CatalogPhoto key={src} src={src} {...props} />
);

const CatalogPhoto = ({ src, alt, ...props }) => {
  const [useOriginal, setUseOriginal] = useState(false);
  return (
    <img
      {...props}
      src={useOriginal ? originalPhotos[src] : src}
      alt={alt}
      onError={() => {
        if (!useOriginal && originalPhotos[src]) setUseOriginal(true);
      }}
    />
  );
};
