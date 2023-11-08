import React from "react";
import MathJax from "react-mathjax2";

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
                            // Use MathJax for physics notation of atoms
                            <label className="field-box">
                                <MathJax.Context input='ascii'>
                                    <MathJax.Node>{value}</MathJax.Node>
                                </MathJax.Context>
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
                            <MathJax.Context input='ascii'>
                                <MathJax.Node>{unit}</MathJax.Node>
                            </MathJax.Context>
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