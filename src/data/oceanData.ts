import { ASSETS } from './assets';

export interface OceanZone {
  id: string;
  name: string;
  scientificName: string;
  depthRange: string;
  minDepth: number;
  maxDepth: number;
  temperature: string;
  pressure: string;
  lightLevel: string;
  colorHex: string;
  bgGradient: string;
  description: string;
  characteristics: string[];
  keySpecies: string[];
  explorationStory: string;
}

export interface MarineCreature {
  id: string;
  name: string;
  scientificName: string;
  category: 'Mammals' | 'Fish' | 'Reptiles' | 'Invertebrates' | 'Deep-Sea';
  zone: string;
  depth: string;
  size: string;
  habitat: string;
  diet: string;
  lifespan: string;
  status: 'Least Concern' | 'Vulnerable' | 'Endangered' | 'Critically Endangered' | 'Data Deficient';
  facts: string[];
  description: string;
  image: string;
  bioluminescent?: boolean;
  glowColor?: string;
  soundType?: 'whale' | 'sonar' | 'bubble';
}

export interface Submersible {
  name: string;
  operator: string;
  depthRecord: string;
  maxDepth: number;
  crewCapacity: number;
  yearBuilt: number;
  description: string;
  features: string[];
  notableMissions: string[];
}

export interface ConservationTopic {
  id: string;
  title: string;
  subtitle: string;
  stat: string;
  statLabel: string;
  impact: string;
  solutions: string[];
  actionTips: string[];
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'Giants' | 'Bioluminescence' | 'Coral Reefs' | 'Deep Abyss' | 'Expeditions';
  depth: string;
  location: string;
  photographer: string;
  image: string;
  description: string;
}

