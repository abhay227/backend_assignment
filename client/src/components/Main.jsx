import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const Main = () => {
    const [user, setUser] = useState({ name: "", provider: "", id: "", email: "" });
    const navigate = useNavigate();

    const getItem = async () => {
        const response1 = await fetch('http://localhost:8000/auth/facebook/getInfo', {
            method: 'GET',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
        });

        const json1 = await response1.json();

        if (response1.status === 200) {
            alert("Successfully logged in");

            if (json1.emails) {
                setUser({ ...user, name: json1.displayName, provider: json1.provider, id: json1.id, email: json1.emails[0].value });
            } else {
                setUser({ ...user, name: json1.displayName, provider: json1.provider, id: json1.id, email: "Id not provided" });
            }
        } else {
            alert("Please login to access");
            navigate(`/login`);
        }
    };

    useEffect(() => {
        getItem();
    }, []);

    const logOutHandler = async () => {
        document.cookie = "";
        window.open('http://localhost:8000/auth/facebook/logout', '_self');
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Button
                variant="contained"
                color="primary"
                onClick={logOutHandler}
                style={{
                    marginTop: '50px',
                    padding: '12px',
                    fontWeight: '700',
                    fontSize: '20px',
                    cursor: 'pointer'
                }}
            >
                Log Out
            </Button>

            <div style={{
                marginTop: '60px',
                border: '2px solid gray',
                padding: '20px',
                fontSize: '20px'
            }}>
                <div style={{ paddingBottom: '5px' }}>{user.id}</div>
                <div style={{ paddingBottom: '5px' }}>{user.email}</div>
                <div style={{ paddingBottom: '5px' }}>{user.name}</div>
                <div style={{ display: "flex" }}>
                    <div style={{ paddingRight: "5px" }}>Provider :</div>
                    <div>{user.provider}</div>
                </div>
            </div>
        </div>
    );
};

export default Main;
