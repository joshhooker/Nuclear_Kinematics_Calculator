import Elements from './ElementsAndIsotopes';
import Data from './Data';
import Big from "big.js";

const isotopes = getElementsObject();
const amu = Data.atomic_mass_unit;

function getElementsObject() {
    var object = {};
    Elements.forEach((e) => {
        object[e.number] = e;
    });
    return object;
}

function getIsotopeObject(mass_number, atomic_number, ex) {
    const atom = isotopes[atomic_number];

    if (!atom) {
        return false;
    }

    let isotope = null;

    if (atom) {
        atom.isotopes.forEach((i) => {
            if (i.nominal === mass_number) {
                isotope = {
                    "name": atom.name,
                    "symbol": atom.symbol,
                    "physics_notation": `text()_${atom.number}^${mass_number}text(${atom.symbol})`,
                    "simple_notation": `text()^${mass_number}text(${atom.symbol})`,
                    "atomic_number": atom.number,
                    "mass_number": mass_number,
                    "mass": new Big(i.mass).times(amu),
                    "mass_amu": new Big(i.mass),
                    "excited_state": ex,
                }
            }
        })
    }

    return isotope ? isotope : false;
}

function getAllElements() {
    return isotopes;
}

export { getIsotopeObject, getAllElements }