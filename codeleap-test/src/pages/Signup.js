import { useState } from "react";
import { BackGround } from "../components/BackGround";
import Welcome from "../components/Welcome";

export default function Signup() {

    // HOOKS
    const [url, setUrl] = useState(window.location.href.toString());

    return(
        <>
            <BackGround>
                <Welcome url={url+'Home'}></Welcome>
            </BackGround>
        </>
    );
}