
import React from "react";

import DataTable from 'react-data-table-component';

import { computeResult } from "./Compute";
import Data from "./Data";
import Form from "./Form";
import FormDisplay from "./FormDisplay";
import Graph from "./Graph";

import "./Content.scss";

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // input_params
            beam_a    : 12,
            beam_z    : 6,
            beam_ex   : 0.0,
            target_a  : 2,
            target_z  : 1,
            target_ex : 0,
            light_a   : 1,
            light_z   : 1,
            light_ex  : 0,
            heavy_a   : 13,
            heavy_z   : 6,
            heavy_ex  : 0,

            beam_energy : 100,
        };
        this.result = [];
    }

    inputOnChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        })
    }

    render() {

        // Deconstruct all the data in state
        const {
            beam_a,
            beam_z,
            beam_ex,
            target_a,
            target_z,
            target_ex,
            light_a,
            light_z,
            light_ex,
            heavy_ex,

            beam_energy,
        } = this.state;

        this.result = computeResult(this.state);

        // Deconstruct all the results
        const {
            beam,
            target,
            light,
            heavy,
            kinematics,
        } = this.result;

        // Construct params for forms
        const input_reaction_params = {
            beam_a: beam_a,
            beam_z: beam_z,
            beam_ex: beam_ex,
            target_a: target_a,
            target_z: target_z,
            target_ex: target_ex
        };

        const output_reaction_params = {
            light_a: light_a,
            light_z: light_z,
            light_ex: light_ex,
            heavy_ex: heavy_ex,
        }

        const reaction_params = {
            beam_energy: beam_energy,
        }

        return (
            <div className="component-content">
                <div class="centered">
                    Updates:
                </div>
                <div class="centered">
                        v0.1.1 (2020/08/17) - Table now shows only if reaction is valid
                </div>
                <div className="content-container">
                    <Form
                        className="reaction-params-form const-width m-r-15 m-b-15"
                        FormRow={Data.InputReactionParamsRow}
                        title="Incoming"
                        valueList={input_reaction_params}
                        fieldOnChange={this.inputOnChange}
                    />
                    <Form
                        className="reaction-params-form const-width m-r-15 m-b-15"
                        FormRow={Data.OutputReactionParamsRow}
                        title="Outgoing"
                        valueList={output_reaction_params}
                        fieldOnChange={this.inputOnChange}
                    />
                    <Form
                        className="reaction-params-form const-width m-b-15"
                        FormRow={Data.ReactionParamsRow}
                        title="Beam Properties"
                        valueList={reaction_params}
                        fieldOnChange={this.inputOnChange}
                    />
                    <Form
                        className="atom-form atom-width m-r-15 m-b-15"
                        FormRow={Data.AtomRow}
                        title="Beam Atom"
                        valueList={beam}
                        fieldOnChange={this.inputOnChange}
                    />
                    <Form
                        className="atom-form atom-width m-r-15 m-b-15"
                        FormRow={Data.AtomRow}
                        title="Target Atom"
                        valueList={target}
                    />
                    <Form
                        className="atom-form atom-width m-r-15 m-b-15"
                        FormRow={Data.AtomRow}
                        title="Light Recoil Atom"
                        valueList={light}
                    />
                    <Form
                        className="atom-form atom-width m-b-15"
                        FormRow={Data.AtomRow}
                        title="Heavy Recoil Atom"
                        valueList={heavy}
                    />
                    <FormDisplay
                        className="kinematics-form full-width m-b-15"
                        FormRowList={Data.KinematicsRow}
                        title="Kinematics"
                        valueList={kinematics}
                    />
                    <Graph
                        title="Lab Angle vs. Lab Energy"
                        data_light={kinematics.light_angle_lab_energy_lab_data}
                        data_heavy={kinematics.heavy_angle_lab_energy_lab_data}
                        x_label="Angle (deg)"
                        y_label="Energy/u (MeV)"
                        use_items={true}
                        use_heavy_item={true}
                    />
                    <Graph
                        title="Lab Angle"
                        data_light={kinematics.light_angle_lab_heavy_angle_lab_data}
                        x_label="Heavy Angle (deg)"
                        y_label="Light Angle (deg)"
                        use_items={false}
                    />
                    {(() => {
                        if (kinematics === Data.DefaultKinematics) {
                        return 
                        } else {
                        return (
                            <DataTable
                                columns={kinematics.kinematic_columns}
                                data={kinematics.kinematic_table}
                                fixedHeader
                                fixedHeaderScrollHeight="1000px"
                            />
                        )
                        }
                    })()}
                </div>
            </div>
        );
    }
}
export default Content;