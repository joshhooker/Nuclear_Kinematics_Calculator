import React from "react";

import "./FormDisplay.scss";

const FormDisplay = (props) => {
    return (
        <form className={"form-display-wrapper " + props.className}>
            <h2 className="form-title">
                {props.title}
            </h2>
            <FormTableList FormRowList={props.FormRowList} valueList={props.valueList} />
        </form>
    );
}
export default FormDisplay;

const FormTableList = (props) => {
    const {
        FormRowList
    } = props;

    return (
        FormRowList.map((FormRow, i) => {
            return (
                <table key={i}>
                    <thead>
                        <tr>
                            <TableHeading Heading={FormRow} />
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <TableValue FormRow={FormRow} valueList={props.valueList} />
                        </tr>
                    </tbody>
                </table>
            )
        })
    )
}

const TableHeading = (props) => {
    const {
        Heading
    } = props;

    return (
        Heading.map((item, i) => {
            return (
                <th key={i}>
                    {item.label}
                    {` `}
                    {
                        item.unit &&
                        <label className="unit-label">
                            {`(${item.unit})`}
                        </label>
                    }
                </th>
            )
        })
    )
}

const TableValue = (props) => {
    const {
        FormRow, valueList
    } = props;

    return (
        FormRow.map((item, i) => {
            return (
                <td key={i}>
                    {
                        valueList[item.name] ?
                            valueList[item.name] : "N/A"
                    }
                </td>
            )
        })
    )
}