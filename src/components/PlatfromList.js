import React from 'react';
import styled from 'styled-components';
import Flex from './Flex';

const StyledListItem = styled.span`
  &:not(:last-of-type) {
    margin-right: 8px;
  }

  & > i {
    font-size: ${props => props.size || '14px'};
  }
`;

// Классы иконок платформ в font awesome
const platforms = {
  pc: 'fab fa-windows',
  playstation: 'fab fa-playstation',
  xbox: 'fab fa-xbox',
  mac: 'fab fa-apple',
  linux: 'fab fa-linux',
  ios: 'fab fa-apple',
  android: 'fab fa-android',
  nintendo: 'fas fa-tablet-alt'
};

const PlatformList = ({ availablePlatforms, key, size }) => {
  const renderPlatforms = () => {
    return availablePlatforms?.map((platform) => {
      if (platforms[platform.platform.slug]) {
        return (
          <StyledListItem key={key} size={size}>
            <i className={platforms[platform.platform.slug]}></i>
          </StyledListItem>
        );
      }
    });
  };

  return <Flex align="center">{renderPlatforms()}</Flex>;
};

export default PlatformList;
