document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('eventoForm');
  const cancelBtn = document.querySelector('.cancel-btn');

  // Cancelar e voltar
  cancelBtn.addEventListener('click', function() {
    if(confirm('Tem certeza que deseja cancelar? Os dados preenchidos serão perdidos.')) {
      window.location.href = 'index.html'; // Ou a página que você quiser
    }
  });

  // Enviar formulário
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const eventoData = {
      nome: document.getElementById('nome').value,
      data: document.getElementById('data').value,
      horario: document.getElementById('horario').value,
      local: document.getElementById('local').value,
      cidade: document.getElementById('cidade').value,
      tipo: document.getElementById('tipo').value,
      descricao: document.getElementById('descricao').value
    };

    try {
      const response = await fetch('/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventoData)
      });

      if(response.ok) {
        alert('Evento criado com sucesso!');
        form.reset();
      } else {
        throw new Error('Erro ao criar evento');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Ocorreu um erro ao criar o evento. Tente novamente.');
    }
  });
});