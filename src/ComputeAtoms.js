import { getIsotopeObject } from "./Isotopes";

export function getIsotope(mass_number, atomic_number, ex) {
    if (!(mass_number && atomic_number)) { return false; }

    return getIsotopeObject(mass_number, atomic_number, ex);
}

export function getHeavyRecoil(beam, target, light, heavy_ex) {
    if (!(beam && target && light)) { return false; }

    const beam_a = +beam.mass_number;
    const beam_z = +beam.atomic_number;
    const target_a = +target.mass_number;
    const target_z = +target.atomic_number;

    const light_a = +light.mass_number;
    const light_z = +light.atomic_number;

    let heavy_a = beam_a + target_a - light_a;
    let heavy_z = beam_z + target_z - light_z;

    const heavy = getIsotope(heavy_a, heavy_z, heavy_ex);
    return heavy;
}