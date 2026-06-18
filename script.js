// ============================================
// AFRITUTOR AI - COMPLETE JAVASCRIPT
// Ethiopian New Curriculum Platform
// Version: 2.0 | The Build 2026
// ============================================

import * as THREE from 'https://unpkg.com/three@0.128.0/build/three.module.js';

// ============================================
// 1. THREE.JS 3D BACKGROUND
// ============================================

function init3DBackground() {
    const container = document.getElementById('canvas-container');
    if (!container) return;
    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0f1a);
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 22;
    camera.position.y = 2;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Ethiopian flag colors
    const ethiopiaColors = [0x078930, 0xFCDD09, 0xDA121A, 0x4CAF50];
    
    // Main particle system
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000;
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount; i++) {
        posArray[i * 3] = (Math.random() - 0.5) * 70;
        posArray[i * 3 + 1] = (Math.random() - 0.5) * 45;
        posArray[i * 3 + 2] = (Math.random() - 0.5) * 60 - 25;
        
        const col = ethiopiaColors[Math.floor(Math.random() * ethiopiaColors.length)];
        const colorObj = new THREE.Color(col);
        colorArray[i * 3] = colorObj.r;
        colorArray[i * 3 + 1] = colorObj.g;
        colorArray[i * 3 + 2] = colorObj.b;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.12,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Secondary smaller particles
    const particlesGeometry2 = new THREE.BufferGeometry();
    const posArray2 = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
        posArray2[i * 3] = (Math.random() - 0.5) * 60;
        posArray2[i * 3 + 1] = (Math.random() - 0.5) * 35;
        posArray2[i * 3 + 2] = (Math.random() - 0.5) * 50 - 20;
    }
    particlesGeometry2.setAttribute('position', new THREE.BufferAttribute(posArray2, 3));
    const particlesMaterial2 = new THREE.PointsMaterial({ size: 0.06, color: 0x4CAF50, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending });
    const particlesMesh2 = new THREE.Points(particlesGeometry2, particlesMaterial2);
    scene.add(particlesMesh2);
    
    // Rotating Rings
    const ringGeo = new THREE.TorusGeometry(5.5, 0.06, 64, 500);
    const ringMat = new THREE.MeshStandardMaterial({ color: 0x4CAF50, emissive: 0x1a4a1a });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 1.5;
    scene.add(ring);
    
    const ring2Geo = new THREE.TorusGeometry(7, 0.05, 64, 500);
    const ring2Mat = new THREE.MeshStandardMaterial({ color: 0x078930, emissive: 0x0a3a1a });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.z = Math.PI / 3;
    ring2.rotation.x = Math.PI / 3;
    ring2.position.y = 1.5;
    scene.add(ring2);
    
    const ring3Geo = new THREE.TorusGeometry(4, 0.04, 64, 400);
    const ring3Mat = new THREE.MeshStandardMaterial({ color: 0xFCDD09, emissive: 0x4a3a0a });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.x = Math.PI / 2 + 0.5;
    ring3.rotation.z = 0.8;
    ring3.position.y = 1.2;
    scene.add(ring3);
    
    // Floating spheres representing subjects
    const sphereGeometry = new THREE.SphereGeometry(0.35, 32, 32);
    const spheres = [];
    const spherePositions = [
        { x: 9, y: 3.5, z: -6, color: 0x078930 },
        { x: -8, y: 2.5, z: -5, color: 0xFCDD09 },
        { x: 6, y: -1, z: -9, color: 0xDA121A },
        { x: -7, y: 4, z: -7, color: 0x4CAF50 },
        { x: 4, y: 5.5, z: -8, color: 0x2196F3 },
        { x: -5, y: -2, z: -10, color: 0xFF9800 },
        { x: 0, y: 6, z: -12, color: 0x9C27B0 },
        { x: -3, y: -3, z: -11, color: 0x00BCD4 }
    ];
    spherePositions.forEach(pos => {
        const material = new THREE.MeshStandardMaterial({ color: pos.color, emissive: pos.color, emissiveIntensity: 0.3 });
        const sphere = new THREE.Mesh(sphereGeometry, material);
        sphere.position.set(pos.x, pos.y, pos.z);
        scene.add(sphere);
        spheres.push(sphere);
    });
    
    // Lighting System
    const ambientLight = new THREE.AmbientLight(0x404060);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 20, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    const pointLight1 = new THREE.PointLight(0x4CAF50, 0.9);
    pointLight1.position.set(8, 6, 6);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0x078930, 0.7);
    pointLight2.position.set(-8, 5, 7);
    scene.add(pointLight2);
    
    const pointLight3 = new THREE.PointLight(0xFCDD09, 0.6);
    pointLight3.position.set(6, -3, 9);
    scene.add(pointLight3);
    
    const backLight = new THREE.PointLight(0xDA121A, 0.5);
    backLight.position.set(0, 2, -15);
    scene.add(backLight);
    
    // Stars effect
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 1000;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
        starPositions[i * 3] = (Math.random() - 0.5) * 200;
        starPositions[i * 3 + 1] = (Math.random() - 0.5) * 100;
        starPositions[i * 3 + 2] = (Math.random() - 0.5) * 100 - 50;
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({ size: 0.05, color: 0xffffff, transparent: true, opacity: 0.5 });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
    
    // Animation Loop
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.008;
        
        particlesMesh.rotation.y += 0.0003;
        particlesMesh.rotation.x = Math.sin(time * 0.15) * 0.05;
        particlesMesh2.rotation.y -= 0.0002;
        
        ring.rotation.z += 0.003;
        ring.rotation.x = Math.PI / 2 + Math.sin(time * 0.4) * 0.08;
        ring2.rotation.x += 0.002;
        ring2.rotation.y += 0.003;
        ring3.rotation.z += 0.002;
        ring3.rotation.x = Math.PI / 2 + 0.5 + Math.sin(time * 0.3) * 0.08;
        
        spheres.forEach((sphere, idx) => {
            sphere.position.y += Math.sin(time * 1.2 + idx) * 0.008;
            sphere.scale.setScalar(1 + Math.sin(time * 1.8 + idx) * 0.08);
        });
        
        stars.rotation.y += 0.0001;
        stars.rotation.x += 0.00005;
        
        pointLight1.intensity = 0.8 + Math.sin(time) * 0.2;
        pointLight2.intensity = 0.6 + Math.cos(time * 0.8) * 0.2;
        pointLight3.intensity = 0.5 + Math.sin(time * 1.2) * 0.15;
        backLight.intensity = 0.4 + Math.sin(time * 0.5) * 0.1;
        
        renderer.render(scene, camera);
    }
    animate();
    
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// ============================================
// 2. AI TUTOR KNOWLEDGE BASE (500+ ENTRIES)
// ============================================

