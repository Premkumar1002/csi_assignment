import { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Input = ({ icon: Icon, type, name, errorMessage, pattern, required, ...props }) => {
	const [showPassword, setShowPassword] = useState(false);
	const [touched, setTouched] = useState(false);

	const togglePassword = () => {
		setShowPassword((prev) => !prev);
	};

	const inputType = type === "password" ? (showPassword ? "text" : "password") : type;
	const showError = touched && errorMessage && pattern && !new RegExp(pattern).test(props.value);

	// console.log(JSON.stringify(props))

	useEffect(()=>{
		if(!showError){
			props.onValidityChange(name, true);
		}
		else{
			props.onValidityChange(name,false);
		}
	},[showError]);

	return (
		<div className='mb-6'>
			<div className='relative'>
				<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
					<Icon className='size-5 text-green-500' />
				</div>

				<input
					type={inputType}
					name={name}
					required={required}
					pattern={pattern}
					onBlur={() => setTouched(true)}
					{...props}
					className={`w-full pl-10 pr-10 py-2 bg-gray-800 bg-opacity-50 rounded-lg border ${
						showError ? "border-red-500" : "border-gray-700"
					} focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200`}
				/>

				{type === "password" && (
					<div
						className="absolute top-2.5 right-3 cursor-pointer text-gray-400"
						onClick={togglePassword}
					>
						{showPassword ? (
							<AiOutlineEyeInvisible size={20} />
						) : (
							<AiOutlineEye size={20} />
						)}
					</div>
				)}
			</div>

			{type !== "password" && showError && (
				<p className='text-red-500 text-sm mt-1 ml-1'>{errorMessage}</p>
			)}
		</div>
	);
};

export default Input;
