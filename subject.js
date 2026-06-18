// ============================================
// SUBJECTS JS - ETHIOPIAN NEW CURRICULUM
// Complete subjects data and functionality
// ============================================

import * as THREE from 'https://unpkg.com/three@0.128.0/build/three.module.js';

// ============================================
// 1. 3D BACKGROUND (Lightweight version)
// ============================================

function initSubjects3DBackground() {
    const container = document.getElementById('canvas-container');
    if (!container) return;
    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0f1a);
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 18;
    camera.position.y = 2;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    const ethiopiaColors = [0x078930, 0xFCDD09, 0xDA121A, 0x4CAF50];
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount; i++) {
        posArray[i * 3] = (Math.random() - 0.5) * 50;
        posArray[i * 3 + 1] = (Math.random() - 0.5) * 30;
        posArray[i * 3 + 2] = (Math.random() - 0.5) * 40 - 15;
        const col = ethiopiaColors[Math.floor(Math.random() * ethiopiaColors.length)];
        const colorObj = new THREE.Color(col);
        colorArray[i * 3] = colorObj.r;
        colorArray[i * 3 + 1] = colorObj.g;
        colorArray[i * 3 + 2] = colorObj.b;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({ size: 0.1, vertexColors: true, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    const ambientLight = new THREE.AmbientLight(0x404060);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x4CAF50, 0.5);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    function animate() {
        requestAnimationFrame(animate);
        particlesMesh.rotation.y += 0.0003;
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
// 2. ETHIOPIAN CURRICULUM COMPLETE DATA
// ============================================

const ethiopianSubjectsData = {
    // GRADE 6
    grade6: {
        name: "📘 Grade 6",
        grade: "6",
        stream: "Primary",
        subjects: [
            { name: "Mother Tongue (Regional Language)", icon: "🗣️", desc: "Regional language proficiency and cultural literacy", tags: ["Speaking", "Writing", "Reading", "Grammar"], resources: ["textbook", "workbook", "teacher_guide"] },
            { name: "English", icon: "🇬🇧", desc: "English language skills for communication", tags: ["Grammar", "Vocabulary", "Comprehension"], resources: ["textbook", "audio"] },
            { name: "Mathematics", icon: "📐", desc: "Basic mathematical concepts and problem solving", tags: ["Arithmetic", "Geometry", "Algebra"], resources: ["textbook", "workbook"] },
            { name: "General Science", icon: "🔬", desc: "Integrated science (Biology, Chemistry, Physics)", tags: ["Scientific Method", "Experiments"], resources: ["textbook", "lab_manual"] },
            { name: "Social Studies", icon: "🌍", desc: "Geography, History, and Civic Education", tags: ["Ethiopia", "World"], resources: ["textbook", "atlas"] },
            { name: "Career and Technical Education (CTE)", icon: "💼", desc: "Vocational skills and career preparation", tags: ["Career", "Skills"], resources: ["textbook"] },
            { name: "Performing and Visual Arts (PVA)", icon: "🎨", desc: "Creative arts expression", tags: ["Music", "Art", "Drama"], resources: ["textbook"] },
            { name: "Health and Physical Education (HPE)", icon: "🏃", desc: "Health awareness and physical fitness", tags: ["Wellness", "Sports"], resources: ["textbook"] },
            { name: "Moral Education", icon: "⭐", desc: "Ethics, values, and character development", tags: ["Ethics", "Values"], resources: ["textbook"] }
        ]
    },
    // GRADE 7
    grade7: {
        name: "📙 Grade 7",
        grade: "7",
        stream: "Middle",
        subjects: [
            { name: "Mother Tongue / Nationality Language", icon: "🗣️", desc: "Regional language proficiency", tags: ["Native", "Literature"], resources: ["textbook"] },
            { name: "Amharic (Federal Working Language)", icon: "🇪🇹", desc: "National language of Ethiopia", tags: ["አማርኛ", "Federal"], resources: ["textbook"] },
            { name: "English", icon: "🇬🇧", desc: "English language and literature", tags: ["Grammar", "Writing"], resources: ["textbook"] },
            { name: "Mathematics", icon: "📐", desc: "Mathematical reasoning and problem solving", tags: ["Algebra", "Geometry"], resources: ["textbook"] },
            { name: "General Science", icon: "🔬", desc: "Integrated natural sciences", tags: ["Biology", "Chemistry", "Physics"], resources: ["textbook"] },
            { name: "Social Studies", icon: "🌍", desc: "Geography, History, Economics", tags: ["Ethiopia", "Africa"], resources: ["textbook"] },
            { name: "Citizenship Education", icon: "👥", desc: "Civic rights and responsibilities", tags: ["Rights", "Duties"], resources: ["textbook"] },
            { name: "Information Technology (IT)", icon: "💻", desc: "Digital literacy and computer skills", tags: ["Digital", "Programming"], resources: ["textbook"] },
            { name: "Career and Technical Education (CTE)", icon: "💼", desc: "Vocational and technical skills", tags: ["Career Prep"], resources: ["textbook"] },
            { name: "Performing and Visual Arts (PVA)", icon: "🎨", desc: "Creative and performing arts", tags: ["Art", "Music"], resources: ["textbook"] },
            { name: "Health and Physical Education (HPE)", icon: "🏃", desc: "Health and physical wellness", tags: ["Fitness", "Health"], resources: ["textbook"] }
        ]
    },
    // GRADE 8
    grade8: {
        name: "📙 Grade 8",
        grade: "8",
        stream: "Middle",
        subjects: [
            { name: "Mother Tongue / Nationality Language", icon: "🗣️", desc: "Regional language proficiency", tags: ["Native", "Literature"], resources: ["textbook"] },
            { name: "Amharic (Federal Working Language)", icon: "🇪🇹", desc: "National language of Ethiopia", tags: ["አማርኛ", "Federal"], resources: ["textbook"] },
            { name: "English", icon: "🇬🇧", desc: "English language and literature", tags: ["Grammar", "Writing"], resources: ["textbook"] },
            { name: "Mathematics", icon: "📐", desc: "Mathematical reasoning and problem solving", tags: ["Algebra", "Geometry"], resources: ["textbook"] },
            { name: "General Science", icon: "🔬", desc: "Integrated natural sciences", tags: ["Biology", "Chemistry", "Physics"], resources: ["textbook"] },
            { name: "Social Studies", icon: "🌍", desc: "Geography, History, Economics", tags: ["Ethiopia", "Africa"], resources: ["textbook"] },
            { name: "Citizenship Education", icon: "👥", desc: "Civic rights and responsibilities", tags: ["Rights", "Duties"], resources: ["textbook"] },
            { name: "Information Technology (IT)", icon: "💻", desc: "Digital literacy and computer skills", tags: ["Digital", "Programming"], resources: ["textbook"] },
            { name: "Career and Technical Education (CTE)", icon: "💼", desc: "Vocational and technical skills", tags: ["Career Prep"], resources: ["textbook"] },
            { name: "Performing and Visual Arts (PVA)", icon: "🎨", desc: "Creative and performing arts", tags: ["Art", "Music"], resources: ["textbook"] },
            { name: "Health and Physical Education (HPE)", icon: "🏃", desc: "Health and physical wellness", tags: ["Fitness", "Health"], resources: ["textbook"] }
        ]
    },
    // GRADE 9
    grade9: {
        name: "📕 Grade 9",
        grade: "9",
        stream: "Secondary",
        subjects: [
            { name: "English", icon: "🇬🇧", desc: "Advanced English language and literature", tags: ["Literature", "Composition"], resources: ["textbook"] },
            { name: "Mathematics", icon: "📐", desc: "Advanced mathematical concepts", tags: ["Algebra", "Trigonometry"], resources: ["textbook"] },
            { name: "Physics", icon: "⚡", desc: "Physical sciences and mechanics", tags: ["Mechanics", "Electricity"], resources: ["textbook", "lab"] },
            { name: "Chemistry", icon: "🧪", desc: "Chemical sciences and reactions", tags: ["Periodic Table", "Reactions"], resources: ["textbook", "lab"] },
            { name: "Biology", icon: "🧬", desc: "Life sciences and ecology", tags: ["Cells", "Genetics", "Ecology"], resources: ["textbook", "lab"] },
            { name: "Geography", icon: "🗺️", desc: "Physical and human geography", tags: ["Maps", "Climate"], resources: ["textbook", "atlas"] },
            { name: "History", icon: "📜", desc: "World and Ethiopian history", tags: ["Ancient", "Modern"], resources: ["textbook"] },
            { name: "Citizenship Education", icon: "👥", desc: "Civic and moral education", tags: ["Democracy", "Rights"], resources: ["textbook"] },
            { name: "Information Technology (IT)", icon: "💻", desc: "Computer science and applications", tags: ["Programming", "Networks"], resources: ["textbook", "software"] },
            { name: "Career and Technical Education (CTE)", icon: "💼", desc: "Career preparation and skills", tags: ["Career", "Skills"], resources: ["textbook"] },
            { name: "Amharic / Local Language (Elective)", icon: "📖", desc: "Language elective", tags: ["Optional", "Language"], resources: ["textbook"] },
            { name: "Health and Physical Education (Elective)", icon: "🏃", desc: "Health and fitness elective", tags: ["Optional", "Wellness"], resources: ["textbook"] }
        ]
    },
    // GRADE 10
    grade10: {
        name: "📕 Grade 10",
        grade: "10",
        stream: "Secondary",
        subjects: [
            { name: "English", icon: "🇬🇧", desc: "Advanced English language and literature", tags: ["Literature", "Composition"], resources: ["textbook"] },
            { name: "Mathematics", icon: "📐", desc: "Advanced mathematical concepts", tags: ["Algebra", "Trigonometry"], resources: ["textbook"] },
            { name: "Physics", icon: "⚡", desc: "Physical sciences and mechanics", tags: ["Mechanics", "Electricity"], resources: ["textbook", "lab"] },
            { name: "Chemistry", icon: "🧪", desc: "Chemical sciences and reactions", tags: ["Periodic Table", "Reactions"], resources: ["textbook", "lab"] },
            { name: "Biology", icon: "🧬", desc: "Life sciences and ecology", tags: ["Cells", "Genetics", "Ecology"], resources: ["textbook", "lab"] },
            { name: "Geography", icon: "🗺️", desc: "Physical and human geography", tags: ["Maps", "Climate"], resources: ["textbook", "atlas"] },
            { name: "History", icon: "📜", desc: "World and Ethiopian history", tags: ["Ancient", "Modern"], resources: ["textbook"] },
            { name: "Citizenship Education", icon: "👥", desc: "Civic and moral education", tags: ["Democracy", "Rights"], resources: ["textbook"] },
            { name: "Information Technology (IT)", icon: "💻", desc: "Computer science and applications", tags: ["Programming", "Networks"], resources: ["textbook", "software"] },
            { name: "Career and Technical Education (CTE)", icon: "💼", desc: "Career preparation and skills", tags: ["Career", "Skills"], resources: ["textbook"] },
            { name: "Amharic / Local Language (Elective)", icon: "📖", desc: "Language elective", tags: ["Optional", "Language"], resources: ["textbook"] },
            { name: "Health and Physical Education (Elective)", icon: "🏃", desc: "Health and fitness elective", tags: ["Optional", "Wellness"], resources: ["textbook"] }
        ]
    },
    // NATURAL SCIENCE
    naturalScience: {
        name: "🔬 Natural Science",
        grade: "11-12",
        stream: "Preparatory",
        subjects: [
            { name: "Communicative English", icon: "🇬🇧", desc: "Academic English for sciences", tags: ["Writing", "Research"], resources: ["textbook"] },
            { name: "Mathematics (Natural Science focus)", icon: "📐", desc: "Calculus, Linear Algebra, Statistics", tags: ["Calculus", "Vectors"], resources: ["textbook", "formula_sheet"] },
            { name: "Information Technology (IT)", icon: "💻", desc: "Advanced computer applications", tags: ["Programming", "Data Science"], resources: ["textbook", "software"] },
            { name: "Citizenship Education", icon: "👥", desc: "Civic and ethical education", tags: ["Ethics"], resources: ["textbook"] },
            { name: "Health and Physical Education (HPE)", icon: "🏃", desc: "Wellness and fitness", tags: ["Health"], resources: ["textbook"] },
            { name: "Physics", icon: "⚡", desc: "Advanced physics: Mechanics, Electricity, Modern Physics", tags: ["Quantum", "Thermodynamics"], resources: ["textbook", "lab", "formula_sheet"] },
            { name: "Chemistry", icon: "🧪", desc: "Advanced chemistry: Organic, Inorganic, Physical", tags: ["Organic", "Inorganic"], resources: ["textbook", "lab", "periodic_table"] },
            { name: "Biology", icon: "🧬", desc: "Advanced biology: Genetics, Physiology, Ecology", tags: ["Genetics", "Biotechnology"], resources: ["textbook", "lab"] },
            { name: "Technical Drawing / Agriculture", icon: "📐", desc: "Technical or agricultural specialization", tags: ["Specialization"], resources: ["textbook", "tools"] }
        ]
    },
    // SOCIAL SCIENCE
    socialScience: {
        name: "🌍 Social Science",
        grade: "11-12",
        stream: "Preparatory",
        subjects: [
            { name: "Communicative English", icon: "🇬🇧", desc: "Academic English for social sciences", tags: ["Writing", "Analysis"], resources: ["textbook"] },
            { name: "Mathematics (Social Science focus)", icon: "📐", desc: "Statistics and applied mathematics", tags: ["Statistics"], resources: ["textbook"] },
            { name: "Information Technology (IT)", icon: "💻", desc: "Computer applications for social sciences", tags: ["Data", "Digital"], resources: ["textbook"] },
            { name: "Citizenship Education", icon: "👥", desc: "Civic and moral education", tags: ["Ethics"], resources: ["textbook"] },
            { name: "Health and Physical Education (HPE)", icon: "🏃", desc: "Wellness and fitness", tags: ["Health"], resources: ["textbook"] },
            { name: "Geography", icon: "🗺️", desc: "Human and physical geography", tags: ["Cartography"], resources: ["textbook", "atlas"] },
            { name: "History", icon: "📜", desc: "World and Ethiopian history", tags: ["Ancient", "Modern"], resources: ["textbook"] },
            { name: "Economics", icon: "📊", desc: "Microeconomics and Macroeconomics", tags: ["Micro", "Macro"], resources: ["textbook"] },
            { name: "General Business Studies / Local Language", icon: "💼", desc: "Business or language specialization", tags: ["Specialization"], resources: ["textbook"] }
        ]
    },
    // UNIVERSITY NATURAL
    universityNatural: {
        name: "🎓 University Natural Science",
        grade: "Freshman",
        stream: "University",
        subjects: [
            { name: "Mathematics for Natural Sciences", icon: "📐", desc: "Calculus, Linear Algebra, Differential Equations", tags: ["Core"], resources: ["textbook"] },
            { name: "General Physics", icon: "⚡", desc: "Mechanics, Thermodynamics, Electricity, Magnetism", tags: ["Core"], resources: ["textbook", "lab"] },
            { name: "General Chemistry", icon: "🧪", desc: "Atomic Structure, Chemical Bonding, Reactions", tags: ["Core"], resources: ["textbook", "lab"] },
            { name: "General Biology", icon: "🧬", desc: "Cell Biology, Genetics, Evolution, Ecology", tags: ["Core"], resources: ["textbook", "lab"] },
            { name: "Communicative English Skills I & II", icon: "🇬🇧", desc: "Academic writing and communication", tags: ["Core"], resources: ["textbook"] },
            { name: "Critical Thinking (Logic)", icon: "🧠", desc: "Logical reasoning and argumentation", tags: ["Core"], resources: ["textbook"] },
            { name: "Introduction to Emerging Technologies", icon: "🤖", desc: "AI, IoT, Blockchain, Big Data, Cloud Computing", tags: ["Core"], resources: ["textbook"] },
            { name: "Inclusiveness", icon: "🤝", desc: "Special needs education and social integration", tags: ["Core"], resources: ["textbook"] },
            { name: "Physical Fitness and Conditioning", icon: "🏃", desc: "Health, wellness, and physical education", tags: ["Core"], resources: ["textbook"] }
        ]
    },
    // UNIVERSITY SOCIAL
    universitySocial: {
        name: "🏛️ University Social Science",
        grade: "Freshman",
        stream: "University",
        subjects: [
            { name: "Mathematics for Social Sciences", icon: "📐", desc: "Statistics, Business Mathematics", tags: ["Core"], resources: ["textbook"] },
            { name: "Geography of Ethiopia and the Horn", icon: "🗺️", desc: "Physical and human geography of Ethiopia", tags: ["Core"], resources: ["textbook", "atlas"] },
            { name: "History of Ethiopia and the Horn", icon: "📜", desc: "Ethiopian history from ancient to modern", tags: ["Core"], resources: ["textbook"] },
            { name: "Economics", icon: "📊", desc: "Introduction to Microeconomics and Macroeconomics", tags: ["Core"], resources: ["textbook"] },
            { name: "General Psychology", icon: "🧠", desc: "Human behavior, cognition, and development", tags: ["Core"], resources: ["textbook"] },
            { name: "Social Anthropology", icon: "👥", desc: "Culture, society, and human diversity", tags: ["Core"], resources: ["textbook"] },
            { name: "Global Trends", icon: "🌍", desc: "International relations and global politics", tags: ["Core"], resources: ["textbook"] },
            { name: "Moral and Civic Education", icon: "⭐", desc: "Ethics, morality, and citizenship", tags: ["Core"], resources: ["textbook"] },
            { name: "Communicative English Skills I & II", icon: "🇬🇧", desc: "Academic English proficiency", tags: ["Core"], resources: ["textbook"] },
            { name: "Critical Thinking (Logic)", icon: "🧠", desc: "Logical reasoning and critical analysis", tags: ["Core"], resources: ["textbook"] },
            { name: "Entrepreneurship", icon: "💼", desc: "Business creation, innovation, and management", tags: ["Core"], resources: ["textbook"] }
        ]
    }
};

// ============================================
// 3. RENDER FUNCTIONS
// ============================================

let currentGradeFilter = 'all';

function renderSubjectsMainContainer(filterGrade = 'all', filterCategory = 'all') {
    const container = document.getElementById('subjectsMainContainer');
    if (!container) return;
    
    container.innerHTML = '';
    currentGradeFilter = filterGrade;
    
    const grades = [
        { id: 'grade6', data: ethiopianSubjectsData.grade6, order: 1 },
        { id: 'grade7', data: ethiopianSubjectsData.grade7, order: 2 },
        { id: 'grade8', data: ethiopianSubjectsData.grade8, order: 3 },
        { id: 'grade9', data: ethiopianSubjectsData.grade9, order: 4 },
        { id: 'grade10', data: ethiopianSubjectsData.grade10, order: 5 },
        { id: 'natural', data: ethiopianSubjectsData.naturalScience, order: 6 },
        { id: 'social', data: ethiopianSubjectsData.socialScience, order: 7 },
        { id: 'uniNatural', data: ethiopianSubjectsData.universityNatural, order: 8 },
        { id: 'uniSocial', data: ethiopianSubjectsData.universitySocial, order: 9 }
    ];
    
    const filteredGrades = grades.filter(g => {
        if (filterGrade === 'all') return true;
        if (filterGrade === 'grade6') return g.id === 'grade6';
        if (filterGrade === 'grade7') return g.id === 'grade7';
        if (filterGrade === 'grade8') return g.id === 'grade8';
        if (filterGrade === 'grade9') return g.id === 'grade9';
        if (filterGrade === 'grade10') return g.id === 'grade10';
        if (filterGrade === 'natural') return g.id === 'natural';
        if (filterGrade === 'social') return g.id === 'social';
        if (filterGrade === 'university') return g.id === 'uniNatural' || g.id === 'uniSocial';
        return true;
    });
    
    filteredGrades.forEach(grade => {
        let subjects = grade.data.subjects;
        
        if (filterCategory !== 'all') {
            subjects = subjects.filter(sub => {
                if (filterCategory === 'core') return sub.tags.includes('Core') || sub.tags.includes('Ethics') || sub.tags.includes('Democracy');
                if (filterCategory === 'science') return sub.icon === '🔬' || sub.icon === '⚡' || sub.icon === '🧪' || sub.icon === '🧬';
                if (filterCategory === 'social-studies') return sub.icon === '🌍' || sub.icon === '🗺️' || sub.icon === '📜' || sub.icon === '📊';
                if (filterCategory === 'language') return sub.icon === '🗣️' || sub.icon === '🇬🇧' || sub.icon === '🇪🇹' || sub.icon === '📖';
                if (filterCategory === 'arts') return sub.icon === '🎨' || sub.icon === '🏃';
                if (filterCategory === 'technology') return sub.icon === '💻' || sub.icon === '🤖';
                return true;
            });
        }
        
        if (subjects.length === 0) return;
        
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'grade-section-card';
        sectionDiv.id = `section-${grade.id}`;
        
        const subjectCount = subjects.length;
        const subjectText = subjectCount === 1 ? 'subject' : 'subjects';
        
        sectionDiv.innerHTML = `
            <div class="grade-section-header" onclick="toggleGradeSection('${grade.id}')">
                <div class="grade-title">
                    <span class="grade-title-icon">${grade.data.name.split(' ')[0]}</span>
                    <div>
                        <h2>${grade.data.name}</h2>
                        <div class="grade-info">
                            <span><i class="fas fa-graduation-cap"></i> ${grade.data.stream || grade.data.grade}</span>
                            <span><i class="fas fa-book"></i> ${subjectCount} ${subjectText}</span>
                        </div>
                    </div>
                </div>
                <button class="grade-toggle"><i class="fas fa-chevron-down"></i></button>
            </div>
            <div class="grade-subjects-grid" id="grid-${grade.id}"></div>
        `;
        container.appendChild(sectionDiv);
        
        const grid = document.getElementById(`grid-${grade.id}`);
        subjects.forEach((sub, idx) => {
            const card = document.createElement('div');
            card.className = 'subject-card-enhanced';
            card.style.setProperty('--index', idx);
            card.onclick = () => showSubjectDetail(sub.name, sub.desc, sub.tags, sub.resources, grade.data.name);
            card.innerHTML = `
                <div class="subject-card-header">
                    <div class="subject-card-icon">${sub.icon}</div>
                    <div class="subject-card-title">${sub.name}</div>
                </div>
                <div class="subject-card-desc">${sub.desc}</div>
                <div class="subject-card-tags">${sub.tags.map(t => `<span class="subject-card-tag">${t}</span>`).join('')}</div>
                <div class="subject-card-footer">
                    <span><i class="fas fa-download"></i> ${sub.resources.length} resources</span>
                    <span><i class="fas fa-play-circle"></i> Start learning</span>
                </div>
            `;
            grid.appendChild(card);
        });
    });
}

function toggleGradeSection(sectionId) {
    const section = document.getElementById(`section-${sectionId}`);
    if (section) section.classList.toggle('collapsed');
}

// ============================================
// 4. SUBJECT DETAIL MODAL
// ============================================

let currentSubjectName = '';
let currentSubjectGrade = '';

function showSubjectDetail(name, desc, tags, resources, gradeName) {
    currentSubjectName = name;
    currentSubjectGrade = gradeName;
    
    document.getElementById('modalSubjectTitle').innerHTML = `${name} <span style="font-size:0.8rem; color:var(--primary)">(${gradeName})</span>`;
    
    document.getElementById('modalSubjectContent').innerHTML = `
        <p style="margin-bottom: 1rem;">${desc}</p>
        <div class="subject-tags" style="margin-bottom: 1.5rem;">${tags.map(t => `<span class="subject-card-tag">${t}</span>`).join('')}</div>
        
        <div style="background: rgba(76,175,80,0.1); border-radius: 16px; padding: 1.2rem; margin-bottom: 1.5rem;">
            <h4 style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;"><i class="fas fa-microchip"></i> AI Educational Structures</h4>
            <div style="display: grid; gap: 0.8rem;">
                <div class="ai-structure-item" onclick="useAIStructure('Step-by-step lesson plan')"><i class="fas fa-list-ol"></i> Step-by-step lesson plan</div>
                <div class="ai-structure-item" onclick="useAIStructure('Interactive quiz generator')"><i class="fas fa-puzzle-piece"></i> Interactive quiz generator</div>
                <div class="ai-structure-item" onclick="useAIStructure('Code-switching tutor (English + Amharic)')"><i class="fas fa-language"></i> Code-switching tutor (English + Amharic)</div>
                <div class="ai-structure-item" onclick="useAIStructure('Practice problems generator')"><i class="fas fa-tasks"></i> Practice problems generator</div>
                <div class="ai-structure-item" onclick="useAIStructure('Progress tracker')"><i class="fas fa-chart-line"></i> Progress tracker</div>
                <div class="ai-structure-item" onclick="useAIStructure('Virtual lab / Simulation')"><i class="fas fa-microscope"></i> Virtual lab / Simulation</div>
            </div>
        </div>
        
        <div style="background: rgba(33,150,243,0.1); border-radius: 16px; padding: 1.2rem;">
            <h4 style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;"><i class="fas fa-download"></i> Available Resources</h4>
            <div style="display: grid; gap: 0.5rem;">
                <div class="ai-structure-item" onclick="downloadResource('Student Textbook')"><i class="fas fa-book"></i> Student Textbook (PDF)</div>
                <div class="ai-structure-item" onclick="downloadResource('Teacher\'s Guide')"><i class="fas fa-chalkboard"></i> Teacher's Guide (PDF)</div>
                <div class="ai-structure-item" onclick="downloadResource('Workbook')"><i class="fas fa-pen"></i> Workbook (PDF)</div>
                <div class="ai-structure-item" onclick="downloadResource('Video Lesson')"><i class="fas fa-video"></i> Video Lesson</div>
                <div class="ai-structure-item" onclick="downloadResource('Past Exam Questions')"><i class="fas fa-file-alt"></i> Past Exam Questions</div>
            </div>
        </div>
    `;
    
    document.getElementById('subjectDetailModal').classList.add('active');
}

function useAIStructure(structureName) {
    alert(`🎓 Launching AI Educational Tool: ${structureName}\n\nThis tool will help you master ${currentSubjectName} in ${currentSubjectGrade}!`);
}

function downloadResource(resourceName) {
    alert(`📥 Downloading ${resourceName} for ${currentSubjectName}\n\nThis resource is from the Ethiopian Ministry of Education.`);
}

function startLesson() {
    alert(`🎓 Starting lesson on ${currentSubjectName}\n\nAI Tutor is ready to guide you through the Ethiopian curriculum!`);
}

function takeQuiz() {
    alert(`📝 Starting quiz on ${currentSubjectName}\n\nAnswer questions to test your knowledge and earn XP!`);
}

function downloadTextbook() {
    alert(`📥 Downloading textbook for ${currentSubjectName}\n\nThis resource is provided by the Ethiopian Ministry of Education.`);
}

function watchVideo() {
    alert(`🎬 Playing video lesson for ${currentSubjectName}\n\nVideo tutorials are being prepared. Check back soon!`);
}

function closeSubjectModal() {
    document.getElementById('subjectDetailModal').classList.remove('active');
}

// ============================================
// 5. FILTER AND NAVIGATION
// ============================================

function initGradeNav() {
    const gradeBtns = document.querySelectorAll('.grade-nav-btn');
    gradeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            gradeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const grade = btn.dataset.grade;
            renderSubjectsMainContainer(grade, 'all');
            
            document.querySelectorAll('.quick-filter').forEach(f => f.classList.remove('active'));
            document.querySelector('.quick-filter[data-filter="all"]').classList.add('active');
        });
    });
}

