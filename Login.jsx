import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import UserService from "../services/UserService";
import AuthService from "../services/AuthService";
import { useTheme } from "../context/ThemeContext";


export default function Login() {

    const { isDark, toggleTheme } = useTheme();

    const nav = useNavigate();


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function getEmail(e) {
        setEmail(e.target.value)
    }

    function getPassword(e) {
        setPassword(e.target.value)
    }

    async function submitForm(e) {
        e.preventDefault();

        let payload = {
            email,
            password
        };

        if (email == "" || password == "") {
            toast.error("credentials cannot be empty!")
        }
        else if(password.length <= 6){
            toast.error("password must be more than 6 characters long")
        }
        
        else {
            try {
                const user = await UserService.login(payload);
                await AuthService.setData(user); // <-- was missing: this is what actually saves id/name/userType to localStorage
                toast.success("Login Success");
                if (user.userType == "1") {
                    nav("/admin");
                } else if (user.userType == "2") { // navigate based on your user Roles
                    nav("/student");
                } else {
                    nav("/");
                    Swal.fire({
                        title: "User does not exist!",
                        text: "Recheck your credentials",
                    });
                }

            } catch (err) {
                toast.error(err.message);
            }
        }
    }


    return (
        <>
            <div>
                <button className="icon-button theme-toggle auth-theme-toggle" type="button" onClick={toggleTheme} aria-label="Switch color theme" title="Switch color theme">
                    <i className={`bi ${isDark ? "bi-sun" : "bi-moon-stars"}`} aria-hidden="true" />
                </button>
                <main className="auth-page">
                    <section className="auth-card">
                        <Link className="auth-brand" to="/layout"><span className="brand-icon"><i className="bi bi-grid-1x2-fill" aria-hidden="true" /></span><span><h3>Hostel Management Portal</h3></span></Link>
                        
                        {/* Input Form */}
                        <form className="needs-validation" noValidate onSubmit={submitForm}>
                            <div className="mb-4">
                                <p className="eyebrow mb-1">Secure Access</p>
                                <h1 className="h3 mb-1">Login</h1>
                                <p className="text-muted mb-0">Sign in to your account.</p>
                            </div>
                            <div className="mb-3"><label className="form-label" htmlFor="loginEmail">Email address</label>
                                <input
                                    className="form-control"
                                    id="loginEmail"
                                    type="email"
                                    value={email}
                                    onChange={getEmail}
                                    required />
                                <div className="invalid-feedback">Enter Link valid email.</div>

                            </div>
                            <div className="mb-3">
                                <div className="d-flex justify-content-between"><label className="form-label" htmlFor="loginPassword">Password</label></div>
                                <input
                                    className="form-control"
                                    id="loginPassword"
                                    type="password"
                                    minLength={6}
                                    value={password}
                                    onChange={getPassword}
                                    required />
                                <div className="invalid-feedback">Password must be at least 6 characters.</div>

                            </div>
                            <div className="form-check mb-4"><input className="form-check-input" type="checkbox" id="rememberMe" /><label className="form-check-label" htmlFor="rememberMe">Remember me</label></div>
                            <button className="btn btn-primary w-100" type="submit"><i className="bi bi-box-arrow-in-right" aria-hidden="true" /> Sign In</button>
                        </form>
                    </section>
                </main>
            </div>

        </>
    )
}