import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const periodicTable = [
  { symbol: 'H', name: 'Hydrogen', category: 'Reactive non-metals', row: 0, col: 0, description: 'Hydrogen is the lightest and most abundant element in the universe, commonly used in fuel cells and as a reducing agent.', atomicMass: '1.0078 u', discovery: '1766', discoverer: 'Henry Cavendish' },
  { symbol: 'He', name: 'Helium', category: 'Noble gas', row: 0, col: 17, description: 'Helium is a colorless, odorless, inert gas primarily used in cryogenics and as a cooling medium.', atomicMass: '4.0026 u', discovery: '1895', discoverer: 'Pierre Janssen' },
  { symbol: 'Li', name: 'Lithium', category: 'Alkali metal', row: 1, col: 0, description: 'Lithium is a soft, silvery-white alkali metal used in rechargeable batteries and mood-stabilizing drugs.', atomicMass: '6.94 u', discovery: '1817', discoverer: 'Johann Arfvedson' },
  { symbol: 'Be', name: 'Beryllium', category: 'Alkaline earth metal', row: 1, col: 1, description: 'Beryllium is a lightweight, strong metal used in aerospace and as a neutron moderator in nuclear reactors.', atomicMass: '9.0122 u', discovery: '1798', discoverer: 'Louis Nicolas Vauquelin' },
  { symbol: 'B', name: 'Boron', category: 'Metalloid', row: 1, col: 12, description: 'Boron is a metalloid with applications in borosilicate glass and detergents.', atomicMass: '10.81 u', discovery: '1808', discoverer: 'Joseph-Louis Gay-Lussac' },
  { symbol: 'C', name: 'Carbon', category: 'Reactive non-metals', row: 1, col: 13, description: 'Carbon is a fundamental element of life, known for its diverse allotropes like graphite and diamond.', atomicMass: '12.011 u', discovery: 'Ancient', discoverer: 'Unknown' },
  { symbol: 'N', name: 'Nitrogen', category: 'Reactive non-metals', row: 1, col: 14, description: 'Nitrogen is a colorless, odorless gas making up 78% of the Earth’s atmosphere.', atomicMass: '14.007 u', discovery: '1772', discoverer: 'Daniel Rutherford' },
  { symbol: 'O', name: 'Oxygen', category: 'Reactive non-metals', row: 1, col: 15, description: 'Oxygen is essential for respiration and a critical component of the atmosphere.', atomicMass: '15.999 u', discovery: '1774', discoverer: 'Joseph Priestley' },
  { symbol: 'F', name: 'Fluorine', category: 'Reactive non-metals', row: 1, col: 16, description: 'Fluorine is the most reactive and electronegative element, widely used in toothpaste and Teflon.', atomicMass: '18.998 u', discovery: '1886', discoverer: 'Henri Moissan' },
  { symbol: 'Ne', name: 'Neon', category: 'Noble gas', row: 1, col: 17, description: 'Neon is a noble gas used primarily in neon lighting and high-voltage indicators.', atomicMass: '20.180 u', discovery: '1898', discoverer: 'William Ramsay' },
  { symbol: 'Na', name: 'Sodium', category: 'Alkali metal', row: 2, col: 0, description: 'Sodium is a soft, highly reactive metal used in salt and various industrial processes.', atomicMass: '22.990 u', discovery: '1807', discoverer: 'Humphry Davy' },
  { symbol: 'Mg', name: 'Magnesium', category: 'Alkaline earth metal', row: 2, col: 1, description: 'Magnesium is a lightweight metal essential for biological processes and used in alloys.', atomicMass: '24.305 u', discovery: '1755', discoverer: 'Joseph Black' },
  { symbol: 'Al', name: 'Aluminium', category: 'Post-transition metal', row: 2, col: 12, description: 'Aluminium is a lightweight, corrosion-resistant metal widely used in construction and packaging.', atomicMass: '26.982 u', discovery: '1825', discoverer: 'Hans Christian Ørsted' },
  { symbol: 'Si', name: 'Silicon', category: 'Metalloid', row: 2, col: 13, description: 'Silicon is a semiconductor material used in electronics and solar cells.', atomicMass: '28.085 u', discovery: '1824', discoverer: 'Jöns Jacob Berzelius' },
  { symbol: 'P', name: 'Phosphorus', category: 'Reactive non-metals', row: 2, col: 14, description: 'Phosphorus is a reactive element essential for life, found in DNA and fertilizers.', atomicMass: '30.974 u', discovery: '1669', discoverer: 'Hennig Brand' },
  { symbol: 'S', name: 'Sulfur', category: 'Reactive non-metals', row: 2, col: 15, description: 'Sulfur is a yellow non-metal used in sulfuric acid production and vulcanization.', atomicMass: '32.06 u', discovery: 'Ancient', discoverer: 'Unknown' },
  { symbol: 'Cl', name: 'Chlorine', category: 'Reactive non-metals', row: 2, col: 16, description: 'Chlorine is a highly reactive gas used in water disinfection and PVC production.', atomicMass: '35.45 u', discovery: '1774', discoverer: 'Carl Wilhelm Scheele' },
  { symbol: 'Ar', name: 'Argon', category: 'Noble gas', row: 2, col: 17, description: 'Argon is an inert gas used in lighting and as a shielding gas in welding.', atomicMass: '39.948 u', discovery: '1894', discoverer: 'Lord Rayleigh and William Ramsay' },
  { symbol: 'K', name: 'Potassium', category: 'Alkali metal', row: 3, col: 0, description: 'Potassium is an essential nutrient for plants and animals, widely used in fertilizers.', atomicMass: '39.098 u', discovery: '1807', discoverer: 'Humphry Davy' },
  { symbol: 'Ca', name: 'Calcium', category: 'Alkaline earth metal', row: 3, col: 1, description: 'Calcium is essential for living organisms and widely used in construction as limestone and cement.', atomicMass: '40.078 u', discovery: '1808', discoverer: 'Humphry Davy' },
  { symbol: 'Sr', name: 'Strontium', category: 'Alkaline earth metal', row: 4, col: 1, description: 'Strontium is a soft, silvery metal used in fireworks and flares for its bright red flame.', atomicMass: '87.62 u', discovery: '1790', discoverer: 'Adair Crawford' },
  { symbol: 'Ba', name: 'Barium', category: 'Alkaline earth metal', row: 5, col: 1, description: 'Barium is a reactive metal used in drilling fluids and in the production of barium sulfate for medical imaging.', atomicMass: '137.33 u', discovery: '1774', discoverer: 'Carl Wilhelm Scheele' },
  { symbol: 'Ra', name: 'Radium', category: 'Alkaline earth metal', row: 6, col: 1, description: 'Radium is a highly radioactive metal once used in luminous paints, now primarily studied for its properties.', atomicMass: '226 u', discovery: '1898', discoverer: 'Marie and Pierre Curie' },
  { symbol: 'Sc', name: 'Scandium', category: 'Transition metal', row: 3, col: 2, description: 'Scandium is a rare earth metal used in alloys for aerospace components.', atomicMass: '44.96 u', discovery: '1879', discoverer: 'Lars Fredrik Nilson' },
  { symbol: 'Y', name: 'Yttrium', category: 'Transition metal', row: 4, col: 2, description: 'Yttrium is used in LEDs, lasers, and superconductors.', atomicMass: '88.91 u', discovery: '1794', discoverer: 'Johan Gadolin' },
  { symbol: 'La', name: 'Lanthanum', category: 'Lanthanide', row: 5, col: 2, description: 'Lanthanum is a soft, ductile metal used in optics and as a catalyst.', atomicMass: '138.91 u', discovery: '1839', discoverer: 'Carl Gustaf Mosander' },
  { symbol: 'Ac', name: 'Actinium', category: 'Actinide', row: 6, col: 2, description: 'Actinium is a radioactive metal used in cancer treatment and research.', atomicMass: '227 u', discovery: '1899', discoverer: 'Friedrich Oskar Giesel' },
  { symbol: 'Al', name: 'Aluminium', category: 'Post-transition metal', row: 2, col: 12, description: 'Aluminium is a lightweight, corrosion-resistant metal widely used in construction and packaging.', atomicMass: '26.98 u', discovery: '1825', discoverer: 'Hans Christian Ørsted' },
  { symbol: 'Ga', name: 'Gallium', category: 'Post-transition metal', row: 3, col: 12, description: 'Gallium is a soft metal used in semiconductors and thermometers.', atomicMass: '69.72 u', discovery: '1875', discoverer: 'Paul-Émile Lecoq de Boisbaudran' },
  { symbol: 'In', name: 'Indium', category: 'Post-transition metal', row: 4, col: 12, description: 'Indium is used in touchscreens, LCDs, and solders.', atomicMass: '114.82 u', discovery: '1863', discoverer: 'Ferdinand Reich' },
  { symbol: 'Ti', name: 'Titanium', category: 'Transition metal', row: 3, col: 3, description: 'Titanium is a strong, corrosion-resistant metal used in aerospace, medical implants, and pigments.', atomicMass: '47.87 u', discovery: '1791', discoverer: 'William Gregor' },
  { symbol: 'Nh', name: 'Nihonium', category: 'Post-transition metal', row: 6, col: 12, description: 'Nihonium is a synthetic element with very limited practical use due to its short half-life.', atomicMass: '[286]', discovery: '2004', discoverer: 'RIKEN collaboration' },
  { symbol: 'Si', name: 'Silicon', category: 'Metalloid', row: 2, col: 13, description: 'Silicon is a semiconductor material used in electronics and solar cells.', atomicMass: '28.085 u', discovery: '1824', discoverer: 'Jöns Jacob Berzelius' },
  { symbol: 'Ge', name: 'Germanium', category: 'Metalloid', row: 3, col: 13, description: 'Germanium is a semiconductor material used in fiber optics and infrared optics.', atomicMass: '72.63 u', discovery: '1886', discoverer: 'Clemens Winkler' },
  { symbol: 'Sn', name: 'Tin', category: 'Post-transition metal', row: 4, col: 13, description: 'Tin is a corrosion-resistant metal used in coatings and alloys like bronze.', atomicMass: '118.71 u', discovery: 'Ancient', discoverer: 'Unknown' },
  { symbol: 'Pb', name: 'Lead', category: 'Post-transition metal', row: 5, col: 13, description: 'Lead is a dense metal used in batteries, radiation shielding, and previously in paints.', atomicMass: '207.2 u', discovery: 'Ancient', discoverer: 'Unknown' },
  { symbol: 'Fl', name: 'Flerovium', category: 'Post-transition metal', row: 6, col: 13, description: 'Flerovium is a synthetic element with very limited practical use due to its short half-life.', atomicMass: '[289]', discovery: '1999', discoverer: 'Joint Institute for Nuclear Research' },
  { symbol: 'As', name: 'Arsenic', category: 'Metalloid', row: 3, col: 14, description: 'Arsenic is a toxic element used in semiconductors and as a wood preservative.', atomicMass: '74.9216 u', discovery: 'Ancient', discoverer: 'Unknown' },
  { symbol: 'Sb', name: 'Antimony', category: 'Metalloid', row: 4, col: 14, description: 'Antimony is used in flame retardants, alloys, and semiconductors.', atomicMass: '121.76 u', discovery: 'Ancient', discoverer: 'Unknown' },
  { symbol: 'Bi', name: 'Bismuth', category: 'Post-transition metal', row: 5, col: 14, description: 'Bismuth is a dense metal used in cosmetics, pigments, and pharmaceuticals.', atomicMass: '208.98 u', discovery: 'Ancient', discoverer: 'Unknown' },
  { symbol: 'Mc', name: 'Moscovium', category: 'Post-transition metal', row: 6, col: 14, description: 'Moscovium is a synthetic element with very limited practical use due to its short half-life.', atomicMass: '[289]', discovery: '2010', discoverer: 'Joint Institute for Nuclear Research' },
  { symbol: 'Se', name: 'Selenium', category: 'Reactive non-metals', row: 3, col: 15, description: 'Selenium is used in photocells, glass production, and as a dietary supplement.', atomicMass: '78.971 u', discovery: '1817', discoverer: 'Jöns Jacob Berzelius' },
  { symbol: 'Te', name: 'Tellurium', category: 'Metalloid', row: 4, col: 15, description: 'Tellurium is used in thermoelectric devices and as an alloying agent.', atomicMass: '127.6 u', discovery: '1782', discoverer: 'Franz-Joseph Müller von Reichenstein' },
  { symbol: 'Po', name: 'Polonium', category: 'Metalloid', row: 5, col: 15, description: 'Polonium is a highly radioactive element used in antistatic devices and research.', atomicMass: '209 u', discovery: '1898', discoverer: 'Marie and Pierre Curie' },
  { symbol: 'Lv', name: 'Livermorium', category: 'Post-transition metal', row: 6, col: 15, description: 'Livermorium is a synthetic element with very limited practical use due to its short half-life.', atomicMass: '[293]', discovery: '2000', discoverer: 'Joint Institute for Nuclear Research' },
  { symbol: 'Br', name: 'Bromine', category: 'Reactive non-metals', row: 3, col: 16, description: 'Bromine is a reddish-brown liquid used in flame retardants and water treatment.', atomicMass: '79.904 u', discovery: '1826', discoverer: 'Antoine Balard' },
  { symbol: 'I', name: 'Iodine', category: 'Reactive non-metals', row: 4, col: 16, description: 'Iodine is essential for thyroid health and used in disinfectants and dyes.', atomicMass: '126.90 u', discovery: '1811', discoverer: 'Bernard Courtois' },
  { symbol: 'At', name: 'Astatine', category: 'Metalloid', row: 5, col: 16, description: 'Astatine is a rare, radioactive element used in cancer treatment research.', atomicMass: '210 u', discovery: '1940', discoverer: 'Dale R. Corson' },
  { symbol: 'Ts', name: 'Tennessine', category: 'Halogen', row: 6, col: 16, description: 'Tennessine is a synthetic element with very limited practical use due to its short half-life.', atomicMass: '[294]', discovery: '2010', discoverer: 'Joint Institute for Nuclear Research' },
  { symbol: 'Rb', name: 'Rubidium', category: 'Alkali metal', row: 4, col: 0, description: 'Rubidium is a soft, highly reactive alkali metal used in research and electronics.', atomicMass: '85.47 u', discovery: '1861', discoverer: 'Robert Bunsen and Gustav Kirchhoff' },
  { symbol: 'Cs', name: 'Cesium', category: 'Alkali metal', row: 5, col: 0, description: 'Cesium is a highly reactive metal used in atomic clocks and as a catalyst in organic chemistry.', atomicMass: '132.91 u', discovery: '1860', discoverer: 'Robert Bunsen and Gustav Kirchhoff' },
  { symbol: 'Fr', name: 'Francium', category: 'Alkali metal', row: 6, col: 0, description: 'Francium is a highly radioactive alkali metal with limited practical applications due to its short half-life.', atomicMass: '[223]', discovery: '1939', discoverer: 'Marguerite Perey' },
  { symbol: 'Zr', name: 'Zirconium', category: 'Transition metal', row: 4, col: 3, description: 'Zirconium is a corrosion-resistant metal used in nuclear reactors and surgical instruments.', atomicMass: '91.22 u', discovery: '1789', discoverer: 'Martin Heinrich Klaproth' },
  { symbol: 'Hf', name: 'Hafnium', category: 'Transition metal', row: 5, col: 3, description: 'Hafnium is a ductile metal used in nuclear control rods and as an alloy additive.', atomicMass: '178.49 u', discovery: '1923', discoverer: 'Dirk Coster and George de Hevesy' },
  { symbol: 'Rf', name: 'Rutherfordium', category: 'Transition metal', row: 6, col: 3, description: 'Rutherfordium is a synthetic element with limited practical applications due to its short half-life.', atomicMass: '[267]', discovery: '1964', discoverer: 'Joint Institute for Nuclear Research' },
  { symbol: 'Tl', name: 'Thallium', category: 'Post-transition metal', row: 5, col: 12, description: 'Thallium is a soft, malleable metal used in electronics and glass manufacturing.', atomicMass: '204.38 u', discovery: '1861', discoverer: 'William Crookes' },
  { symbol: 'Kr', name: 'Krypton', category: 'Noble gas', row: 3, col: 17, description: 'Krypton is a noble gas used in high-performance lighting and lasers.', atomicMass: '83.798 u', discovery: '1898', discoverer: 'William Ramsay and Morris Travers' },
  { symbol: 'Xe', name: 'Xenon', category: 'Noble gas', row: 4, col: 17, description: 'Xenon is used in high-intensity lamps and as a general anesthetic.', atomicMass: '131.29 u', discovery: '1898', discoverer: 'William Ramsay and Morris Travers' },
  { symbol: 'Rn', name: 'Radon', category: 'Noble gas', row: 5, col: 17, description: 'Radon is a radioactive noble gas used in some cancer treatments.', atomicMass: '[222]', discovery: '1900', discoverer: 'Friedrich Ernst Dorn' },
  { symbol: 'Og', name: 'Oganesson', category: 'Noble gas', row: 6, col: 17, description: 'Oganesson is a synthetic element with very limited practical applications due to its short half-life.', atomicMass: '[294]', discovery: '2002', discoverer: 'Joint Institute for Nuclear Research' },
  { symbol: 'V', name: 'Vanadium', category: 'Transition metal', row: 3, col: 4, description: 'Vanadium is used in steel alloys to increase strength and corrosion resistance.', atomicMass: '50.94 u', discovery: '1801', discoverer: 'Andrés Manuel del Río' },
  { symbol: 'Nb', name: 'Niobium', category: 'Transition metal', row: 4, col: 4, description: 'Niobium is used in alloys and superconducting materials.', atomicMass: '92.91 u', discovery: '1801', discoverer: 'Charles Hatchett' },
  { symbol: 'Ta', name: 'Tantalum', category: 'Transition metal', row: 5, col: 4, description: 'Tantalum is highly corrosion-resistant and used in electronics and medical implants.', atomicMass: '180.95 u', discovery: '1802', discoverer: 'Anders Ekeberg' },
  { symbol: 'Db', name: 'Dubnium', category: 'Transition metal', row: 6, col: 4, description: 'Dubnium is a synthetic element with limited applications due to its short half-life.', atomicMass: '[262]', discovery: '1967', discoverer: 'Joint Institute for Nuclear Research' },
  { symbol: 'Cr', name: 'Chromium', category: 'Transition metal', row: 3, col: 5, description: 'Chromium is used in stainless steel and as a protective coating.', atomicMass: '51.996 u', discovery: '1797', discoverer: 'Louis Nicolas Vauquelin' },
  { symbol: 'Mo', name: 'Molybdenum', category: 'Transition metal', row: 4, col: 5, description: 'Molybdenum is used in steel alloys and as a catalyst in chemical reactions.', atomicMass: '95.95 u', discovery: '1778', discoverer: 'Carl Wilhelm Scheele' },
  { symbol: 'W', name: 'Tungsten', category: 'Transition metal', row: 5, col: 5, description: 'Tungsten is known for its high melting point and is used in light bulb filaments.', atomicMass: '183.84 u', discovery: '1783', discoverer: 'Fausto and Juan José de Elhuyar' },
  { symbol: 'Sg', name: 'Seaborgium', category: 'Transition metal', row: 6, col: 5, description: 'Seaborgium is a synthetic element with no practical applications due to its short half-life.', atomicMass: '[266]', discovery: '1974', discoverer: 'Lawrence Berkeley Laboratory' },
  { symbol: 'Mn', name: 'Manganese', category: 'Transition metal', row: 3, col: 6, description: 'Manganese is used in steel production and as an additive in alloys.', atomicMass: '54.94 u', discovery: '1774', discoverer: 'Carl Wilhelm Scheele' },
  { symbol: 'Tc', name: 'Technetium', category: 'Transition metal', row: 4, col: 6, description: 'Technetium is a radioactive element used in medical imaging.', atomicMass: '98 u', discovery: '1937', discoverer: 'Carlo Perrier and Emilio Segrè' },
  { symbol: 'Re', name: 'Rhenium', category: 'Transition metal', row: 5, col: 6, description: 'Rhenium is used in jet engines and catalysts for petroleum refining.', atomicMass: '186.21 u', discovery: '1925', discoverer: 'Masataka Ogawa' },
  { symbol: 'Bh', name: 'Bohrium', category: 'Transition metal', row: 6, col: 6, description: 'Bohrium is a synthetic element with limited applications due to its short half-life.', atomicMass: '[270]', discovery: '1981', discoverer: 'Gesellschaft für Schwerionenforschung' },
  { symbol: 'Fe', name: 'Iron', category: 'Transition metal', row: 3, col: 7, description: 'Iron is a key component of steel and is essential for human biology.', atomicMass: '55.845 u', discovery: 'Ancient', discoverer: 'Unknown' },
  { symbol: 'Co', name: 'Cobalt', category: 'Transition metal', row: 3, col: 8, description: 'Cobalt is used in alloys, batteries, and pigments.', atomicMass: '58.933 u', discovery: '1735', discoverer: 'Georg Brandt' },
  { symbol: 'Rh', name: 'Rhodium', category: 'Transition metal', row: 4, col: 8, description: 'Rhodium is a rare, corrosion-resistant metal used in catalytic converters.', atomicMass: '102.91 u', discovery: '1803', discoverer: 'William Hyde Wollaston' },
  { symbol: 'Ir', name: 'Iridium', category: 'Transition metal', row: 5, col: 8, description: 'Iridium is a dense, corrosion-resistant metal used in spark plugs and crucibles.', atomicMass: '192.22 u', discovery: '1803', discoverer: 'Smithson Tennant' },
  { symbol: 'Mt', name: 'Meitnerium', category: 'Transition metal', row: 6, col: 8, description: 'Meitnerium is a synthetic element with no practical applications due to its short half-life.', atomicMass: '[278]', discovery: '1982', discoverer: 'Gesellschaft für Schwerionenforschung' },
  { symbol: 'Ni', name: 'Nickel', category: 'Transition metal', row: 3, col: 9, description: 'Nickel is used in stainless steel, coins, and batteries.', atomicMass: '58.693 u', discovery: '1751', discoverer: 'Axel Fredrik Cronstedt' },
  { symbol: 'Pd', name: 'Palladium', category: 'Transition metal', row: 4, col: 9, description: 'Palladium is used in catalytic converters, electronics, and jewelry.', atomicMass: '106.42 u', discovery: '1803', discoverer: 'William Hyde Wollaston' },
  { symbol: 'Pt', name: 'Platinum', category: 'Transition metal', row: 5, col: 9, description: 'Platinum is a precious metal used in jewelry, catalytic converters, and electronics.', atomicMass: '195.08 u', discovery: '1735', discoverer: 'Antonio de Ulloa' },
  { symbol: 'Ds', name: 'Darmstadtium', category: 'Transition metal', row: 6, col: 9, description: 'Darmstadtium is a synthetic element with no practical applications due to its short half-life.', atomicMass: '[281]', discovery: '1994', discoverer: 'Gesellschaft für Schwerionenforschung' },
  { symbol: 'Ru', name: 'Ruthenium', category: 'Transition metal', row: 4, col: 7, description: 'Ruthenium is used in electronics and as a catalyst in chemical reactions.', atomicMass: '101.07 u', discovery: '1844', discoverer: 'Karl Ernst Claus' },
  { symbol: 'Os', name: 'Osmium', category: 'Transition metal', row: 5, col: 7, description: 'Osmium is a dense, hard metal used in fountain pen tips and electrical contacts.', atomicMass: '190.23 u', discovery: '1803', discoverer: 'Smithson Tennant' },
  { symbol: 'Hs', name: 'Hassium', category: 'Transition metal', row: 6, col: 7, description: 'Hassium is a synthetic element with no practical applications due to its short half-life.', atomicMass: '[277]', discovery: '1984', discoverer: 'Gesellschaft für Schwerionenforschung' },
  { symbol: 'Cu', name: 'Copper', category: 'Transition metal', row: 3, col: 10, description: 'Copper is used in electrical wiring, plumbing, and coins.', atomicMass: '63.546 u', discovery: 'Ancient', discoverer: 'Unknown' },
  { symbol: 'Ag', name: 'Silver', category: 'Transition metal', row: 4, col: 10, description: 'Silver is a precious metal used in jewelry, coins, and photography.', atomicMass: '107.87 u', discovery: 'Ancient', discoverer: 'Unknown' },
  { symbol: 'Au', name: 'Gold', category: 'Transition metal', row: 5, col: 10, description: 'Gold is a precious metal used in jewelry, electronics, and as a monetary standard.', atomicMass: '196.97 u', discovery: 'Ancient', discoverer: 'Unknown' },
  { symbol: 'Rg', name: 'Roentgenium', category: 'Transition metal', row: 6, col: 10, description: 'Roentgenium is a synthetic element with no practical applications due to its short half-life.', atomicMass: '[282]', discovery: '1994', discoverer: 'Gesellschaft für Schwerionenforschung' },
  { symbol: 'Zn', name: 'Zinc', category: 'Transition metal', row: 3, col: 11, description: 'Zinc is used to galvanize other metals to prevent corrosion.', atomicMass: '65.38 u', discovery: 'Ancient', discoverer: 'Unknown' },
  { symbol: 'Cd', name: 'Cadmium', category: 'Transition metal', row: 4, col: 11, description: 'Cadmium is used in batteries and pigments but is toxic to humans.', atomicMass: '112.41 u', discovery: '1817', discoverer: 'Friedrich Stromeyer' },
  { symbol: 'Hg', name: 'Mercury', category: 'Transition metal', row: 5, col: 11, description: 'Mercury is a liquid metal used in thermometers, barometers, and fluorescent lights.', atomicMass: '200.59 u', discovery: 'Ancient', discoverer: 'Unknown' },
  { symbol: 'Cn', name: 'Copernicium', category: 'Transition metal', row: 6, col: 11, description: 'Copernicium is a synthetic element with no practical applications due to its short half-life.', atomicMass: '[285]', discovery: '1996', discoverer: 'Gesellschaft für Schwerionenforschung' }
];