export const OCEAN_ZONES: OceanZone[] = [
  {
    id: 'sunlight',
    name: 'Sunlight Zone',
    scientificName: 'Epipelagic Zone',
    depthRange: '0 – 200 m (0 – 656 ft)',
    minDepth: 0,
    maxDepth: 200,
    temperature: '20°C to 28°C (68°F to 82°F)',
    pressure: '1 to 20 atm',
    lightLevel: 'Full sunlight penetration; 90% of all marine life thrives here.',
    colorHex: '#00E5FF',
    bgGradient: 'from-[#033B6A] via-[#054E82] to-[#042848]',
    description: 'The sunlit surface layer where sunlight drives photosynthesis. Vast phytoplankton blooms create over 50% of Earth’s atmospheric oxygen. Home to bustling coral reefs, sea turtles, dolphins, and schools of tuna.',
    characteristics: [
      'Photosynthesis occurs continuously during daylight',
      'Contains 90% of all known ocean biodiversity',
      'Warmest ocean zone with strong thermal mixing',
      'Dynamic wave action and surface wind currents'
    ],
    keySpecies: ['Blue Whale', 'Green Sea Turtle', 'Bottlenose Dolphin', 'Manta Ray', 'Great White Shark'],
    explorationStory: 'Historically navigated by sailing ships; now monitored globally by satellite altimetry, Argo sensor floats, and scuba scientists studying coral bleaching.'
  },
  {
    id: 'twilight',
    name: 'Twilight Zone',
    scientificName: 'Mesopelagic Zone',
    depthRange: '200 – 1,000 m (656 – 3,280 ft)',
    minDepth: 200,
    maxDepth: 1000,
    temperature: '4°C to 12°C (39°F to 54°F)',
    pressure: '20 to 100 atm',
    lightLevel: 'Faint blue twilight; insufficient for photosynthesis.',
    colorHex: '#00A3FF',
    bgGradient: 'from-[#032345] via-[#021832] to-[#021226]',
    description: 'A shadowy, eerie realm where sunlight dims to a faint blue glow before vanishing completely. Here organisms rely on counter-illumination bioluminescence to camouflage against dim downwelling sunlight.',
    characteristics: [
      'Site of Earth’s largest daily animal migration (DVM)',
      'First zone where bioluminescence becomes predominant',
      'Rapidly falling temperature known as the permanent thermocline',
      'Fish develop disproportionately large upward-pointing eyes'
    ],
    keySpecies: ['Lanternfish', 'Sperm Whale', 'Barreleye Fish', 'Oarfish', 'Hatchetfish'],
    explorationStory: 'Sonar operators during WWII first discovered the "Deep Scattering Layer" — a dense false seafloor that rose every night, later revealed to be billions of lanternfish migrating to feed.'
  },
  {
    id: 'midnight',
    name: 'Midnight Zone',
    scientificName: 'Bathypelagic Zone',
    depthRange: '1,000 – 4,000 m (3,280 – 13,123 ft)',
    minDepth: 1000,
    maxDepth: 4000,
    temperature: 'Constant 4°C (39°F)',
    pressure: '100 to 400 atm',
    lightLevel: 'Total pitch darkness; only light is biological photophores.',
    colorHex: '#865DFF',
    bgGradient: 'from-[#021124] via-[#020A17] to-[#01060F]',
    description: 'Pitch-black cold water stretching over two miles deep. Sunlight never touches this world. The only illuminations are sparkling blue and green flashes produced by bioluminescent hunters and jellies.',
    characteristics: [
      'Zero ambient solar light; 100% biological luminescence',
      'Creatures have slow metabolic rates to conserve scarce calories',
      'Elastic expandable stomachs capable of swallowing prey twice their size',
      'Soft, gelatinous bodies to resist crushing hydrostatic pressure'
    ],
    keySpecies: ['Deep-Sea Anglerfish', 'Vampire Squid', 'Gulper Eel', 'Giant Isopod', 'Bioluminescent Jellyfish'],
    explorationStory: 'William Beebe and Otis Barton in 1934 became the first humans to glimpse the Midnight Zone through the quartz windows of their tethered steel sphere, the Bathysphere.'
  },
  {
    id: 'abyssal',
    name: 'Abyssal Zone',
    scientificName: 'Abyssopelagic Zone',
    depthRange: '4,000 – 6,000 m (13,123 – 19,685 ft)',
    minDepth: 4000,
    maxDepth: 6000,
    temperature: 'Near freezing: 0°C to 2°C (32°F to 35°F)',
    pressure: '400 to 600 atm (up to 8,800 psi)',
    lightLevel: 'Complete void; light from surface never exists.',
    colorHex: '#28F0D4',
    bgGradient: 'from-[#020817] via-[#01050F] to-[#000308]',
    description: 'Covers over 60% of the entire Earth’s solid surface. Vast plains of abyssal sediment, colossal underwater mountain ranges, and hydrothermal vents spewing mineral-rich superheated water at 400°C.',
    characteristics: [
      'Covers more surface area of the globe than all continents combined',
      'Chemosynthesis occurs at hydrothermal chimneys without solar energy',
      'High concentrations of polymetallic nodules rich in nickel and cobalt',
      'Sparsely populated with extraordinarily specialized bottom-dwellers'
    ],
    keySpecies: ['Dumbo Octopus', 'Tripod Fish', 'Giant Tube Worms', 'Deep-Sea Ghost Shark', 'Sea Pig'],
    explorationStory: 'In 1977, DSV Alvin discovered lush ecosystems around hydrothermal vents along the Galápagos Rift, revolutionizing biology by proving life can thrive without the sun.'
  },
  {
    id: 'hadal',
    name: 'Hadal Zone',
    scientificName: 'Hadalpelagic Zone (Trenches)',
    depthRange: '6,000 – 11,034 m (19,685 – 36,201 ft)',
    minDepth: 6000,
    maxDepth: 11034,
    temperature: '1°C to 4°C (34°F to 39°F)',
    pressure: '600 to 1,100 atm (equal to an elephant on a postage stamp)',
    lightLevel: 'Total obsidian abyss; absolute isolation.',
    colorHex: '#00E5FF',
    bgGradient: 'from-[#01040A] via-[#000205] to-[#000103]',
    description: 'Named after Hades, ruler of the underworld. The Hadal Zone comprises isolated V-shaped tectonic trenches where oceanic plates plunge beneath continental crust, reaching Challenger Deep at 10,928 meters.',
    characteristics: [
      'Maximum recorded ocean depth on Earth is Challenger Deep (~10,928 m)',
      'Hydrostatic pressure exceeds 1,100 atmospheres (16,000 psi)',
      'Organisms utilize piezolytes (cellular pressure-protecting molecules)',
      'More people have walked on the Moon than have visited the bottom of the Mariana Trench'
    ],
    keySpecies: ['Mariana Snailfish', 'Supergiant Amphipod (Alicella gigantea)', 'Deep-Sea Xenophyophore', 'Hirondellea gigas'],
    explorationStory: 'On January 23, 1960, Jacques Piccard and Don Walsh descended to 10,916 meters in the bathyscaphe Trieste. In 2012, filmmaker James Cameron made the first solo dive in Deepsea Challenger.'
  }
];

