"use client"

import { AuthUser } from "@/ContextProvider/AuthProviderWrap";
import { getApiData } from "@/utils/api";
import { Button } from "react-bootstrap";

export default function Test() {

    const ___LOadTheDetails = async () => {
        const loggedUserData = await getApiData<{
            ok: boolean,
            user: AuthUser,
            message: string
        }>("/user/getLoggedUser", "POST", {}, "authorize");
        console.log("loggedUserData:", loggedUserData);
    }

    return <div>

        <Button type="button" variant="primary" onClick={() => {
            ___LOadTheDetails()
        }}>

            Load the details
        </Button>
    </div>;
}