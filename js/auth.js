// auth.js - Gestión de autenticación y sesiones

const AuthManager = {
    // Guardar sesión del usuario
    login(username, role) {
        const session = {
            username: username,
            role: role,
            loginTime: new Date().toISOString()
        };
        localStorage.setItem('userSession', JSON.stringify(session));
    },

    // Cerrar sesión
    logout() {
        localStorage.removeItem('userSession');
        window.location.href = 'features/form/login.html';
    },

    // Obtener sesión actual
    getSession() {
        const session = localStorage.getItem('userSession');
        return session ? JSON.parse(session) : null;
    },

    // Verificar si hay sesión activa
    isAuthenticated() {
        return this.getSession() !== null;
    },

    // Obtener rol del usuario actual
    getUserRole() {
        const session = this.getSession();
        return session ? session.role : null;
    },

    // Obtener nombre del usuario actual
    getUsername() {
        const session = this.getSession();
        return session ? session.username : null;
    },

    // Verificar acceso según rol
    requireAuth(allowedRoles = []) {
        if (!this.isAuthenticated()) {
            window.location.href = 'features/form/login.html';
            return false;
        }

        if (allowedRoles.length > 0 && !allowedRoles.includes(this.getUserRole())) {
            alert('No tienes permisos para acceder a esta sección');
            return false;
        }

        return true;
    }
};
