const Data = {
    ReactionDescriptionRow: [
        {
            name: "reaction_notation",
            disabled: true
        },
    ],
    KinematicsRow: [
        [
            {
                label: "C.M. Energy (MeV)",
                name: "cm_energy"
            },
            {
                label: "Ground State Q-value (MeV)",
                name: "gs_q_value"
            },
            {
                label: "Q-value (MeV)",
                name: "q_value"
            },
            {
                label: "Total Energy (MeV)",
                name: "total_energy"
            },
        ]
        ],
    InputReactionParamsRow: [
        {
            label: "Beam A",
            name: "beam_a",
            required: "number"
        },
        {
            label: "Beam Z",
            name: "beam_z",
            required: "number"
        },
        {
            label: "Beam Ex",
            name: "beam_ex",
            required: "number"
        },
        {
            label: "Target A",
            name: "target_a",
            required: "number"
        },
        {
            label: "Target Z",
            name: "target_z",
            required: "number"
        },
        {
            label: "Target Ex (MeV)",
            name: "target_ex",
            required: "number"
        }
    ],
    OutputReactionParamsRow: [
        {
            label: "Light Recoil A",
            name: "light_a",
            required: "number"
        },
        {
            label: "Light Recoil Z",
            name: "light_z",
            required: "number"
        },
        {
            label: "Light Ex (MeV)",
            name: "light_ex",
            required: "number"
        },
        {
            label: "Heavy Ex (MeV)",
            name: "heavy_ex",
            required: "number"
        }
    ],
    ReactionParamsRow: [
        {
            label: "Beam Energy (MeV)",
            name: "beam_energy",
            required: "number"
        }
    ],
    AtomRow: [
        {
            label: "Name",
            name: "name",
            disabled: true
        },
        {
            label: "Symbol",
            name: "physics_notation",
            disabled: true
        },
        {
            label: "Mass (amu)",
            name: "mass_amu",
            unit: "text",
            disabled: true
        },
        {
            label: "Ex. Energy (MeV)",
            name: "excited_state",
            required: "number",
            disabled: true
        }
    ],
    ReactionRow: [
        {
            label: "C.M. Energy (MeV)",
            name: "cm_energy",
            disabled: true
        },
        {
            label: "Q-value (MeV)",
            name: "q_value",
            disabled: true
        }
    ],
    DefaultAtom: {
        "name": "",
        "symbol": "",
        "physics_notation": "",
        "atomic_number": "",
        "mass_number": "",
        "mass_amu": "",
        "mass": ""
    },
    DefaultKinematics: {
        "reaction_notation": "",
        "cm_energy": "",
        "gs_q_value": "",
        "q_value": "",
        "beam_energy": "",
        "a_factor": "",
        "b_factor": "",
        "c_factor": "",
        "d_factor": "",
        "total_energy": "",
        "max_angle": "",
        "light_angle_lab_energy_lab_data": "",
        "heavy_angle_lab_energy_lab_data": "",
        "light_angle_lab_heavy_angle_lab_data": "",
        "kinematic_columns": "",
        "kinematic_table": "",
        "good_table": "",
    },
    atomic_mass_unit: 931.49410242,
    c: 299792458
}
export default Data;