import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const loggedInData = useContext(UserContext);

    const [userCred, setUserCred] = useState({
        email: "",
        password: ""
    });



    const [message, setMessage] = useState({
        type: "invisible-msg",
        text: "Dummy"
    });

    function handleInput(event) {
        setUserCred(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }

    useEffect(() => {
        console.log(loggedInData.loggedUser);
    })

    function handleSubmit(event) {
        event.preventDefault();

        fetch("http://localhost:8000/login", {
            method: "POST",
            body: JSON.stringify(userCred),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.status === 404) {
                    setMessage({ type: "Error", text: "Username or Email does not exist" });
                    throw new Error('User not found');
                } else if (response.status === 403) {
                    setMessage({ type: "Error", text: "Incorrect password" });
                    throw new Error('Incorrect password');
                } else if (response.status === 200) {
                    setMessage({ type: "success", text: "Login successful!" }); // Set success message
                    return response.json();
                } else {
                    throw new Error('Unexpected error');
                }
            })
            .then(data => {
                console.log(`the data is --> ${JSON.stringify(data)}`);
                if (data && data.token) {
                    localStorage.setItem("nutrify-user", JSON.stringify(data));
                    localStorage.setItem("token", data.token);
                    localStorage.setItem('userId', data.userid);
                    console.log(localStorage.getItem("token"));
                    console.log(localStorage.getItem("userId"));
                    loggedInData.setLogUser(data)
                    console.log(loggedInData.loggeedUser);

                    navigate('/track');
                }
            })
            .catch(err => {
                console.log(err);
                setMessage({ type: "Error", text: "An unexpected error occurred. Please try again." });
            })
            .finally(() => {
                setTimeout(() => {
                    setMessage({ type: "invisible-msg", text: "" });
                }, 5000);
            });
    }


    return (
        <section className='Container'>
            <form className='form'>
                <input className="inp" required type='text' onChange={handleInput} name='email' value={userCred.email} placeholder='Enter Email' />
                <input className="inp" required type='password' onChange={handleInput} maxLength={8} name='password' value={userCred.password} placeholder='Enter Password' />
                <button className="btn" onClick={handleSubmit}>Login</button>
                <p>Not Registered? <Link to="/register">Sign Up</Link> </p>

                {/* Show message with conditional styling */}
                <p className={message.type}>{message.text}</p>
            </form>
        </section>
    );
}
