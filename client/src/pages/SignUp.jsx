import { ViewIcon, ViewOffSlashIcon } from "hugeicons-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const ChangePasswordType = () => {
    if (passwordType == "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(name, email, password);
    const data = { name, email, password };
    const apiCalling = await fetch(
      `${import.meta.env.SERVER_URL}/api/v1/user/signup`,
      {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let result = await apiCalling.json();
    if (result) {
      setLoading(false);
      localStorage.setItem("authToken", result.token);
      navigate("/");
    }
    console.log(result);
  };
  return (
    <>
      <section className=" bg-white">
        <div className=" h-screen w-full bg-white min-h-screen mx-auto   max-w-[1320px]  ">
          <div className="md:px-20 px-5 pt-20">
            <h3 className="  text-3xl font-sans ">Sign up</h3>
            {import.meta.env.VITE_KEY}
            <form action="" className="pt-5">
              {/* user name */}
              <div className="flex flex-col max-w-[500px] gap-y-1 mb-5">
                <label htmlFor="name" className="capitalize  ">
                  name
                </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder=" your username"
                  className="py-3 px-3 border border-slate-500 rounded-md focus:outline-indigo-800 outline-0 focus:outline-1  "
                />
              </div>

              {/* email */}

              <div className="flex flex-col max-w-[500px] gap-y-1 mb-5">
                <label htmlFor="email" className="capitalize  ">
                  email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=" your email"
                  className="py-3 px-3 border border-slate-500 rounded-md focus:outline-indigo-800 outline-0 focus:outline-1  "
                />
              </div>

              <div className="flex flex-col max-w-[500px] gap-y-1 mb-5 relative">
                <label htmlFor="password" className="capitalize  ">
                  password
                </label>
                <input
                  type={passwordType}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=" your password"
                  className="py-3 px-3 border border-slate-500 rounded-md focus:outline-indigo-800 outline-0 focus:outline-1  "
                />

                <button
                  onClick={ChangePasswordType}
                  type="button"
                  className="absolute top-11 right-2 cursor-pointer"
                >
                  {passwordType == "password" ? (
                    <ViewIcon />
                  ) : (
                    <ViewOffSlashIcon />
                  )}
                </button>
              </div>

              <div className="mt-9">
                <button
                  type="submit"
                  className="py-2 px-3 rounded-md bg-slate-950 text-white cursor-pointer"
                  onClick={handleSubmit}
                >
                  {loading ? "loading" : " Sign up"}
                </button>
              </div>
            </form>

            <h3>
              already have an account{" "}
              <Link to="/signin" className="text-blue-700 underline">
                sing in
              </Link>{" "}
            </h3>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
