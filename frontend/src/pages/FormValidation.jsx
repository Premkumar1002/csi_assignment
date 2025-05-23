// SignUpPage.jsx
import { motion } from "framer-motion";
import Input from "../components/Input";
import { Lock, Mail, User, Phone, Globe, MapPin, BadgeIndianRupee, Fingerprint } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import toast from "react-hot-toast";

const SignUpPage = () => {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		userName: "",
		email: "",
		password: "",
		phoneNo: "",
		country: "",
		city: "",
		panNo: "",
		aadharNo: ""
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const [formValidity, setFormValidity] = useState({
    	firstName: false,
    	lastName: false,
    	userName: false,
    	email: false,
    	password: false,
    	phoneNo: false,
    	country: false,
    	city: false,
    	panNo: false,
    	aadharNo: false,
  	});

	const handleValidityChange = (name, isValid) => {
    	setFormValidity((prev) => ({ ...prev, [name]: isValid }));
  	};

	// Check if all fields are valid
  	const isFormValid = Object.values(formValidity).every(Boolean);

  	const handleSignUp = async (e) => {
    	e.preventDefault();
    	if (!isFormValid) {
    	  toast.error("Please fix the errors in the form before submitting.");
    	  return;
    	}
    	try {
    	  toast.success("Account created successfully!");
    	} catch (err) {
    	  console.error(err);
    	  toast.error("Something went wrong.");
    	}
  	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
		>
			<div className='p-8'>
				<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
					Form Validation
				</h2>

				<form onSubmit={handleSignUp}>
					<Input
						icon={User}
						type='text'
						name='firstName'
						placeholder='First Name'
						value={formData.firstName}
						onChange={handleChange}
						required
						pattern="^[a-zA-Z]{2,20}$"
						errorMessage="First name should be 2-20 alphabetic characters"
						onValidityChange={handleValidityChange}
					/>
					<Input
						icon={User}
						type='text'
						name='lastName'
						placeholder='Last Name'
						value={formData.lastName}
						onChange={handleChange}
						required
						pattern="^[a-zA-Z]{2,20}$"
						errorMessage="Last name should be 2-20 alphabetic characters"
						onValidityChange={handleValidityChange}
					/>
					<Input
						icon={User}
						type='text'
						name='userName'
						placeholder='Username'
						value={formData.userName}
						onChange={handleChange}
						required
						pattern="^[a-zA-Z0-9]{3,16}$"
						errorMessage="Username must be 3-16 characters, no spaces or special characters"
						onValidityChange={handleValidityChange}
					/>
					<Input
						icon={Mail}
						type='email'
						name='email'
						placeholder='Email Address'
						value={formData.email}
						onChange={handleChange}
						required
						pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
						errorMessage="Enter a valid email address"
						onValidityChange={handleValidityChange}
					/>
					<Input
						icon={Lock}
						type='password'
						name='password'
						placeholder='Password'
						value={formData.password}
						onChange={handleChange}
						onValidityChange={handleValidityChange}
					/>
					<PasswordStrengthMeter password={formData.password} />

					<Input
						icon={Phone}
						type='text'
						name='phoneNo'
						placeholder='Phone Number (e.g. +91 xxxxxxxxxx)'
						value={formData.phoneNo}
						onChange={handleChange}
						required
						pattern="^\+\d{1,4}[\s-]?\d{10}$"
  						errorMessage="Enter a valid phone number with country code (e.g. +91 xxxxxxxxxx)"
						onValidityChange={handleValidityChange}
					/>
					<Input
						icon={Globe}
						type='text'
						name='country'
						placeholder='Country'
						value={formData.country}
						onChange={handleChange}
						required
						pattern="^[a-zA-Z\\s]{2,}$"
						errorMessage="Country should contain only letters"
						onValidityChange={handleValidityChange}
					/>
					<Input
						icon={MapPin}
						type='text'
						name='city'
						placeholder='City'
						value={formData.city}
						onChange={handleChange}
						required
						pattern="^[a-zA-Z\\s]{2,}$"
						errorMessage="City should contain only letters"
						onValidityChange={handleValidityChange}
					/>
					<Input
						icon={BadgeIndianRupee}
						type='text'
						name='panNo'
						placeholder='PAN No.'
						value={formData.panNo}
						onChange={handleChange}
						required
						pattern="^[A-Z]{5}[0-9]{4}[A-Z]$"
						errorMessage="Enter valid PAN format (e.g. ABCDE1234F)"
						onValidityChange={handleValidityChange}
					/>
					<Input
						icon={Fingerprint}
						type='text'
						name='aadharNo'
						placeholder='Aadhar No.'
						value={formData.aadharNo}
						onChange={handleChange}
						required
						pattern="^\d{12}$"
						errorMessage="Aadhar number must be 12 digits"
						onValidityChange={handleValidityChange}
					/>

					<motion.button className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: isFormValid ? 1.02 : 1 }}
            			whileTap={{ scale: isFormValid ? 0.98 : 1 }}
            			type="submit"
            			disabled={!isFormValid}
          			>
        		    	Sign Up
        		  </motion.button>
				</form>
			</div>
			<div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
				<p className='text-sm text-gray-400'>
					Already have an account?{" "}
					<Link to={"/login"} className='text-green-400 hover:underline'>
						Login
					</Link>
				</p>
			</div>
		</motion.div>
	);
};

export default SignUpPage;
