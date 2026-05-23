export const MAJORS = {
  computer_science: {
    id: "computer_science",
    name: "Computer Science",
    icon: "💻",
    color: "#378ADD",
    description: "Study algorithms, AI, data structures, and software engineering.",
    teachers: [
      { id: "prof_cruz", name: "Prof. Cruz", color: "#185FA5", specialty: "Algorithms" },
      { id: "prof_santos", name: "Prof. Santos", color: "#534AB7", specialty: "AI & Machine Learning" },
      { id: "prof_reyes_cs", name: "Prof. Reyes", color: "#3B6D11", specialty: "Software Engineering" },
    ],
    subjects: [
      {
        id: "algorithms", name: "Data Structures & Algorithms", icon: "🔗", teacher: "prof_cruz",
        lessons: [
          { id: "algo1", title: "Big O Notation & Complexity Analysis", concept: "O(n log n) vs O(n^2) — why sorting algorithms matter in real-world applications." },
          { id: "algo2", title: "Linked Lists & Dynamic Arrays", concept: "Array vs linked list: memory allocation tradeoffs and cache locality." },
          { id: "algo3", title: "Binary Search Trees & Balancing", concept: "AVL trees maintain O(log n) height through rotations after every insertion." },
          { id: "algo4", title: "Graph Traversal: BFS & DFS", concept: "BFS finds shortest paths in unweighted graphs; DFS explores deep hierarchies." },
          { id: "algo5", title: "Dynamic Programming Principles", concept: "Memoization vs tabulation — solving Fibonacci in O(n) instead of O(2^n)." },
          { id: "algo6", title: "Hash Tables & Collision Resolution", concept: "Separate chaining vs open addressing: load factors and performance." },
          { id: "algo7", title: "Sorting Algorithms Deep Dive", concept: "Quicksort pivot selection, merge sort divide-and-conquer, heap sort." },
          { id: "algo8", title: "String Matching Algorithms", concept: "KMP algorithm: O(n+m) pattern matching using prefix functions." },
        ],
      },
      {
        id: "ai_ml", name: "AI & Machine Learning", icon: "🤖", teacher: "prof_santos",
        lessons: [
          { id: "ai1", title: "Linear Regression Fundamentals", concept: "y = mx + b — minimizing mean squared error through gradient descent." },
          { id: "ai2", title: "Neural Networks & Perceptrons", concept: "A single perceptron learns linear decision boundaries; multiple layers learn complex functions." },
          { id: "ai3", title: "Backpropagation Explained", concept: "Chain rule of calculus applied through the network to update weights." },
          { id: "ai4", title: "Convolutional Neural Networks", concept: "Kernels slide over input detecting edges, textures, and higher-level features." },
          { id: "ai5", title: "Natural Language Processing", concept: "Tokenization, embeddings, and transformer architectures like BERT and GPT." },
          { id: "ai6", title: "Reinforcement Learning", concept: "Agent learns through rewards: Q-learning and policy gradients." },
          { id: "ai7", title: "Decision Trees & Random Forests", concept: "Ensemble methods reduce overfitting by averaging multiple weak learners." },
          { id: "ai8", title: "Unsupervised Learning: Clustering", concept: "K-means and DBSCAN group data without labels using distance metrics." },
        ],
      },
      {
        id: "software_eng", name: "Software Engineering", icon: "⚙️", teacher: "prof_reyes_cs",
        lessons: [
          { id: "se1", title: "Agile Methodology & Scrum", concept: "Sprints, standups, and retrospectives — delivering value iteratively." },
          { id: "se2", title: "Design Patterns: Singleton & Factory", concept: "Creational patterns solve object creation problems without tight coupling." },
          { id: "se3", title: "Test-Driven Development", concept: "Red-green-refactor: write failing tests first, then implement." },
          { id: "se4", title: "REST API Design Principles", concept: "Stateless endpoints, proper HTTP methods, and resource naming conventions." },
          { id: "se5", title: "Database Design & Normalization", concept: "3NF eliminates redundancy; indexes speed up queries at write cost." },
          { id: "se6", title: "Microservices vs Monoliths", concept: "Decomposing applications into independently deployable services." },
          { id: "se7", title: "CI/CD Pipelines", concept: "Automated testing, building, and deployment — catch bugs early." },
          { id: "se8", title: "System Design: Scalability", concept: "Horizontal scaling, load balancers, caching layers, and database sharding." },
        ],
      },
    ],
  },
  engineering: {
    id: "engineering", name: "Engineering", icon: "🔧", color: "#E24B4A",
    description: "Study mechanics, thermodynamics, circuits, and structural analysis.",
    teachers: [
      { id: "prof_dela_cruz", name: "Engr. Dela Cruz", color: "#D85A30", specialty: "Mechanics" },
      { id: "prof_villanueva", name: "Engr. Villanueva", color: "#185FA5", specialty: "Electronics" },
      { id: "prof_garcia", name: "Engr. Garcia", color: "#639922", specialty: "Structures" },
    ],
    subjects: [
      {
        id: "mechanics", name: "Engineering Mechanics", icon: "⚙️", teacher: "prof_dela_cruz",
        lessons: [
          { id: "mech1", title: "Newton's Laws of Motion", concept: "F = ma — every action has an equal and opposite reaction." },
          { id: "mech2", title: "Free Body Diagrams", concept: "Isolate a system and draw all forces acting on it to solve equilibrium." },
          { id: "mech3", title: "Moment of Inertia", concept: "Resistance to rotational acceleration depends on mass distribution." },
          { id: "mech4", title: "Stress & Strain Analysis", concept: "Sigma = F/A — Hooke's law governs elastic deformation." },
          { id: "mech5", title: "Fluid Mechanics: Bernoulli's Principle", concept: "P + 0.5pv^2 + pgh = constant — explains lift in airplane wings." },
          { id: "mech6", title: "Thermodynamics: First Law", concept: "Delta U = Q - W — energy cannot be created or destroyed." },
          { id: "mech7", title: "Kinematics & Projectile Motion", concept: "Parabolic trajectories under constant gravitational acceleration." },
          { id: "mech8", title: "Vibration & Damping", concept: "Spring-mass-damper systems: natural frequency and critical damping." },
        ],
      },
      {
        id: "electronics", name: "Electronics & Circuits", icon: "⚡", teacher: "prof_villanueva",
        lessons: [
          { id: "elec1", title: "Ohm's Law & Kirchhoff's Laws", concept: "V = IR — KVL: sum of voltages in a loop equals zero." },
          { id: "elec2", title: "RC & RL Circuits", concept: "Time constants tau = RC determine how fast capacitors charge." },
          { id: "elec3", title: "Operational Amplifiers", concept: "Ideal op-amp: infinite gain, virtual short between inputs." },
          { id: "elec4", title: "Semiconductor Physics", concept: "PN junctions, doping, and how diodes allow current in one direction." },
          { id: "elec5", title: "Transistor Amplifiers", concept: "BJT transistors: small base current controls large collector current." },
          { id: "elec6", title: "Digital Logic Gates", concept: "AND, OR, XOR, NAND — building blocks of all digital circuits." },
          { id: "elec7", title: "Microcontrollers & Embedded Systems", concept: "GPIO, interrupts, and ADC — programming hardware directly." },
          { id: "elec8", title: "Signal Processing & Filters", concept: "Fourier transform decomposes signals into frequency components." },
        ],
      },
      {
        id: "structures", name: "Structural Analysis", icon: "🏗️", teacher: "prof_garcia",
        lessons: [
          { id: "str1", title: "Beam Bending & Shear Forces", concept: "M = wL^2/8 — bending moment diagrams for simply supported beams." },
          { id: "str2", title: "Truss Analysis: Method of Joints", concept: "Each joint is in equilibrium: solve forces member by member." },
          { id: "str3", title: "Column Buckling (Euler's Formula)", concept: "P_cr = pi^2EI/(KL)^2 — slender columns fail by buckling, not crushing." },
          { id: "str4", title: "Moment Distribution Method", concept: "Distribute unbalanced moments at joints until equilibrium." },
          { id: "str5", title: "Reinforced Concrete Design", concept: "Steel carries tension, concrete carries compression — working together." },
          { id: "str6", title: "Seismic Load Analysis", concept: "Base shear V = CsW — buildings must withstand earthquake forces." },
          { id: "str7", title: "Foundation Engineering", concept: "Bearing capacity of soil determines footing size and depth." },
          { id: "str8", title: "Finite Element Method Intro", concept: "Divide structure into small elements, solve matrix equations." },
        ],
      },
    ],
  },
  business: {
    id: "business", name: "Business Administration", icon: "📊", color: "#97C459",
    description: "Study marketing, finance, management, and entrepreneurship.",
    teachers: [
      { id: "prof_tan", name: "Prof. Tan", color: "#BA7517", specialty: "Finance" },
      { id: "prof_lim", name: "Prof. Lim", color: "#185FA5", specialty: "Marketing" },
      { id: "prof_ong", name: "Prof. Ong", color: "#534AB7", specialty: "Management" },
    ],
    subjects: [
      {
        id: "finance", name: "Financial Management", icon: "💰", teacher: "prof_tan",
        lessons: [
          { id: "fin1", title: "Time Value of Money", concept: "1 today is worth more than 1 tomorrow due to earning potential." },
          { id: "fin2", title: "Financial Statement Analysis", concept: "Income statement, balance sheet, cash flow — the three pillars." },
          { id: "fin3", title: "Net Present Value & IRR", concept: "NPV > 0 means a project adds value; IRR is breakeven discount rate." },
          { id: "fin4", title: "Portfolio Theory & Diversification", concept: "Modern portfolio theory: optimal asset allocation minimizes risk." },
          { id: "fin5", title: "Capital Asset Pricing Model", concept: "E(Ri) = Rf + bi(E(Rm) - Rf): expected return vs systematic risk." },
          { id: "fin6", title: "Options & Derivatives", concept: "Call and put options: right but not obligation to buy/sell." },
          { id: "fin7", title: "Working Capital Management", concept: "Cash conversion cycle = DIO + DSO - DPO." },
          { id: "fin8", title: "Mergers & Acquisitions", concept: "Synergies, due diligence, and valuation methods in M&A." },
        ],
      },
      {
        id: "marketing", name: "Marketing Management", icon: "📣", teacher: "prof_lim",
        lessons: [
          { id: "mkt1", title: "Marketing Mix (4Ps)", concept: "Product, Price, Place, Promotion — the foundation of marketing strategy." },
          { id: "mkt2", title: "Consumer Behavior Analysis", concept: "Maslow's hierarchy: needs drive purchasing decisions." },
          { id: "mkt3", title: "Brand Positioning Strategy", concept: "A brand is what people say about you when you leave the room." },
          { id: "mkt4", title: "Digital Marketing & SEO", concept: "Organic search, paid ads, social media — multi-channel attribution." },
          { id: "mkt5", title: "Market Segmentation & Targeting", concept: "Demographic, psychographic, behavioral — divide and conquer." },
          { id: "mkt6", title: "Pricing Strategies", concept: "Penetration pricing vs skimming: market entry approaches." },
          { id: "mkt7", title: "Supply Chain Management", concept: "Logistics, inventory, and vendor relationships." },
          { id: "mkt8", title: "International Marketing", concept: "Cultural adaptation vs standardization across global markets." },
        ],
      },
      {
        id: "management", name: "Management & Leadership", icon: "👔", teacher: "prof_ong",
        lessons: [
          { id: "mgmt1", title: "Organizational Behavior", concept: "How individuals and teams behave within organizational structures." },
          { id: "mgmt2", title: "Strategic Management", concept: "SWOT analysis: strengths, weaknesses, opportunities, threats." },
          { id: "mgmt3", title: "Leadership Styles", concept: "Transformational vs transactional — inspiring vs managing." },
          { id: "mgmt4", title: "Human Resource Management", concept: "Recruitment, training, performance evaluation, and retention." },
          { id: "mgmt5", title: "Operations Management", concept: "Six Sigma: DMAIC methodology for process improvement." },
          { id: "mgmt6", title: "Business Ethics & CSR", concept: "Triple bottom line: people, planet, profit." },
          { id: "mgmt7", title: "Entrepreneurship & Innovation", concept: "Lean startup: build-measure-learn feedback loops." },
          { id: "mgmt8", title: "Project Management", concept: "Critical path method identifies the longest dependent task sequence." },
        ],
      },
    ],
  },
  nursing: {
    id: "nursing", name: "Nursing", icon: "🏥", color: "#FF69B4",
    description: "Study anatomy, pharmacology, patient care, and medical ethics.",
    teachers: [
      { id: "prof_mendoza", name: "Dean Mendoza", color: "#D85A30", specialty: "Anatomy" },
      { id: "prof_flores", name: "Prof. Flores", color: "#534AB7", specialty: "Pharmacology" },
      { id: "prof_aquino", name: "Prof. Aquino", color: "#185FA5", specialty: "Patient Care" },
    ],
    subjects: [
      {
        id: "anatomy", name: "Human Anatomy & Physiology", icon: "🧠", teacher: "prof_mendoza",
        lessons: [
          { id: "anat1", title: "The Cardiovascular System", concept: "Heart pumps 5L/min — four chambers, two circuits, one purpose." },
          { id: "anat2", title: "The Nervous System", concept: "Neurons transmit signals via action potentials and synaptic transmission." },
          { id: "anat3", title: "The Respiratory System", concept: "Alveoli provide 100m^2 surface area for gas exchange." },
          { id: "anat4", title: "The Musculoskeletal System", concept: "Sarcomeres contract via sliding filament theory." },
          { id: "anat5", title: "The Digestive System", concept: "Peristalsis moves food; villi absorb nutrients into bloodstream." },
          { id: "anat6", title: "The Endocrine System", concept: "Hormones act as chemical messengers via feedback loops." },
          { id: "anat7", title: "The Urinary System", concept: "Nephrons filter 180L/day to produce ~1.5L urine." },
          { id: "anat8", title: "The Immune System", concept: "B cells produce antibodies; T cells kill infected cells." },
        ],
      },
      {
        id: "pharma", name: "Pharmacology", icon: "💊", teacher: "prof_flores",
        lessons: [
          { id: "ph1", title: "Drug Administration Routes", concept: "Oral, IV, IM, subcutaneous — each has different bioavailability." },
          { id: "ph2", title: "Pharmacokinetics: ADME", concept: "Absorption, Distribution, Metabolism, Excretion — the drug lifecycle." },
          { id: "ph3", title: "Dosage Calculations", concept: "D = (Desired x Volume) / Stock — accuracy saves lives." },
          { id: "ph4", title: "Antibiotics & Resistance", concept: "Bactericidal vs bacteriostatic — misuse drives resistance." },
          { id: "ph5", title: "Pain Management & Analgesics", concept: "WHO pain ladder: NSAIDs to opioids based on severity." },
          { id: "ph6", title: "IV Fluids & Electrolytes", concept: "Crystalloids vs colloids — maintaining osmotic balance." },
          { id: "ph7", title: "Chemotherapy Agents", concept: "Target rapidly dividing cells — affects cancer and healthy cells." },
          { id: "ph8", title: "Pediatric & Geriatric Dosing", concept: "Body surface area and renal function adjustments." },
        ],
      },
      {
        id: "patient_care", name: "Patient Care & Ethics", icon: "🩺", teacher: "prof_aquino",
        lessons: [
          { id: "pc1", title: "Vital Signs Assessment", concept: "BP, HR, RR, Temp — baseline indicators of health status." },
          { id: "pc2", title: "Wound Care & Dressing", concept: "Sterile technique prevents infection; moist healing speeds recovery." },
          { id: "pc3", title: "Patient Communication", concept: "Therapeutic communication: active listening, empathy, open-ended questions." },
          { id: "pc4", title: "Infection Control & Isolation", concept: "Standard precautions: hand hygiene, PPE, and sterilization protocols." },
          { id: "pc5", title: "Medical Ethics & Informed Consent", concept: "Autonomy, beneficence, non-maleficence, justice — the four pillars." },
          { id: "pc6", title: "Emergency Response & CPR", concept: "BLS: CAB — Circulation, Airway, Breathing — 30:2 compression ratio." },
          { id: "pc7", title: "End-of-Life Care & Palliative", concept: "Dignity, pain management, and family support in terminal care." },
          { id: "pc8", title: "Nursing Process: ADPIE", concept: "Assessment, Diagnosis, Planning, Implementation, Evaluation." },
        ],
      },
    ],
  },
  architecture: {
    id: "architecture", name: "Architecture", icon: "🏛️", color: "#e8a020",
    description: "Study design theory, building technology, history, and urban planning.",
    teachers: [
      { id: "prof_arch_ramos", name: "Arch. Ramos", color: "#BA7517", specialty: "Design" },
      { id: "prof_arch_santos", name: "Arch. Santos", color: "#534AB7", specialty: "Building Tech" },
      { id: "prof_arch_cruz", name: "Arch. Cruz", color: "#185FA5", specialty: "History & Theory" },
    ],
    subjects: [
      {
        id: "design", name: "Architectural Design", icon: "✏️", teacher: "prof_arch_ramos",
        lessons: [
          { id: "des1", title: "Elements of Design", concept: "Line, form, space, texture, color — the visual vocabulary of architecture." },
          { id: "des2", title: "Principles of Composition", concept: "Balance, proportion, rhythm, emphasis, unity, and movement." },
          { id: "des3", title: "Spatial Organization", concept: "Centralized, linear, radial, clustered, grid — organizing space." },
          { id: "des4", title: "The Golden Ratio & Proportion", concept: "Phi = 1.618 — found in nature and classical architecture." },
          { id: "des5", title: "Circulation & Paths", concept: "Approach, entrance, path, destination — choreographing movement." },
          { id: "des6", title: "Natural Lighting Design", concept: "Light shelves, clerestories, and orientation for passive illumination." },
          { id: "des7", title: "Universal Design Principles", concept: "Barrier-free access: ramps, wide doorways, tactile indicators." },
          { id: "des8", title: "Sustainable Design Strategies", concept: "Passive cooling, green roofs, rainwater harvesting, solar orientation." },
        ],
      },
      {
        id: "building_tech", name: "Building Technology", icon: "🔨", teacher: "prof_arch_santos",
        lessons: [
          { id: "bt1", title: "Structural Systems", concept: "Load-bearing walls, frame structures, and tensile systems." },
          { id: "bt2", title: "Building Materials", concept: "Concrete, steel, timber, glass — properties and appropriate applications." },
          { id: "bt3", title: "HVAC & Mechanical Systems", concept: "Heating, ventilation, and air conditioning for occupant comfort." },
          { id: "bt4", title: "Electrical & Plumbing Systems", concept: "Load calculations, pipe sizing, and building code requirements." },
          { id: "bt5", title: "Building Envelope & Insulation", concept: "Thermal bridging, R-values, and vapor barriers." },
          { id: "bt6", title: "Fire Safety & Egress", concept: "Exit routes, fire ratings, sprinklers, and smoke management." },
          { id: "bt7", title: "Acoustics & Sound Control", concept: "Reverberation time, STC ratings, and noise mitigation." },
          { id: "bt8", title: "Construction Documentation", concept: "Working drawings, specifications, and BIM coordination." },
        ],
      },
      {
        id: "arch_history", name: "History & Theory", icon: "📜", teacher: "prof_arch_cruz",
        lessons: [
          { id: "his1", title: "Classical Architecture", concept: "Greek orders: Doric, Ionic, Corinthian — proportions and entasis." },
          { id: "his2", title: "Gothic Cathedrals", concept: "Flying buttresses, rib vaults, and pointed arches reaching for heaven." },
          { id: "his3", title: "Renaissance & Baroque", concept: "Brunelleschi's dome, Palladian villas, and Bernini's colonnade." },
          { id: "his4", title: "Modernism & Bauhaus", concept: "Form follows function — Le Corbusier, Mies van der Rohe, Wright." },
          { id: "his5", title: "Postmodern Architecture", concept: "Venturi's complexity, Graves' color, Gehry's deconstruction." },
          { id: "his6", title: "Vernacular Architecture", concept: "Local materials, climate response, and indigenous building traditions." },
          { id: "his7", title: "Urban Planning & Design", concept: "Zoning, density, transit-oriented development, and public space." },
          { id: "his8", title: "Philippine Architecture", concept: "Bahay Kubo, Bahay na Bato, and contemporary Filipino design." },
        ],
      },
    ],
  },
};

export const DEFAULT_SCHEDULE = {};
["computer_science", "engineering", "business", "nursing", "architecture"].forEach(mid => {
  const subjects = MAJORS[mid].subjects;
  const schedule = {};
  ["MON","TUE","WED","THU","FRI"].forEach((day, di) => {
    const subj = subjects[di % subjects.length];
    schedule[day] = [
      { slot: 0, subject: subj.id, label: subj.name, room: "Rm 101" },
      { slot: 1, subject: subjects[(di + 1) % subjects.length].id, label: subjects[(di + 1) % subjects.length].name, room: "Rm 102" },
    ];
  });
  DEFAULT_SCHEDULE[mid] = schedule;
});

export function getCurrentLesson(majorId, dayName, slotIndex) {
  const sched = DEFAULT_SCHEDULE[majorId];
  if (!sched || !sched[dayName]) return null;
  const entries = sched[dayName].filter(e => e.slot === slotIndex);
  return entries.length > 0 ? entries[0] : null;
}

export function getTeacherForSubject(majorId, subjectId) {
  const major = MAJORS[majorId];
  if (!major) return null;
  const subject = major.subjects.find(s => s.id === subjectId);
  if (!subject) return null;
  return major.teachers.find(t => t.id === subject.teacher);
}
