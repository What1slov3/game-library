import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';

const StyleGameCardBackground = styled.img`
  width: 100%;
  height: 200px;
  border-radius: 8px 8px 0 0;
  object-fit: cover;
  opacity: ${(props) => (props.showImg ? 1 : 0)};
  transition: 0.4s;
`;

const GameCardBackground = (props) => {
  const [loadImg, setLoadImg] = useState(false);
  const [showImg, setShowImg] = useState(false);

  const intersectionObserver = useRef();
  const cardRef = useCallback((node) => {
    if (intersectionObserver.current) intersectionObserver.current.disconnect();
    intersectionObserver.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setLoadImg(true);
      } else if (!entries[0].isIntersecting && !showImg) {
        setLoadImg(false);
      }
    });
    if (node) intersectionObserver.current.observe(node);
  }, [showImg]);

  const onImageLoaded = () => {
    setShowImg(true);
  };

  return loadImg ? (
    <StyleGameCardBackground src={props.bg} ref={cardRef} onLoad={() => onImageLoaded()} showImg={showImg} />
  ) : (
    <StyleGameCardBackground
      ref={cardRef}
      src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
    />
  );
};

export default GameCardBackground;
