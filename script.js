// 
const progress = localStorage.getItem('data') || 25;

const context = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(context,{
    type:'bar',
    data:{
        labels:progress,
        datasets:[{
            label:'Completion',
            data:[progress],
            backgroundColor:'rgba(75, 192, 192, 0.2)',
            borderColor:'rgba(75, 192, 240, 1)',
            borderWidth:1
        }]
    },
    options:{
        indexAxis: 'y',
        scales: {
            x: {
                beginAtZero: true,
                max: 100
            }
        }
    }
});

function updateProgress(newProgress){
    localStorage.setItem('progress',newProgress);
    myChart.data.datasets[0].data = [newProgress];
    myChart.update();
}