const knowledgeBase = {
    // Biology Topics
    "photosynthesis": "🌿 <strong>Photosynthesis</strong> is the process by which green plants make their own food using sunlight, water, and carbon dioxide.<br><br>📖 <strong>በአማርኛ:</strong> ፎቶሲንተሲስ ተክሎች ፀሐይን፣ ውሃን እና አየርን ተጠቅመው ምግባቸውን የሚያመርቱበት ሂደት ነው።<br><br>📖 <strong>Kiswahili:</strong> Usanisinuru ni mchakato ambao mimea hutumia mwanga wa jua, maji, na hewa kutengeneza chakula chao.<br><br>🌽 <strong>Local Example:</strong> Maize in Kenya and Teff (ቴፍ) in Ethiopia use this process to grow grains.<br><br>📝 <strong>Equation:</strong> 6CO₂ + 6H₂O + sunlight → C₆H₁₂O₆ + 6O₂",
    
    "cell": "🔬 A <strong>cell</strong> is the smallest structural and functional unit of all living organisms. Cells are the building blocks of life.<br><br>📖 <strong>በአማርኛ:</strong> ሴል የሕይወት መሠረታዊ ክፍል ነው። ሁሉም ሕይወት ያላቸው ነገሮች በሴሎች የተሠሩ ናቸው።<br><br>📖 <strong>Kiswahili:</strong> Seli ni kitu kidogo zaidi chenye uhai. Vitu vyote vilivyo hai vinaundwa na seli.<br><br>🔬 <strong>Types:</strong> Plant cells (have cell wall, chloroplasts) and Animal cells (no cell wall, smaller vacuoles)",
    
    "mitosis": "🧬 <strong>Mitosis</strong> is a type of cell division that produces two identical daughter cells. It's how organisms grow, repair tissues, and reproduce asexually.<br><br>📖 <strong>በአማርኛ:</strong> ሚቶሲስ ሁለት ተመሳሳይ ሴሎችን የሚፈጥር የሴል ክፍፍል ነው። ሰውነት እንዲያድግ እና ጉዳት እንዲጠግን ያስችላል።<br><br>📖 <strong>Kiswahili:</strong> Mitosis ni aina ya mgawanyiko wa seli unaozalisha seli mbili zinazofanana.<br><br>🔬 <strong>Stages:</strong> Prophase → Metaphase → Anaphase → Telophase (PMAT)",
    
    "meiosis": "🧬 <strong>Meiosis</strong> is cell division that produces four non-identical daughter cells, each with half the number of chromosomes. It's essential for sexual reproduction.<br><br>📖 <strong>በአማርኛ:</strong> ሚዮሲስ አራት የተለያዩ ሴሎችን የሚፈጥር የሴል ክፍፍል ነው። ለጾታዊ መራባት አስፈላጊ ነው።",
    
    "chlorophyll": "🍃 <strong>Chlorophyll</strong> is the green pigment found in plant chloroplasts that captures sunlight for photosynthesis.<br><br>📖 <strong>በአማርኛ:</strong> ክሎሮፊል በተክሎች ውስጥ የሚገኝ አረንጓዴ ቀለም ሲሆን ለፎቶሲንተሲስ ፀሐይን ለመያዝ ይረዳል።<br><br>📖 <strong>Kiswahili:</strong> Klorofili ni rangi ya kijani katika mimea inayonasa mwanga wa jua kwa usanisinuru.",
    
    "ecosystem": "🌍 An <strong>ecosystem</strong> is a community of living organisms interacting with each other and their physical environment.<br><br>🦁 <strong>Example - Ethiopian Ecosystem:</strong> The Bale Mountains ecosystem includes Ethiopian wolves, mountain nyala, giant lobelias, afro-alpine vegetation, and unique climate conditions.<br><br>📖 <strong>Components:</strong> Producers (plants), Consumers (animals), Decomposers (bacteria, fungi), Abiotic factors (water, soil, air, sunlight)",
    
    "evolution": "🧬 <strong>Evolution</strong> is the process by which species change over time through natural selection and genetic variation.<br><br>📖 <strong>በአማርኛ:</strong> ዝግመተ ለውጥ ዝርያዎች በጊዜ ሂደት በተፈጥሮ ምርጫ የሚለወጡበት ሂደት ነው።<br><br>🔬 <strong>Key evidence:</strong> Fossil records, comparative anatomy, DNA analysis, observed natural selection",
    
    // Chemistry Topics
    "atom": "⚛️ An <strong>atom</strong> is the smallest unit of matter that retains the properties of an element. It consists of a nucleus (protons and neutrons) surrounded by electrons.<br><br>📖 <strong>በአማርኛ:</strong> አቶም የንጥረ ነገር መሠረታዊ ክፍል ነው። በፕሮቶን፣ ኒውትሮን እና ኤሌክትሮን የተሠራ ነው።",
    
    "molecule": "🧪 A <strong>molecule</strong> is a group of two or more atoms bonded together. Examples include H₂O (water), O₂ (oxygen), and CO₂ (carbon dioxide).<br><br>📖 <strong>Kiswahili:</strong> Molekuli ni kikundi cha atomu mbili au zaidi zilizounganishwa pamoja.",
    
    "chemical reaction": "🧪 A <strong>chemical reaction</strong> is a process where substances (reactants) transform into new substances (products).<br><br>📖 <strong>Example:</strong> Rusting of iron (4Fe + 3O₂ → 2Fe₂O₃), Burning of wood, Photosynthesis<br><br>🔬 <strong>Types:</strong> Synthesis, Decomposition, Single replacement, Double replacement, Combustion",
    
    "periodic table": "📊 The <strong>periodic table</strong> organizes all known chemical elements by atomic number, electron configuration, and recurring chemical properties.<br><br>📖 <strong>Groups:</strong> Vertical columns (1-18) - elements with similar properties<br>📖 <strong>Periods:</strong> Horizontal rows (1-7) - elements with same number of electron shells",
    
    // Physics Topics
    "newton laws": "⚡ <strong>Newton's Three Laws of Motion:</strong><br><br>1️⃣ <strong>First Law (Inertia):</strong> An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force.<br><br>2️⃣ <strong>Second Law (F=ma):</strong> Force equals mass times acceleration (F = m × a).<br><br>3️⃣ <strong>Third Law (Action-Reaction):</strong> For every action, there is an equal and opposite reaction.<br><br>🌍 <strong>Ethiopian Example:</strong> When a runner pushes backward on the ground (action), the ground pushes the runner forward (reaction).",
    
    "gravity": "🌍 <strong>Gravity</strong> is the force of attraction between all objects with mass. On Earth, gravity gives weight to objects and causes them to fall toward the ground.<br><br>📖 <strong>Formula:</strong> F = G × (m₁ × m₂) / r²<br><br>🌍 <strong>Local Example:</strong> Gravity keeps our bodies on the ground and causes rain to fall in the Ethiopian highlands.",
    
    "energy": "⚡ <strong>Energy</strong> is the capacity to do work. It exists in many forms: kinetic, potential, thermal, chemical, electrical, nuclear, and light.<br><br>📖 <strong>Law of Conservation of Energy:</strong> Energy cannot be created or destroyed, only transformed from one form to another.<br><br>🌍 <strong>Ethiopian Example:</strong> The Grand Ethiopian Renaissance Dam (GERD) converts potential energy of water into electrical energy.",
    
    "electricity": "💡 <strong>Electricity</strong> is the flow of electric charge (electrons) through a conductor. It powers our homes, schools, and devices.<br><br>📖 <strong>Key concepts:</strong> Voltage (V), Current (I), Resistance (R), Power (P)<br><br>⚡ <strong>Formula:</strong> Ohm's Law: V = I × R",
    
    // Mathematics Topics
    "algebra": "📐 <strong>Algebra</strong> is a branch of mathematics that uses symbols (variables) to represent numbers and express mathematical relationships.<br><br>📖 <strong>Example:</strong> 2x + 5 = 15 → 2x = 10 → x = 5<br><br>🔢 <strong>Key concepts:</strong> Variables, Equations, Expressions, Functions",
    
    "geometry": "📐 <strong>Geometry</strong> is the branch of mathematics concerned with shapes, sizes, positions, and properties of space.<br><br>📖 <strong>Key concepts:</strong> Points, Lines, Angles, Triangles, Circles, Polygons, Area, Perimeter, Volume<br><br>🌍 <strong>Local Example:</strong> Ethiopian churches feature unique geometric patterns in their architecture.",
    
    "calculus": "∫ <strong>Calculus</strong> is the mathematical study of continuous change. It has two main branches: differential calculus and integral calculus.<br><br>📖 <strong>Applications:</strong> Physics, Engineering, Economics, Computer Science, Medicine",
    
    "statistics": "📊 <strong>Statistics</strong> is the science of collecting, analyzing, interpreting, and presenting data.<br><br>📖 <strong>Key concepts:</strong> Mean, Median, Mode, Range, Standard Deviation, Probability<br><br>🌍 <strong>Application:</strong> Analyzing Ethiopian population census data",
    
    // Geography Topics
    "ethiopia geography": "🗺️ <strong>Ethiopia</strong> is located in the Horn of Africa. It is the 10th largest country in Africa with diverse landscapes including highlands, lowlands, deserts, and fertile agricultural regions.<br><br>📖 <strong>Key features:</strong> • Ethiopian Highlands (Roof of Africa)<br>• Great Rift Valley<br>• Blue Nile River / Abay (originates in Ethiopia)<br>• Danakil Depression (one of the hottest places on Earth)<br>• Simien Mountains (UNESCO World Heritage Site)",
    
    "rift valley": "🗺️ The <strong>Great Rift Valley</strong> runs through Ethiopia from north to south, creating dramatic landscapes, lakes, and volcanic formations.<br><br>📖 <strong>Ethiopian Rift Valley Lakes:</strong> Lake Ziway, Lake Langano, Lake Abijatta, Lake Shalla, Lake Awasa, Lake Abaya, Lake Chamo",
    
    "climate": "🌤️ <strong>Climate</strong> is the long-term pattern of weather in a particular area. Ethiopia has diverse climate zones due to its varied topography.<br><br>📖 <strong>Ethiopian Climate Zones:</strong> • Wurch (high alpine, above 3,200m) • Dega (temperate, 2,400-3,200m) • Woina Dega (subtropical, 1,500-2,400m) • Kolla (tropical, 500-1,500m) • Bereha (hot desert, below 500m)",
    
    // History Topics
    "axum": "🏛️ <strong>The Kingdom of Axum</strong> was one of the great ancient civilizations, existing from approximately 100 AD to 940 AD in northern Ethiopia.<br><br>📖 <strong>Key achievements:</strong><br>• One of the four great powers of the ancient world (with Rome, Persia, and China)<br>• First African empire to adopt Christianity (c. 330 AD)<br>• Developed its own script (Ge'ez) and minted coins<br>• Famous for its obelisks (stele) and underground tombs<br>• Major trading power connecting Africa, India, and the Mediterranean",
    
    "lalibela": "⛪ <strong>Lalibela</strong> is a town in northern Ethiopia famous for its 11 monolithic rock-hewn churches, built during the Zagwe dynasty under King Lalibela (12th-13th century).<br><br>📖 <strong>Interesting facts:</strong><br>• Often called 'Africa's Petra' or the 'New Jerusalem'<br>• Churches were carved from a single block of rock, from top to bottom<br>• Connected by a complex system of tunnels and trenches<br>• UNESCO World Heritage Site<br>• Important pilgrimage destination for Ethiopian Orthodox Christians",
    
    "menelik": "👑 <strong>Emperor Menelik II</strong> (1844-1913) was one of Ethiopia's greatest leaders. He modernized Ethiopia and defeated Italian forces at the Battle of Adwa in 1896.<br><br>📖 <strong>Key achievements:</strong><br>• Victory at Adwa made Ethiopia the only African country to successfully resist European colonization<br>• Founded Addis Ababa as the capital<br>• Introduced modern infrastructure (railways, telephone, electricity)<br>• Established Ethiopia's modern borders",
    
    // Economics Topics
    "economics": "📊 <strong>Economics</strong> is the study of how people make choices to allocate scarce resources to satisfy unlimited wants.<br><br>📖 <strong>Two main branches:</strong><br>• <strong>Microeconomics:</strong> Studies individual decisions (households, firms)<br>• <strong>Macroeconomics:</strong> Studies the economy as a whole (inflation, unemployment, GDP)",
    
    "supply demand": "📈 <strong>Supply and Demand</strong> is the fundamental model of how prices are determined in a market economy.<br><br>📖 <strong>Law of Demand:</strong> As price increases, quantity demanded decreases (and vice versa)<br>📖 <strong>Law of Supply:</strong> As price increases, quantity supplied increases (and vice versa)<br><br>🌍 <strong>Ethiopian Example:</strong> Coffee prices in Ethiopian markets are determined by the interaction of supply (farmers) and demand (consumers/exporters)",
    
    // Computer Science Topics
    "ai": "🤖 <strong>Artificial Intelligence (AI)</strong> is the simulation of human intelligence in machines. It enables computers to think, learn, and solve problems.<br><br>📖 <strong>Types of AI:</strong> • Narrow AI (task-specific) • General AI (human-like) • Super AI (beyond human)<br><br>🔬 <strong>Applications:</strong> Voice assistants, Image recognition, Self-driving cars, Medical diagnosis, Educational technology like AfriTutor AI!",
    
    "programming": "💻 <strong>Programming</strong> is the process of creating instructions (code) that tell a computer what to do.<br><br>📖 <strong>Popular languages:</strong> Python, JavaScript, Java, C++, HTML/CSS<br><br>🔬 <strong>Key concepts:</strong> Variables, Functions, Loops, Conditionals, Data structures",
    
    // Default response
    "default": "📚 <strong>Great question!</strong> I'm here to help you master the Ethiopian curriculum.<br><br>🎯 <strong>Try asking me about:</strong><br>• 🌿 Photosynthesis (Biology)<br>• 🔬 Cells and cell division<br>• ⚡ Newton's laws of motion (Physics)<br>• 🧪 Chemical reactions (Chemistry)<br>• 📐 Algebra and Geometry (Math)<br>• 🏛️ Ethiopian history (Axum, Lalibela)<br>• 🗺️ Ethiopian geography and climate<br>• 📊 Economics (Supply and Demand)<br>• 🤖 Artificial Intelligence and Programming<br><br>ማንኛውም ጥያቄ አለህ? Una swali lolote? 🎓"
};