const gridSize = 40; // Ukuran kotak grid (px)

const PeriodicTable = () => {
  const [selectedElement, setSelectedElement] = useState(periodicTable[0]); // Default elemen pertama

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Header */}
      <Text style={styles.header}>Periodic Table</Text>

      {/* Tabel Periodik */}
      <View style={styles.tableContainer}>
        <View style={styles.table}>
          {periodicTable.map((element, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.elementBox,
                selectedElement.symbol === element.symbol && styles.selectedBox,
                {
                  top: element.row * gridSize, // Posisi vertikal (baris)
                  left: element.col * gridSize, // Posisi horizontal (kolom)
                },
              ]}
              onPress={() => setSelectedElement(element)}
            >
              <Text style={styles.elementText}>{element.symbol}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Deskripsi Elemen */}
      {selectedElement && (
        <View style={styles.descriptionContainer}>
          {/* Kotak Gambar */}
          <View style={styles.imageContainer}>
            <Text style={styles.imageText}>{selectedElement.symbol}</Text>
            <Text style={styles.imageSubText}>{selectedElement.name}</Text>
          </View>

          {/* Deskripsi */}
          <View style={styles.textContainer}>
            <Text style={styles.elementTitle}>{selectedElement.name}</Text>
            <Text style={styles.elementCategory}>{selectedElement.category}</Text>
            <Text style={styles.elementDetails}>{selectedElement.description}</Text>
            <Text style={styles.elementDetails}>
              Atomic Mass: {selectedElement.atomicMass}{'\n'}
              Discovery Year: {selectedElement.discovery}{'\n'}
              Discoverer: {selectedElement.discoverer}
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // Membuat ScrollView bisa di-scroll
    padding: 20,
    alignItems: 'center', // Memposisikan konten di tengah horizontal
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  tableContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  table: {
    position: 'relative',
    width: gridSize * 18, // 18 kolom
    height: gridSize * 7, // 7 baris
  },
  elementBox: {
    position: 'absolute',
    width: gridSize - 5,
    height: gridSize - 5,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    margin: 2,
  },
  selectedBox: {
    backgroundColor: '#FFC107',
  },
  elementText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    flexDirection: 'row',
    width: '60%',
    height: '30%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  imageContainer: {
    width: 110,
    height: 110,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  imageText: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  imageSubText: {
    fontSize: 12,
    color: '#555',
    fontStyle: 'italic',
    fontFamily: 'Arial',
  },
  textContainer: {
    flex: 1,
  },
  elementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  elementCategory: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 5,
  },
  elementDetails: {
    fontSize: 11,
    lineHeight: 15,
  },
});

export default PeriodicTable;