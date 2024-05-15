import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 3rem;
`;

export const LoginBoasVindas = styled.h1`
  color: #FF0000;
  font-family: Inter;
  font-size: 1.8rem;
  font-weight: 400;
  line-height: 2.3rem;
  text-align: center;
`;

export const LoginSpan = styled.span`
  font-family: Inter;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.5rem;
  text-align: left;
  color: #84848D;
  margin-bottom: 1rem;
`;

export const LoginInput = styled.input`
  width: 23.9rem;
  height: 4.5rem;
  top: 20.4rem;
  left: 9.3rem;
  gap: 0rem;
  border-radius: 6.25rem;
  opacity: 0rem;
  background: #FFFFFF;
  box-shadow: 0rem 0.1rem 0.1rem 0rem #00000029;
  color: #D1D1D6;
  border: none;
  font-size: 1.6rem;
  padding: 0rem 1rem 0rem 1rem;
  margin-bottom: 1rem;
`;

export const CheckBox = styled.input.attrs({type: 'checkbox'})`
  width: 0.8rem;
  height: 0.9rem;
  margin-left: 1rem;
`;

export const Label = styled.label`
  font-family: Inter;
  font-size: 0.9rem;
  font-weight: 400;
  line-height: 1.1rem;
  text-align: left;
  color: #84848D;
  margin-right: 10rem;
`;

export const LoginLinkForgetSenha = styled.a`
  font-family: Inter;
  font-size: 0.9rem;
  font-weight: 400;
  line-height: 1.1rem;
  text-align: left;
  color: #84848D;
  text-decoration-color: #FF0000;
`;

export const LoginButton = styled.button`
  width: 25.9rem;
  height: 4rem;
  top: 35rem;
  left: 9.3rem;
  gap: 0rem;
  border-radius: 2rem;
  margin: 1rem 0rem 1rem 0rem;
  opacity: 0rem;
  background: #FF0000;
  font-family: Inter;
  font-size: 1.75rem;
  font-weight: 400;
  line-height: 2rem;
  text-align: center;
  color: #FFFFFF;
  border: none;
`;

export const NotLoginSpan = styled.a`
  color: #84848D;
  font-family: Inter;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.2rem;
  text-align: center;
`;

export const LoginLinkCadastrar = styled.a`
  color: #FF0000;
  font-family: Inter;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.2rem;
  text-align: left;

`;