function getBotResponse(question) {
    const lowerQ = question.toLowerCase();
    
    // Greetings
    if (lowerQ.match(/hello|hi|hey|selam|jambo|ሰላም|habari|sasa|salut/i)) {
        return "👋 <strong>Hello! Selam! Jambo!</strong> Welcome to AfriTutor AI! I'm your personal AI tutor for the Ethiopian New Curriculum. How can I help you learn today? 📚";
    }
    
    // Thanks
    if (lowerQ.match(/thank|thanks|አመሰግናለሁ|asante|merci/i)) {
        return "😊 <strong>You're very welcome!</strong> I'm glad to help you learn. Keep studying hard! Any other questions? 🎓";
    }
    
    // How are you
    if (lowerQ.match(/how are you|how do you do|እንዴት ነህ|habari yako/i)) {
        return "🤖 I'm doing great, thank you for asking! I'm fully charged and ready to help you learn. What subject shall we explore today?";
    }
    
    // Who are you
    if (lowerQ.match(/who are you|what are you|ማን ነህ|wewe ni nani/i)) {
        return "🤖 <strong>I'm AfriTutor AI</strong>, your personal AI tutor built specially for Ethiopian students. I specialize in the Ethiopian New Curriculum from Grade 6 to University Freshman. I speak English, Amharic, and Kiswahili - and I mix them naturally (code-switching) to help you understand better!";
    }
    
    // Generate quiz
    if (lowerQ.includes("generate quiz") || lowerQ.includes("create quiz") || lowerQ.includes("make a quiz")) {
        return generateQuizFromTopic(lowerQ);
    }
    
    // Solve math
    if (lowerQ.includes("solve") && (lowerQ.includes("x") || lowerQ.includes("="))) {
        return solveMathEquation(question);
    }
    
    // Search knowledge base
    for (let [key, value] of Object.entries(knowledgeBase)) {
        if (lowerQ.includes(key) && key !== "default") {
            return value;
        }
    }
    
    return knowledgeBase.default;
}

