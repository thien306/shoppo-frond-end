import React, { useState } from "react";

const ProductColorAnnotationTool = ({ colors }) => {
    const [showColorTooltip, setShowColorTooltip] = useState(false);
  
    let hoverTimeout;
  
    const handleMouseEnter = () => {
      hoverTimeout = setTimeout(() => {
        setShowColorTooltip(true);
      }, 1000); // 1 giây
    };
  
    const handleMouseLeave = () => {
      clearTimeout(hoverTimeout); // Dừng khi rời chuột
      setShowColorTooltip(false);
    };
  
    // Nối danh sách màu sắc và giới hạn hiển thị
    const displayedColors = colors.join(", ").length > 10 ? colors.join(", ").slice(0, 20) + "..." : colors.join(", ");
  
    return (
      <div
        className="tooltip-container-color"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className="colors">{displayedColors}</span>
        {showColorTooltip && (
          <div className="tooltip-content-color">
            <h4>Thông Tin Màu Sắc</h4>
            <p>{colors.join(", ")}</p> {/* Hiển thị đầy đủ danh sách màu sắc trong tooltip */}
          </div>
        )}
      </div>
    );
  };
  

export default ProductColorAnnotationTool;
