import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    background-color: #FFFFFF;
    color: #FFFFFF;
    font-family: Roboto;
    width: 50%;
    height: 100vh;
`;

const Title = styled.h1`
    font-size: 1.3rem;
    font-weight: 700;
    line-height: 1.6rem;
    margin-bottom: 1.8rem;
    background-color: #000000;
    padding: 1.7rem 2.3rem;
    box-sizing: border-box;
    height: 5rem;
    width: 100%;
`;

export default function Network() {
    return(
        <Container>
            <Title>CodeLeap Network</Title>
        </Container>
    );   
}
