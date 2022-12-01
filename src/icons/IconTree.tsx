function IconTree({
    size = 24,
    color = "currentColor",
    stroke = 2,
    ...props
}) {
    return (
        <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" d="M 18.333 6.4165 L 21.583 9.6665 L 19.4163 10.7498 L 23.749701 15.0832 L 20.499701 16.1665 L 24.833 20.4998 L 15.083 20.4998" />
            <path fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" d="M 17.25 23.75 L 17.25 20.5" />
            <path fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" d="M 9.6667 15.0832 L 7.5 12.9165" />
            <path fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" d="M 9.667 14.0002 L 11.8337 11.8335" />
            <path fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" d="M 9.667 23.7498 L 9.667 9.6665" />
            <path fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" d="M 7.3093 18.3279 C 6.8353 18.3002 6.3732 18.1689 5.9554 17.943399 C 5.5376 17.7178 5.1743 17.4035 4.891 17.0224 C 4.6078 16.6413 4.4114 16.2029 4.3158 15.737801 C 4.2203 15.272699 4.2277 14.792299 4.3377 14.3304 C 3.9446 14.003599 3.6341 13.5886 3.4316 13.1192 C 3.2291 12.649799 3.1403 12.1392 3.1724 11.628901 C 3.2045 11.1187 3.3566 10.623199 3.6163 10.182899 C 3.8761 9.7425 4.2361 9.369699 4.6671 9.0947 C 4.2894 8.4237 4.1622 7.640499 4.3081 6.884499 C 4.4541 6.1285 4.8637 5.4489 5.4639 4.9667 C 6.0642 4.484501 6.8162 4.2311 7.5859 4.2516 C 8.355499 4.2722 9.092899 4.5653 9.6667 5.0788 C 10.240499 4.566101 10.977699 4.273701 11.746901 4.253601 C 12.516199 4.2334 13.267599 4.4869 13.8675 4.968899 C 14.4674 5.4508 14.876801 6.130001 15.0228 6.8855 C 15.1689 7.640999 15.0422 8.423901 14.665199 9.0947 C 15.096399 9.3694 15.456699 9.7421 15.7167 10.1824 C 15.9767 10.622801 16.128901 11.118299 16.1611 11.628599 C 16.193399 12.138901 16.104601 12.649599 15.902 13.119101 C 15.699499 13.588699 15.388901 14.0037 14.9956 14.3304 C 15.109301 14.808001 15.1134 15.305099 15.0075 15.784401 C 14.9016 16.2637 14.688499 16.712799 14.384199 17.098 C 14.079901 17.4832 13.692301 17.7945 13.2505 18.0084 C 12.808701 18.222401 12.3242 18.3335 11.8333 18.333401 L 7.5 18.333401 L 7.3093 18.3279 Z" />
        </svg>
    )
}

export default IconTree
