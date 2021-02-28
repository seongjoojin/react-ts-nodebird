import React, {useCallback, useState} from 'react';
import styled from '@emotion/styled';
import {PlusOutlined} from '@ant-design/icons';

import ImagesZoom from './imagesZoom';

interface IProps {
  images: Array<{ src: string }>
}

const PostImage = ({images}: IProps) => {
  const [showImagesZoom,setShowImagesZoom] = useState(false);
  const onZoom = useCallback(() =>  {
    setShowImagesZoom(true);
  }, []);
  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);
  if(images.length === 1) {
    return (
      <>
        <Image role="presentation" src={images[0].src} alt={images[0].src} onClick={onZoom}/>
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  if(images.length === 2) {
    return (
      <div>
        <Image role="presentation" width="50%" src={images[0].src} alt={images[0].src} onClick={onZoom}/>
        <Image role="presentation" width="50%" src={images[1].src} alt={images[1].src} onClick={onZoom}/>
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </div>
    );
  }
  return (
    <div>
      <Image role="presentation" width="50%" src={images[0].src} alt={images[0].src} onClick={onZoom}/>
      <MoreViewBox role="presentation" onClick={onZoom}>
        <PlusOutlined />
        <br/>
        {images.length - 1}
        개의 사진 더보기
      </MoreViewBox>
      {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
    </div>
  );
};

const MoreViewBox = styled.div`
  display: inline-block;
  width: 50%;
  text-align: center;
  vertical-align: middle;
`;

const Image = styled.img`
  max-height: 300px;
  object-fit: contain;
`;

export default PostImage;