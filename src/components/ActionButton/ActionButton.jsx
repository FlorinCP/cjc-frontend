import PropTypes from "prop-types";
import React, {useState} from "react";


const ActionButton = ({text, onClick, disabled, type, size, color, backgroundColor ,children}) => {

    const [isHovered, setIsHovered] = useState(false);

    const defaultStyle = {
        padding: '10px',
        width: '200px',
        height: '45px',
        borderRadius: '5px',
        border: 'none',
        color: color,
        backgroundColor: backgroundColor,
        cursor: 'pointer',
        letterSpacing: '1px',
        fontSize: '17px',
        fontWeight: 'bold',
        transition: '0.3s all ease-in-out',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap : '10px'
    };

    const hoverStyle = {
        backgroundColor: color,
        color: backgroundColor,
        border: `1px solid ${backgroundColor}`,
        transition: '0.3s all ease-in-out'
    }

    const combinedStyle = isHovered ? { ...defaultStyle, ...hoverStyle } : defaultStyle;


    return (
        <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={combinedStyle}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {text}
            {children}
        </button>
    );
};

ActionButton.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    style: PropTypes.object,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    type: PropTypes.oneOf(['button', 'submit', 'reset'])
};

ActionButton.defaultProps = {
    onClick: () => {
    },
    style: {},
    className: '',
    disabled: false,
    type: 'button'
};

export default ActionButton;
