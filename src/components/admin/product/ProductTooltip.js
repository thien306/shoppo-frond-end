import React, { useState } from "react";

const ProductTooltip = ({ description }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  let hoverTimeout;

  const handleMouseEnter = () => {
    hoverTimeout = setTimeout(() => {
      setShowTooltip(true);
    }, 1000); // 1 giây
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout); // Dừng khi rời chuột
    setShowTooltip(false);
  };

  return (
    <div
      className="tooltip-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="description">{description}</span>
      {showTooltip && (
        <div className="tooltip-content">
          <h4>Thông Tin Miêu Tả</h4>
          <p>{description}</p>
        </div>
      )}
    </div>
  );

  
};

export default ProductTooltip;
