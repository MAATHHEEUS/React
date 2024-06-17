import './CampoSenha.css';
import { useState } from 'react';
import { FaEyeSlash, FaRegEye } from "react-icons/fa";

export default function CampoSenha(props) {

    const [passValue, setPassValue] = useState({
        password: "",
        showPassword: true,
    });

    const handlePasswordChange = (prop) => (event) => {
        setPassValue({ ...passValue, [prop]: event.target.value });
        props.atualizaValor(event.target.value);
    };

    const handleClickShowPassword = () => {
        setPassValue({ ...passValue, showPassword: !passValue.showPassword });
    };

    return (
        <div className="campo__senha">
            <label>{props.label}</label>
            <div className='container__input'>
                <input
                    className="input"
                    type={passValue.showPassword ? "password" : "text"}
                    onChange={handlePasswordChange("password")}
                    value={props.valor}
                    required={props.obrigatorio} 
                    placeholder={props.placeholder}
                />
                <div
                    className="icon_button"
                    onClick={handleClickShowPassword}
                >
                    {passValue.showPassword ? (
                        <FaEyeSlash size={25}/>
                    ) : (
                        <FaRegEye size={25}/>
                    )}
                </div>
            </div>
        </div>
    )
}