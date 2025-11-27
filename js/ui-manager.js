// ui-manager.js - Gestión de interfaz según rol de usuario

const UIManager = {
    // Inicializar la interfaz según el rol
    init() {
        // Verificar autenticación
        if (!AuthManager.isAuthenticated()) {
            window.location.href = 'features/form/login.html';
            return;
        }

        const role = AuthManager.getUserRole();
        const username = AuthManager.getUsername();

        // Mostrar información del usuario en el header
        this.showUserInfo(username, role);

        // Configurar interfaz según rol
        this.setupRoleBasedUI(role);

        // Cargar hallazgos
        HallazgosManager.render('hallazgosList');
    },

    // Mostrar información del usuario
    showUserInfo(username, role) {
        const nav = document.querySelector('header nav');
        if (nav) {
            const userInfo = document.createElement('div');
            userInfo.style.cssText = 'display: flex; align-items: center; gap: 12px; margin-left: 20px;';
            userInfo.innerHTML = `
                <span class="small" style="color: #fff;">
                    <strong>${username}</strong> (${role})
                </span>
                <button class="btn-small" onclick="AuthManager.logout()" style="background: #d32f2f; color: white;">
                    Cerrar Sesión
                </button>
            `;
            nav.appendChild(userInfo);
        }
    },

    // Configurar interfaz según rol
    setupRoleBasedUI(role) {
        const hallazgoForm = document.getElementById('hallazgoForm');
        const hallazgosList = document.getElementById('hallazgosList');

        if (role === 'trabajador') {
            // Trabajador: solo ve el formulario
            if (hallazgoForm) {
                hallazgoForm.style.display = 'block';
                // Configurar el botón de registro
                const registerBtn = hallazgoForm.querySelector('button[onclick*="addHallazgo"]');
                if (registerBtn) {
                    registerBtn.onclick = () => this.addHallazgoFromForm();
                }
            }
            if (hallazgosList) {
                hallazgosList.style.display = 'none';
            }
        } else if (role === 'admin') {
            // Admin: solo ve la lista
            if (hallazgoForm) {
                hallazgoForm.style.display = 'none';
            }
            if (hallazgosList) {
                hallazgosList.style.display = 'block';
            }
        }
    },

    // Agregar hallazgo desde el formulario
    addHallazgoFromForm() {
        const descripcion = document.getElementById('hallazgoDesc').value.trim();
        const impacto = document.getElementById('hallazgoImpact').value.trim();
        const recomendacion = document.getElementById('hallazgoRec').value.trim();
        const responsable = document.getElementById('hallazgoResp').value.trim();

        if (!descripcion || !impacto || !recomendacion || !responsable) {
            alert('Completa todos los campos del hallazgo.');
            return;
        }

        const hallazgo = {
            descripcion,
            impacto,
            recomendacion,
            responsable
        };

        const newHallazgo = HallazgosManager.add(hallazgo);

        // Limpiar formulario
        document.getElementById('hallazgoDesc').value = '';
        document.getElementById('hallazgoImpact').value = '';
        document.getElementById('hallazgoRec').value = '';
        document.getElementById('hallazgoResp').value = '';

        // Mostrar mensaje de éxito
        document.getElementById('status').innerText = 'Hallazgo registrado: ' + newHallazgo.id;
        
        alert('Hallazgo registrado correctamente con ID: ' + newHallazgo.id);
    }
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    UIManager.init();
});
