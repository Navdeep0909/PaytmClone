import { useEffect, useState } from "react"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios"

export const Dashboard = () => {

    const defualtValues = {
        firstName: "Navdeep",
        balance: 10000
    }

    const [user, setUser] = useState(defualtValues);
    const [account, setAccount] = useState(defualtValues);
    const jwt = localStorage.getItem("token");

    async function fetchUser(){
        const response = await axios.get("http://localhost:3000/api/v1/user/getUser", {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        setUser(response.data.user);
    }

    async function fetchAccount(){
        const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        setAccount(response.data);
    }

    useEffect(() => {
        fetchUser();
        fetchAccount();
    }, [user, account]);

    return <div>
        <Appbar UserName={user.firstName} />
        <div className="m-8">
            <Balance value={account.balance.toFixed(2)} />
            <Users userId={user._id} />
        </div>
    </div>
}