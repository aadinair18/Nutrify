import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
export default function FoodItems(props) {
    console.log(`props that we get are  --> ${props.item}`);
    const navigate = useNavigate();

    const [eatenQuantity, setEatenQuantity] = useState(100);
    const [item, setFoodItem] = useState({});
    const [foodInitial, setFoodInitial] = useState({});
    const loggedData = useContext(UserContext);

    useEffect(() => {
        if (props.item) {
            setFoodItem(props.item);
            setFoodInitial(props.item);
            console.log(loggedData.loggedUser);
        }
    }, [props.item]);

    function calculateMacros(event) {
        const quantity = Number(event.target.value);

        if (quantity > 0) {
            setEatenQuantity(quantity);
            console.log(`quantity gets updated to --> ${quantity}`)

            const updatedFood = {
                ...foodInitial,
                protein: (foodInitial.protein * quantity) / 100,
                calories: (foodInitial.calories * quantity) / 100,
                carbohydrates: (foodInitial.carbohydrates * quantity) / 100,
                fiber: (foodInitial.fiber * quantity) / 100,
                fat: (foodInitial.fat * quantity) / 100,
            };

            setFoodItem(updatedFood);
        }
    }

    function trackFoodItem() {
        let userId = localStorage.getItem("userId");
        let token = localStorage.getItem("token");

        // Use userId and foodId from localStorage if available
        let trackedFoodItem = {
            "userId": userId,
            "foodId": item._id, // You might also want to get this from localStorage if needed
            "details": {
                "protein": foodInitial.protein,
                "carbohydrates": foodInitial.carbohydrates,
                "fat": foodInitial.fat,
                "fiber": foodInitial.fiber
            },
            "quantity": eatenQuantity
        };

        console.log(trackedFoodItem);

        fetch('http://localhost:8000/track', {
            method: "POST",
            body: JSON.stringify(trackedFoodItem),
            headers: {
                "Content-Type": "application/json",  // Set Content-Type
                "Authorization": `Bearer ${token}`
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`); // Handle HTTP errors
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                navigate('/diet');
            })
            .catch((error) => {
                console.error("Error:", error); // Log any errors that occur during fetch
            });
    }

    return (
        <div className="Food">
            <div className="foodImage">
                {/* Image for the food */}
                <img src={item.imageUrl} alt="Food" />
            </div>
            <h2 className="foodName">{item?.name}</h2>

            {/* Nutrition Information */}
            <div className="nutrition-info">
                <div className="nutrition-tag">Fiber: {item?.fiber || 0} unit</div>
                <div className="nutrition-tag">Calories: {item?.calories || 0} Kcal for {eatenQuantity} GMS</div>
                <div className="nutrition-tag">Carbs: {item?.carbohydrates || 0} unit</div>
                <div className="nutrition-tag">Protein: {item?.protein || 0} unit</div>
            </div>

            {/* Quantity Input and Button */}
            <div className="food-actions">
                <input
                    type="number"
                    onChange={calculateMacros}
                    className="inp"
                    placeholder="Quantity in Gms"
                    min="1"
                />
                <button className="btn" onClick={trackFoodItem}>Track this food</button>
            </div>
        </div>
    );
}
