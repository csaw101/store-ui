import React, { Component } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import "../styles/Carousel.css";

class Carousel extends Component {
  render() {
    return (
      <div className="product-carousel" data-testid="product-gallery">
        <ImageGallery
          items={this.props.images.map((image) => ({
            original: image,
            thumbnail: image,
          }))}
          thumbnailPosition={window.screen.width > 570 ? "left" : "bottom"}
          showPlayButton={false}
          showFullscreenButton={false}
          slideDuration={360}
        />
      </div>
    );
  }
}

export default Carousel;
