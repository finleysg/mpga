import React, { useState } from "react";
import styled from "styled-components";

const MultiSelectContainer = styled.div`
    position: relative;
    width: 100%;
    display: inline-block;
    background-color: #fff;
    border-radius: 4px;
    text-align: left;
    box-shadow: 0 0 2px rgba(0, 0, 0, .3);
`;
MultiSelectContainer.displayName = "MultiSelectContainer";

const SelectButton = styled.button`
    padding: 8px 0;
    display: inline-block;
    cursor: pointer;
    border: none;
    width: 100%;
    text-align: left;
    background-color: transparent;
    &:focus {
        outline: 0;
        box-shadow: 0 0 4px #0493D1;
    }
    &:before {
        content: " ";
        z-index: 1;
        position: absolute;
        height: 23px;
        top: 5px;
        right: 34px;
        border-left: 1px solid #CBD2D7;    
    }
    &:after {
        content: " ";
        position: absolute;
        z-index: 1;
        top: 15px;
        right: 13px;
        border-top: 6px solid #7B8E9B;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;    
    }
`;
SelectButton.displayName = "SelectButton";

const SelectButtonClear = styled.button`
    position: absolute;
    top: 5px;
    right: 0;
    width: 34px;
    height: 20px;
    background-color: #fff;
    text-indent: -9999em;
    z-index: 3;
    border: none;
    &:before {
        content: '×';
        font-size: 18px;
        font-weight: bold;
        position: absolute;
        top: 2px;
        left: 10px;
        z-index: 1;
        color: #7B8E9B;
        line-height: 1;
        width: 15px;
        height: 15px;
        text-indent: 0;
        text-align: center;    
    }
`;
SelectButtonClear.displayName = "SelectButtonClear";

const SelectButtonClose = styled.button`
    color: #0493D1;
    text-transform: uppercase;
    background-color: transparent;
    border: none;
    padding: 5px 0;
    display: block;
    text-align: center;
    width: 100%;
    font-weight: bold;
    cursor: pointer;
    outline: none;
`;
SelectButtonClose.displayName = "SelectButtonClose";

interface IOptionProps {
    selected: boolean;
}

const SelectOption = styled.a<IOptionProps>`
    padding: 8px 20px 8px 42px;
    position: relative;
    margin: 0;
    cursor: pointer;
    display: block;
    line-height: 16px;
    font-size: 12px;
    font-weight: bold;
    color: purple;
    text-decoration: none;
    &:before {
        position: absolute;
        line-height: 1;
        text-align: center;
        left: 18px;
        top: 6px;
        border-radius: 3px;
        height: 16px;
        width: 16px;
        font-size: 18px;
        font-weight: bold;
        margin-right: 10px;
        border: 1px solid #7B8E9B;
        background: #f9f9f9;
        vertical-align: middle;
        ${(props) => props.selected ? `content: "✓"` : `content: " "`}
    }
    &:hover {
        background-color: #f4f4f4;
        text-decoration: none;
    }
    &:focus {
        outline: 0;
    }
`;
SelectOption.displayName = "SelectOption";

const SelectButtonLabel = styled.div`
    line-height: 16px;
    font-size: 12px;
    color: #696969;
    padding: 0 40px 0 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
SelectButtonLabel.displayName = "SelectButtonLabel";

interface IMultiSelectOptionsProps {
    open: boolean;
}

const MultiSelectOptions = styled.div<IMultiSelectOptionsProps>`
    ${(props) => !props.open && `display: none;`}
    ${(props) => props.open && `
    margin: 2px 0 0;
    position: absolute;
    padding: 10px 0;
    width: 100%;
    max-height: 400px;
    overflow-y: scroll;
    top: 100%;
    left: 0;
    z-index: 4;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 2px rgba(0, 0, 0, .3);`}
`;
MultiSelectOptions.displayName = "MultiSelectOptions";

export interface IMultiSelectProps {
    label: string;
    closeText: string;
    clearText: string;
    initialValues?: string[];
    onChange: (values: string[]) => void;
}

const MultiSelect: React.FC<IMultiSelectProps> = props => {
    const { closeText, clearText, initialValues } = props;
    const [selected, setSelected] = useState(initialValues);
    const [open, setOpen] = useState(false);

    let blurTimeout = 0;

    const interceptEvent = (event: any) => {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
    };

    const handleFocus = () => {
        clearTimeout(blurTimeout);
    };

    const handleBlur = () => {
        clearTimeout(blurTimeout);
        blurTimeout = setTimeout(handleClose, 0);
    };

    const handleChange = (value: string) => (event: React.MouseEvent) => {
        interceptEvent(event);
        const selectedValues = selected?.slice(0) || [];
        if (value) {
            const index = selectedValues.indexOf(value);
            if (index !== -1) {
                selectedValues.splice(index, 1);
            } else {
                selectedValues.push(value);
            }
        }
        setSelected(selectedValues);
    };

    const handleClear = () => {
        setSelected([]);
        props.onChange([]);
    };

    const toggleOpenClose = (event: React.MouseEvent) => {
        interceptEvent(event);
        setOpen(!open);
        if (open) {
            return setOpen(false);
        }

        handleOpen();
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        props.onChange(selected || []);
    };

    const label = () => {
        var selectedOptions = options()
            .filter(o => isSelected(o.value))
            .map(o => o.label);
        return selectedOptions.length > 0 ? selectedOptions.join(", ") : props.label;
    };

    const options = () => {
        const internalOptions: any[] = [];
        React.Children.forEach(props.children, (option: any) => {
            internalOptions.push({
                value: option.props.value,
                label: option.props.children,
            });
        });
        return internalOptions;
    };

    const hasValue = () => {
        return selected !== undefined && selected.length > 0;
    };

    const isSelected = (value: string) => {
        return selected !== undefined && selected.indexOf(value) !== -1;
    };

    const render = () => {
        return (
            <MultiSelectContainer>
                <SelectButton
                    onClick={(e) => toggleOpenClose(e)}
                    onBlur={() => handleBlur()}
                    tabIndex={0}
                    aria-hidden={true}>
                    <SelectButtonLabel>{label()}</SelectButtonLabel>
                </SelectButton>
                {renderOptionMenu()}
                {renderClearButton()}
            </MultiSelectContainer>
        );
    };

    const renderOptionMenu = () => {
        return (
            <MultiSelectOptions
                open={open}
                onBlur={() => handleBlur()}
                aria-hidden={true}
                tabIndex={0}>
                <div>
                    {options().map((o: any, i: number) => renderOption(o, i))}
                </div>
                {renderCloseButton()}
            </MultiSelectOptions>
        );
    };

    const renderOption = (option: any, i: number) => {
        return (
            <SelectOption 
                selected={isSelected(option.value)} 
                href="#"
                onClick={(e) => handleChange(option.value)(e)}
                tabIndex={-1}
                key={option.value}
                onBlur={() => handleBlur()}
                onFocus={() => handleFocus()}>
                {option.label}
            </SelectOption>
        );
    };

    const renderClearButton = () => {
        if (hasValue()) {
            return (
                <SelectButtonClear 
                    aria-label={clearText} 
                    onClick={() => handleClear()}>
                    {clearText}
                </SelectButtonClear>
            );
        }
    };

    const renderCloseButton = () => {
        return (
            <SelectButtonClose
                onClick={() => handleClose()}
                onBlur={() => handleBlur()}
                onFocus={() => handleFocus()}>
                {closeText}
            </SelectButtonClose>
        );
    };

    return render();
};

export default MultiSelect;
