import React from 'react'
import { Card, Button, Textarea } from "flowbite-react";
import { HiStar } from "react-icons/hi";
import { useState } from "react";
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { addRateAPI } from '../../services/allAPIs';

function Rating() {
    const [rating, setRating] = useState(0);

    const [rate, setRate] = useState({
          rating: 0,
          feedback: ""
        })
    
        const handleAddRate = async () => {
    
            const { rating, feedback } = rate
            console.log(rate);
            if ( rating && feedback ) {
                try {
                    let token = sessionStorage.getItem("token")
                    const reqHeader = {
                        Authorization: `Bearer ${token}`
                    }
                    const reqBody = { rating, feedback }
                    const response = await addRateAPI(reqBody, reqHeader)
                    console.log(response);
                    if (response.status === 200) {
                        alert(response.data.message)
    
                        setRate({
                            rating: 0,
                            feedback: ""
                        })
                        setRating(0)
                    }
                }
                catch (err) {
                    console.log(err);
                    alert("You already submitted a rating")
                }
            }
            else {
                alert("Please give rating and feedback")
            }
    
        }
  return (
    <div>
        <Header/>
    <div className="flex justify-center items-center min-h-screen p-6">
      <Card className="w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-2 text-black">Thank You for your Time!</h1>
        <p className="mb-4 text-black">We’d love to hear how the experience felt for you.</p>

        {/* Rating stars */}
        <div className="flex justify-center items-center gap-1 mb-4">
            {
            [1, 2, 3, 4, 5].map((star) => (
                <HiStar className={`h-7 w-7 cursor-pointer transition ${
                    star <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
                onClick={() => {
                  setRating(star);
                  setRate({ ...rate, rating: star });
                }}
                />
            ))
            }
        </div>

        {/* Feedback textarea */}
        <Textarea onChange={(e) => setRate({ ...rate, feedback: e.target.value })} value={rate.feedback}
          placeholder="Leave your thoughts here..."
          rows={4}
          className="mb-4"
        />

        {/* Submit button */}
        <Button onClick={handleAddRate} className="w-full bg-[#660000] hover:bg-[#5E445C]">
          Submit Feedback
        </Button>
      </Card>
    </div>
    <Footer/>
    </div>
  )
}

export default Rating