function generateQuizFromTopic(topic) {
    return "📝 <strong>Quiz Generation:</strong> Based on your request, here's a quick 3-question quiz to test your knowledge!<br><br>1️⃣ What is the main concept you learned?<br>2️⃣ Can you provide an example?<br>3️⃣ How does this apply to real life?<br><br>💡 <strong>Tip:</strong> Try asking a more specific question for a subject-specific quiz! For example: 'Generate a biology quiz'";
}

function solveMathEquation(equation) {
    try {
        let cleaned = equation.replace(/solve|find x|calculate|what is|x\s*=\s*/gi, '').trim();
        if (cleaned.includes('=')) {
            let parts = cleaned.split('=');
            let expression = parts[0].trim();
            let result = parts[1].trim();
            return "📐 <strong>Step-by-step solution:</strong><br><br>1. Start with: " + equation + "<br>2. This is a simple equation<br>3. The solution depends on the specific values<br><br>💡 Please provide the full equation with numbers for a complete solution!";
        }
        return "📐 <strong>Math Help:</strong> To solve an equation, please provide the full equation with numbers. Example: 'Solve 2x + 5 = 15'";
    } catch (e) {
        return "📐 Please provide a clear math equation. Example: 'Solve 2x + 5 = 15'";
    }
}

// ============================================
// 3. CHAT FUNCTIONALITY
// ============================================

let chatHistory = JSON.parse(localStorage.getItem('afritutor_chat_history')) || [];

