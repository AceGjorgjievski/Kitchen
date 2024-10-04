"use client";
import {createContext, useContext, useEffect, useState} from "react";
import {FULL_DOMAIN} from "../app/utils/constants.utils";
import {User} from "../app/types/types";
import { useRouter } from 'next/navigation'

const AuthContext = createContext(null);

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState<User>(null);
    const [token, setToken] = useState<string>("");
    const [shoppingCart, setShoppingCart] = useState(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");


        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        const checkLoggedInUser = async () => {
            if (!token) {
                console.log("No token available, skipping user check.");
                setIsLoading(false);
                return;
            }

            console.log("continues")

            try {
                const response = await fetch(FULL_DOMAIN + "/auth/current", {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }

                const loggedInUser = await response.json();

                if (loggedInUser) {
                    setUser(loggedInUser);
                    console.log("User verified:", loggedInUser);
                    fetchShoppingCart(); // Fetch cart only if user is verified
                }
            } catch (error) {
                console.error("Error verifying user:", error);
                setUser(null); // Clear user if verification fails
                setShoppingCart(null); // Clear shopping cart if user is not verified
            } finally {
                setIsLoading(false);
            }
        };

        checkLoggedInUser();
    }, [token]);



    const fetchShoppingCart = async () => {
        try {
            const response = await fetch(FULL_DOMAIN + "/shoppingCart/current", {
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            });
            const cartData = await response.json();
            setShoppingCart(cartData);
        } catch (err) {
            console.log("Failed to fetch shopping cart: ", err);
        }
    }

    const login = async (email, password) => {
        setIsLoading(true);
        try {
            const response = await fetch(FULL_DOMAIN + "/auth/login",
                {
                    method: 'POST',
                    body: JSON.stringify({email, password}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

            const data = await response.json();
            const user = {
                id: data.id,
                name: data.name,
                email: data.email,
                createdAt: data.createdAt,
                role: data.role
            }
            const accessToken = data.accessToken;
            console.log("logged user: ", user);

            if(user) {
                setUser(user);
                setToken(accessToken)
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("token", accessToken);

                router.push("/");
            }
        } catch (err) {
            console.log("Login failed: ", err);
        } finally {
            setIsLoading(false);
        }
    }

    const logout = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(FULL_DOMAIN + "/auth/logout", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Send token if necessary
                },
            });
            const data = await response.json();
            console.log("message: ", data.message);

        } catch (err) {
            console.log("Logout failed: ", err);
        } finally {
            setUser(null);
            setToken("");
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            setIsLoading(false);
        }
    }

    const register = async (name, email, password) => {
        setIsLoading(true);
        console.log("enters register: ")
        try {
            const data = {
                "name": name,
                "email": email,
                "password": password
            }
            const response = await fetch(FULL_DOMAIN + "/auth/register", {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({name, email, password})
            })

            console.log("response: ", await response.json());



        } catch (err) {
            console.log("Registration failed: ", err);
        } finally {
            setIsLoading(false);
            window.location.reload();
        }
    }

    return (
        <AuthContext.Provider value={{user, token, login, logout, register, shoppingCart, fetchShoppingCart, isLoading}}>
            {children}
        </AuthContext.Provider>
    );


}

