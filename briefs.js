/* ------------------------------------------------------------------
   PROJECT BRIEFS — problem statement, scope, and how it was solved.
   Edit the text between the quotes. Each "solved" item is one bullet.
   Keep straight quotes ' inside text escaped as \' or use ’ instead.
   ------------------------------------------------------------------ */
window.BRIEF = {

ans: {
  problem: 'Operators offloading chemical tankers at the ANS offloading point had no safe way to reach the manhole on top of the tanker. They were working at height beside a catchment pit and V-drain, with no platform, handrails or protection from vehicles.',
  scope: 'Design and detail a fixed steel access platform with a stair, its concrete plinths and holding-down bolts, and the site and civil layout around it. Produce fabrication shop drawings for every member so the platform could be built straight from the drawings.',
  solved: [
    'Set the 3.0 × 1.15 m grating deck at +3.43 m to suit the tanker manhole height, with handrails all round.',
    'Used a 38° stair with FRP treads and handrails on both sides for safe access with hands free.',
    'X-braced the galvanised frame on all faces so it stays stiff with simple bolted connections. PFC160 × 65 beams and stringers and L100 × 100 × 10 columns, all in S355JR.',
    'Placed the 800 × 1 070 reinforced plinths clear of the catchment pit and V-drain, fixed with M20 grade 8.8 holding-down bolts. Concrete to SANS 10100-1, detailing to SANS 10144.',
    'Added an Armco barrier to SANS 1350 to protect the structure from tanker impact.',
    'Drew ten shop drawings, with material lists for the two stringers, three columns and five beams.'
  ]
},

catl: {
  problem: 'Operators needed safe access down from the existing walkway into the space between two existing 20D tanks. Any new steel had to be fixed to the existing structure without new foundations.',
  scope: 'Design and detail a caged access ladder with its supports and a landing platform, fixed to the existing tanks and walkway.',
  solved: [
    'Hung a 2.786 m caged ladder from the existing walkway, with rungs at 305 mm and 65 × 10 flat stringers.',
    'Carried it on L70 × 70 × 8 brackets bolted with M16 bolts to the existing tank stiffeners, with no welding to the tank shells and no new foundations.',
    'Fitted a 50 × 8 hoop cage with safety straps, and a 772 mm semicircular grating platform at the bottom.',
    'Revised the ladder orientation (Rev 1) and the support arrangement (Rev 2) after site review.'
  ]
},

silo: {
  problem: 'Construction of the support structure was abandoned after a building went up next to it, covering the space where the double staircase was meant to be built. By then only the cat ladder had been built.',
  scope: 'Redesign the staircase to fit the space that was left, and draw the as-built structure: the steel support for the three silo tanks, the +5.99 m access deck, the stair, the caged ladder and the plinth layout.',
  solved: [
    'Redesigned the access as a dog-leg stair with a landing that fits beside the new building, keeping the existing caged ladder as a second way down.',
    'Rotated the column orientation and added landing support columns to carry the new stair (Revs 2–4).',
    'Extended the gratings so the tanks can still be reached for maintenance.',
    'Drew the as-built structure: X-braced steel bents on concrete plinths, set out on grids 01–08a × H–K1, under an 18.9 × 7.0 m grating deck at +5.99 m.'
  ]
},

boiler: {
  problem: 'The project was abandoned after the previous contractor cast the concrete surface bed in the wrong direction. The original design also had no crawl beam, so there was no way to hoist the boilers in and out.',
  scope: 'As-built drawings of the boiler house as it stands, plus the design of a 2-ton crawl beam for hoisting the boilers.',
  solved: [
    'Drew the as-built structure to match what was on site: UC254 × 254 × 107 columns on the existing 600 × 600 plinths, facebrick to +4.016 m with perforated plate above, and an 11° mono-pitch Kliplok roof on 100 mm C-purlins and light steel trusses.',
    'Reconfigured the bracing (Rev 2).',
    'Designed a 2-ton crawl beam, a UC203 × 203 × 46 with its connections to the frame, for hoisting the boilers (Rev 3).',
    'Issued plan, four elevations, structural layout, four grid elevations and connection details.'
  ]
},

walk: {
  problem: 'The existing walkway at the AN bund wall had been removed so the bund wall could be rebuilt, which left operators with no access to the tanks during the works.',
  scope: 'Come up with a temporary access solution that operators could use until the walkway was reinstated.',
  solved: [
    'Designed a mobile platform: a 2.4 × 1.2 m galvanised grating deck at +0.8 m on castor wheels, so it can be moved around the works and taken away when the walkway goes back.',
    '0.9 m guardrails on three sides and a four-riser stair, 0.8 m wide with 200 mm risers and 300 mm goings.',
    'PFC100 × 50 legs braced with L25 × 25 × 3 angles, to keep it light enough to push into place.'
  ]
},

gate: {
  problem: 'The client needed three matching double swing gates for property entrances, each with a 3 m vehicle leaf and a 1 m pedestrian leaf, 1.7 m high. There were no drawings, member sizes or hardware to work from.',
  scope: 'A complete fabrication set for three gates: 3D views, general arrangement, leaf fabrication details and cutting list, weld and connection details, hardware selection, and notes with a material schedule.',
  solved: [
    'Sized the members: 150×150×4.5 SHS posts, 76×38×2.5 RHS mitred leaf frames and 25×25×1.6 SHS slats.',
    'Set out 25 slats per leaf at 60.5 c/c with equal 35.5 mm gaps, so the fabricator can work from a simple spacer jig.',
    'Checked the 123 kg vehicle leaf: hinge-line moment about 1.8 kN·m and about 5 mm sag at the nose from post bending, so three hinges on that leaf and a mid-span stiffener.',
    'Specified standard, easy-to-buy hardware: Ø20 weld-on bullet hinges with the top hinge inverted against lift-off, a euro mortice lock in a welded pocket, and a Ø16 drop bolt in galvanised ground sleeves.',
    'Detailed every weld and connection, and specified hot-dip galvanising with vent and drain holes placed so they are hidden inside the joints.',
    'Produced a cutting list and material schedule for all three sets: about 825 kg of steel, with slat stock planned to 49 lengths.'
  ]
},

embalenhle: {
  problem: 'My parents need a four-bedroom home on a narrow 12.4 × 21 m stand, built on a tight budget, and they should be able to live without climbing stairs every day.',
  scope: 'Full concept design and structural design: plans, elevations, sections, roof plan, slab, beams, column, footings, staircase and roof trusses, plus a 3D model.',
  solved: [
    'Kept the front single storey under a lean-to roof and put the double storey at the back under a skillion roof. Both are IBR sheeting at 5° on timber mono-pitch trusses, which costs less than tiles on a hipped roof.',
    'Placed a bedroom suite on the ground floor so my parents can live on one level.',
    'Fitted a double garage and about 216 m² of floor area on the narrow stand.',
    'Designed the structure to SANS 10160 loads and SANS 10100 concrete: 190 mm slab, beams B1–B4, column C1 and footings at 100 kPa bearing.',
    'Designed a steel-stringer staircase with timber treads to SANS 10400-M.'
  ]
},

erf2433: {
  problem: 'The client wanted 32 student units on an irregular 763.90 m² stand, meeting the H2 boarding-house requirements and the SANS 10400-XA energy limits.',
  scope: 'Council submission drawings for BlueLid Architects: site plan, floor plans, elevations, sections, roof plan, services layouts and Part XA calculations.',
  solved: [
    'Drew a long two-storey block angled to follow the stand boundary, fitting 32 self-contained units on two floors.',
    'Gave the units access from open walkways on steel columns, with a stair at each end.',
    'Showed a laundry room and an electrical control room, and a light 5° mono-pitch metal roof.',
    'Showed compliance: annual energy 9.10 kWh/m² against 12.50 allowed, and glazing below 15% of net floor area.'
  ]
},

capitalpark: {
  problem: 'The client wanted to turn a corner property into student accommodation for 43 occupants, keeping the existing swimming pool.',
  scope: 'Council submission drawings for Eidetic Designs: site plan, ground and first floor plans, four elevations, section, roof plan, services and details.',
  solved: [
    'Drew two-storey additions with bedrooms and study rooms off double-loaded corridors, shared bathrooms, a kitchen and dining room, and an entertainment room, arranged around the existing pool.',
    'Showed a separate caretaker flat for on-site management.',
    'Drew a hipped 26° concrete-tile roof on timber trusses.',
    'Showed compliance: annual energy 9.09 kWh/m² against 12.50 allowed, and glazing below 15% of net floor area.'
  ]
},

chantelle: {
  problem: 'The family needed more space: a master suite, a bigger lounge and kitchen, a larger garage and a separate study, while staying within the coverage limits of an 800 m² stand.',
  scope: 'Council submission drawings for Eidetic Designs: alterations and additions to the house and a new detached outbuilding.',
  solved: [
    'Drew a new master bedroom with en-suite and dressing room, the extended lounge and kitchen, an extended double garage and covered porches.',
    'Drew a detached outbuilding with a study, bathroom and store room.',
    'Kept the total at 238.20 m², which is 30% coverage and a FAR of 0.45.',
    'Showed compliance: annual energy 4.29 kWh/m² against 5.00 allowed, and lighting load 426 W against 912 W allowed.'
  ]
},

doornpoort: {
  problem: 'The client wanted a new double-storey family home on a 526 m² subdivided portion, within the building lines (3 m for double storey, 2 m for single storey).',
  scope: 'Council submission drawings for Eidetic Designs: site plan, floor plans, four elevations, section, roof plan, staircase and services.',
  solved: [
    'Drew equal 129.32 m² floors stacked over each other to keep the footprint within the building lines.',
    'Put the double garage, office/study, guest bedroom and open lounge and dining on the ground floor, around a double-volume stair.',
    'Put the master suite with walk-in closet, a second bedroom, a pyjama lounge and balconies on the first floor.',
    'Showed compliance: coverage 178.71 m², FAR 0.61, and annual energy 3.56 kWh/m² against 5.00 allowed.'
  ]
},

secunda: {
  problem: 'The owners wanted a garage and extra living space behind their existing 275 m² house, within the 532 m² coverage limit in a cold climatic zone (zone 1).',
  scope: 'Council submission drawings for Eidetic Designs: a new two-storey outbuilding, including a full roof-truss construction sheet.',
  solved: [
    'Stacked the garage, kitchen and lounge under two bedrooms and a bathroom to save footprint (148.92 m² outbuilding).',
    'Put the straight-flight stair in a glazed stair tower.',
    'Kept total coverage at 424.10 m² against 532.00 m² allowed.',
    'Showed compliance: annual energy 4.52 kWh/m² against 5.00 allowed, and lighting load 370 W against 745 W allowed. Drew the truss construction sheet.'
  ]
}

};
