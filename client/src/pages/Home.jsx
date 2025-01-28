import React, { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { jwtDecode } from "jwt-decode"; // Ensure this library is installed

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(null);
  const [prize, setPrize] = useState(null);
  const [message, setMessage] = useState("");

  const authToken = localStorage.getItem("authToken");

  // Decode token to extract the email
  const decodeToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded?.email || "";
    } catch (error) {
      console.error("Error decoding token:", error);
      return "";
    }
  };

  const email = decodeToken(authToken);

  const fetchRewardData = async () => {
    setLoading(true);
    setMessage(""); // Reset message
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/rewards/reward`,
        {
          method: "POST",
          body: JSON.stringify({ email }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setScore(data.data.score || 0);
        setPrize(data.data.prize || 0);
        setMessage(data.message); // Display server message
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Failed to fetch rewards.");
      }
    } catch (error) {
      console.error("Error fetching rewards:", error);
      setMessage("An error occurred. Please try again.");

      /*handle invalid token */
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full h-auto min-h-screen">
      <div className="max-w-[1320px] mx-auto md:px-20 px-5 py-10">
        <h3 className="text-gray-700 font-semibold capitalize  text-2xl border px-1 py-3 rounded-md bg-gray-600/10 overflow-auto">
          {email}
        </h3>

        {/* Header */}
        <h1 className="text-5xl font-bold mt-14">Get your rewards here...</h1>

        {/* Score and Prize */}
        <h4 className="text-indigo-700 text-2xl font-mono capitalize mt-6">
          Your Score - <span>{score !== null ? score : "Not available"}</span>
        </h4>
        <h4 className="text-indigo-700 text-2xl font-mono capitalize my-6">
          Your Prize - <span>{prize !== null ? prize : "Not available"}</span>
        </h4>

        {/* Fetch Rewards Button */}
        <div className="my-9">
          <button
            onClick={fetchRewardData}
            className="py-2 px-3 rounded-md bg-slate-950 text-white cursor-pointer text-xl"
            disabled={loading}
          >
            {loading ? "Loading..." : "Get Reward"}
          </button>
        </div>

        {/* Loading Spinner - for showing when data is loading */}
        {loading && (
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        )}

        {/* Display Message */}
        {message && (
          <div className="text-green-700 py-4 px-4 rounded-2xl border border-green-950 inline-block text-2xl mt-4">
            {message}
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
