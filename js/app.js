// ============================================
// AFRITUTOR AI - UNIFIED JAVASCRIPT
// Ethiopian New Curriculum Platform
// Version: 3.0 | Complete Integration 2026
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
    
    const ethiopiaColors = [0x078930, 0xFCDD09, 0xDA121A, 0x4CAF50];
    
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
    
    const ambientLight = new THREE.AmbientLight(0x404060);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x4CAF50, 0.9);
    pointLight.position.set(8, 6, 6);
    scene.add(pointLight);
    
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.008;
        particlesMesh.rotation.y += 0.0003;
        particlesMesh.rotation.x = Math.sin(time * 0.15) * 0.05;
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
// 2. AI TUTOR KNOWLEDGE BASE
// ============================================

const knowledgeBase = {
    "photosynthesis": "🌿 <strong>Photosynthesis</strong> is the process by which green plants make their own food using sunlight, water, and carbon dioxide. It occurs in the chloroplasts of plant cells and produces glucose and oxygen.",
    "cell": "🔬 A <strong>cell</strong> is the smallest structural and functional unit of all living organisms. All cells have a cell membrane, cytoplasm, and nucleus (in eukaryotic cells).",
    "mitosis": "🧬 <strong>Mitosis</strong> is a type of cell division that produces two identical daughter cells. It's essential for growth and repair in living organisms.",
    "atom": "⚛️ An <strong>atom</strong> is the smallest unit of matter that retains the properties of an element. It consists of a nucleus (protons and neutrons) surrounded by electrons.",
    "gravity": "🌍 <strong>Gravity</strong> is the force of attraction between all objects with mass. It's what keeps us on Earth!",
    "energy": "⚡ <strong>Energy</strong> is the capacity to do work. It exists in many forms: kinetic, potential, thermal, chemical, electrical, and nuclear.",
    "default": "📚 <strong>Great question!</strong> I'm here to help you master the Ethiopian curriculum. Try asking about Biology, Chemistry, Physics, Mathematics, History, or any subject!"
};

function getBotResponse(question) {
    const lowerQ = question.toLowerCase();
    
    if (lowerQ.match(/hello|hi|hey|selam|ሰላም/i)) {
        return "👋 <strong>Hello! ሰላም!</strong> Welcome! What would you like to learn today?";
    }
    
    if (lowerQ.match(/thank|thanks|አመሰግናለሁ/i)) {
        return "😊 <strong>You're welcome!</strong> Keep studying hard! 🎓";
    }
    
    for (let [key, value] of Object.entries(knowledgeBase)) {
        if (lowerQ.includes(key) && key !== "default") {
            return value;
        }
    }
    
    return knowledgeBase.default;
}

// ============================================
// 3. CHAT FUNCTIONALITY
// ============================================

let chatHistory = JSON.parse(localStorage.getItem('afritutor_chat')) || [];

function addMessage(role, text) {
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
    
    chatHistory.push({ role, text, timestamp: Date.now() });
    if (chatHistory.length > 100) chatHistory = chatHistory.slice(-100);
    localStorage.setItem('afritutor_chat', JSON.stringify(chatHistory));
}

async function sendMessage() {
    const input = document.getElementById('tutorInput');
    const question = input.value.trim();
    if (!question) return;
    
    addMessage('user', question);
    input.value = '';
    
    setTimeout(() => {
        const response = getBotResponse(question);
        addMessage('assistant', response);
        updateProgress(5);
    }, 600);
}

