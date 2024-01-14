import PropTypes from "prop-types";
import React, {useState} from "react";


const ActionButton = ({text, onClick, disabled,active, type, size, color, backgroundColor ,children,height}) => {

    const [isHovered, setIsHovered] = useState(false);

    const defaultStyle = {
        padding: '10px',
        width:  '100%',
        height:" 100%" || '45px',
        borderRadius: '10px',
        border: active ?  'none' : `1px solid ${backgroundColor}` ,
        color: active ? color : backgroundColor,
        backgroundColor: active ? backgroundColor : color,
        cursor: 'pointer',
        letterSpacing: '1.5px',
        fontSize: '17px',
        fontWeight: '400',
        transition: '0.3s all ease-in-out',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap : '10px',
        flexGrow: 1,
    };

    const hoverStyle = {
        backgroundColor: color,
        color: backgroundColor,
        border: `1px solid ${backgroundColor}`,
        transition: '0.3s all ease-in-out',
        // boxShadow: '0px 0px 31px -13px rgba(0,0,0,0.62)',
    }


    //     -webkit-box-shadow: 0px 0px 31px -13px rgba(0, 0, 0, 0.62);
    // -moz-box-shadow: 0px 0px 31px -13px rgba(0, 0, 0, 0.62);
    // box-shadow: 0px 0px 31px -13px rgba(0, 0, 0, 0.62);


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
            {children}
            {text}
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
    type: 'button',
    active : true,
};

export default ActionButton;
