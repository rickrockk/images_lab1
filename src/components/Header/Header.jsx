import React from "react";
import "./Header.css";
import OpenButton from "./OpenButton/OpenButton";

function Header({ setSelectedFile }) {
    return (
        <header className="header">
            <div className="header__container">
                <h1 className="header__title">Лабораторная работа №1</h1>
                <OpenButton setSelectedFile={setSelectedFile}/>
            </div>
        </header>
    )
}

export default Header;