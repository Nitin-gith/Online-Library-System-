import { useEffect, useState } from "react";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { auth } from "../../Firebase/firebaseconfig";
import UserService from "../../services/UserService";
import { toast } from "react-toastify";

export default function Settings() {

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    // editable personal info
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [savingInfo, setSavingInfo] = useState(false);

    // preferences
    const [language, setLanguage] = useState("English");
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [smsNotifications, setSmsNotifications] = useState(false);
    const [savingPrefs, setSavingPrefs] = useState(false);

    // password change
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [savingPassword, setSavingPassword] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    async function fetchProfile() {
        setLoading(true);
        try {
            const userId = localStorage.getItem("id");
            const res = await UserService.single(userId);
            setProfile(res);
            setPhone(res.phone || "");
            setAddress(res.address || "");
            setLanguage(res.preferences?.language || "English");
            setEmailNotifications(res.preferences?.emailNotifications ?? true);
            setSmsNotifications(res.preferences?.smsNotifications ?? false);
        } catch (err) {
            console.log("Error fetching profile: ", err);
            toast.error("Could not load your settings.");
        } finally {
            setLoading(false);
        }
    }

    async function handleSaveInfo(e) {
        e.preventDefault();
        setSavingInfo(true);
        try {
            await UserService.updateSettings(profile.id, { phone, address });
            toast.success("Contact details updated");
        } catch (err) {
            console.log("Error: ", err);
            toast.error(err.message);
        } finally {
            setSavingInfo(false);
        }
    }

    async function handleSavePreferences(e) {
        e.preventDefault();
        setSavingPrefs(true);
        try {
            await UserService.updateSettings(profile.id, {
                preferences: {
                    language,
                    emailNotifications,
                    smsNotifications,
                },
            });
            toast.success("Preferences updated");
        } catch (err) {
            console.log("Error: ", err);
            toast.error(err.message);
        } finally {
            setSavingPrefs(false);
        }
    }

    async function handleChangePassword(e) {
        e.preventDefault();

        if (newPassword.length < 6) {
            toast.error("New password must be at least 6 characters.");
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error("New password and confirm password do not match.");
            return;
        }

        setSavingPassword(true);
        try {
            // Firebase requires re-authentication before a sensitive
            // action like changing a password, if the session isn't fresh.
            const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword);
            await reauthenticateWithCredential(auth.currentUser, credential);
            await updatePassword(auth.currentUser, newPassword);

            toast.success("Password updated successfully");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            console.log("Error: ", err);
            if (err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
                toast.error("Current password is incorrect.");
            } else {
                toast.error(err.message);
            }
        } finally {
            setSavingPassword(false);
        }
    }

    if (loading) {
        return (
            <main className="dashboard-content">
                <div className="container-fluid px-3 px-lg-4 py-4">
                    <p className="text-muted">Loading settings...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="dashboard-content">
            <div className="container-fluid px-3 px-lg-4 py-4">
                <div className="page-heading">
                    <div className="page-heading-copy">
                        <span className="page-icon"><i className="bi bi-gear" aria-hidden="true" /></span>
                        <div>
                            <p className="eyebrow mb-1">Account</p>
                            <h1 className="h3 mb-1">Settings</h1>
                            <p className="text-muted mb-0">Manage your password and preferences.</p>
                        </div>
                    </div>
                </div>

                <section className="row g-3">


                    {/* Change password */}
                    <div className="col-12 col-xl-6">
                        <form className="panel" onSubmit={handleChangePassword}>
                            <div className="panel-header">
                                <div>
                                    <h2 className="h5 mb-1 section-title">
                                        <i className="bi bi-shield-lock" aria-hidden="true" />
                                        <span> Change Password</span>
                                    </h2>
                                    <p className="text-muted mb-0">You'll need your current password to confirm this change.</p>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="currentPassword">Current Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="currentPassword"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="newPassword">New Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="newPassword"
                                    minLength={6}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="confirmPassword">Confirm New Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="confirmPassword"
                                    minLength={6}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <button className="btn btn-primary" type="submit" disabled={savingPassword}>
                                <i className="bi bi-check2-circle" aria-hidden="true" /> {savingPassword ? "Updating..." : "Update Password"}
                            </button>
                        </form>
                    </div>

                    {/* Preferences */}
                    <div className="col-12 col-xl-6">
                        <form className="panel" onSubmit={handleSavePreferences}>
                            <div className="panel-header">
                                <div>
                                    <h2 className="h5 mb-1 section-title">
                                        <i className="bi bi-sliders" aria-hidden="true" />
                                        <span> Preferences</span>
                                    </h2>
                                    <p className="text-muted mb-0">Choose how you'd like to be notified.</p>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="language">Language</label>
                                <select
                                    className="form-select"
                                    id="language"
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                >
                                    <option value="English">English</option>
                                    <option value="Hindi">Hindi</option>
                                </select>
                            </div>

                            <div className="form-check form-switch mb-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="emailNotifications"
                                    checked={emailNotifications}
                                    onChange={(e) => setEmailNotifications(e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="emailNotifications">
                                    Email notifications
                                </label>
                            </div>

                            <div className="form-check form-switch mb-4">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="smsNotifications"
                                    checked={smsNotifications}
                                    onChange={(e) => setSmsNotifications(e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="smsNotifications">
                                    SMS notifications
                                </label>
                            </div>

                            <button className="btn btn-primary" type="submit" disabled={savingPrefs}>
                                <i className="bi bi-check2-circle" aria-hidden="true" /> {savingPrefs ? "Saving..." : "Save Preferences"}
                            </button>
                        </form>
                    </div>
                    
                </section>
            </div>
        </main>
    );
}
