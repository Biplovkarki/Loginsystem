import { useState } from "react";

export default function LoginSystem() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState({
        password: "",
        showPassword: false,
    });

    const [isvalid, setValid] = useState(true);
    const [strong, setStrength] = useState(false);

    // State to track the current active field
    const [activeField, setActiveField] = useState(null);

    const handleEmail = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        setActiveField("email"); // Set the active field to email
        if (newEmail !== "") {
            const Emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            setValid(Emailregex.test(newEmail));
        } else {
            setValid(false);
        }
    };

    const HandleInputPassword = (e) => {
        const pass = e.target.value;
        setPassword({ ...password, password: pass });
        setActiveField("password"); // Set the active field to password
        if (pass.length > 8) {
            const passwordRegex = /^(?:(?=.*[A-Za-z])(?=.*[0-9]{1,11})(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}|[0-9]{8,15}|[0-9@$!%*?&]{8,15})$/;
            setStrength(passwordRegex.test(pass));
        } else {
            setStrength(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isvalid && strong) {
            alert("Login Successful");
        } else {
            alert("Please enter valid format");
        }
    };

    return (
        <div className="main">
            <form onSubmit={handleSubmit} className="form">
                <div>
                    <img src="moneky.jpg" alt="userlogin" />

                    <h2>User Login Form</h2>

                    <label>
                        Email:
                        <input
                            className="email"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={handleEmail}
                            onFocus={() => setActiveField("email")}
                        />
                    </label>
                    <br />

                    <label>
                        Password:
                        <input
                            className="password"
                            type={password.showPassword ? "text" : "password"}
                            name="Pass"
                            placeholder="Enter strong Password"
                            value={password.password}
                            onChange={HandleInputPassword}
                            maxLength={15}
                            onFocus={() => setActiveField("password")}
                        />
                    </label>
                    <br />

                    <span>
                        <input
                            type="checkbox"
                            checked={password.showPassword}
                            onChange={() => {
                                setPassword({ ...password, showPassword: !password.showPassword });
                            }}
                        />
                        Show password
                    </span>
                    <br />

                    <div className="button-container">
                        <button type="submit">Login</button>
                    </div>


                    {activeField === "email" && !isvalid && (
                        <p className="erroremail" style={{ color: "red" }}>Invalid Email Format, please correct</p>
                    )}
                    {activeField === "email" && isvalid && (
                        <p className="validemail" style={{ color: "green" }}>Valid Email Format</p>
                    )}
                    {activeField === "password" && !strong && (
                        <p className="errorpass" style={{ color: "red" }}>Weak password! Please provide a strong password</p>
                    )}
                    {activeField === "password" && strong && (
                        <p className="validpass" style={{ color: "green" }}>Strong Password</p>
                    )}
                </div>
            </form>
        </div>
    );
}
