import React, { useState } from 'react';
import styled from 'styled-components';
import Seta from '../assets/imgs/Icon-awesome-angle-down.png';

const Container = styled.div`
    position: fixed;
    width: 10.3rem;
    height: 2.75rem;
    color: #FF0000;
    font-family: Inter;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.25rem;
    top: 144px;
    &:after {
        content: url(${Seta});
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
    }
`;

const Select = styled.select`
    appearance: none;
    width: 100%;
    background-color: #000000;
    color: #FF0000;
    border: 1px solid #FF0000;
    height: 100%;
    border-radius: 10px;
    font-family: Inter;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.25rem;
    padding: 0.5rem;
`;

const Option = styled.option`
    &:hover {
        background-color: #000000;
    }
`;

const Filtro = () => {
    const [filter, setFilter] = useState('');

    const handleChangeFilter = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setFilter(event.target.value);
    }

    return (
        <Container>
            <Select>
                <Option value="">Filtrar por</Option>
                <Option value="lancamento">Lançamento</Option>
                <Option value="cronologia">Cronologia</Option>
            </Select>
        </Container>
    );
};

export default Filtro;