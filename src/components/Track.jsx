import { useEffect, useState } from "react";
import FoodItems from "./FoodItems";

export default function Track() {
    const [foodItems, setFoodItems] = useState([]);
    const [khana, setkhana] = useState();

    useEffect(() => {
        console.log(khana);

    });

    function searchFood(event) {
        console.log(event.target.value);

        console.log(`this is our token in track page --> ${localStorage.getItem("token")}`);
        if (event.target.value !== "") {
            fetch(`http://localhost:8000/food/${event.target.value}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Passing the token in Authorization header
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    // Check if the data is an array
                    if (Array.isArray(data)) {
                        setFoodItems(data); // If data is an array, update the state
                    } else {
                        setFoodItems([]); // If not, reset to an empty array
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            setFoodItems([]); // If input is empty, reset the foodItems array
        }
    }
    return (
        <>
            <section className="container track-container">
                <div className="search">
                    <input
                        className="search-inp"
                        name='search'
                        onChange={searchFood}
                        type="search"
                        placeholder="Search Food Items By Name"
                    />
                </div>

                <div className="search-results">
                    {/* Only map if foodItems is an array */}
                    {Array.isArray(foodItems) && foodItems.length > 0 ? (
                        foodItems.map((food) => (
                            <p className="Item" onClick={() => {
                                // displayItem(food._id);
                                setkhana(food);
                            }} key={food._id}> {food.name}</p>
                        ))
                    ) : (
                        null
                    )}
                </div>
                <br />
                {
                    khana !== undefined ?
                        <FoodItems item={khana} />
                        :
                        null
                }





            </section>


        </>

    );
}
