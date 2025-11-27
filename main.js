function showPolicy(key){
      var title;
      var desc;
      
      if(key === 'POL-01'){
        title = 'POL-01: Política de Seguridad de Datos y Transacciones en eCommerce';
        desc = 'Esta política protege los datos personales, financieros y transaccionales de los clientes que interactúan con la tienda en línea, evitando incidentes de seguridad, fraude y uso indebido de la información. Incluye medidas de encriptación, autenticación segura y auditoría de accesos.';
      } else if(key === 'POL-02'){
        title = 'POL-02: Política de Sincronización e Integridad de Inventarios y Omnicanalidad';
        desc = 'Garantiza que los inventarios mostrados en la tienda en línea coincidan con los inventarios reales de tiendas físicas, bodegas y sistemas internos, reduciendo errores y pedidos no entregables. Define procesos de validación y sincronización periódica.';
      } else if(key === 'POL-03'){
        title = 'POL-03: Política de Disponibilidad y Desempeño de Plataformas de eCommerce';
        desc = 'Asegura que la plataforma de comercio electrónico, catálogos, pasarelas y sistemas relacionados operen con altos niveles de disponibilidad, rendimiento y estabilidad. Incluye planes de contingencia, monitoreo 24/7 y acuerdos de nivel de servicio.';
      } else if(key === 'POL-04'){
        title = 'POL-04: Política de Logística Digital, Entregas y Seguimiento de Pedidos';
        desc = 'Optimiza el proceso logístico digital para garantizar entregas puntuales, trazabilidad completa y comunicación transparente con los clientes. Define integración con sistemas de envío, actualizaciones de estado y resolución de incidencias logísticas.';
      }
      
      document.getElementById('policyTitle').innerText = title;
      document.getElementById('policyDesc').innerText = desc;
      document.getElementById('downloadPolicy').href = 'docs/' + key + '.pdf';
      document.getElementById('policyDetail').style.display = 'block';
      window.location.hash = '#políticas';
    }
    function closePolicy(){
      document.getElementById('policyDetail').style.display = 'none';
    }
    function updateIndicator(){
      var sel = document.getElementById('indSelect').value;
      var val = document.getElementById('indValue').value;
      if(!val){ alert('Ingresa un valor'); return; }
      document.getElementById(sel).innerText = val;
      document.getElementById('status').innerText = 'Indicadores actualizados (simulación). Revisa cumplimiento.';
    }

    function addHallazgo(){
      var d = document.getElementById('hallazgoDesc').value.trim();
      var i = document.getElementById('hallazgoImpact').value.trim();
      var r = document.getElementById('hallazgoRec').value.trim();
      var p = document.getElementById('hallazgoResp').value.trim();
      if(!d || !i || !r || !p){ alert('Completa todos los campos del hallazgo.'); return; }
      var container = document.getElementById('hallazgosList');
      var id = 'H-' + (new Date()).getTime();
      var html = '<div class="hallazgo"><strong>ID: '+id+'</strong><div class="small" style="margin-top:6px"><strong>Descripción:</strong> '+escapeHtml(d)+'</div><div class="small"><strong>Impacto:</strong> '+escapeHtml(i)+'</div><div class="small"><strong>Recomendación:</strong> '+escapeHtml(r)+'</div><div class="small"><strong>Responsable:</strong> '+escapeHtml(p)+'</div></div>';
      container.insertAdjacentHTML('afterbegin', html);
      // Limpiar campos
      document.getElementById('hallazgoDesc').value='';
      document.getElementById('hallazgoImpact').value='';
      document.getElementById('hallazgoRec').value='';
      document.getElementById('hallazgoResp').value='';
      document.getElementById('status').innerText = 'Hallazgo registrado: ' + id;
    }

    function escapeHtml(unsafe) {
      return unsafe.replace(/[&<"'>]/g, function(m) {
        return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m];
      });
    }

    function simulateCheck(){
      // Señala si alguno de los indicadores está fuera de meta (simulación)
      var v1 = document.getElementById('val1').innerText;
      var v2 = document.getElementById('val2').innerText;
      var v3 = document.getElementById('val3').innerText;
      var out = [];
      
      // % Transacciones exitosas >= 98%
      if(v1.indexOf('%') > -1){
        var num = parseFloat(v1.replace('%',''));
        if(num < 98) out.push('% Transacciones exitosas ('+v1+') < meta (98%)');
      }
      
      // Tiempo medio de entrega <= 48h
      if(v2.indexOf('h') > -1){
        var hv = parseFloat(v2.replace('h',''));
        if(hv > 48) out.push('Tiempo medio de entrega ('+v2+') > meta (48h)');
      }
      
      // Tasa de fraude <= 0.5%
      if(v3.indexOf('%') > -1){
        var fv = parseFloat(v3.replace('%',''));
        if(fv > 0.5) out.push('Tasa de fraude ('+v3+') > meta (0.5%)');
      }
      
      if(out.length > 0){
        alert('Hay indicadores fuera de meta:\n - ' + out.join('\n - '));
      } else {
        alert('Todos los indicadores dentro de meta (simulado).');
      }
    }

// Modal / lightbox para ampliar miniaturas de documentos
function openDocModal(src, alt){
  var overlay = document.getElementById('docModal');
  var img = document.getElementById('docModalImg');
  var caption = document.getElementById('docModalCaption');
  img.src = src;
  img.alt = alt || '';
  caption.innerText = alt || '';
  overlay.style.display = 'flex';
}

function closeDocModal(e){
  if(e) e.stopPropagation();
  var overlay = document.getElementById('docModal');
  var img = document.getElementById('docModalImg');
  img.src = '';
  overlay.style.display = 'none';
}

// Vincular clics a miniaturas al cargar
document.addEventListener('DOMContentLoaded', function(){
  document.querySelectorAll('.doc-thumb').forEach(function(el){
    el.addEventListener('click', function(){
      openDocModal(el.src || el.getAttribute('src'), el.alt || el.getAttribute('alt'));
    });
  });
});