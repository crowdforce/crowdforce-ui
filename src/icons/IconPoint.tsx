function IconPoint({
    size = 24,
    color = "currentColor",
    stroke = 2,
    ...props
}) {
    return (
        <svg width={size} height={size} viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" d="M 14 20.5 L 14 4.25 L 21.5833 8.5833 L 14 12.9167" />
            <path fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" d="M 10.750299 20.142599 C 10.078699 20.5326 9.667 21.030899 9.667 21.583401 C 9.667 22.775101 11.617001 23.750099 14.000299 23.750099 C 16.383699 23.750099 18.3337 22.775101 18.3337 21.583401 C 18.3337 21.0417 17.922001 20.5326 17.250299 20.142599" />
        </svg>
    )
}

export default IconPoint