function initQuickFilters() {
    const filters = document.querySelectorAll('.quick-filter');
    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            filters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            const category = filter.dataset.filter;
            renderSubjectsMainContainer(currentGradeFilter, category);
        });
    });
}

// ============================================
// 6. AUTHENTICATION (Shared with main)
// ============================================

function initAuth() {
    document.getElementById('loginBtn')?.addEventListener('click', () => document.getElementById('loginModal').classList.add('active'));
    document.getElementById('signupBtn')?.addEventListener('click', () => document.getElementById('signupModal').classList.add('active'));
    document.getElementById('doLoginBtn')?.addEventListener('click', () => {
        const email = document.getElementById('loginEmail')?.value;
        if (email) {
            localStorage.setItem('afritutor_user', JSON.stringify({ name: email.split('@')[0], email }));
            closeModals();
            location.reload();
        }
    });
    document.getElementById('doSignupBtn')?.addEventListener('click', () => {
        const name = document.getElementById('signupName')?.value;
        if (name) {
            localStorage.setItem('afritutor_user', JSON.stringify({ name, email: document.getElementById('signupEmail')?.value }));
            closeModals();
            location.reload();
        }
    });
    
    const user = localStorage.getItem('afritutor_user');
    if (user) {
        const u = JSON.parse(user);
        document.getElementById('userNameDisplay').innerText = u.name;
        document.getElementById('loginBtn').style.display = 'none';
        document.getElementById('signupBtn').style.display = 'none';
        document.getElementById('userAvatar').style.display = 'flex';
    }
}

function closeModals() {
    document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
}

// ============================================
// 7. INITIALIZE
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initSubjects3DBackground();
    renderSubjectsMainContainer('all', 'all');
    initGradeNav();
    initQuickFilters();
    initAuth();
    
    window.toggleGradeSection = toggleGradeSection;
    window.showSubjectDetail = showSubjectDetail;
    window.useAIStructure = useAIStructure;
    window.startLesson = startLesson;
    window.takeQuiz = takeQuiz;
    window.downloadTextbook = downloadTextbook;
    window.watchVideo = watchVideo;
    window.closeSubjectModal = closeSubjectModal;
    window.downloadResource = downloadResource;
    window.closeModals = closeModals;
    
    console.log('📚 Ethiopian Curriculum Subjects Page Loaded!');
});