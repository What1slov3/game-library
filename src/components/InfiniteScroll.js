import React, { Component, useCallback, useRef } from 'react';

// Бесконечный скролл
// Как только в поле видимости попадает див, значит доскролили до низа, значит делаем загрузку новых карточек
const InfiniteScroll = ({ children, loader, next, end, loading }) => {
  const intersectionObserver = useRef();
  const bottomOfListRef = useCallback(
    (node) => {
      if (loading) return;
      if (intersectionObserver.current) intersectionObserver.current.disconnect();
      intersectionObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (!loading) {
            next();
          }
        }
      });
      if (node) intersectionObserver.current.observe(node);
    },
    [loading, next]
  );

  return (
    <div>
      {end && end} 
      {loading && loader && loader}
      {children}
      <div ref={bottomOfListRef}></div>
    </div>
  );
};

export default InfiniteScroll;
