import React, { useState } from 'react';
import Slick from 'react-slick';
import { Global, css } from '@emotion/react';
import { Overlay, Header, CloseButton, SlickWrapper, ImgWrapper, Indicator } from './styles';

interface IProps {
  images: Array<{ src: string }>
  onClose: () => void
}

const ImagesZoom = ({ images, onClose }: IProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <>
      <Global
        styles={css`
        .slick-slide {
          display: inline-block;
        }
      `}
      />
      <Overlay>
        <Header>
          <h1>상세 이미지</h1>
          <CloseButton onClick={onClose} />
        </Header>
        <SlickWrapper>
          <div>
            <Slick
              initialSlide={0}
              afterChange={(slide) => setCurrentSlide(slide)}
              infinite
              arrows={false}
              slidesToShow={1}
              slidesToScroll={1}
            >
              {images.map((image) => (
                <ImgWrapper key={image.src}>
                  <img src={image.src} alt={image.src} />
                </ImgWrapper>
              ))}
            </Slick>
            <Indicator>
              <div>
                {`${currentSlide + 1} / ${images.length}`}
              </div>
            </Indicator>
          </div>
        </SlickWrapper>
      </Overlay>
    </>
  );
};

export default ImagesZoom;