export const ALL_CREATURES: MarineCreature[] = [
  {
    id: 'blue-whale',
    name: 'Blue Whale',
    scientificName: 'Balaenoptera musculus',
    category: 'Mammals',
    zone: 'Sunlight Zone',
    depth: '0 – 350 m',
    size: 'Up to 30 m (100 ft), 190 metric tons',
    habitat: 'Open oceans worldwide, polar feeding waters',
    diet: 'Krill (up to 4 tons per day)',
    lifespan: '80 – 90 years',
    status: 'Endangered',
    facts: [
      'The largest animal known ever to have lived on Earth, larger than any dinosaur.',
      'Its heart is roughly the size of a small automobile and weighs over 400 pounds.',
      'Low-frequency vocalizations can travel across thousands of kilometers under water.'
    ],
    description: 'The blue whale is a gentle colossus whose slender, streamlined body glides through polar and temperate seas. Despite their staggering bulk, they feed almost exclusively on tiny euphausiids (krill) filtered through baleen plates.',
    image: ASSETS.heroWhale,
    soundType: 'whale'
  },
  {
    id: 'anglerfish',
    name: 'Deep-Sea Anglerfish',
    scientificName: 'Melanocetus johnsonii',
    category: 'Deep-Sea',
    zone: 'Midnight & Abyssal Zones',
    depth: '1,000 – 4,500 m',
    size: 'Females up to 20 cm, males tiny (3 cm)',
    habitat: 'Global bathypelagic ocean waters',
    diet: 'Lanternfish, crustaceans, squid',
    lifespan: 'Estimated 20 – 30 years',
    status: 'Least Concern',
    bioluminescent: true,
    glowColor: '#00E5FF',
    facts: [
      'Possesses a modified dorsal spine (illicium) tipped with a glowing lure (esca) colonized by symbiotic bioluminescent bacteria.',
      'Huge upward-angled jaws and translucent dagger teeth can trap prey up to double its body size.',
      'Males fuse permanently to females via sexual parasitism, merging circulatory systems.'
    ],
    description: 'An iconic inhabitant of the perpetual abyss, the humpback anglerfish uses an ethereal glowing rod extending from its forehead to attract curious prey in total darkness before snapping shut its cavernous jaws.',
    image: ASSETS.deepAnglerfish,
    soundType: 'bubble'
  },
  {
    id: 'sea-turtle',
    name: 'Green Sea Turtle',
    scientificName: 'Chelonia mydas',
    category: 'Reptiles',
    zone: 'Sunlight Zone',
    depth: '0 – 110 m',
    size: '1.5 m (5 ft), up to 160 kg',
    habitat: 'Tropical and subtropical coral reefs & seagrass beds',
    diet: 'Seagrasses and marine algae (adults are predominantly herbivorous)',
    lifespan: '70+ years',
    status: 'Endangered',
    facts: [
      'Navigate thousands of miles across open ocean using Earth’s magnetic field lines.',
      'Can hold their breath for up to 5 hours while resting under coral ledges.',
      'Crucial for marine ecosystems as they graze seagrass beds, keeping them healthy.'
    ],
    description: 'Graceful navigators of sunlit coastal waters, green sea turtles glide through warm ocean currents with paddle-like flippers, grazing on seagrass and laying eggs on ancestral nesting beaches.',
    image: ASSETS.oceanCoralReef,
    soundType: 'bubble'
  },
  {
    id: 'biolum-jellyfish',
    name: 'Atolla Jellyfish',
    scientificName: 'Atolla wyvillei',
    category: 'Invertebrates',
    zone: 'Midnight Zone',
    depth: '1,000 – 4,000 m',
    size: '15 – 20 cm bell diameter',
    habitat: 'Deep oceans globally',
    diet: 'Small crustaceans, marine snow, larval fishes',
    lifespan: '1 – 3 years',
    status: 'Least Concern',
    bioluminescent: true,
    glowColor: '#865DFF',
    facts: [
      'Known as the "burglar alarm jellyfish" because it flashes brilliant blue light circles when attacked to attract larger predators to eat its attacker.',
      'Possesses a single hypertrophied trailing tentacle much longer than the others used to snatch prey.',
      'Deep crimson color makes it virtually invisible in twilight depths where red wavelengths do not penetrate.'
    ],
    description: 'A crown-shaped deep-sea scyphozoan with a brilliant scarlet interior. When touched by a predator, it unleashes hypnotic concentric waves of neon blue light across its bell.',
    image: ASSETS.biolumJellyfish,
    soundType: 'bubble'
  },
  {
    id: 'vampire-squid',
    name: 'Vampire Squid',
    scientificName: 'Vampyroteuthis infernalis',
    category: 'Deep-Sea',
    zone: 'Midnight Zone',
    depth: '600 – 1,200 m',
    size: 'Up to 30 cm (12 in)',
    habitat: 'Oxygen minimum zones of temperate & tropical oceans',
    diet: 'Marine snow, organic detritus, plankton feces',
    lifespan: 'Up to 8 years',
    status: 'Least Concern',
    bioluminescent: true,
    glowColor: '#28F0D4',
    facts: [
      'Scientific name translates directly to "Vampire squid from Hell".',
      'Neither a true squid nor an octopus, but the sole surviving member of the order Vampyromorphida.',
      'Can invert its webbed mantle like an umbrella into a spiky defensive "pineapple" posture covered in fleshy cirri.'
    ],
    description: 'Despite its terrifying moniker, the vampire squid is a peaceful detritivore floating serenely in low-oxygen waters. Its red-brown cloak is webbed between eight arms and studded with light-emitting photophores.',
    image: ASSETS.deepAnglerfish,
    soundType: 'sonar'
  },
  {
    id: 'giant-squid',
    name: 'Giant Squid',
    scientificName: 'Architeuthis dux',
    category: 'Deep-Sea',
    zone: 'Twilight & Midnight Zones',
    depth: '300 – 1,000 m',
    size: 'Up to 13 m (43 ft) for females',
    habitat: 'Worldwide continental shelf slopes',
    diet: 'Deep sea fishes, smaller squids',
    lifespan: 'Estimated 5 years',
    status: 'Least Concern',
    facts: [
      'Possesses the largest eyes in the entire animal kingdom — measuring up to 30 cm across (dinner plate size).',
      'Armed with two long feeding tentacles covered in hundreds of serrated chitinous suction rings.',
      'Was long considered mythical as the kraken until modern scientific documentation in 2004 and 2012.'
    ],
    description: 'The legendary leviathan of the deep ocean. Equipped with enormous plate-sized eyes to detect bioluminescent ripples from approaching sperm whales, it hunts with razor-sharp suckers in cold gloom.',
    image: ASSETS.deepAnglerfish,
    soundType: 'sonar'
  },
  {
    id: 'manta-ray',
    name: 'Giant Oceanic Manta Ray',
    scientificName: 'Mobula birostris',
    category: 'Fish',
    zone: 'Sunlight Zone',
    depth: '0 – 500 m',
    size: 'Wingspan up to 7 m (23 ft), 2,000 kg',
    habitat: 'Tropical and subtropical pelagic zones',
    diet: 'Zooplankton, fish larvae',
    lifespan: '40 – 50 years',
    status: 'Endangered',
    facts: [
      'Possesses the largest brain-to-body mass ratio of any cold-blooded fish.',
      'Show remarkable self-awareness and passed mirror self-recognition experiments.',
      'Cephalic horn fins unfurl to funnel plankton-rich seawater directly into their mouths.'
    ],
    description: 'Gliding through tropical seas like an underwater bird of prey, the giant manta ray is an intelligent, inquisitive gentle filter feeder known for performing acrobatic barrel rolls through clouds of plankton.',
    image: ASSETS.oceanCoralReef,
    soundType: 'bubble'
  },
  {
    id: 'dumbo-octopus',
    name: 'Dumbo Octopus',
    scientificName: 'Grimpoteuthis',
    category: 'Deep-Sea',
    zone: 'Abyssal Zone',
    depth: '3,000 – 7,000 m',
    size: '20 – 30 cm (record 1.8 m)',
    habitat: 'Deep abyssal ocean floors globally',
    diet: 'Bristle worms, isopods, amphipods',
    lifespan: '3 – 5 years',
    status: 'Data Deficient',
    bioluminescent: false,
    facts: [
      'Flaps prominent ear-like fins on top of its mantle resembling Disney’s Dumbo elephant.',
      'Deepest living octopuses known, observed foraging above 7,000 meters in the Java Trench.',
      'Swallows small prey whole without chewing because it lacks a radula rasping tongue.'
    ],
    description: 'An endearing abyssal cephalopod that hovers just above muddy sea beds by beating its rounded ear-like fins. Its jelly-like webbed arms can envelop worms and crustaceans in total calm.',
    image: ASSETS.biolumJellyfish,
    soundType: 'bubble'
  },
  {
    id: 'bottlenose-dolphin',
    name: 'Common Bottlenose Dolphin',
    scientificName: 'Tursiops truncatus',
    category: 'Mammals',
    zone: 'Sunlight Zone',
    depth: '0 – 250 m',
    size: '2.5 – 4 m (8 – 13 ft), 300 kg',
    habitat: 'Warm and temperate coastal and pelagic waters',
    diet: 'Fish, squid, crustaceans',
    lifespan: '40 – 60 years',
    status: 'Least Concern',
    facts: [
      'Possesses highly sophisticated biosonar (echolocation) clicking hundreds of times per second.',
      'Each individual develops a unique "signature whistle" functioning like a human name.',
      'Sleeps with one half of its brain at a time (unihemispheric slow-wave sleep) to stay alert for breathing.'
    ],
    description: 'Acrobatic and deeply social cetaceans that communicate through complex clicks and whistles. Bottlenose dolphins cooperate in pods to herd schools of fish and surf bow waves produced by ships.',
    image: ASSETS.oceanCoralReef,
    soundType: 'whale'
  },
  {
    id: 'great-white-shark',
    name: 'Great White Shark',
    scientificName: 'Carcharodon carcharias',
    category: 'Fish',
    zone: 'Sunlight & Twilight Zones',
    depth: '0 – 1,200 m',
    size: '4.5 – 6 m (15 – 20 ft), up to 2,200 kg',
    habitat: 'Coastal and offshore temperate waters worldwide',
    diet: 'Marine mammals, seals, sea lions, large fish',
    lifespan: '70+ years',
    status: 'Vulnerable',
    facts: [
      'Detects microvolt electric impulses from muscle twitches via Ampullae of Lorenzini electroreceptors.',
      'Can accelerate in explosive vertical breaches reaching speeds over 40 km/h (25 mph).',
      'Migrates across entire ocean basins, including regular deep dives into the twilight zone.'
    ],
    description: 'The ocean’s supreme apex predator. Great whites possess torpedo-shaped hydrodynamic bodies, counter-shaded slate-gray coloration, and serrated triangular teeth evolved for hunting seals with lethal precision.',
    image: ASSETS.oceanCoralReef,
    soundType: 'sonar'
  },
  {
    id: 'gulper-eel',
    name: 'Gulper Eel (Pelican Eel)',
    scientificName: 'Eurypharynx pelecanoides',
    category: 'Deep-Sea',
    zone: 'Midnight & Abyssal Zones',
    depth: '500 – 3,000 m',
    size: '0.75 – 1 m length',
    habitat: 'Deep tropical and temperate seas',
    diet: 'Crustaceans, fish, cephalopods',
    lifespan: 'Unknown',
    status: 'Least Concern',
    bioluminescent: true,
    glowColor: '#00E5FF',
    facts: [
      'Its massive loosely hinged jaw can unhinge to engulf organisms far larger than itself.',
      'The long whip-like tail ends in a glowing pink organ with red flashes used as a fishing lure.',
      'Tiny eyes and degenerated fins adapt it for hovering with minimal energy expenditure in deep water.'
    ],
    description: 'A bizarre deep-water marvel with a mouth reminiscent of a pelican’s pouch. Its ultra-elastic pouch can balloon outward to scoop up sparse prey encountered in the bathypelagic desert.',
    image: ASSETS.deepAnglerfish,
    soundType: 'sonar'
  },
  {
    id: 'barreleye-fish',
    name: 'Barreleye Fish',
    scientificName: 'Macropinna microstoma',
    category: 'Fish',
    zone: 'Twilight Zone',
    depth: '600 – 800 m',
    size: '15 cm (6 in)',
    habitat: 'Subarctic and temperate North Pacific',
    diet: 'Siphonophores, small crustaceans, hydrozoans',
    lifespan: 'Estimated 10 – 15 years',
    status: 'Data Deficient',
    bioluminescent: false,
    facts: [
      'Has a transparent fluid-filled dome on its head through which its emerald-green tubular eyes rotate.',
      'The two front circles that resemble eyes are actually nares (olfactory smell organs).',
      'Can steal siphonophore prey without being stung thanks to its protective shield dome.'
    ],
    description: 'One of nature’s most extraordinary evolutionary designs: a deep-water fish with a crystal-clear dome crowning its head, allowing glowing green tubular eyes to look straight up or roll forward to target prey.',
    image: ASSETS.biolumJellyfish,
    soundType: 'bubble'
  }
];

