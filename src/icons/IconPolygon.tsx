function IconPolygon({
    size = 24,
    color = "currentColor",
    stroke = 2,
    ...props
}) {
    return (
        <svg width={size} height={size} viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" d="M 7.5 4.25 L 5.3333 4.25 C 4.735 4.25 4.25 4.735001 4.25 5.3333 L 4.25 7.5 C 4.25 8.098301 4.735 8.5833 5.3333 8.5833 L 7.5 8.5833 C 8.098301 8.5833 8.5833 8.098301 8.5833 7.5 L 8.5833 5.3333 C 8.5833 4.735001 8.098301 4.25 7.5 4.25 Z" />
            <path fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" d="M 22.667 4.25 L 20.500299 4.25 C 19.902 4.25 19.417 4.735001 19.417 5.3333 L 19.417 7.5 C 19.417 8.098301 19.902 8.5833 20.500299 8.5833 L 22.667 8.5833 C 23.265301 8.5833 23.750299 8.098301 23.750299 7.5 L 23.750299 5.3333 C 23.750299 4.735001 23.265301 4.25 22.667 4.25 Z" />
            <path fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" d="M 22.667 19.4165 L 20.500299 19.4165 C 19.902 19.4165 19.417 19.901501 19.417 20.4998 L 19.417 22.6665 C 19.417 23.264799 19.902 23.7498 20.500299 23.7498 L 22.667 23.7498 C 23.265301 23.7498 23.750299 23.264799 23.750299 22.6665 L 23.750299 20.4998 C 23.750299 19.901501 23.265301 19.4165 22.667 19.4165 Z" />
            <path fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" d="M 7.5 19.4165 L 5.3333 19.4165 C 4.735 19.4165 4.25 19.901501 4.25 20.4998 L 4.25 22.6665 C 4.25 23.264799 4.735 23.7498 5.3333 23.7498 L 7.5 23.7498 C 8.098301 23.7498 8.5833 23.264799 8.5833 22.6665 L 8.5833 20.4998 C 8.5833 19.901501 8.098301 19.4165 7.5 19.4165 Z" />
            <path fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" d="M 6.417 8.5835 L 6.417 19.4168" />
            <path fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" d="M 21.583 8.5835 L 21.583 19.4168" />
            <path fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" d="M 8.583 6.4165 L 19.4163 6.4165" />
            <path fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" d="M 8.583 21.5835 L 19.4163 21.5835" />
            <path fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" d="M 14 17 L 14 9.5 L 17.5 11.5 L 14 13.5" />
            <path fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" d="M 12.5 16.834999 C 12.190001 17.014999 12 17.245001 12 17.5 C 12 18.049999 12.9 18.5 14 18.5 C 15.1 18.5 16 18.049999 16 17.5 C 16 17.25 15.809999 17.014999 15.5 16.834999" />
        </svg>
    )
}

export default IconPolygon
