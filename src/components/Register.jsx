import { useState } from 'react';
import { Link } from 'react-router-dom';
export default function Register() {
    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        password: "",
        age: ""
    });

    const [message, setMessage] = useState({
        type: "invisible-msg",
        text: ""
    });

    function handleInput(event) {
        setUserDetails(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        fetch("http://localhost:8000/register", {
            method: "POST",
            body: JSON.stringify(userDetails),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                // Handle non-2xx responses manually
                if (!response.ok) {
                    throw new Error('Failed to register');
                }
                return response.json(); // Convert to JSON if the response is OK
            })
            .then(data => {
                setMessage({ type: "Success", text: data.message });
                setUserDetails({
                    name: "",
                    age: "",
                    email: "",
                    password: ""
                });
                setTimeout(() => {
                    setMessage({ type: "invisible-msg", text: "dummy-message" });
                }, 5000);
            })
            .catch(err => {
                console.log(err);
                setMessage({ type: "Error", text: "Registration failed. Please try again." });
                setTimeout(() => {
                    setMessage({ type: "invisible-msg", text: "dummy-message" });
                }, 5000);
            });
    }

    return (
        <section className='Container'>
            <form className='form'>
                <input className="inp" required type='text' onChange={handleInput} name='name' placeholder='Enter Name' value={userDetails.name} />
                <input className="inp" required type='number' max={100} min={12} onChange={handleInput} name='age' value={userDetails.age} placeholder='Enter Age' />
                <input className="inp" required type='text' onChange={handleInput} name='email' value={userDetails.email} placeholder='Enter Email' />
                <input className="inp" required type='text' onChange={handleInput} maxLength={8} name='password' value={userDetails.password} placeholder='Enter Password' />
                <button className="btn" onClick={handleSubmit}>Join</button>
                <p>Already Registered ?  <Link to="/login">Login</Link> </p>

                <p className={message.type}> {message.text}</p>


            </form>




        </section>
    )
}