export const SUBMERSIBLES: Submersible[] = [
  {
    name: 'DSV Alvin',
    operator: 'Woods Hole Oceanographic Institution (WHOI) / US Navy',
    depthRecord: '6,500 m (21,325 ft)',
    maxDepth: 6500,
    crewCapacity: 3,
    yearBuilt: 1964,
    description: 'The world’s most legendary human-occupied submersible. Alvin has completed over 5,000 dives, discovering hydrothermal vents in 1977 and exploring the wreck of RMS Titanic in 1986.',
    features: ['Titanium personnel sphere', 'Dual robotic manipulators', 'High-definition 4K optical cameras', 'Acoustic Doppler Current Profiler (ADCP)'],
    notableMissions: ['Discovery of Hydrothermal Vents (1977)', 'RMS Titanic Survey (1986)', 'Deepwater Horizon Impact Assessment (2010)']
  },
  {
    name: 'Trieste (Bathyscaphe)',
    operator: 'US Navy / Auguste Piccard',
    depthRecord: '10,916 m (35,814 ft)',
    maxDepth: 10916,
    crewCapacity: 2,
    yearBuilt: 1953,
    description: 'A revolutionary Swiss-designed Italian-built deep-diving research bathyscaphe. On January 23, 1960, Jacques Piccard and Don Walsh piloted Trieste to the absolute floor of Challenger Deep in the Mariana Trench.',
    features: ['Forged Krupp steel sphere with 12.7 cm thick walls', 'Gasoline buoyancy float tanks', 'Iron shot ballast dropped by electromagnets', 'Plexiglas cone viewport'],
    notableMissions: ['Project Nekton: First human dive to Challenger Deep (1960)', 'Search for USS Thresher submarine (1963)']
  },
  {
    name: 'Deepsea Challenger',
    operator: 'National Geographic / James Cameron',
    depthRecord: '10,908 m (35,787 ft)',
    maxDepth: 11000,
    crewCapacity: 1,
    yearBuilt: 2012,
    description: 'A vertical pencil-shaped submersible designed by filmmaker and explorer James Cameron. Crafted from custom Isofloat structural foam, it made the first solo descent to the bottom of the Mariana Trench.',
    features: ['Vertical orientation for rapid descent/ascent', 'Custom syntactic foam structural hull', 'High-intensity LED light towers', 'Stereoscopic 3D deep cameras'],
    notableMissions: ['Solo descent into the Challenger Deep (2012)', 'Sample collection of giant amphipods & microbial mats']
  },
  {
    name: 'ROV SuBastian',
    operator: 'Schmidt Ocean Institute (R/V Falkor (too))',
    depthRecord: '4,500 m (14,764 ft)',
    maxDepth: 4500,
    crewCapacity: 0,
    yearBuilt: 2016,
    description: 'A 4,500m-rated remotely operated vehicle (ROV) transmitting real-time 4K video streams directly to global scientists and public audiences, revealing hundreds of undiscovered marine species.',
    features: ['4K ultra-high-definition broadcast camera', 'Suction samplers and bio-boxes', 'Real-time telemetry tether', 'Laser scale projection for size measurements'],
    notableMissions: ['Mapping Great Barrier Reef detached coral towers', 'Discovery of 100+ new species along the Nazca Ridge (2024)']
  }
];

