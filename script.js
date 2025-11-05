// Smooth Scroll and Resume Download Function
function scrollToSection(id) {
    if (id === 'resume') {
        // IMPORTANT: Ensure 'Sanjay_Kumar_Resume.pdf' is the correct file name/path
        window.open('Sanjay_Kumar_Resume.pdf', '_blank'); 
        return; 
    }
    
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// --- MODAL/POP-UP LOGIC ---
const modal = document.getElementById("certModal");
const modalImg = document.getElementById("modalImage");
const modalMessageContainer = document.getElementById("modalMessageContainer");

function openModal(imgSrc, captionText) {
    modalImg.src = imgSrc;
    modalImg.style.display = 'block';
    modalMessageContainer.innerHTML = '';
    modal.style.display = "block";
}

function showMessageModal(title, message) {
    modalImg.style.display = 'none';
    modalMessageContainer.innerHTML = `
        <div class="modal-message">
            <h4>${title}</h4>
            <p style="color: var(--color-muted);">${message}</p>
            <p style="margin-top: 1rem; font-size: 0.9rem;">Click outside to close.</p>
        </div>
    `;
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

modal.onclick = function(event) {
    if (event.target === modal) {
        closeModal();
    }
}

// --- FORM SUBMISSION HANDLER (Uses Fetch for clean Formspree submission) ---
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    const form = event.target;
    const data = new FormData(form);
    
    fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            showMessageModal(
                "🙏 Message Received!",
                "Thank you for contacting me. I will respond to your message shortly."
            );
            form.reset();
        } else {
            response.json().then(data => {
                showMessageModal(
                    "❌ Submission Error",
                    data.error ? data.error : "There was a problem submitting your form."
                );
            })
        }
    }).catch(error => {
        showMessageModal(
            "❌ Connection Error",
            "Could not connect to the server. Please try emailing directly."
        );
    });
});


// --- SCROLL ANIMATIONS (Intersection Observer) ---
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0; 
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, delay); 
            }
        });
    }, { 
        threshold: 0.1, 
        rootMargin: "0px 0px -50px 0px" 
    });

    const elements = document.querySelectorAll('.animated-element');
    elements.forEach((element, index) => {
        element.dataset.delay = index * 50; 
        observer.observe(element);
    });
});