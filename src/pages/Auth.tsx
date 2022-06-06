import { FC, ReactNode } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Button } from "@mui/material";
import { googleAuthProvider } from "../firebase/auth";
import { useAppSelector } from "../store/hooks";

type Props = {
    children: ReactNode
}

export const Auth: FC<Props> = ({ children }) => {
    const user = useAppSelector(state => state.user)

    const handleClick = () => {
        signInWithPopup(getAuth(), googleAuthProvider)
    }

    return user
        ? <>{children}</>
        : <div>
            <Button onClick={handleClick}>Google Sign-In</Button>
        </div>

}