export const CONSERVATION_TOPICS: ConservationTopic[] = [
  {
    id: 'plastic-pollution',
    title: 'Plastic Inundation & Microplastics',
    subtitle: 'From Surface Gyres to Hadal Trench Sediment',
    stat: '11M+ Metric Tons',
    statLabel: 'Enters oceans annually',
    impact: 'Synthetic plastics do not biodegrade; they fragment into microscopic particles consumed by plankton, bioaccumulating up the food chain to apex predators and humans. Single-use plastic bags have been photographed even at the floor of the Mariana Trench.',
    solutions: [
      'Global legally binding treaty capping virgin plastic production',
      'Transition to circular biodegradable marine-safe polymers',
      'Advanced river interception barriers to trap waste before entering oceans',
      'Extended Producer Responsibility (EPR) legislation'
    ],
    actionTips: [
      'Eliminate single-use plastic bottles and grocery sacks',
      'Support container deposit schemes and local zero-waste stores',
      'Participate in community watershed and shoreline cleanups'
    ]
  },
  {
    id: 'coral-bleaching',
    title: 'Coral Bleaching & Acidification',
    subtitle: 'Thermal Marine Heatwaves Threatening Reef Foundations',
    stat: '50% Lost',
    statLabel: 'Living coral cover since 1950',
    impact: 'Corals exist in a fragile symbiosis with photosynthetic zooxanthellae algae. When water temperatures rise even 1°C above summer thresholds for extended periods, corals expel algae, turning skeletal white and starving. Absorbed atmospheric CO2 also lowers ocean pH, hindering calcification.',
    solutions: [
      'Rapid decarbonization to limit global warming below 1.5°C',
      'Micro-fragmentation nursery propagation of heat-resilient corals',
      'Marine Protected Areas (MPAs) eliminating localized runoff stress',
      'Artificial solar radiation management and shade canopies over priority reefs'
    ],
    actionTips: [
      'Choose reef-friendly non-nano zinc oxide sunscreens',
      'Reduce personal carbon emissions through renewable energy choices',
      'Support coral reef restoration and community marine sanctuaries'
    ]
  },
  {
    id: 'overfishing',
    title: 'Industrial Overfishing & Bycatch',
    subtitle: 'Depleting Pelagic Stocks and Deep-Sea Bottom Trawling',
    stat: '35% Overexploited',
    statLabel: 'Of monitored marine fish stocks',
    impact: 'Massive bottom-trawling nets drag weighted steel doors across ancient seamounts, obliterating centuries-old cold-water coral forests in seconds. Bycatch claims hundreds of thousands of turtles, dolphins, and seabirds each season.',
    solutions: [
      'Expansion of strictly enforced "No-Take" Marine Reserves to 30% by 2030 (30x30)',
      'Satellite tracking (AIS) enforcement against illegal, unreported, and unregulated (IUU) fishing',
      'Mandatory turtle excluder devices (TEDs) and circular hooks on longlines',
      'Eliminating government subsidies fueling destructive high-seas industrial fleets'
    ],
    actionTips: [
      'Consult sustainable seafood guides (e.g. Seafood Watch)',
      'Avoid deep-sea species with slow maturity cycles (Orange Roughy, Chilean Seabass)',
      'Demand seafood origin transparency from restaurants and supermarkets'
    ]
  }
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'gal-1',
    title: 'Giant Oceanic Whale Dive',
    category: 'Giants',
    depth: '120 m',
    location: 'Azores Archipelago, North Atlantic',
    photographer: 'Deep Blue Expedition Team',
    image: ASSETS.heroWhale,
    description: 'A blue whale plunges toward the twilight boundary as shafts of sunbeam caustics illuminate a surrounding cyclone of silver baitfish.'
  },
  {
    id: 'gal-2',
    title: 'Abyssal Anglerfish in Complete Void',
    category: 'Bioluminescence',
    depth: '2,200 m',
    location: 'Monterey Canyon, Eastern Pacific',
    photographer: 'Submersible Alvin Macro Cam',
    image: ASSETS.deepAnglerfish,
    description: 'The bioluminescent esca glows radiant cyan against obsidian waters, its translucent dagger teeth glinting in the dark.'
  },
  {
    id: 'gal-3',
    title: 'Pristine Brain Coral Sanctuary',
    category: 'Coral Reefs',
    depth: '14 m',
    location: 'Raja Ampat, Coral Triangle',
    photographer: 'Marine Conservation Archive',
    image: ASSETS.oceanCoralReef,
    description: 'A green sea turtle banks gently over an ancient brain coral dome alive with damselfish and pulsing sea anemones.'
  },
  {
    id: 'gal-4',
    title: 'Submersible at Hydrothermal Chimney',
    category: 'Expeditions',
    depth: '3,800 m',
    location: 'Mid-Atlantic Ridge',
    photographer: 'WHOI Expedition 2024',
    image: ASSETS.submarineExpedition,
    description: 'A research submarine activates high-intensity LED light towers to illuminate a billowing mineral black smoker chimney.'
  },
  {
    id: 'gal-5',
    title: 'Bioluminescent Crown Jellyfish Pulsing',
    category: 'Bioluminescence',
    depth: '1,450 m',
    location: 'Gakkel Ridge, Arctic Ocean',
    photographer: 'Polar Deep Explorers',
    image: ASSETS.biolumJellyfish,
    description: 'Concentric bioluminescent waves of cyan and violet energy radiate through the bell of a deep-sea jellyfish.'
  },
  {
    id: 'gal-6',
    title: 'Deep Sea Hydrothermal Vent Oasis',
    category: 'Deep Abyss',
    depth: '2,600 m',
    location: 'Galápagos Rift, Pacific',
    photographer: 'Submersible Alvin Mission Archive',
    image: ASSETS.submarineExpedition,
    description: 'Thriving colonies of giant red-plumed tube worms and vent crabs that survive via chemosynthesis without a ray of sunlight.'
  }
];

