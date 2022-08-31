import { useField } from "formik"
import { useState } from "react"

interface FormInputProps {
	label: string
	helpText: string
	isMulti: Boolean
}

const FormInput: React.FC<FormInputProps & any> = ({
	label,
	helpText,
	isMulti,
	...props
}) => {
	const [field, meta] = useField(props)

	const [didFocus, setDidFocus] = useState(false)
	const handleFocus = () => setDidFocus(true)
	const showFeedback =
		(!!didFocus && field.value.trim().length > 2) || meta.touched

	return (
		<div className={`form-control mb-5 `}>
			<div className="flex items-center justify-between">
				<label htmlFor={props?.name} className="uppercase my-3 text-lg">
					{label}
				</label>
				{showFeedback ? (
					<div
						id={`${props.id}-feedback`}
						aria-live="polite"
						className={`text-sm text-red-600 ${
							!meta.error && "text-green-600"
						}`}
					>
						{meta.error ? meta.error : "✓"}
					</div>
				) : null}
			</div>

			<div className={`relative flex w-full flex-wrap items-stretch mb-3 `}>
				{!isMulti && (
					<span className="z-10 h-full leading-normal font-normal  text-center text-blueGray-300 absolute bg-transparent rounded text-lg items-center justify-center w-8 pl-3 py-4">
						<i className="fas fa-lock"></i>
					</span>
				)}
				{isMulti ? (
					<textarea
						{...props}
						{...field}
						rows={4}
						className={`outline outline-1 px-3 py-4 placeholder-slate-300  text-slate-600 relative  bg-white rounded  text-base focus:outline-none focus:shadow-outline w-full pl-10 ${
							showFeedback
								? meta.error
									? "outline-red-600"
									: "outline-green-600"
								: ""
						}`}
					></textarea>
				) : (
					<input
						{...props}
						{...field}
						aria-describedby={`${props.id}-feedback ${props.id}-help`}
						onFocus={handleFocus}
						className={`outline outline-1 px-3 py-4 placeholder-slate-300  text-slate-600 relative  bg-white rounded  text-base focus:outline-none focus:shadow-outline w-full pl-10 ${
							showFeedback
								? meta.error
									? "outline-red-600"
									: "outline-green-600"
								: ""
						}`}
					/>
				)}
			</div>
			<div className="text-md" id={`${props.id}-help`} tabIndex={-1}>
				{helpText}
			</div>
		</div>
	)
}

export default FormInput
