function InputValidation(){
    document.getElementById('username').addEventListener('input', function () {
        //get the value of the input element
        const username = this.value;
        //regex to check if the username contains atleast 1 capital letter, atleast 1 number, atleast 1 special character and atealst 8 characters long
        const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        //check if the username matches the regex
        if (regex.test(username)) {
            //if it matches, set the border color to green
            this.style.borderColor = 'green';
        } else {
            //if it does not match, set the border color to red
            this.style.borderColor = 'red';
        }
    });
}
document.addEventListener('DOMContentLoaded', function () {
    const codeExecution = process.env.NODE_ENV
    //on change event of a input element with id "username"
    InputValidation();
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
    if(codeExecution !== 'test')
    {
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
    }
});