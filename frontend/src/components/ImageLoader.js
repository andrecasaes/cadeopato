import React, { useState } from 'react';
import Skeleton from '@mui/material/Skeleton';

const ImageLoader = ({ src, alt,variant, className, width, height }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="image-container" style={{ position: 'relative', width, height }}>
      {loading && (
        <Skeleton
          variant={variant}
          width={width}
          height={height}
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
      )}
      <img
        src={src}
        alt={alt}
        className={className}
        onLoad={() => setLoading(false)}
        style={{ display: loading ? 'none' : 'block', borderRadius: variant === 'circular' ? '50%' : '', width, height }}
      />
    </div>
  );
};

export default ImageLoader;
