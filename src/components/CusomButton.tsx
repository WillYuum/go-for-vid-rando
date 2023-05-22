
type CustomButtonProps = {
    text: string;
    onClick: () => void;
}

const CustomButton = (customButtonProps: CustomButtonProps) => {
    return (
        <button onClick={customButtonProps.onClick}>{customButtonProps.text}</button>
    )
}


export default CustomButton;