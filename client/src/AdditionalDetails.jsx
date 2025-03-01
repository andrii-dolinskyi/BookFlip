import React, { useState, useEffect } from 'react'; // Added useEffect import
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import './AdditionalDetails.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdditionalDetails() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        email: '', // Initialize as empty string
        Name: '',
        Surname: '',
        Country: '',
        Nationality: '',
        Languages: '',
        DateOfBirth: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (user && user.email) {
            setFormData(prevFormData => ({
                ...prevFormData,
                email: user.email,
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        if (!formData.Name.trim()) {
            newErrors.Name = 'Name is required';
            isValid = false;
        }

        if (!formData.Surname.trim()) {
            newErrors.Surname = 'Surname is required';
            isValid = false;
        }

        if (!formData.Country.trim()) {
            newErrors.Country = 'Country is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        try {
            await axios.put('http://localhost:5000/api/users/profile/complete', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            toast.success('Profile updated successfully!');
            navigate('/home');
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile.');
        }
    };

    return (
        <div className="form-container">
            <h2>Tell us more</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} disabled />
                </div>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="Name" value={formData.Name} onChange={handleChange} required />
                    {errors.Name && <p className="error-message">{errors.Name}</p>}
                </div>
                <div className="form-group">
                    <label>Surname</label>
                    <input type="text" name="Surname" value={formData.Surname} onChange={handleChange} required />
                    {errors.Surname && <p className="error-message">{errors.Surname}</p>}
                </div>
                <div className="form-group">
                    <label>Country</label>
                    <input type="text" name="Country" value={formData.Country} onChange={handleChange} required />
                    {errors.Country && <p className="error-message">{errors.Country}</p>}
                </div>
                <div className="form-group">
                    <label>Nationality</label>
                    <input type="text" name="Nationality" value={formData.Nationality} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Languages</label>
                    <input type="text" name="Languages" value={formData.Languages} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Date of Birth</label>
                    <input type="date" name="DateOfBirth" value={formData.DateOfBirth} onChange={handleChange} />
                </div>
                <button type="submit" className="submit-btn">Register →</button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default AdditionalDetails;