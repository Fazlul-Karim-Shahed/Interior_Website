"use client";

import { getSettingsApi } from "@/src/api/settingsApi";
// import { getSettingsApi } from "@/src/api/SuperAdminApi/SettingsApi";
import { checkAuth, tokenDecode } from "@/src/functions/AuthFunctions";
import { preloadAuth } from "@/src/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Preload() {
    const dispath = useDispatch();

    useEffect(() => {
        
        tokenDecode().then((data) => {
            checkAuth().then((auth) => {
                dispath(
                    preloadAuth({
                        decodedToken: data,
                        authenticated: auth,
                    })
                );
            });
        });


    }, []);

    return <div></div>;
}