export const EXPLORATION_TIMELINE = [
  {
    year: '1872 – 1876',
    title: 'HMS Challenger Expedition',
    description: 'The voyage that founded modern oceanography. Sailed 68,890 nautical miles, recorded 4,700 new species, and identified the Mariana Trench.'
  },
  {
    year: '1934',
    title: 'Beebe & Barton Bathysphere',
    description: 'Naturalist William Beebe and engineer Otis Barton descended to 923 meters off Bermuda, witnessing live deep-sea bioluminescence for the first time.'
  },
  {
    year: '1960',
    title: 'Trieste Conquers Challenger Deep',
    description: 'Jacques Piccard and Don Walsh reached 10,916 meters at the deepest point on Earth inside the US Navy bathyscaphe Trieste.'
  },
  {
    year: '1977',
    title: 'Hydrothermal Vents Discovery',
    description: 'Scientists in DSV Alvin discovered hydrothermal "black smokers" along the Galápagos Rift, overturning beliefs that all life relies on solar photosynthesis.'
  },
  {
    year: '2012',
    title: 'James Cameron Solo Deepsea Dive',
    description: 'Filmmaker James Cameron completed the first solo manned dive to 10,908 meters in Deepsea Challenger, capturing 3D deep footage and scientific samples.'
  },
  {
    year: '2020 – Present',
    title: 'Global Seafloor 2030 & Autonomous Swarms',
    description: 'International consortium GEBCO and autonomous robotic gliders mapping 100% of the world ocean floor with high-resolution multi-beam bathymetry.'
  }
];
