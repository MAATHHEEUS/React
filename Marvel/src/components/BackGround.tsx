import styled from 'styled-components';
import Capa from '../assets/imgs/capa.png';

export const BackGround = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #000000;
  height: 100vh;
`;

export const Image = styled.div`
  background-image: linear-gradient(to right, transparent, #000000), url(${Capa});
  background-repeat: no-repeat;
  background-position-x: right;
  animation: animatedBackgroundImage 3s linear;
  height: 100vh;
  width: 50%;

  @keyframes animatedBackgroundImage {
  
    from {
      transform: translateX(1000px);
    }
    to {
      transform: translateX(0);
    }
  }
`;