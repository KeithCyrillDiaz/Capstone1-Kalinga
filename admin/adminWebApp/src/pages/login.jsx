import React, { useState } from "react";
import LoginIcon from "@assets/Login-Icon.png";
import KalingaLogo from "@assets/Kalinga-Logo.png";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AlertModal } from "../modal/logIn/AlertModal";
import { AdminLogin } from "../api/AdminLogin";
import { generateId, saveId, saveToken } from "../functions/Authentication";
import { Loader } from "../components/loader";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const [noInputs, setNoInputs] = useState(false);
  const [noUsernameInputs, setNoUsernameInputs] = useState(false);
  const [noPasswordInput, setNoPasswordInput] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (username === "" && password === "") {
      console.log("Invalid Inputs");
      setNoInputs(true);
      return;
    }
    if (username === "") {
      console.log("Invalid Username Input");
      setNoUsernameInputs(true);
      return;
    }
    if (password === "") {
      console.log("Invalid Password Input");
      setNoPasswordInput(true);
      return;
    }

    try {
      setLoading(true)
      const result = await AdminLogin({
        username: username,
        password: password,
      });
      setLoading(false)
      if (result.messages.code === 1) {
        console.log("Invalid Credentials");
        setMessage(result.messages.message);
        setInvalidCredentials(true);
        return;
      } else {
        if(result.token) saveToken({token: result.token})
        const id = generateId()
        saveId({id: id})
        navigate(`/admin/${id}`);
      }
    } catch (error) {
      console.log("Failed Admin Login", error);
      return;
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  if(loading) {
    return(
      <Loader isLoading={loading}/>
    )
  }
  return (
    <section className="w-full min-h-screen overflow-hidden body-color">
      <div className="lg:relative lg:left-20 xl:left-[-3.5rem] xl:mt-[-.5rem] lg:mt-[-.6rem]">
        <div className="grid items-cente  r h-screen xl:justify-center lg:justify-start">
          <div className="flex flex-col">
            <div className="flex flex-row items-center justify-center h-full lg:gap-x-8 xl:gap-x-3">
              <div className="relative xl:top-3 lg:top-[10px] left-[150px] bg-secondary-default xl:p-[7.125rem] lg:p-[5.3rem] rounded-tl-[4.5rem] rounded-bl-[4.5rem]">
                <div className="flex flex-col items-center justify-center">
                  <img src={KalingaLogo} alt="KalingaLogo" />
                  <h1 className="font-normal text-center xl:pb-6 lg:pb-2 xl:text-5xl lg:text-3xl text-primary-default">
                    Kalinga
                  </h1>
                  <h1 className="font-normal text-center xl:text-5xl lg:text-3xl text-primary-default">
                    Admin
                  </h1>
                </div>
              </div>
              <div className="z-[1000] relative">
                <img
                  src={LoginIcon}
                  alt="LoginIcon"
                  className="xl:w-fit lg:w-[34.5rem]"
                />
                <span>
                  <p className="absolute text-2xl font-medium xl:top-[12rem] lg:top-[8rem] xl:left-[13rem] lg:left-[10rem] text-primary-default">
                    Please enter valid credentials.
                  </p>

                  {/* Alerts */}
                  {noInputs && (
                    <AlertModal
                      message={message}
                      NoInputs={noInputs}
                      onClose={() => setNoInputs(false)}
                    />
                  )}
                  {noUsernameInputs && (
                    <AlertModal
                      message={message}
                      NoUsernameInputs={noUsernameInputs}
                      onClose={() => setNoUsernameInputs(false)}
                    />
                  )}
                  {noPasswordInput && (
                    <AlertModal
                      message={message}
                      NoPasswordInput={noPasswordInput}
                      onClose={() => setNoPasswordInput(false)}
                    />
                  )}
                  {invalidCredentials && (
                    <AlertModal
                      message={message}
                      InvalidUsername={invalidCredentials}
                      onClose={() => setInvalidCredentials(false)}
                    />
                  )}

                  <div className="absolute xl:top-[16rem] lg:top-[12rem] xl:left-[13rem] lg:left-[10rem]">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#e60965"
                        strokeWidth="1.5"
                      >
                        <g fill="none" stroke="#e60965" strokeWidth="1.5">
                          <path
                            strokeLinejoin="round"
                            d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"
                          />
                          <circle cx="12" cy="7" r="3" />
                        </g>
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Username"
                      className="py-4 text-xl border shadow-xl pr-7 pl-14 rounded-2xl border-primary-default focus:outline-none focus:ring-2 focus:ring-primary-default focus:border-transparent placeholder:text-primary-default text-primary-default"
                      onChange={(event) => setUsername(event.target.value)}
                      value={username}
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                  <div className="absolute xl:top-[22rem] lg:top-[18rem] xl:left-[13rem] lg:left-[10rem]">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#e60965"
                          d="M6.615 21q-.67 0-1.143-.472Q5 20.056 5 19.385v-8.77q0-.67.472-1.143Q5.944 9 6.615 9H8V7q0-1.671 1.164-2.836T12 3t2.836 1.164T16 7v2h1.385q.67 0 1.143.472q.472.472.472 1.143v8.77q0 .67-.472 1.143q-.472.472-1.143.472zm0-1h10.77q.269 0 .442-.173t.173-.442v-8.77q0-.269-.173-.442T17.385 10H6.615q-.269 0-.442.173T6 10.615v8.77q0 .269.173.442t.442.173M12 16.5q.633 0 1.066-.434T13.5 15t-.434-1.066T12 13.5t-1.066.434T10.5 15t.434 1.066T12 16.5M9 9h6V7q0-1.25-.875-2.125T12 4t-2.125.875T9 7zM6 20V10z"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-row items-center">
                      <input
                        type={hidePassword ? "password" : "text"}
                        placeholder="Password"
                        className="py-4 text-xl border shadow-xl pr-7 pl-14 rounded-2xl border-primary-default focus:outline-none focus:ring-2 focus:ring-primary-default focus:border-transparent placeholder:text-primary-default text-primary-default"
                        onChange={(event) => setPassword(event.target.value)}
                        value={password}
                        onKeyDown={handleKeyDown}
                      />
                      {!hidePassword && (
                        <FaEye
                          onClick={() => setHidePassword(true)}
                          className="ml-[-11%]"
                          size={24}
                          color="#E60965"
                        />
                      )}
                      {hidePassword && (
                        <FaEyeSlash
                          onClick={() => setHidePassword(false)}
                          className="ml-[-11%]"
                          size={24}
                          color="#E60965"
                        />
                      )}
                    </div>
                  </div>
                  <div className="absolute xl:top-[30rem] lg:top-[24rem] xl:left-[17rem] lg:left-[14rem]">
                    <button
                      onClick={handleLogin}
                      className="px-16 py-2 text-2xl text-white transition-all duration-300 ease-in-out rounded-3xl bg-primary-variant font-extralight hover:bg-secondary-default focus:outline-none focus:ring-2 focus:ring-primary-default focus:ring-opacity-50 active:bg-secondary-default"
                    >
                      Login
                    </button>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
