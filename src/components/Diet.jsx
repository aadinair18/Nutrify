import  { useEffect, useState } from 'react';
import './Diet.css'; // Make sure to import your CSS file

export default function Diet() {
    const [arr, setArr] = useState([]);

    useEffect(() => {
        let userId = localStorage.getItem('userId');
        fetch(`http://localhost:8000/track/${userId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setArr(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <div className="diet-container">
            <h1>Your Diet Tracking</h1>
            <div className="card-container">
                {arr.length > 0 ? (
                    arr.map((item) => (
                        <div className="card" key={item._id}>
                            <h2>{item.foodId.name}</h2> {/* Adjust based on your foodId reference */}
                            <p>Quantity: {item.quantity}</p>
                            <p>Calories: {item.details.calorie} kcal</p>
                            <p>Protein: {item.details.protein} g</p>
                            <p>Carbohydrates: {item.details.carbohydrates} g</p>
                            <p>Fat: {item.details.fat} g</p>
                            <p>Fiber: {item.details.fiber} g</p>
                            <p>Eaten on: {item.eatenDate}</p>
                        </div>
                    ))
                ) : (
                    <p>No tracking data available.</p>
                )}
            </div>
        </div>
    );
}
