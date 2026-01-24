import React from "react";

import "./Form.scss";

const Form = (props) => {
    return (
        <form className={"form-wrapper " + props.className}>
            <h2 className="form-title m-b-15">
                {props.title}
            </h2>
            <FormList
                FormRow={props.FormRow}
                valueList={props.valueList}
                fieldOnChange={props.fieldOnChange}
            />
        </form>
    );
}
export default Form;

const FormList = (props) => {
    return (
        props.FormRow.map((item, i) => {
            return (
                <FormField
                    key={i}
                    item={item}
                    value={props.valueList[item.name]}
                    fieldOnChange={props.fieldOnChange}
                />
            )
        })
    )
}

const PhysicsNotation = ({ value }) => {
    if (!value) return null;
    
    let cleanValue = String(value);
    
    const fullMatch = cleanValue.match(/text\(\)_(\d+)\^(\d+)text\(([A-Za-z]+)\)/);
    if (fullMatch) {
        const [, atomicNum, massNum, symbol] = fullMatch;
        return (
            <span className="physics-notation">
                <sup>{massNum}</sup>
                <sub>{atomicNum}</sub>
                {symbol}
            </span>
        );
    }
    
    const simpleMatch = cleanValue.match(/text\(\)\^(\d+)text\(([A-Za-z]+)\)/);
    if (simpleMatch) {
        const [, massNum, symbol] = simpleMatch;
        return (
            <span className="physics-notation">
                <sup>{massNum}</sup>
                {symbol}
            </span>
        );
    }
    
    const reactionMatch = cleanValue.match(/text\(\)\^(\d+)text\(([A-Za-z]+)\)\(text\(\)\^(\d+)text\(([A-Za-z]+)\),\s*text\(\)\^(\d+)text\(([A-Za-z]+)\)\)text\(\)\^(\d+)text\(([A-Za-z]+)\)/);
    if (reactionMatch) {
        const [, tA, tSym, bA, bSym, lA, lSym, hA, hSym] = reactionMatch;
        return (
            <span className="physics-notation reaction">
                <span><sup>{tA}</sup>{tSym}</span>
                (<span><sup>{bA}</sup>{bSym}</span>, <span><sup>{lA}</sup>{lSym}</span>)
                <span><sup>{hA}</sup>{hSym}</span>
            </span>
        );
    }
    
    return <span>{cleanValue}</span>;
};

class FormField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // determine if the column has value
            active: !!this.props.value
        };
    }

    fieldOnFocus = () => {
        this.setState({
            active: true
        })
    }

    fieldOnBlur = () => {
        if (!this.props.value) {
            this.setState({
                active: false
            })
        }
    }

    render() {

        const {
            active
        } = this.state

        const {
            item, value, fieldOnChange
        } = this.props;

        const {
            label, name, unit, disabled, required
        } = item;

        let fieldClassName = "field-container";

        // Add error class if the required field is empty
        switch (required) {
            case "number":
                if (isNaN(value)) {
                    fieldClassName += " error"
                }
                break;
            default:
                break;
        }

        // Add disabled class if the field is disabled,
        // Otherwise, check if it is active
        if (disabled) {
            fieldClassName += " disabled";
        } else {
            if (active) {
                fieldClassName += " active";
            }
            fieldClassName += " input";
        }

        return (
            <div className={fieldClassName}>
                <div className="field">
                    {
                        (name === "physics_notation" || name === "simple_notation" ||  name === "reaction_notation") ?
                            // Use PhysicsNotation component for physics notation of atoms
                            <label className="field-box">
                                <PhysicsNotation value={value} />
                            </label>
                            :
                            <input className="field-box"
                                type="text"
                                name={name}
                                value={value}
                                disabled={disabled}
                                onChange={fieldOnChange}
                                onFocus={this.fieldOnFocus}
                                onBlur={this.fieldOnBlur}
                            />
                    }
                    {
                        unit &&
                        <label className="unit-label">
                            {unit}
                        </label>
                    }
                    {
                        <label className="field-label">
                            {label}
                        </label>
                    }
                </div>
            </div>
        );
    }
}