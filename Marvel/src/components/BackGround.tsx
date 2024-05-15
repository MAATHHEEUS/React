import Capa from '../assets/imgs/capa.png';
import styled from 'styled-components';

export const BackGround = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to right, transparent, #000000), url(${Capa});
  background-color: #000000;
  height: 100vh;
  background-repeat: no-repeat;
  background-position-x: right;
  animation-name: mostrarCapa;
  animation-duration: 4s;
`;