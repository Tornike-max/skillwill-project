import { jwtDecode } from "jwt-decode";
import React, { useEffect, createContext } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    let [authTokens, setAuthTokens] = React.useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    let [user, setUser] = React.useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null);
    let [loading, setLoading] = React.useState(true);
    const [image, setImage] = React.useState('');

    let loginUser = async (loginData) => {
        try {
            setLoading(true); // Set loading to true when starting the login process
            if (!loginData) setLoading(true);
            let response = await fetch(`http://127.0.0.1:8000/api/token/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'email': loginData?.email, 'password': loginData?.password })
            });

            if (!response.ok) throw new Error();
            let data = await response.json();

            console.log(data);
            if (response.status === 200) {
                setAuthTokens(data);
                setUser(jwtDecode(data.access));
                localStorage.setItem('authTokens', JSON.stringify(data));
            } else {
                toast.error('Something went wrong');
            }
            console.log('response', response);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false); // Set loading to false when the login process is complete
        }
    };

    let logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
    };

    let updateToken = async () => {
        try {
            setLoading(true);
            console.log('Update token called');
            let response = await fetch(`http://127.0.0.1:8000/api/token/refresh/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'refresh': authTokens.refresh })
            });

            if (!response.ok) throw new Error();

            let data = await response.json();
            if (response.status === 200) {
                setAuthTokens(data);
                setUser(jwtDecode(data.access));
                localStorage.setItem('authTokens', JSON.stringify(data));
            } else {
                logoutUser();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    let contextData = {
        loginUser: loginUser,
        user: user,
        logoutUser: logoutUser,
        authTokens: authTokens,
        setImage: setImage,
        image: image
    };

    useEffect(() => {
        let fourMinute = 1000 * 60 * 4;
        let interval = setInterval(() => {
            if (authTokens) {
                updateToken();
            }
        }, fourMinute);

        return () => clearInterval(interval);
    }, [authTokens, loading, updateToken]);

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
