import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Flex from './Flex';
import Spacer from './Spacers';

const config = {
  slideDelay: 4000, //Длительность одного слайда
  animationDuration: 510, //Длительность анимации слайда
};

const slide = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const progress = keyframes`
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
`;

const StyledWrapper = styled.div`
  position: relative;
  width: calc(100vw - 50vw - 60px - 20px);
  height: ${(props) => props.height};

  @media (max-width: 1200px) {
    padding-right: 10px;
    width: 100%;
    height: auto;
  }
`;

const StyledWindow = styled.div`
  overflow: hidden;
  position: relative;
`;

const StyledSliderItem = styled.img`
  object-fit: cover;
  width: calc(100vw - 50vw - 60px - 20px);

  @media (max-width: 1200px) {
    width: 100%;
  }
`;

const StyledSliderRow = styled.div`
  animation: ${(props) =>
    props.sliding
      ? css`
          ${slide} ${config.animationDuration / 1000}s forwards
        `
      : ''};
`;

const StyledSlidesUnder = styled.img`
  position: relative;
  width: calc(15% - 10px);
  cursor: pointer;
  transition: 0.2s;

  &:not(:last-of-type) {
    margin-right: 10px;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

const StyledTip = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000000b0;
  opacity: ${(props) => (props.showTip === 'show' ? 1 : 0)};
  transition: 0.5s;
`;

const StyledProgressBar = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  height: 4px;
  background: #135dff;
  width: 0;
  animation: ${(props) =>
    !props.sliding
      ? css`
          ${progress} ${config.slideDelay / 1000 + 's'} forwards linear
        `
      : ''};
`;

const Slider = ({ slidesArr }) => {
  const [activeSlide, setActiveSlide] = useState(''); //Выбранный слайд пользователем
  const [sliding, setSliding] = useState(false); //Текущее состояние анимации
  const [slides, setSlides] = useState([]); //загруженные слайды
  const [isPaused, setIsPaused] = useState(false); //Пользователь поставил паузу или нет ховером на слайд
  const [showTip, setShowTip] = useState('show'); //Подсказка по взаимодействую со слайдером show, hiding, hide

  //Рефы для хранения таймаутов между ререндерами
  const timeoutRef = useRef();
  const nextSlideTimeoutRef = useRef();
  const slidingTimeoutRef = useRef();

  // Убираем подсказку спустя через 4 секунды
  useEffect(() => {
    setTimeout(() => {
      setShowTip('hiding');
      setTimeout(() => setShowTip('hide'), 500);
    }, 4000);
  }, []);

  useEffect(() => {
    setSlides(slidesArr);
  }, [slidesArr]);

  // Если выполняются данные условия, то запускаем анимацию и перестановку слайдов бесконечного слайдера
  useEffect(() => {
    if (slides.length > 1 && !isPaused && !sliding && !activeSlide && showTip === 'hide') {
      timeoutRef.current = setTimeout(() => {
        setSliding(true);
        nextSlideTimeoutRef.current = setTimeout(() => {
          nextSlide();
        }, config.animationDuration);
      }, config.slideDelay);
    }
    if (isPaused && timeoutRef.current) clearTimeout(timeoutRef.current);
    if (isPaused && nextSlideTimeoutRef.current) clearTimeout(nextSlideTimeoutRef.current);
  }, [slides, isPaused, sliding, activeSlide, showTip]);

  useEffect(() => {
    if (sliding)
      slidingTimeoutRef.current = setTimeout(() => {
        setSliding(false);
        slidingTimeoutRef.current = null;
      }, config.animationDuration);
    if (activeSlide) {
      setSliding(false);
      clearTimeout(slidingTimeoutRef.current);
      slidingTimeoutRef.current = null;
    }
  }, [sliding, activeSlide]);

  // Перестановка слайдов
  const nextSlide = () => {
    const result = [...slides];
    const firstSlide = result.shift();
    result.push(firstSlide);
    setSlides(result);
  };

  // Выбрать слайд
  const selectSlide = (image) => {
    setActiveSlide(image);
  };

  // Рендер слайда в слайдере
  const renderItems = () => {
    return slides.map((slide) => {
      return <StyledSliderItem src={slide.image} key={slide.id} />;
    });
  };

  // Рендер всех слайдов под слайдером
  const renderSlides = () => {
    return slidesArr.map((slide) => {
      return <StyledSlidesUnder src={slide.image} onClick={() => selectSlide(slide.image)} />;
    });
  };

  return (
    <StyledWrapper>
      <StyledWindow onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
        {slides.length !== 0 && showTip !== 'hide' && (
          <StyledTip showTip={showTip}>
            Hover over to pause <br /> Click to view
          </StyledTip>
        )}
        {slides.length !== 0 && showTip === 'hide' && !isPaused && !activeSlide && (
          <StyledProgressBar sliding={sliding} />
        )}
        <StyledSliderRow sliding={sliding}>
          {activeSlide ? (
            <StyledSliderItem src={activeSlide} onClick={() => setActiveSlide('')} />
          ) : (
            <Flex align="center">{renderItems()}</Flex>
          )}
          {slides.length === 0 && (
            <StyledSliderItem src="https://i.pinimg.com/originals/ae/8a/c2/ae8ac2fa217d23aadcc913989fcc34a2.png" />
          )}
        </StyledSliderRow>
      </StyledWindow>
      <Spacer height="20px" />
      <Flex align="center" justify="center" wrap="wrap">
        {renderSlides()}
      </Flex>
    </StyledWrapper>
  );
};

export default Slider;
