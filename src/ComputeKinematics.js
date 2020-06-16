import Big from "big.js";

export function getKinematics(beam, target, light, heavy, beam_energy) {
    if (!(beam && target && light && heavy)) { return false; }

    const reaction_notation = target.simple_notation.concat('(', beam.simple_notation, ', ',
        light.simple_notation, ')', heavy.simple_notation);
    const cm_energy = computeCMEnergy(beam, target, beam_energy);
    const gs_q_value = computeGSQValue(beam, target, light, heavy);
    const q_value = computeQValue(beam, target, light, heavy);
    const kinematicFactors = computeFactors(beam, target, light, heavy, beam_energy, q_value);

    return {
        "reaction_notation": reaction_notation,
        "cm_energy": cm_energy,
        "gs_q_value": gs_q_value,
        "q_value": kinematicFactors.q_value,
        "beam_energy": kinematicFactors.beam_energy,
        "a_factor": kinematicFactors.a_factor,
        "b_factor": kinematicFactors.b_factor,
        "c_factor": kinematicFactors.c_factor,
        "d_factor": kinematicFactors.d_factor,
        "total_energy": kinematicFactors.total_energy,
        "max_angle": kinematicFactors.max_angle,
        "light_angle_lab_energy_lab_data": kinematicFactors.light_angle_lab_energy_lab_data,
        "heavy_angle_lab_energy_lab_data": kinematicFactors.heavy_angle_lab_energy_lab_data,
        "light_angle_lab_heavy_angle_lab_data": kinematicFactors.light_angle_lab_heavy_angle_lab_data,
        "kinematic_columns": kinematicFactors.kinematic_columns,
        "kinematic_table": kinematicFactors.kinematic_table,
    }
}

export function computeCMEnergy(beam, target, beam_energy) {
    const beam_mass_big = new Big(beam.mass);
    const target_mass_big = new Big(target.mass);
    const beam_energy_big = new Big(beam_energy);

    const cm_energy = beam_energy_big.times(target_mass_big)
        .div(beam_mass_big.plus(target_mass_big));

    return cm_energy;
}

export function computeGSQValue(beam, target, light, heavy) {
    const beam_mass_big = new Big(beam.mass);
    const target_mass_big = new Big(target.mass);
    const light_mass_big = new Big(light.mass);
    const heavy_mass_big = new Big(heavy.mass);

    const q_value = beam_mass_big.plus(target_mass_big)
        .minus(light_mass_big.plus(heavy_mass_big));

    return q_value;
}

export function computeQValue(beam, target, light, heavy) {
    const beam_mass_big = new Big(beam.mass);
    const target_mass_big = new Big(target.mass);
    const light_mass_big = new Big(light.mass);
    const heavy_mass_big = new Big(heavy.mass);

    const q_value = (beam_mass_big.plus(beam.excited_state)
        .plus(target_mass_big).plus(target.excited_state)).minus(light_mass_big
        .plus(light.excited_state).plus(heavy_mass_big).plus(heavy.excited_state));

    return q_value;
}

