import Data from "./Data";

import { getIsotope, getHeavyRecoil } from "./ComputeAtoms";
import { getKinematics } from "./ComputeKinematics";
import { resultFormatter } from "./ResultFormatter"

const DefaultAtom = Data.DefaultAtom;
const DefaultKinematics = Data.DefaultKinematics;

export function computeResult(input) {
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

        beam_energy
    } = input;

    let result = {};

    // Compute Beam Atom
    const beam = getIsotope(+beam_a, +beam_z, +beam_ex);
    result["beam"] = beam ? beam : DefaultAtom;

    // Compute Target Atom
    const target = getIsotope(+target_a, +target_z, +target_ex);
    result["target"] = target ? target : DefaultAtom;

    // Compute Light Recoil Atom
    const light = getIsotope(+light_a, +light_z, +light_ex);
    result["light"] = light ? light : DefaultAtom;

    // Compute Heavy Recoil Atom
    const heavy = getHeavyRecoil(beam, target, light, +heavy_ex);
    result["heavy"] = heavy ? heavy : DefaultAtom;

    // Check if light is the light recoil and heavy is the heavy recoil, otherwise swap
    if (light.mass_number > heavy.mass_number) {
        [result["light"], result["heavy"]] = [result["heavy"], result["light"]]
    }

    // Compute Kinematics
    const kinematics = getKinematics(beam, target, light, heavy, beam_energy);
    result["kinematics"] = kinematics ? kinematics : DefaultKinematics;

    // Format results
    result = resultFormatter(result);

    return result;
}