function clearChat() {
    if (confirm('Clear all chat history?')) {
        chatHistory = [];
        localStorage.removeItem('afritutor_chat');
        const messagesContainer = document.getElementById('tutorMessages');
        if (messagesContainer) {
            messagesContainer.innerHTML = `
                <div class="message assistant">
                    <div class="message-avatar"><i class="fas fa-robot"></i></div>
                    <div class="message-bubble">
                        <div class="message-content">🌍 <strong>Selam! ሰላም! Jambo! Hello!</strong><br><br>Chat cleared! Ask me anything about the Ethiopian curriculum.</div>
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

// ============================================
// 4. ETHIOPIAN CURRICULUM DATA
// ============================================

const ethiopianCurriculumData = {
    grade6: { 
        name: "📘 Grade 6", 
        subjects: [
            { name: "Mother Tongue", icon: "🗣️", desc: "Regional language proficiency", tags: ["Speaking", "Writing"] },
            { name: "English", icon: "🇬🇧", desc: "English language skills", tags: ["Grammar", "Vocab"] },
            { name: "Mathematics", icon: "📐", desc: "Basic math concepts", tags: ["Arithmetic", "Geometry"] },
            { name: "General Science", icon: "🔬", desc: "Integrated science", tags: ["Biology", "Chemistry"] },
            { name: "Social Studies", icon: "🌍", desc: "Geography & History", tags: ["Ethiopia", "World"] },
            { name: "Career & Technical Education", icon: "💼", desc: "Vocational skills", tags: ["Skills"] },
            { name: "Performing & Visual Arts", icon: "🎨", desc: "Creative arts", tags: ["Music", "Art"] },
            { name: "Health & Physical Education", icon: "🏃", desc: "Fitness & wellness", tags: ["Sports"] },
            { name: "Moral Education", icon: "⭐", desc: "Ethics & values", tags: ["Character"] }
        ]
    },
    grade7: { 
        name: "📙 Grade 7-8", 
        subjects: [
            { name: "Mother Tongue", icon: "🗣️", desc: "Regional language", tags: ["Native"] },
            { name: "Amharic", icon: "🇪🇹", desc: "National language", tags: ["አማርኛ"] },
            { name: "English", icon: "🇬🇧", desc: "English language", tags: ["Grammar"] },
            { name: "Mathematics", icon: "📐", desc: "Math skills", tags: ["Algebra", "Geometry"] },
            { name: "General Science", icon: "🔬", desc: "Integrated science", tags: ["Biology", "Chemistry"] },
            { name: "Social Studies", icon: "🌍", desc: "Social sciences", tags: ["History", "Geography"] },
            { name: "Citizenship Education", icon: "👥", desc: "Civic education", tags: ["Rights"] },
            { name: "Information Technology", icon: "💻", desc: "Computer skills", tags: ["Digital"] },
            { name: "Career & Technical Education", icon: "💼", desc: "Vocational skills", tags: ["Career"] },
            { name: "Performing & Visual Arts", icon: "🎨", desc: "Creative arts", tags: ["Art"] },
            { name: "Health & Physical Education", icon: "🏃", desc: "Fitness", tags: ["Health"] }
        ]
    },
    grade9: { 
        name: "📕 Grade 9-10", 
        subjects: [
            { name: "English", icon: "🇬🇧", desc: "Advanced English", tags: ["Literature"] },
            { name: "Mathematics", icon: "📐", desc: "Advanced math", tags: ["Algebra", "Trig"] },
            { name: "Physics", icon: "⚡", desc: "Physical sciences", tags: ["Mechanics"] },
            { name: "Chemistry", icon: "🧪", desc: "Chemical sciences", tags: ["Reactions"] },
            { name: "Biology", icon: "🧬", desc: "Life sciences", tags: ["Cells", "Ecology"] },
            { name: "Geography", icon: "🗺️", desc: "Physical geography", tags: ["Maps"] },
            { name: "History", icon: "📜", desc: "World & Ethiopian history", tags: ["Ancient"] },
            { name: "Citizenship Education", icon: "👥", desc: "Civic education", tags: ["Democracy"] },
            { name: "Information Technology", icon: "💻", desc: "Computer science", tags: ["Programming"] },
            { name: "Career & Technical Education", icon: "💼", desc: "Career prep", tags: ["Skills"] },
            { name: "Amharic (Elective)", icon: "📖", desc: "Language elective", tags: ["Optional"] },
            { name: "Health & Physical Education", icon: "🏃", desc: "Fitness", tags: ["Optional"] }
        ]
    },
    naturalScience: {
        name: "🔬 Natural Science (Grade 11-12)",
        subjects: [
            { name: "Mathematics", icon: "📐", desc: "Calculus & Linear Algebra", tags: ["Calculus"] },
            { name: "Physics", icon: "⚡", desc: "Advanced Physics", tags: ["Quantum"] },
            { name: "Chemistry", icon: "🧪", desc: "Advanced Chemistry", tags: ["Organic"] },
            { name: "Biology", icon: "🧬", desc: "Advanced Biology", tags: ["Genetics"] },
            { name: "English", icon: "🇬🇧", desc: "Academic English", tags: ["Writing"] },
            { name: "Information Technology", icon: "💻", desc: "Computer applications", tags: ["Data Science"] },
            { name: "Citizenship Education", icon: "👥", desc: "Civic education", tags: ["Ethics"] },
            { name: "Health & Physical Education", icon: "🏃", desc: "Wellness", tags: ["Fitness"] }
        ]
    },
    socialScience: {
        name: "🌍 Social Science (Grade 11-12)",
        subjects: [
            { name: "Mathematics", icon: "📐", desc: "Statistics", tags: ["Statistics"] },
            { name: "Economics", icon: "📊", desc: "Micro & Macro", tags: ["Economics"] },
            { name: "Geography", icon: "🗺️", desc: "Human geography", tags: ["Cartography"] },
            { name: "History", icon: "📜", desc: "World & Ethiopian history", tags: ["Modern"] },
            { name: "English", icon: "🇬🇧", desc: "Academic English", tags: ["Writing"] },
            { name: "Information Technology", icon: "💻", desc: "Computer applications", tags: ["Digital"] },
            { name: "Citizenship Education", icon: "👥", desc: "Civic education", tags: ["Ethics"] },
            { name: "General Business Studies", icon: "💼", desc: "Business track", tags: ["Business"] }
        ]
    },
    universityNatural: {
        name: "🎓 University Natural Science (Freshman)",
        subjects: [
            { name: "Mathematics for Natural Sciences", icon: "📐", desc: "Calculus, Linear Algebra", tags: ["Core"] },
            { name: "General Physics", icon: "⚡", desc: "Mechanics, Thermodynamics", tags: ["Core"] },
            { name: "General Chemistry", icon: "🧪", desc: "Atomic Structure", tags: ["Core"] },
            { name: "General Biology", icon: "🧬", desc: "Cell Biology", tags: ["Core"] },
            { name: "Communicative English", icon: "🇬🇧", desc: "Academic writing", tags: ["Core"] },
            { name: "Critical Thinking", icon: "🧠", desc: "Logical reasoning", tags: ["Core"] },
            { name: "Emerging Technologies", icon: "🤖", desc: "AI, IoT, Blockchain", tags: ["Core"] },
            { name: "Inclusiveness", icon: "🤝", desc: "Special needs", tags: ["Core"] },
            { name: "Physical Fitness", icon: "🏃", desc: "Health", tags: ["Core"] }
        ]
    },
    universitySocial: {
        name: "🏛️ University Social Science (Freshman)",
        subjects: [
            { name: "Mathematics for Social Sciences", icon: "📐", desc: "Statistics", tags: ["Core"] },
            { name: "Geography of Ethiopia", icon: "🗺️", desc: "Physical geography", tags: ["Core"] },
            { name: "History of Ethiopia", icon: "📜", desc: "Ethiopian history", tags: ["Core"] },
            { name: "Economics", icon: "📊", desc: "Micro and Macro", tags: ["Core"] },
            { name: "General Psychology", icon: "🧠", desc: "Human behavior", tags: ["Core"] },
            { name: "Social Anthropology", icon: "👥", desc: "Culture", tags: ["Core"] },
            { name: "Global Trends", icon: "🌍", desc: "International relations", tags: ["Core"] },
            { name: "Moral & Civic Education", icon: "⭐", desc: "Ethics", tags: ["Core"] },
            { name: "Communicative English", icon: "🇬🇧", desc: "Academic English", tags: ["Core"] },
            { name: "Critical Thinking", icon: "🧠", desc: "Reasoning", tags: ["Core"] },
            { name: "Entrepreneurship", icon: "💼", desc: "Business", tags: ["Core"] }
        ]
    }
};

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
        
        sectionDiv.innerHTML = `
            <div class="grade-section-header" onclick="toggleSection('${section.id}')">
                <h2>${section.data.name}</h2>
                <i class="fas fa-chevron-down"></i>
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
    const section = document.querySelector(`#grid-${id}`);
    if (section) section.parentElement.classList.toggle('collapsed');
}

function renderTextbookGrid() {
    const container = document.getElementById('textbookGrid');
    if (!container) return;
    const textbooks = [
        { title: "Ministry of Education Portal", type: "Official", url: "https://www.moe.gov.et" },
        { title: "NEAEA Past Papers", type: "Exams", url: "https://www.neaea.gov.et" },
        { title: "Ethiopian Digital Library", type: "Library", url: "https://www.ethiodigitallibrary.com" },
        { title: "EAES Exam Papers", type: "Tests", url: "https://www.eaes.gov.et" }
    ];
    
    container.innerHTML = textbooks.map(t => `
        <div class="textbook-card" onclick="window.open('${t.url}', '_blank')">
            <div class="textbook-icon">📚</div>
            <div class="textbook-info">
                <div class="textbook-title">${t.title}</div>
                <div class="textbook-meta">${t.type}</div>
            </div>
            <button class="small-btn"><i class="fas fa-external-link-alt"></i></button>
        </div>
    `).join('');
}

function renderResources() {
    const container = document.getElementById('resourcesGrid');
    if (!container) return;
    const resources = [
        { title: "Ethiopian Textbooks", icon: "📚", desc: "Official curriculum books" },
        { title: "Video Lessons", icon: "🎥", desc: "Physics, Chemistry, Biology" },
        { title: "Past Papers", icon: "📝", desc: "Grade 10 & 12 exams" },
        { title: "Study Guides", icon: "📖", desc: "Complete study materials" },
        { title: "Practice Tests", icon: "✏️", desc: "Interactive quizzes" },
        { title: "Teacher Guides", icon: "👨‍🏫", desc: "Curriculum guides" }
    ];
    
    container.innerHTML = resources.map(r => `
        <div class="glass-card">
            <div style="font-size:2rem">${r.icon}</div>
            <h3>${r.title}</h3>
            <p>${r.desc}</p>
            <button class="small-btn" onclick="alert('${r.title} coming soon!')">Access →</button>
        </div>
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
            <h4><i class="fas fa-microchip"></i> AI Tools</h4>
            <div class="ai-structure-item" onclick="alert('Lesson started for ${name}!')"><i class="fas fa-list-ol"></i> Start Lesson</div>
            <div class="ai-structure-item" onclick="alert('Quiz started for ${name}!')"><i class="fas fa-puzzle-piece"></i> Take Quiz</div>
            <div class="ai-structure-item" onclick="alert('Resources for ${name} downloading...')"><i class="fas fa-download"></i> Download Resources</div>
        </div>
    `;
    document.getElementById('subjectDetailModal').classList.add('active');
}

function startLesson() { alert(`🎓 Starting lesson on ${currentSubject}`); closeSubjectModal(); }
function takeQuiz() { alert(`📝 Starting quiz on ${currentSubject}`); closeSubjectModal(); }
function downloadTextbook() { alert(`📥 Downloading textbook for ${currentSubject}`); closeSubjectModal(); }
function watchVideo() { alert(`🎬 Playing video for ${currentSubject}`); closeSubjectModal(); }
function closeSubjectModal() { document.getElementById('subjectDetailModal').classList.remove('active'); }

function navigateToPage(pageId) { 
    document.querySelector(`[data-page="${pageId}"]`)?.click(); 
}

function goToGrade(grade) { 
    navigateToPage('subjects'); 
    setTimeout(() => { 
        document.querySelector(`.filter-btn[data-filter="${grade}"]`)?.click(); 
    }, 100); 
}

// ============================================
// 7. QUIZ FUNCTIONS
// ============================================

function renderQuiz() {
    const container = document.getElementById('quizQuestionsContainer');
    if (!container) return;
    container.innerHTML = `
        <div class="quiz-question"><p><strong>1. What is photosynthesis?</strong></p>${['Process of eating', 'Making food from sunlight', 'Plant respiration', 'Soil absorption'].map((opt, i) => `<label class="quiz-opt"><input type="radio" name="q0" value="${i}"> ${opt}</label>`).join('')}</div>
        <div class="quiz-question"><p><strong>2. Which is a mammal?</strong></p>${['Fish', 'Bird', 'Lion', 'Snake'].map((opt, i) => `<label class="quiz-opt"><input type="radio" name="q1" value="${i}"> ${opt}</label>`).join('')}</div>
        <div class="quiz-question"><p><strong>3. What is 2+2?</strong></p>${['3', '4', '5', '6'].map((opt, i) => `<label class="quiz-opt"><input type="radio" name="q2" value="${i}"> ${opt}</label>`).join('')}</div>
        <button class="primary-btn" id="submitQuizBtn" onclick="submitQuiz()"><i class="fas fa-check"></i> Submit Quiz</button>
    `;
}

function submitQuiz() {
    let score = 0;
    const answers = [1, 2, 1];
    for (let i = 0; i < 3; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (selected && parseInt(selected.value) === answers[i]) score++;
    }
    const result = document.getElementById('quizResult');
    result.innerHTML = `<strong>Score: ${score}/3 (${Math.round(score/3*100)}%)</strong><br>${score === 3 ? '🎉 Perfect! +30 XP' : '📚 Keep learning! +' + (score * 10) + ' XP'}`;
    result.classList.add('show');
    updateProgress(score * 10);
}

function generateQuiz() { 
    renderQuiz(); 
    document.getElementById('quizResult').classList.remove('show'); 
}

// ============================================
// 8. ASSESSMENT & ANALYTICS
// ============================================

function gradeEssay() {
    const essay = document.getElementById('essayInput')?.value;
    if (!essay) { alert("Please paste an essay to grade."); return; }
    const wordCount = essay.split(/\s+/).length;
    const score = Math.min(100, Math.floor(wordCount / 10) + 50);
    document.getElementById('gradingResult').innerHTML = `<strong>AI Grading:</strong><br>Words: ${wordCount}<br>Score: ${score}%<br>Feedback: ${score >= 70 ? "Excellent work!" : "Good effort, keep improving!"}`;
}

function loadCompetencyTable() {
    const container = document.getElementById('competencyTable');
    if (!container) return;
    const competencies = [
        { name: "Mathematics", score: 75 },
        { name: "Physics", score: 68 },
        { name: "Biology", score: 82 },
        { name: "English", score: 71 },
        { name: "History", score: 65 }
    ];
    container.innerHTML = competencies.map(c => `<div style="margin-bottom:1rem"><div style="display:flex;justify-content:space-between;margin-bottom:0.5rem"><span>${c.name}</span><span>${c.score}%</span></div><div style="background:rgba(76,175,80,0.2);height:8px;border-radius:4px;overflow:hidden"><div style="background:linear-gradient(90deg,var(--primary),var(--secondary));height:100%;width:${c.score}%"></div></div></div>`).join('');
}

let perfChart, heatChart;

function initCharts() {
    const ctx1 = document.getElementById('performanceChart')?.getContext('2d');
    const ctx2 = document.getElementById('heatmapChart')?.getContext('2d');
    
    if (ctx1) {
        if (perfChart) perfChart.destroy();
        perfChart = new Chart(ctx1, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{
                    label: 'Performance %',
                    data: [65, 72, 78, 85],
                    borderColor: '#4CAF50',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    tension: 0.4
                }]
            },
            options: { responsive: true, maintainAspectRatio: true }
        });
    }
    
    if (ctx2) {
        if (heatChart) heatChart.destroy();
        heatChart = new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: ['Math', 'Science', 'Language', 'History', 'CS'],
                datasets: [{
                    label: 'Mastery Score',
                    data: [75, 80, 70, 85, 72],
                    backgroundColor: '#4CAF50'
                }]
            },
            options: { responsive: true, maintainAspectRatio: true }
        });
    }
    
    document.getElementById('predictiveRisk').innerText = '15%';
    document.getElementById('engagementRate').innerText = '78%';
    document.getElementById('curriculumEfficacy').innerText = '82%';
}