export function computeFactors(beam, target, light, heavy, beam_energy, q_value) {
    const beam_mass_big   = new Big(beam.mass);
    const target_mass_big = new Big(target.mass);
    const light_mass_big  = new Big(light.mass);
    const heavy_mass_big  = new Big(heavy.mass);
    const beam_energy_big = new Big(beam_energy);
    const q_value_big     = new Big(q_value);

    const total_energy_big = beam_energy_big.plus(q_value_big);

    const mass_factor = (beam_mass_big.plus(target_mass_big))
        .times(light_mass_big.plus(heavy_mass_big));

    const a_factor = beam_mass_big.times(heavy_mass_big).times(beam_energy_big)
        .div(mass_factor.times(total_energy_big));

    const b_factor = beam_mass_big.times(light_mass_big).times(beam_energy_big)
        .div(mass_factor.times(total_energy_big));

    const c_factor = target_mass_big.times(light_mass_big).times(Big(1.)
        .plus(beam_mass_big.times(q_value_big).div(target_mass_big
        .times(total_energy_big)))).div(mass_factor);

    const d_factor = target_mass_big.times(heavy_mass_big).times(Big(1.)
        .plus(beam_mass_big.times(q_value_big).div(target_mass_big
        .times(total_energy_big)))).div(mass_factor);

    let light_max_angle;

    if (b_factor > d_factor) {
        light_max_angle = Math.asin(Math.sqrt(d_factor/b_factor));
    }
    else {
        light_max_angle = Math.PI;
    }

    let heavy_max_angle;

    if (a_factor > c_factor) {
        heavy_max_angle = Math.asin(Math.sqrt(c_factor/a_factor));
    }
    else {
        heavy_max_angle = Math.PI;
    }

    let i, start = 0., end = 1801.;
    let angle_deg, angle_rad;
    let light_energy_lab, light_energy_lab_2, light_angle_lab_energy_lab_data = [];
    let light_angle_cm_rad, light_angle_cm_deg, light_angle_lab_angle_cm_data = [];
    let heavy_energy_lab, heavy_angle_lab_energy_lab_data = [];
    let heavy_angle_lab_rad, heavy_angle_lab_deg;
    let heavy_angle_cm_rad, heavy_angle_cm_deg;
    let light_angle_lab_heavy_angle_lab_data = [];
    let val_1, val_2

    const kinematic_columns = [
        {
            name: 'Lab Angle (deg)',
            selector: 'lab_angle',
            sortable: false,
        },
        {
            name: 'C.M. Angle (deg)',
            selector: 'cm_angle',
            sortable: false,
        },
        {
            name: 'Lab Energy (MeV)',
            selector: 'lab_energy',
            sortable: false,
        },
        {
            name: "Recoil Lab Angle (deg)",
            selector: 'recoil_lab_angle',
            sortable: false,
        },
        {
            name: "Recoil C.M. Angle (deg)",
            selector: 'recoil_cm_angle',
            sortable: false,
        },
        {
            name: "Recoil Energy (MeV)",
            selector: 'recoil_lab_energy',
            sortable: false,
        },

    ];

    let kinematic_table = []

    // Calculate angle vs energy

    for (i = start; i < end; i++) {
        angle_deg = i / 10;
        angle_rad = angle_deg*3.14159265/180.;

        if (angle_rad <= light_max_angle) {
            light_energy_lab = total_energy_big.times(b_factor).times(Math.pow(Math.cos(angle_rad) +
                Math.sqrt(d_factor.div(b_factor).minus(Math.pow(Math.sin(angle_rad), 2.))), 2.))

            light_energy_lab_2 = total_energy_big.times(b_factor).times(Math.pow(Math.cos(angle_rad + 0.001) +
                Math.sqrt(d_factor.div(b_factor).minus(Math.pow(Math.sin(angle_rad + 0.001), 2.))), 2.))

            heavy_energy_lab = total_energy_big.minus(light_energy_lab);

            val_1 = Math.sqrt(light_energy_lab/total_energy_big/d_factor)*Math.sin(angle_rad);
            val_2 = Math.sqrt(light_energy_lab_2/total_energy_big/d_factor)*Math.sin(angle_rad + 0.001);

            light_angle_cm_rad = (val_2 > val_1) ? Math.asin(val_1) : Math.PI - Math.asin(val_1);
            light_angle_cm_deg = light_angle_cm_rad*180./3.14159265;

            heavy_angle_lab_rad = Math.asin(Math.sqrt(light_mass_big*light_energy_lab/(heavy_mass_big*heavy_energy_lab))*Math.sin(angle_rad));
            heavy_angle_lab_deg = heavy_angle_lab_rad*180./3.14159265;

            heavy_angle_cm_rad = Math.PI - light_angle_cm_rad;
            heavy_angle_cm_deg = heavy_angle_cm_rad*180./3.14159265;;

            light_angle_cm_deg = Math.floor(light_angle_cm_deg*1000. + 0.5)/1000.;
            light_energy_lab = Math.floor(light_energy_lab*1000. + 0.5)/1000.;
            heavy_angle_lab_deg = Math.floor(heavy_angle_lab_deg*1000. + 0.5)/1000.;
            heavy_angle_cm_deg = Math.floor(heavy_angle_cm_deg*1000. + 0.5)/1000.;
            heavy_energy_lab = Math.floor(heavy_energy_lab*1000. + 0.5)/1000.;

            light_angle_lab_energy_lab_data.push({x: angle_deg, y: light_energy_lab/light.mass_amu});

            light_angle_lab_angle_cm_data.push({x: angle_deg, y: light_angle_cm_deg});

            light_angle_lab_heavy_angle_lab_data.push({x: heavy_angle_lab_deg, y: angle_deg})

            if (angle_deg % 1 === 0) {
                kinematic_table.push({id: i + 1, lab_angle: angle_deg, cm_angle: light_angle_cm_deg, lab_energy: light_energy_lab,
                    recoil_lab_angle: heavy_angle_lab_deg, recoil_cm_angle: heavy_angle_cm_deg, recoil_lab_energy: heavy_energy_lab})
            }
        }

        if (angle_rad <= heavy_max_angle) {
            heavy_energy_lab = total_energy_big*a_factor*Math.pow((Math.cos(angle_rad) + Math.sqrt((c_factor/a_factor -
                Math.sin(angle_rad)*Math.sin(angle_rad)))), 2);

            heavy_angle_lab_energy_lab_data.push({x: angle_deg, y: heavy_energy_lab/heavy.mass_amu})
        }
    }

    if (light_max_angle < Math.PI) {
        for (i = end; i >= start; i--) {
            angle_deg = i / 2.;
            angle_rad = angle_deg*3.14159265/180.;

            if (angle_rad <= light_max_angle) {
                light_energy_lab = total_energy_big*b_factor*Math.pow((Math.cos(angle_rad) - Math.sqrt((d_factor/b_factor -
                    Math.sin(angle_rad)*Math.sin(angle_rad)))), 2);

                light_angle_lab_energy_lab_data.push({x: angle_deg, y: light_energy_lab/light.mass_amu})
            }

        }
    }

    if (heavy_max_angle < Math.PI) {
        for (i = end; i >= start; i--) {
            angle_deg = i / 2.;
            angle_rad = angle_deg*3.14159265/180.;

            if (angle_rad <= heavy_max_angle) {
                heavy_energy_lab = total_energy_big*a_factor*Math.pow((Math.cos(angle_rad) - Math.sqrt((c_factor/a_factor -
                    Math.sin(angle_rad)*Math.sin(angle_rad)))), 2);

                heavy_angle_lab_energy_lab_data.push({x: angle_deg, y: heavy_energy_lab/heavy.mass_amu})
            }

        }
    }


    let factors = null;

    factors = {
        "a_factor": a_factor,
        "b_factor": b_factor,
        "c_factor": c_factor,
        "d_factor": d_factor,
        "beam_energy": beam_energy_big,
        "q_value": q_value_big,
        "total_energy": total_energy_big,
        "light_angle_lab_energy_lab_data": light_angle_lab_energy_lab_data,
        "heavy_angle_lab_energy_lab_data": heavy_angle_lab_energy_lab_data,
        "light_angle_lab_heavy_angle_lab_data": light_angle_lab_heavy_angle_lab_data,
        "kinematic_columns": kinematic_columns,
        "kinematic_table": kinematic_table,
    }

    return factors
}