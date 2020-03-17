import React from 'react';

import { styled } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";

class CustomButton extends React.Component{

    render(){
        const {buttonText, borderColor, width, height, padding, boxShadow, background,
               border, borderRadius, textColor, backgroundColor, variant,
               disableElevation, top, left, fontSize, onClick, position, disabled, margin} = this.props

        const CustomButton = styled(Button)({
            background: background,
            border: border,
            borderRadius: borderRadius,
            boxShadow: boxShadow,
            color: textColor,
            height: height,
            width: width, 
            padding: padding,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            top: top,
            left: left,
            fontSize: fontSize,
            position: position,
            margin: margin
        })
        return (
            <CustomButton
                variant={variant}
                disableElevation={disableElevation}
                onClick={onClick}
                disabled={disabled}
            >
                {buttonText}
            </CustomButton>
        )
    }
}

export default CustomButton