// ============================================
// 9. PROGRESS & STORAGE
// ============================================

let userProgress = JSON.parse(localStorage.getItem('afritutor_progress')) || { xp: 0, streak: 0, completed: 0, mastery: 0 };

function updateProgress(xpGain = 0) {
    userProgress.xp += xpGain;
    userProgress.completed = Math.min(50, userProgress.completed + 1);
    userProgress.mastery = Math.min(100, userProgress.mastery + 1);
    localStorage.setItem('afritutor_progress', JSON.stringify(userProgress));
    
    ['completedSubjects', 'totalXp', 'currentStreak', 'masteryLevel'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.innerText = id === 'completedSubjects' ? userProgress.completed :
                          id === 'totalXp' ? userProgress.xp :
                          id === 'currentStreak' ? userProgress.streak :
                          userProgress.mastery;
        }
    });
    
    const pathBar = document.getElementById('learningPathProgress');
    if (pathBar) pathBar.style.width = userProgress.mastery + '%';
}

// ============================================
// 10. NAVIGATION & SETTINGS
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
    document.getElementById('tutorInput')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    });
    document.getElementById('generateQuizBtn')?.addEventListener('click', generateQuiz);
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
    document.getElementById('saveSettingsBtn')?.addEventListener('click', () => alert('⚙️ Settings saved!'));
    document.getElementById('resetSettingsBtn')?.addEventListener('click', () => { localStorage.clear(); location.reload(); });
}

// ============================================
// 11. AUTHENTICATION
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
            localStorage.setItem('afritutor_user', JSON.stringify({ 
                name, 
                email: document.getElementById('signupEmail')?.value 
            }));
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
// 12. INITIALIZE
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    init3DBackground();
    initNavigation();
    initSettings();
    initAuth();
    renderSubjects('all');
    renderTextbookGrid();
    renderResources();
    renderQuiz();
    loadCompetencyTable();
    initCharts();
    updateProgress(0);
    
    window.toggleSection = toggleSection;
    window.showSubjectDetail = showSubjectDetail;
    window.startLesson = startLesson;
    window.takeQuiz = takeQuiz;
    window.downloadTextbook = downloadTextbook;
    window.watchVideo = watchVideo;
    window.closeSubjectModal = closeSubjectModal;
    window.navigateToPage = navigateToPage;
    window.goToGrade = goToGrade;
    window.askQuestion = askQuestion;
    window.sendMessage = sendMessage;
    window.gradeEssay = gradeEssay;
    window.submitQuiz = submitQuiz;
    window.generateQuiz = generateQuiz;
    window.closeModals = closeModals;
    
    console.log('🚀 AfriTutor AI - Complete Platform Loaded!');
});
