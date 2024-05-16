import styled from 'styled-components';

export const Title = styled.div`
  font-family: MarvelRegular;
  font-size: 6.25rem;
  font-weight: 400;
  line-height: 7.5rem;
  text-align: left;
  background: #FF0000;
  color: #FFFFFF;
  width: fit-content;
  height: fit-content;
  padding: 0rem 1rem 0rem 1rem;
  animation: animatedHomeTitle, animatedHomeTitleAfter;
  animation-duration: 3s, 3s; 
  animation-delay: 0s, 3s;
  animation-direction: normal, alternate;
  animation-iteration-count: 1, 2;
  margin-left: 200px;

  @keyframes animatedHomeTitle {
  
    from {
      transform: translateX(500px);
    }
    to {
      transform: translateX(0px);
    }
  }

  @keyframes animatedHomeTitleAfter {
  
    from {
      transform: translateY(0px);
    }
    to {
      transform: translateY(-200px);
    }
  }
`;