// hallazgos.js - Gestión de hallazgos con localStorage

const HallazgosManager = {
    // Obtener todos los hallazgos
    getAll() {
        const hallazgos = localStorage.getItem('hallazgos');
        return hallazgos ? JSON.parse(hallazgos) : [];
    },

    // Agregar un nuevo hallazgo
    add(hallazgo) {
        const hallazgos = this.getAll();
        const id = 'H-' + new Date().getTime();
        const newHallazgo = {
            id: id,
            ...hallazgo,
            createdBy: AuthManager.getUsername(),
            createdAt: new Date().toISOString(),
            status: 'pendiente'
        };
        hallazgos.push(newHallazgo);
        localStorage.setItem('hallazgos', JSON.stringify(hallazgos));
        return newHallazgo;
    },

    // Actualizar un hallazgo
    update(id, updates) {
        const hallazgos = this.getAll();
        const index = hallazgos.findIndex(h => h.id === id);
        if (index !== -1) {
            hallazgos[index] = { ...hallazgos[index], ...updates };
            localStorage.setItem('hallazgos', JSON.stringify(hallazgos));
            return hallazgos[index];
        }
        return null;
    },

    // Eliminar un hallazgo
    delete(id) {
        const hallazgos = this.getAll();
        const filtered = hallazgos.filter(h => h.id !== id);
        localStorage.setItem('hallazgos', JSON.stringify(filtered));
    },

    // Renderizar lista de hallazgos
    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const hallazgos = this.getAll();
        
        if (hallazgos.length === 0) {
            container.innerHTML = '<p class="small" style="margin-top: 12px; color: #666;">No hay hallazgos registrados</p>';
            return;
        }

        const getStatusBadge = (status) => {
            const badges = {
                'pendiente': 'badge-warning',
                'en revision': 'badge-info',
                'cerrado': 'badge-success'
            };
            return badges[status] || 'badge-warning';
        };

        container.innerHTML = hallazgos.map(h => `
            <div class="hallazgo" data-id="${h.id}">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
                    <strong>ID: ${h.id}</strong>
                    <span class="badge ${getStatusBadge(h.status)}">${h.status}</span>
                </div>
                <div class="small" style="margin-top:6px"><strong>Descripción:</strong> ${escapeHtml(h.descripcion)}</div>
                <div class="small"><strong>Impacto:</strong> ${escapeHtml(h.impacto)}</div>
                <div class="small"><strong>Recomendación:</strong> ${escapeHtml(h.recomendacion)}</div>
                <div class="small"><strong>Responsable:</strong> ${escapeHtml(h.responsable)}</div>
                <div class="small"><strong>Creado por:</strong> ${h.createdBy} el ${new Date(h.createdAt).toLocaleDateString()}</div>
                <div class="small" style="margin-top: 8px;"><strong>Estatus:</strong> 
                    <span style="color: ${h.status === 'cerrado' ? '#28a745' : h.status === 'en revision' ? '#007bff' : '#ffc107'}; font-weight: 600;">
                        ${h.status.toUpperCase()}
                    </span>
                </div>
                ${AuthManager.getUserRole() === 'admin' ? `
                <div style="margin-top: 12px; display: flex; gap: 8px; flex-wrap: wrap;">
                    <select id="status-${h.id}" class="status-select" onchange="HallazgosManager.changeStatus('${h.id}', this.value)">
                        <option value="pendiente" ${h.status === 'pendiente' ? 'selected' : ''}>Pendiente</option>
                        <option value="en revision" ${h.status === 'en revision' ? 'selected' : ''}>En Revisión</option>
                        <option value="cerrado" ${h.status === 'cerrado' ? 'selected' : ''}>Cerrado</option>
                    </select>
                    <button class="btn-small danger" onclick="HallazgosManager.confirmDelete('${h.id}')">Eliminar</button>
                </div>
                ` : ''}
            </div>
        `).join('');
    },

    // Cambiar estado del hallazgo
    changeStatus(id, newStatus) {
        this.update(id, { status: newStatus });
        this.render('hallazgosList');
        document.getElementById('status').innerText = `Hallazgo ${id} actualizado a: ${newStatus}`;
    },

    // Confirmar eliminación
    confirmDelete(id) {
        if (confirm('¿Estás seguro de que deseas eliminar este hallazgo?')) {
            this.delete(id);
            this.render('hallazgosList');
            document.getElementById('status').innerText = 'Hallazgo eliminado correctamente';
        }
    }
};

// Función auxiliar para escapar HTML
function escapeHtml(unsafe) {
    if (!unsafe) return '';
    return unsafe.replace(/[&<"'>]/g, function(m) {
        return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m];
    });
}
