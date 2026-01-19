document.addEventListener('DOMContentLoaded', function() {
  const input = document.getElementById('input');
  
  // Función para actualizar TODOS los outputs
  function updateOutputs() {
    const outputs = document.querySelectorAll('.convertido textarea');
    outputs.forEach(output => {
      output.value = input.value;  // Copia texto exacto
    });
  }

  // Actualiza en tiempo real
  input.addEventListener('input', updateOutputs);

  // Inicial
  updateOutputs();
});
