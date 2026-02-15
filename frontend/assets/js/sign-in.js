// State Management
let currentMode = 'login';
let currentRole = 'client';

// DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const authOverlay = document.getElementById('authOverlay');
    const overlayToggle = document.getElementById('overlayToggle');
    const toggleText = document.getElementById('toggleText');
    const overlayTitle = document.getElementById('overlayTitle');
    const overlayDesc = document.getElementById('overlayDesc');
    const heroImage = document.getElementById('heroImage');
    const loginPanel = document.getElementById('loginPanel');
    const registerPanel = document.getElementById('registerPanel');
    const clientBtn = document.getElementById('clientBtn');
    const freelancerBtn = document.getElementById('freelancerBtn');
    const roleSlider = document.getElementById('roleSlider');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const skillField = document.getElementById('skillField');
    const skillInput = skillField?.querySelector('input');

    // Overlay Content
    const overlayContent = {
        login: {
            title: 'Jaringan Presisi untuk Solusi Expert',
            description: 'Rasakan koneksi tanpa hambatan antara permintaan industri premium dan output kreatif elite.',
            toggleText: 'Bergabung dengan Jaringan',
            image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000'
        },
        register: {
            title: 'Gerbang Premium Menuju Kesuksesan Global',
            description: 'Buka akses ke proyek berskala tinggi dan komunitas pembangun digital kelas dunia.',
            toggleText: 'Kembali ke Akses',
            image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1000'
        }
    };

    // Initialize Skill Field
    function initSkillField() {
        if (!skillField) return;
        
        if (currentRole === 'client') {
            skillField.style.display = 'none';
            skillField.style.opacity = '0';
            skillField.style.height = '0';
            skillField.style.margin = '0';
            skillField.style.padding = '0';
            skillField.style.overflow = 'hidden';
            if (skillInput) skillInput.required = false;
        } else {
            skillField.style.display = 'block';
            skillField.style.opacity = '1';
            skillField.style.height = 'auto';
            skillField.style.margin = '';
            skillField.style.padding = '';
            skillField.style.overflow = 'visible';
            if (skillInput) skillInput.required = true;
        }
    }

    // Toggle Mode Function
    function toggleMode() {
        if (currentMode === 'login') {
            currentMode = 'register';
            authOverlay?.classList.add('register-mode');
            
            if (loginPanel) {
                loginPanel.classList.remove('active');
                loginPanel.classList.add('inactive');
            }
            if (registerPanel) {
                registerPanel.classList.remove('inactive');
                registerPanel.classList.add('active');
            }
            
            if (currentRole !== 'client') {
                toggleRole('client');
            } else {
                initSkillField();
            }
        } else {
            currentMode = 'login';
            authOverlay?.classList.remove('register-mode');
            
            if (registerPanel) {
                registerPanel.classList.remove('active');
                registerPanel.classList.add('inactive');
            }
            if (loginPanel) {
                loginPanel.classList.remove('inactive');
                loginPanel.classList.add('active');
            }
        }
        
        // Update Overlay Content
        const content = overlayContent[currentMode];
        if (content) {
            [overlayTitle, overlayDesc, toggleText].forEach(el => {
                if (el) el.style.opacity = '0';
            });
            
            setTimeout(() => {
                if (overlayTitle) overlayTitle.textContent = content.title;
                if (overlayDesc) overlayDesc.textContent = content.description;
                if (toggleText) toggleText.textContent = content.toggleText;
                if (heroImage) heroImage.src = content.image;
                
                [overlayTitle, overlayDesc, toggleText].forEach(el => {
                    if (el) el.style.opacity = '1';
                });
            }, 200);
        }
    }

    // Toggle Role Function
    function toggleRole(role) {
        if (role === currentRole) return;
        
        if (registerForm) {
            registerForm.style.opacity = '0';
            registerForm.style.transform = 'translateY(10px)';
        }
        
        setTimeout(() => {
            currentRole = role;
            
            if (role === 'client') {
                clientBtn?.classList.add('active');
                freelancerBtn?.classList.remove('active');
                roleSlider?.classList.remove('freelancer');
                
                if (skillField) {
                    skillField.style.height = skillField.offsetHeight + 'px';
                    void skillField.offsetHeight;
                    skillField.style.height = '0';
                    skillField.style.opacity = '0';
                    skillField.style.margin = '0';
                    skillField.style.padding = '0';
                    skillField.style.overflow = 'hidden';
                    
                    setTimeout(() => {
                        if (currentRole === 'client') {
                            skillField.style.display = 'none';
                        }
                    }, 300);
                    
                    if (skillInput) skillInput.required = false;
                }
            } else {
                freelancerBtn?.classList.add('active');
                clientBtn?.classList.remove('active');
                roleSlider?.classList.add('freelancer');
                
                if (skillField) {
                    skillField.style.display = 'block';
                    skillField.style.height = '0';
                    skillField.style.opacity = '0';
                    skillField.style.overflow = 'hidden';
                    
                    void skillField.offsetHeight;
                    
                    skillField.style.height = 'auto';
                    const targetHeight = skillField.offsetHeight + 'px';
                    
                    skillField.style.height = '0';
                    void skillField.offsetHeight;
                    
                    skillField.style.height = targetHeight;
                    skillField.style.opacity = '1';
                    skillField.style.margin = '';
                    skillField.style.padding = '';
                    skillField.style.overflow = 'visible';
                    
                    if (skillInput) skillInput.required = true;
                    
                    setTimeout(() => {
                        if (currentRole === 'freelancer') {
                            skillField.style.height = 'auto';
                        }
                    }, 300);
                }
            }
            
            if (registerForm) {
                registerForm.style.opacity = '1';
                registerForm.style.transform = 'translateY(0)';
            }
        }, 100);
    }

    // Event Listeners
    overlayToggle?.addEventListener('click', toggleMode);
    clientBtn?.addEventListener('click', () => toggleRole('client'));
    freelancerBtn?.addEventListener('click', () => toggleRole('freelancer'));

    // Login Form Submit
    loginForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = loginForm.querySelector('input[type="email"]')?.value;
        const password = loginForm.querySelector('input[type="password"]')?.value;
        
        if (!email || !password) {
            alert('Email dan password harus diisi!');
            return;
        }
        
        window.location.href = 'client-dashboard.html';
    });

    // Register Form Submit
    registerForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const firstName = registerForm.querySelector('input[placeholder="John"]')?.value;
        const lastName = registerForm.querySelector('input[placeholder="Doe"]')?.value;
        const email = registerForm.querySelector('input[type="email"]')?.value;
        const password = registerForm.querySelector('input[type="password"]')?.value;
        
        if (!firstName || !lastName || !email || !password) {
            alert('Semua field harus diisi!');
            return;
        }
        
        let skill = '';
        if (currentRole === 'freelancer') {
            skill = skillInput?.value || '';
            if (!skill) {
                alert('Field Keahlian harus diisi untuk Freelancer!');
                return;
            }
        }
        
        console.log('Data registrasi:', {
            role: currentRole,
            firstName,
            lastName,
            email,
            skill: skill || '-',
            password: '***hidden***'
        });
        
        alert(`Registrasi sebagai ${currentRole.toUpperCase()} berhasil!\n\nData:\n- Nama: ${firstName} ${lastName}\n- Email: ${email}\n${currentRole === 'freelancer' ? `- Keahlian: ${skill}\n` : ''}`);
    });

    // Social Buttons
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const provider = btn.textContent.trim().split(' ')[0];
            alert(`Login dengan ${provider} (Demo)`);
        });
    });

    // Tags Click
    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('click', () => {
            tag.style.transform = 'scale(1.1)';
            setTimeout(() => tag.style.transform = 'scale(1)', 200);
        });
    });

    // Forgot Password
    document.querySelector('.forgot-link')?.addEventListener('click', (e) => {
        e.preventDefault();
        const email = loginForm?.querySelector('input[type="email"]')?.value;
        if (email) {
            alert(`Link reset password dikirim ke ${email}`);
        } else {
            alert('Masukkan email Anda terlebih dahulu');
        }
    });

    // Setup Transitions
    if (skillField) {
        skillField.style.transition = 'height 0.3s ease, opacity 0.3s ease, margin 0.3s ease, padding 0.3s ease';
    }
    
    [overlayTitle, overlayDesc, toggleText].forEach(el => {
        if (el) el.style.transition = 'opacity 0.3s ease';
    });

    if (registerForm) {
        registerForm.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    }

    // Initialize App
    initSkillField();
    
    if (currentMode === 'login') {
        loginPanel?.classList.add('active');
        loginPanel?.classList.remove('inactive');
        registerPanel?.classList.add('inactive');
        registerPanel?.classList.remove('active');
    } else {
        registerPanel?.classList.add('active');
        registerPanel?.classList.remove('inactive');
        loginPanel?.classList.add('inactive');
        loginPanel?.classList.remove('active');
    }
});
