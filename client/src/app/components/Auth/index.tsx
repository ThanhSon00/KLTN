import { Outlet, useNavigate } from "react-router-dom";
import { getAuth } from "../SignInPanel/slice/selectors";
import { useAppSelector } from "store/hooks";

export default function Auth() {
    const { user } = useAppSelector(getAuth);
    const navigate = useNavigate();
    
    if (!user) {
        navigate('/');
        return <></>;
    }

    return (
        <>
            <Outlet />
        </>
    )
}