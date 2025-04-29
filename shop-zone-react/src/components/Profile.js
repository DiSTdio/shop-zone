import React, { useState, useEffect } from "react";

function Profile({ onGoBack }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [errors, setErrors] = useState({ name: "", email: "", address: "" }); // Ошибки для каждого поля

    useEffect(() => {
        const savedProfile = localStorage.getItem("profile");
        if (savedProfile) {
            const { name, email, address } = JSON.parse(savedProfile);
            setName(name || "");
            setEmail(email || "");
            setAddress(address || "");
        }
    }, []);

    const validateForm = () => {
        let isValid = true;
        const newErrors = { name: "", email: "", address: "" };
 
        if (!name || name.length < 2) {
            newErrors.name = "Name must be at least 2 characters long.";
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            newErrors.email = "Please enter a valid email address.";
            isValid = false;
        }

        if (!address || address.length < 5) {
            newErrors.address = "Address must be at least 5 characters long.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSave = () => {
        if (validateForm()) {
            const profileData = { name, email, address };
            localStorage.setItem("profile", JSON.stringify(profileData));
            alert("Profile saved successfully!");
        } else {
            console.log("Validation failed:", errors);
        }
    };

    return (
        <div className="profile-container">
            <h2>👤 Your Profile</h2>
            <div class = ""></div>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p className="error">{errors.name}</p>}
            </div>
            <div className="form-group">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Shipping Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                {errors.address && <p className="error">{errors.address}</p>}
            </div>
            <div class="profile-bottom__buttons">
            <button class=" " onClick={handleSave}>💾 Save Profile</button>
            <button class="profile-bottom__buttonBack"onClick={onGoBack}>🔙 Back</button>
            </div>
        </div>
    );
}

export default Profile;
