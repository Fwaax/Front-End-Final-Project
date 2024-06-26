import { useState } from "react";
import { base64UrlDecode, parseJWT, base64alt } from '../Auth/Jwt.js';

export default function useToken() {
    const [userToken, setUserToken] = useState(_getToken());

    function _getToken() {
        const tokenString = localStorage.getItem("token");
        if (!tokenString) return { decodedToken: null, token: null };
        const userToken = JSON.parse(tokenString);
        const decodedToken = parseJWT(userToken.token);
        return { decodedToken, token: userToken.token };
    }

    function saveToken(token) {
        const decodedToken = parseJWT(token);
        const userTokenToSave = { decodedToken, token };
        localStorage.setItem("token", JSON.stringify(userTokenToSave));
        setUserToken(userTokenToSave);
    }

    function removeToken() {
        localStorage.removeItem("token");
        setUserToken({ decodedToken: null, token: null });
    }

    return {
        setUserToken: saveToken,
        userToken,
        removeToken,
    };
}