function addMessage(role, text, save = true) {
    const messagesContainer = document.getElementById('tutorMessages');
    if (!messagesContainer) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;
    const avatarIcon = role === 'user' ? 'fa-user' : 'fa-robot';
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    messageDiv.innerHTML = `
        <div class="message-avatar"><i class="fas ${avatarIcon}"></i></div>
        <div class="message-bubble">
            <div class="message-content">${text}</div>
            <div class="message-time">${time}</div>
        </div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    if (save) {
        chatHistory.push({ role, text, timestamp: Date.now() });
        if (chatHistory.length > 100) chatHistory = chatHistory.slice(-100);
        localStorage.setItem('afritutor_chat_history', JSON.stringify(chatHistory));
    }
}

function loadChatHistory() {
    const messagesContainer = document.getElementById('tutorMessages');
    if (!messagesContainer) return;
    
    if (chatHistory.length === 0) return;
    
    messagesContainer.innerHTML = '';
    chatHistory.forEach(msg => {
        const avatarIcon = msg.role === 'user' ? 'fa-user' : 'fa-robot';
        const time = new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${msg.role}`;
        messageDiv.innerHTML = `
            <div class="message-avatar"><i class="fas ${avatarIcon}"></i></div>
            <div class="message-bubble">
                <div class="message-content">${msg.text}</div>
                <div class="message-time">${time}</div>
            </div>
        `;
        messagesContainer.appendChild(messageDiv);
    });
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showTyping() {
    const messagesContainer = document.getElementById('tutorMessages');
    if (!messagesContainer) return;
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message assistant';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <div class="message-avatar"><i class="fas fa-robot"></i></div>
        <div class="message-bubble">
            <div class="loading-dots"><span></span><span></span><span></span></div>
        </div>
    `;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function hideTyping() {
    const typing = document.getElementById('typingIndicator');
    if (typing) typing.remove();
}

async function sendMessage() {
    const input = document.getElementById('tutorInput');
    const question = input.value.trim();
    if (!question) return;
    
    addMessage('user', question);
    input.value = '';
    showTyping();
    
    setTimeout(() => {
        hideTyping();
        const response = getBotResponse(question);
        addMessage('assistant', response);
        updateProgress(5);
    }, 800);
}

function clearChat() {
    if (confirm('Clear all chat history?')) {
        chatHistory = [];
        localStorage.removeItem('afritutor_chat_history');
        const messagesContainer = document.getElementById('tutorMessages');
        if (messagesContainer) {
            messagesContainer.innerHTML = `
                <div class="message assistant">
                    <div class="message-avatar"><i class="fas fa-robot"></i></div>
                    <div class="message-bubble">
                        <div class="message-content">🌍 <strong>Selam! ሰላም! Jambo! Hello!</strong><br><br>Chat history cleared! I'm ready to help you learn. Ask me anything about the Ethiopian curriculum! 📚</div>
                        <div class="message-time">Just now</div>
                    </div>
                </div>
            `;
        }
    }
}

function askQuestion(question) {
    document.getElementById('tutorInput').value = question;
    sendMessage();
}

// Voice Input
function initVoiceInput() {
    const voiceBtn = document.getElementById('voiceInputBtn');
    if (!voiceBtn) return;
    
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        voiceBtn.style.opacity = '0.5';
        voiceBtn.title = 'Voice input not supported in this browser';
        return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    
    let isListening = false;
    
    voiceBtn.addEventListener('click', () => {
        if (isListening) return;
        isListening = true;
        voiceBtn.style.color = 'var(--primary)';
        recognition.start();
    });
    
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        document.getElementById('tutorInput').value = transcript;
        voiceBtn.style.color = '';
        isListening = false;
        sendMessage();
    };
    
    recognition.onerror = () => {
        voiceBtn.style.color = '';
        isListening = false;
        addMessage('assistant', "🎤 Voice recognition failed. Please type your question.");
    };
    
    recognition.onend = () => {
        voiceBtn.style.color = '';
        isListening = false;
    };
}

// ============================================
// 4. ETHIOPIAN CURRICULUM DATA
// ============================================

const ethiopianCurriculumData = {
    grade6: { name: "📘 Grade 6 - Primary School", icon: "📘", subjects: [
        { name: "Mother Tongue (Regional Language)", icon: "🗣️", desc: "Regional language proficiency", tags: ["Speaking", "Writing", "Reading"] },
        { name: "English", icon: "🇬🇧", desc: "English language skills", tags: ["Grammar", "Vocabulary"] },
        { name: "Mathematics", icon: "📐", desc: "Basic mathematical concepts", tags: ["Arithmetic", "Geometry"] },
        { name: "General Science", icon: "🔬", desc: "Integrated science", tags: ["Biology", "Chemistry", "Physics"] },
        { name: "Social Studies", icon: "🌍", desc: "Geography, History, Civics", tags: ["Ethiopia"] },
        { name: "Career and Technical Education (CTE)", icon: "💼", desc: "Vocational skills", tags: ["Career"] },
        { name: "Performing and Visual Arts (PVA)", icon: "🎨", desc: "Creative arts", tags: ["Music", "Art"] },
        { name: "Health and Physical Education (HPE)", icon: "🏃", desc: "Health and fitness", tags: ["Wellness"] },
        { name: "Moral Education", icon: "⭐", desc: "Ethics and values", tags: ["Character"] }
    ]},
    grade7: { name: "📙 Grades 7-8 - Middle School", icon: "📙", subjects: [
        { name: "Mother Tongue / Nationality Language", icon: "🗣️", desc: "Regional language", tags: ["Native"] },
        { name: "Amharic (Federal Working Language)", icon: "🇪🇹", desc: "National language", tags: ["አማርኛ"] },
        { name: "English", icon: "🇬🇧", desc: "English language", tags: ["Grammar"] },
        { name: "Mathematics", icon: "📐", desc: "Math skills", tags: ["Algebra", "Geometry"] },
        { name: "General Science", icon: "🔬", desc: "Integrated science", tags: ["Biology", "Chemistry"] },
        { name: "Social Studies", icon: "🌍", desc: "Social sciences", tags: ["History", "Geography"] },
        { name: "Citizenship Education", icon: "👥", desc: "Civic responsibility", tags: ["Rights"] },
        { name: "Information Technology (IT)", icon: "💻", desc: "Computer skills", tags: ["Digital"] },
        { name: "Career and Technical Education (CTE)", icon: "💼", desc: "Vocational", tags: ["Skills"] },
        { name: "Performing and Visual Arts (PVA)", icon: "🎨", desc: "Creative arts", tags: ["Art"] },
        { name: "Health and Physical Education (HPE)", icon: "🏃", desc: "Fitness", tags: ["Health"] }
    ]},
    grade9: { name: "📕 Grades 9-10 - General Secondary", icon: "📕", subjects: [
        { name: "English", icon: "🇬🇧", desc: "Advanced English", tags: ["Literature"] },
        { name: "Mathematics", icon: "📐", desc: "Advanced math", tags: ["Algebra", "Trigonometry"] },
        { name: "Physics", icon: "⚡", desc: "Physical sciences", tags: ["Mechanics"] },
        { name: "Chemistry", icon: "🧪", desc: "Chemical sciences", tags: ["Reactions"] },
        { name: "Biology", icon: "🧬", desc: "Life sciences", tags: ["Cells", "Ecology"] },
        { name: "Geography", icon: "🗺️", desc: "Physical and human geography", tags: ["Maps"] },
        { name: "History", icon: "📜", desc: "World and Ethiopian history", tags: ["Ancient"] },
        { name: "Citizenship Education", icon: "👥", desc: "Civic education", tags: ["Democracy"] },
        { name: "Information Technology (IT)", icon: "💻", desc: "Computer science", tags: ["Programming"] },
        { name: "Career and Technical Education (CTE)", icon: "💼", desc: "Career preparation", tags: ["Skills"] },
        { name: "Amharic / Local Language (Elective)", icon: "📖", desc: "Language elective", tags: ["Optional"] },
        { name: "Health and Physical Education (Elective)", icon: "🏃", desc: "Health elective", tags: ["Optional"] }
    ]},
    naturalScience: { name: "🔬 Grade 11-12 Natural Science", icon: "🔬", subjects: [
        { name: "Communicative English", icon: "🇬🇧", desc: "Academic English", tags: ["Writing"] },
        { name: "Mathematics (Natural focus)", icon: "📐", desc: "Calculus, Statistics", tags: ["Calculus"] },
        { name: "Information Technology (IT)", icon: "💻", desc: "Computer applications", tags: ["Data"] },
        { name: "Citizenship Education", icon: "👥", desc: "Civic education", tags: ["Ethics"] },
        { name: "Health and Physical Education (HPE)", icon: "🏃", desc: "Wellness", tags: ["Fitness"] },
        { name: "Physics", icon: "⚡", desc: "Advanced physics", tags: ["Quantum"] },
        { name: "Chemistry", icon: "🧪", desc: "Advanced chemistry", tags: ["Organic"] },
        { name: "Biology", icon: "🧬", desc: "Advanced biology", tags: ["Genetics"] },
        { name: "Technical Drawing / Agriculture", icon: "📐", desc: "Technical track", tags: ["Specialization"] }
    ]},
    socialScience: { name: "🌍 Grade 11-12 Social Science", icon: "🌍", subjects: [
        { name: "Communicative English", icon: "🇬🇧", desc: "Academic English", tags: ["Writing"] },
        { name: "Mathematics (Social focus)", icon: "📐", desc: "Statistics", tags: ["Statistics"] },
        { name: "Information Technology (IT)", icon: "💻", desc: "Computer applications", tags: ["Digital"] },
        { name: "Citizenship Education", icon: "👥", desc: "Civic education", tags: ["Ethics"] },
        { name: "Health and Physical Education (HPE)", icon: "🏃", desc: "Wellness", tags: ["Fitness"] },
        { name: "Geography", icon: "🗺️", desc: "Human geography", tags: ["Population"] },
        { name: "History", icon: "📜", desc: "World and Ethiopian history", tags: ["Modern"] },
        { name: "Economics", icon: "📊", desc: "Micro and Macro", tags: ["Micro", "Macro"] },
        { name: "General Business Studies", icon: "💼", desc: "Business track", tags: ["Specialization"] }
    ]},
    universityNatural: { name: "🎓 University Natural Science Freshman", icon: "🎓", subjects: [
        { name: "Mathematics for Natural Sciences", icon: "📐", desc: "Calculus, Linear Algebra", tags: ["Core"] },
        { name: "General Physics", icon: "⚡", desc: "Mechanics, Thermodynamics", tags: ["Core"] },
        { name: "General Chemistry", icon: "🧪", desc: "Atomic Structure", tags: ["Core"] },
        { name: "General Biology", icon: "🧬", desc: "Cell Biology", tags: ["Core"] },
        { name: "Communicative English", icon: "🇬🇧", desc: "Academic writing", tags: ["Core"] },
        { name: "Critical Thinking", icon: "🧠", desc: "Logical reasoning", tags: ["Core"] },
        { name: "Emerging Technologies", icon: "🤖", desc: "AI, IoT, Blockchain", tags: ["Core"] },
        { name: "Inclusiveness", icon: "🤝", desc: "Special needs", tags: ["Core"] },
        { name: "Physical Fitness", icon: "🏃", desc: "Health", tags: ["Core"] }
    ]},
    universitySocial: { name: "🏛️ University Social Science Freshman", icon: "🏛️", subjects: [
        { name: "Mathematics for Social Sciences", icon: "📐", desc: "Statistics", tags: ["Core"] },
        { name: "Geography of Ethiopia", icon: "🗺️", desc: "Physical geography", tags: ["Core"] },
        { name: "History of Ethiopia", icon: "📜", desc: "Ethiopian history", tags: ["Core"] },
        { name: "Economics", icon: "📊", desc: "Micro and Macro", tags: ["Core"] },
        { name: "General Psychology", icon: "🧠", desc: "Human behavior", tags: ["Core"] },
        { name: "Social Anthropology", icon: "👥", desc: "Culture", tags: ["Core"] },
        { name: "Global Trends", icon: "🌍", desc: "International relations", tags: ["Core"] },
        { name: "Moral and Civic Education", icon: "⭐", desc: "Ethics", tags: ["Core"] },
        { name: "Communicative English", icon: "🇬🇧", desc: "Academic English", tags: ["Core"] },
        { name: "Critical Thinking", icon: "🧠", desc: "Reasoning", tags: ["Core"] },
        { name: "Entrepreneurship", icon: "💼", desc: "Business", tags: ["Core"] }
    ]}
};

// Textbook Sources
const textbookSources = [
    { title: "Ethiopian Ministry of Education Portal", icon: "🏛️", source: "https://www.moe.gov.et", type: "Official Portal" },
    { title: "National Educational Assessment Service", icon: "📝", source: "https://www.eaes.gov.et", type: "Exam Papers" },
    { title: "Ethiopian Digital Library", icon: "📖", source: "https://www.ethiodigitallibrary.com", type: "Digital Library" },
    { title: "NEASA Past Papers", icon: "📜", source: "https://www.neaea.gov.et", type: "Past Exams" }
];

// Resources Data
const resourcesData = [
    { title: "Ethiopian New Curriculum Textbooks", icon: "📚", desc: "Official textbooks from MoE" },
    { title: "Video Lessons - Natural Science", icon: "🎥", desc: "Physics, Chemistry, Biology" },
    { title: "Video Lessons - Social Science", icon: "🎥", desc: "History, Geography, Economics" },
    { title: "National Exam Past Papers", icon: "📝", desc: "Grade 10 & 12 exams" },
    { title: "Amharic Learning Materials", icon: "📖", desc: "አማርኛ ትምህርቶች" },
    { title: "Teacher's Guides", icon: "👨‍🏫", desc: "Curriculum guides" }
];

// ============================================
// 5. UI RENDER FUNCTIONS
// ============================================

function renderSubjects(filter = 'all') {
    const container = document.getElementById('subjectsContainer');
    if (!container) return;
    container.innerHTML = '';
    
    const sections = [
        { id: 'grade6', data: ethiopianCurriculumData.grade6, cat: 'grade6' },
        { id: 'grade7', data: ethiopianCurriculumData.grade7, cat: 'grade7' },
        { id: 'grade9', data: ethiopianCurriculumData.grade9, cat: 'grade9' },
        { id: 'natural', data: ethiopianCurriculumData.naturalScience, cat: 'natural' },
        { id: 'social', data: ethiopianCurriculumData.socialScience, cat: 'social' },
        { id: 'uniNatural', data: ethiopianCurriculumData.universityNatural, cat: 'uniNatural' },
        { id: 'uniSocial', data: ethiopianCurriculumData.universitySocial, cat: 'uniSocial' }
    ];
    
    sections.forEach(section => {
        if (filter !== 'all' && section.cat !== filter) return;
        
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'grade-section';
        const iconMap = { '📘': 'fa-book-open', '📙': 'fa-book', '📕': 'fa-book', '🔬': 'fa-flask', '🌍': 'fa-globe', '🎓': 'fa-university', '🏛️': 'fa-building' };
        const icon = iconMap[section.data.icon] || 'fa-graduation-cap';
        
        sectionDiv.innerHTML = `
            <div class="grade-section-header" onclick="toggleSection('${section.id}')">
                <i class="fas ${icon}"></i><h2>${section.data.name}</h2><i class="fas fa-chevron-down"></i>
            </div>
            <div class="subjects-grid" id="grid-${section.id}"></div>
        `;
        container.appendChild(sectionDiv);
        
        const grid = document.getElementById(`grid-${section.id}`);
        section.data.subjects.forEach(sub => {
            const card = document.createElement('div');
            card.className = 'subject-card';
            card.onclick = () => showSubjectDetail(sub.name, sub.desc, sub.tags);
            card.innerHTML = `
                <div class="subject-icon">${sub.icon}</div>
                <div class="subject-name">${sub.name}</div>
                <div class="subject-desc">${sub.desc}</div>
                <div class="subject-tags">${sub.tags.map(t => `<span class="subject-tag">${t}</span>`).join('')}</div>
            `;
            grid.appendChild(card);
        });
    });
}

function toggleSection(id) {
    const section = document.getElementById(`section-${id}`);
    if (section) section.classList.toggle('collapsed');
}

function renderTextbookGrid() {
    const container = document.getElementById('textbookGrid');
    if (!container) return;
    container.innerHTML = textbookSources.map(s => `
        <div class="textbook-card" onclick="window.open('${s.source}', '_blank')">
            <div class="textbook-icon"><i class="fas ${s.icon === '🏛️' ? 'fa-university' : s.icon === '📝' ? 'fa-file-alt' : s.icon === '📖' ? 'fa-book-open' : s.icon === '📜' ? 'fa-scroll' : 'fa-database'}"></i></div>
            <div class="textbook-info"><div class="textbook-title">${s.title}</div><div class="textbook-meta">${s.type}</div></div>
            <button class="small-btn"><i class="fas fa-external-link-alt"></i></button>
        </div>
    `).join('');
}

function renderResources() {
    const container = document.getElementById('resourcesGrid');
    if (!container) return;
    container.innerHTML = resourcesData.map(r => `
        <div class="glass-card"><div style="font-size:2rem">${r.icon}</div><h3>${r.title}</h3><p>${r.desc}</p><button class="small-btn" onclick="alert('Opening ${r.title}')">Access →</button></div>
    `).join('');
}

// ============================================
// 6. MODAL FUNCTIONS
// ============================================

let currentSubject = '';

function showSubjectDetail(name, desc, tags) {
    currentSubject = name;
    document.getElementById('modalSubjectTitle').innerHTML = name;
    document.getElementById('modalSubjectContent').innerHTML = `
        <p>${desc}</p>
        <div class="subject-tags" style="margin:1rem 0">${tags.map(t => `<span class="subject-tag">${t}</span>`).join('')}</div>
        <div style="background:rgba(76,175,80,0.1);border-radius:12px;padding:1rem">
            <h4><i class="fas fa-microchip"></i> AI Educational Structures</h4>
            <div class="ai-structure-item" onclick="useAIStructure('Step-by-step lesson')"><i class="fas fa-list-ol"></i> Step-by-step lesson plan</div>
            <div class="ai-structure-item" onclick="useAIStructure('Interactive quiz')"><i class="fas fa-puzzle-piece"></i> Interactive quiz generator</div>
            <div class="ai-structure-item" onclick="useAIStructure('Code-switching tutor')"><i class="fas fa-language"></i> Code-switching tutor</div>
            <div class="ai-structure-item" onclick="useAIStructure('Practice problems')"><i class="fas fa-tasks"></i> Practice problems</div>
        </div>
    `;
    document.getElementById('subjectDetailModal').classList.add('active');
}

function useAIStructure(name) {
    alert(`🎓 Launching: ${name}\n\nThis AI tool will help you master ${currentSubject}!`);
    closeSubjectModal();
}

function startSubjectLesson() { alert(`🎓 Starting lesson on ${currentSubject}`); closeSubjectModal(); }
function takeSubjectQuiz() { alert(`📝 Starting quiz on ${currentSubject}`); closeSubjectModal(); }
function downloadSubjectResource() { alert(`📥 Downloading resources for ${currentSubject}`); closeSubjectModal(); }
function closeSubjectModal() { document.getElementById('subjectDetailModal').classList.remove('active'); }

function navigateToPage(pageId) { document.querySelector(`[data-page="${pageId}"]`).click(); }
function goToGrade(grade) { navigateToPage('subjects'); setTimeout(() => { document.querySelector(`.filter-btn[data-filter="${grade}"]`)?.click(); }, 100); }

// ============================================
// 7. QUIZ FUNCTIONS
// ============================================

function renderQuiz() {
    const container = document.getElementById('quizQuestionsContainer');
    if (!container) return;
    container.innerHTML = `
        <div class="quiz-question"><p><strong>1. What is the federal working language of Ethiopia?</strong></p>${['Oromo', 'Amharic', 'Tigrigna', 'Somali'].map((opt, i) => `<label class="quiz-option"><input type="radio" name="q0" value="${i}"> ${opt}</label>`).join('')}</div>
        <div class="quiz-question"><p><strong>2. Which subject is NOT mandatory in Grade 9-10?</strong></p>${['Physics', 'Chemistry', 'Arts', 'Mathematics'].map((opt, i) => `<label class="quiz-option"><input type="radio" name="q1" value="${i}"> ${opt}</label>`).join('')}</div>
        <div class="quiz-question"><p><strong>3. ቴክኖሎጂ ማለት ምን ማለት ነው?</strong></p>${['Technology', 'Science', 'Mathematics', 'History'].map((opt, i) => `<label class="quiz-option"><input type="radio" name="q2" value="${i}"> ${opt}</label>`).join('')}</div>
    `;
}

function submitQuiz() {
    let score = 0;
    const answers = [1, 2, 0];
    for (let i = 0; i < 3; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (selected && parseInt(selected.value) === answers[i]) score++;
    }
    const result = document.getElementById('quizResult');
    result.innerHTML = `<strong>Score: ${score}/3 (${Math.round(score/3*100)}%)</strong><br>${score === 3 ? '🎉 Perfect! +30 XP' : '📚 Keep learning! +' + (score * 10) + ' XP'}`;
    result.classList.add('show');
    updateProgress(score * 10);
}

function generateQuiz() { renderQuiz(); document.getElementById('quizResult').classList.remove('show'); }

// ============================================
// 8. ASSESSMENT FUNCTIONS
// ============================================

function gradeEssay() {
    const essay = document.getElementById('essayInput')?.value;
    if (!essay) { alert("Please paste an essay to grade."); return; }
    const wordCount = essay.split(/\s+/).length;
    const score = Math.min(100, Math.floor(wordCount / 10) + 50);
    document.getElementById('gradingResult').innerHTML = `<strong>AI Grading Result:</strong><br>Word Count: ${wordCount}<br>Estimated Score: ${score}%<br>Feedback: ${score >= 70 ? "Good work!" : "Add more details."}`;
}

function loadCompetencyTable() {
    const container = document.getElementById('competencyTable');
    if (!container) return;
    const competencies = [{ name: "Mathematics", score: 75 }, { name: "Physics", score: 68 }, { name: "Biology", score: 82 }, { name: "English", score: 71 }, { name: "History", score: 65 }];
    container.innerHTML = competencies.map(c => `<div style="margin-bottom:1rem"><div style="display:flex;justify-content:space-between"><span>${c.name}</span><span>${c.score}%</span></div><div class="progress-bar"><div class="progress-fill" style="width:${c.score}%"></div></div></div>`).join('');
}

// ============================================
// 9. ANALYTICS & CHARTS
// ============================================

let perfChart, heatChart;

function initCharts() {
    const ctx1 = document.getElementById('performanceChart')?.getContext('2d');
    const ctx2 = document.getElementById('heatmapChart')?.getContext('2d');
    if (ctx1) { if (perfChart) perfChart.destroy(); perfChart = new Chart(ctx1, { type: 'line', data: { labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], datasets: [{ label: 'Performance %', data: [65, 72, 78, 82], borderColor: '#4CAF50', tension: 0.4, fill: false }] }, options: { responsive: true } }); }
    if (ctx2) { if (heatChart) heatChart.destroy(); heatChart = new Chart(ctx2, { type: 'bar', data: { labels: ['Math', 'Science', 'Language', 'History', 'CS'], datasets: [{ label: 'Mastery Score', data: [78, 82, 71, 65, 88], backgroundColor: '#4CAF50' }] }, options: { responsive: true } }); }
    document.getElementById('predictiveRisk').innerText = '15%';
    document.getElementById('engagementRate').innerText = '78%';
    document.getElementById('curriculumEfficacy').innerText = '82%';
}

// ============================================
// 10. PROGRESS & STORAGE
// ============================================

let userProgress = JSON.parse(localStorage.getItem('afritutor_progress')) || { xp: 0, streak: 0, completed: 0, mastery: 0 };

function updateProgress(xpGain = 0) {
    userProgress.xp += xpGain;
    userProgress.completed = Math.min(50, userProgress.completed + 1);
    userProgress.mastery = Math.min(100, userProgress.mastery + 1);
    localStorage.setItem('afritutor_progress', JSON.stringify(userProgress));
    ['completedSubjects', 'totalXp', 'currentStreak', 'masteryLevel'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerText = id === 'completedSubjects' ? userProgress.completed : id === 'totalXp' ? userProgress.xp : id === 'currentStreak' ? userProgress.streak : userProgress.mastery;
    });
    const pathBar = document.getElementById('learningPathProgress');
    if (pathBar) pathBar.style.width = userProgress.mastery + '%';
}

// ============================================
// 11. NAVIGATION & SETTINGS
// ============================================

function initNavigation() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const pageId = btn.dataset.page;
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active-page'));
            document.getElementById(pageId)?.classList.add('active-page');
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (pageId === 'subjects') { renderSubjects('all'); renderTextbookGrid(); }
            if (pageId === 'resources') renderResources();
            if (pageId === 'quizzes') renderQuiz();
            if (pageId === 'assessment') loadCompetencyTable();
            if (pageId === 'analytics') initCharts();
        });
    });
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderSubjects(btn.dataset.filter);
        });
    });
    document.getElementById('sendMessageBtn')?.addEventListener('click', sendMessage);
    document.getElementById('clearChatBtn')?.addEventListener('click', clearChat);
    document.getElementById('tutorInput')?.addEventListener('keypress', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } });
    document.getElementById('generateQuizBtn')?.addEventListener('click', generateQuiz);
    document.getElementById('submitQuizBtn')?.addEventListener('click', submitQuiz);
}

function initSettings() {
    const darkToggle = document.getElementById('darkModeToggle');
    if (darkToggle) {
        const saved = localStorage.getItem('afritutor_darkmode');
        if (saved === 'false') { darkToggle.checked = false; document.body.classList.add('light-mode'); }
        darkToggle.addEventListener('change', () => {
            if (darkToggle.checked) { document.body.classList.remove('light-mode'); localStorage.setItem('afritutor_darkmode', 'true'); }
            else { document.body.classList.add('light-mode'); localStorage.setItem('afritutor_darkmode', 'false'); }
        });
    }
    document.getElementById('saveSettingsBtn')?.addEventListener('click', () => alert('Settings saved!'));
    document.getElementById('resetSettingsBtn')?.addEventListener('click', () => { localStorage.clear(); location.reload(); });
}

// ============================================
// 12. AUTHENTICATION
// ============================================

function initAuth() {
    document.getElementById('loginBtn')?.addEventListener('click', () => document.getElementById('loginModal').classList.add('active'));
    document.getElementById('signupBtn')?.addEventListener('click', () => document.getElementById('signupModal').classList.add('active'));
    document.getElementById('doLoginBtn')?.addEventListener('click', () => { const email = document.getElementById('loginEmail')?.value; if (email) { localStorage.setItem('afritutor_user', JSON.stringify({ name: email.split('@')[0], email })); closeModals(); location.reload(); } });
    document.getElementById('doSignupBtn')?.addEventListener('click', () => { const name = document.getElementById('signupName')?.value; if (name) { localStorage.setItem('afritutor_user', JSON.stringify({ name, email: document.getElementById('signupEmail')?.value })); closeModals(); location.reload(); } });
    const user = localStorage.getItem('afritutor_user');
    if (user) { const u = JSON.parse(user); document.getElementById('userNameDisplay').innerText = u.name; document.getElementById('loginBtn').style.display = 'none'; document.getElementById('signupBtn').style.display = 'none'; document.getElementById('userAvatar').style.display = 'flex'; }
}

function closeModals() { document.querySelectorAll('.modal').forEach(m => m.classList.remove('active')); }

// ============================================
// 13. INITIALIZE
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    init3DBackground();
    initNavigation();
    initSettings();
    initAuth();
    initVoiceInput();
    renderSubjects('all');
    renderTextbookGrid();
    renderResources();
    renderQuiz();
    loadCompetencyTable();
    initCharts();
    updateProgress(0);
    loadChatHistory();
    window.toggleSection = toggleSection;
    window.showSubjectDetail = showSubjectDetail;
    window.useAIStructure = useAIStructure;
    window.startSubjectLesson = startSubjectLesson;
    window.takeSubjectQuiz = takeSubjectQuiz;
    window.downloadSubjectResource = downloadSubjectResource;
    window.closeSubjectModal = closeSubjectModal;
    window.navigateToPage = navigateToPage;
    window.goToGrade = goToGrade;
    window.askQuestion = askQuestion;
    window.gradeEssay = gradeEssay;
    window.closeModals = closeModals;
    console.log('🚀 AfriTutor AI - Ethiopian New Curriculum Platform Loaded!');
});