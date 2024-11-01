import React from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

const ProductImages = ({ images }) => {
  return (
    <PhotoProvider>
      <div className="product-image-container">
        {images?.length > 0 && (
          <PhotoView key={0} src={images[0]}>
            <img
              src={images[0]}
              alt={`Hình ảnh sản phẩm 1`}
              className="product-image-thumbnail"
            />
          </PhotoView>
        )}
        {images?.length > 0 && images.map((img, index) => (
          <PhotoView key={index} src={img}>
            <img
              src={img}
              alt={`Hình ảnh sản phẩm ${index + 1}`}
              className="product-image-hidden"
            />
          </PhotoView>
        ))}
      </div>
    </PhotoProvider>
  );
};

export default ProductImages;
