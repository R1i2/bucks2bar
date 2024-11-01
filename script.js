document.addEventListener('DOMContentLoaded', function () {
    function getValues() {
        const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
        const data = {
            income: {},
            expenses: {}
        };

        months.forEach(month => {
            const incomeInput = document.getElementById(`${month}-income`);
            const expensesInput = document.getElementById(`${month}-expenses`);

            if (incomeInput) {
                data.income[month] = parseFloat(incomeInput.value) || 0;
            }

            if (expensesInput) {
                data.expenses[month] = parseFloat(expensesInput.value) || 0;
            }
        });

        return data;
    }
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'],
            datasets: [{
                label: 'Income',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }, {
                label: 'Expenses',
                data: [],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    document.querySelector("button[data-bs-target='#chart']").addEventListener("click",()=>{
        const values = getValues();
        myChart.data.datasets[0].data = Object.values(values.income);
        myChart.data.datasets[1].data = Object.values(values.expenses);
        myChart.update();
    });
    document.getElementById('downloadChart').addEventListener('click', function () {
        var link = document.createElement('a');
        link.href = myChart.toBase64Image();
        link.download = 'chart.png';
        link.click();
    });
});