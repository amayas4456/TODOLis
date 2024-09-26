document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('chart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Tâches À Faire', 'Tâches En Cours', 'Tâches Terminées'],
            datasets: [{
                label: '# de Tâches',
                data: [12, 19, 3],  // Exemple de données
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        }
    });
});
