function IconBush({
    size = 24,
    color = "currentColor",
    stroke = 2,
    ...props
}) {
    return (
        <svg width={size} height={size} viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" d="M 3.167 10.75 C 3.167 13.623199 4.3084 16.3787 6.34 18.410299 C 8.371599 20.441999 11.1271 21.5833 14.000299 21.5833 C 16.873501 21.5833 19.629 20.441999 21.660601 18.410299 C 23.692301 16.3787 24.833698 13.623199 24.833698 10.75" />
            <path fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" d="M 14 21.5833 C 14 18.710199 15.141399 15.9547 17.173 13.923 C 19.2047 11.891399 21.960199 10.75 24.833302 10.75" />
            <path fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" d="M 3.167 10.75 C 4.5896 10.75 5.9984 11.030199 7.3127 11.5746 C 8.6271 12.119101 9.821301 12.917 10.827299 13.923 C 11.8333 14.929001 12.6313 16.123199 13.175699 17.437599 C 13.7201 18.752001 14.000299 20.1607 14.000299 21.5833" />
            <path fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" d="M 14 5.3335 C 15.091801 6.3757 15.946199 7.6409 16.5051 9.042999 C 17.0641 10.445 17.3144 11.951 17.239201 13.4585" />
            <path fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" d="M 10.761101 13.4585 C 10.685801 11.951 10.936199 10.445 11.495199 9.042999 C 12.0541 7.6409 12.908501 6.3757 14.000299 5.3335" />
        </svg>
    )
}

export default IconBush
