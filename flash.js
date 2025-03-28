const body = document.querySelector("body"),
    sidebar = body.querySelector(".sidebar"),
    toggle=body.querySelector(".toggle"),
    modeSwitch=body.querySelector(".toggle-switch"),
    modeText=body.querySelector(".mode-text");

    toggle.addEventListener("click",() =>{
        sidebar.classList.toggle("close");
    });
    modeSwitch.addEventListener("click",() =>{
        body.classList.toggle("dark");

        if(body.classList.contains("dark")){
            modeText.innerText ="Light Mode"
        }
        else{
            modeText.innerText="Dark Mode"
        }
    });

document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const questionInput = document.getElementById('question');
    const answerInput = document.getElementById('answer');
    const subjectSelect = document.getElementById('subject');
    const chapterInput = document.getElementById('chapter');
    const createBtn = document.getElementById('create-btn');
    const cardsContainer = document.getElementById('cards-container');
    const deleteBtn = document.getElementById('delete-btn');
    
    // State
    let cards = [];
    let deleteMode = false;
    
    // Event listeners
    createBtn.addEventListener('click', createCard);
    deleteBtn.addEventListener('click', toggleDeleteMode);
    
    // Functions
    function createCard() {
        const question = questionInput.value.trim();
        const answer = answerInput.value.trim();
        const subject = subjectSelect.value;
        const chapter = chapterInput.value.trim();
        
        if (!question || !answer || !subject || !chapter) {
            alert('Please fill in all fields');
            return;
        }
        
        const card = {
            id: Date.now().toString(),
            question,
            answer,
            subject,
            chapter
        };
        
        cards.push(card);
        renderCard(card);
        
        // Reset form
        questionInput.value = '';
        answerInput.value = '';
        subjectSelect.selectedIndex = 0;
        chapterInput.value = '';
        
        // Show delete button if it's the first card
        if (cards.length === 1) {
            deleteBtn.classList.remove('hidden');
        }
    }
    
    function renderCard(card) {
        const cardElement = document.createElement('div');
        cardElement.className = 'flash-card pop-in';
        cardElement.dataset.id = card.id;
        cardElement.dataset.subject = card.subject;
        
        cardElement.innerHTML = `
            <div class="flash-card-inner">
                <div class="flash-card-front ${card.subject}">
                    <div class="card-header card-front-header">
                        ${capitalizeFirstLetter(card.subject)} - ${card.chapter}
                    </div>
                    <div class="card-content">
                        <p class="card-question">${card.question}</p>
                    </div>
                    <div class="card-footer card-front-footer">Click to flip</div>
                </div>
                <div class="flash-card-back">
                    <div class="card-header card-back-header">
                        ${capitalizeFirstLetter(card.subject)} - ${card.chapter}
                    </div>
                    <div class="card-content">
                        <p class="card-answer">${card.answer}</p>
                    </div>
                    <div class="card-footer card-back-footer">Click to flip back</div>
                </div>
            </div>
            <div class="delete-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </div>
        `;
        
        // Add event listeners
        cardElement.addEventListener('click', function(e) {
            if (!deleteMode) {
                this.classList.toggle('flipped');
            }
        });
        
        const deleteIcon = cardElement.querySelector('.delete-icon');
        deleteIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            const cardId = this.parentNode.dataset.id;
            deleteCard(cardId);
        });
        
        cardsContainer.appendChild(cardElement);
    }
    
    function toggleDeleteMode() {
        deleteMode = !deleteMode;
        deleteBtn.classList.toggle('active');
        
        const deleteIcons = document.querySelectorAll('.delete-icon');
        deleteIcons.forEach(icon => {
            icon.classList.toggle('visible', deleteMode);
        });
    }
    
    function deleteCard(id) {
        const cardElement = document.querySelector(`.flash-card[data-id="${id}"]`);
        const rect = cardElement.getBoundingClientRect();
        const subject = cardElement.dataset.subject;
        
        // Create particles before removing the card
        createParticles(rect, subject);
        
        cardElement.classList.add('pop-out');
        
        // Remove card from array and DOM after animation
        setTimeout(() => {
            cards = cards.filter(card => card.id !== id);
            cardElement.remove();
            
            // Hide delete button if no cards left
            if (cards.length === 0) {
                deleteBtn.classList.add('hidden');
                deleteMode = false;
                deleteBtn.classList.remove('active');
            }
        }, 300);
    }
    
    function createParticles(rect, subject) {
        // Get colors based on subject
        let colors;
        switch (subject) {
            case 'chemistry':
                colors = ['#f97316', '#ef4444', '#f87171', '#fb923c'];
                break;
            case 'physics':
                colors = ['#f97316', '#f59e0b', '#fbbf24', '#fb923c'];
                break;
            case 'mathematics':
                colors = ['#facc15', '#f59e0b', '#fbbf24', '#fcd34d'];
                break;
            default:
                colors = ['#f97316', '#ef4444', '#f59e0b', '#facc15'];
        }
        
        // Create particles
        const particleCount = 40;
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < particleCount; i++) {
            createParticle(centerX, centerY, colors[Math.floor(Math.random() * colors.length)]);
        }
    }
    
    function createParticle(x, y, color) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        document.body.appendChild(particle);
        
        // Random size between 5 and 15 pixels
        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = color;
        
        // Initial position
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        // Random direction and speed
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 200 + 100;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        
        // Random rotation
        const rotation = Math.random() * 360;
        particle.style.transform = `rotate(${rotation}deg)`;
        
        // Animation
        const startTime = Date.now();
        const duration = Math.random() * 600 + 400; // 400-1000ms
        
        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / duration;
            
            if (progress >= 1) {
                particle.remove();
                return;
            }
            
            // Position based on time
            const currentX = x + vx * progress;
            const currentY = y + vy * progress + 0.5 * 980 * progress * progress; // Add gravity
            
            // Update position
            particle.style.left = `${currentX}px`;
            particle.style.top = `${currentY}px`;
            
            // Fade out
            particle.style.opacity = 1 - progress;
            
            // Continue animation
            requestAnimationFrame(animate);
        }
        
        requestAnimationFrame(animate);
    }
    
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});