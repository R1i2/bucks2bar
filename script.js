import { toPng } from 'html-to-image';
function inputValidation() {
    document.getElementById('username').addEventListener('input', function () {
        // Get the value of the input element
        const username = this.value;
        // Regex to check if the username contains at least 1 capital letter, at least 1 number, at least 1 special character, and at least 8 characters long
        const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        // Check if the username matches the regex
        this.style.borderColor = regex.test(username) ? 'green' : 'red';
    });
}
async function sendEmailWithChart() {
    const emailAddress = document.getElementById('email-address').value;
    if (!emailAddress) {
        alert('Please enter a valid email address.');
        return;
    }

    try {
        const chartElement = document.getElementById('myChart');
        const chartImage = await toPng(chartElement);

        const response = await fetch('http://localhost:3000/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ emailAddress, chartImage })
        });

        if (response.ok) {
            console.log('Email sent successfully');
        } else {
            console.error('Error sending email:', await response.text());
        }
    } catch (error) {
        console.error('Error generating chart image or sending email:', error);
    }
};
document.addEventListener('DOMContentLoaded', () => {
    let codeExecution = 'development';
    if(typeof process !== "undefined" && process.env && process.env.NODE_ENV)
    {
        codeExecution = process.env.NODE_ENV;
    }
    // On change event of an input element with id "username"
    inputValidation();

    const getValues = () => {
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
    };

    if (codeExecution !== 'test') {
        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
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

        document.querySelector("button[data-bs-target='#chart']").addEventListener("click", () => {
            const values = getValues();
            myChart.data.datasets[0].data = Object.values(values.income);
            myChart.data.datasets[1].data = Object.values(values.expenses);
            myChart.update();
        });

        document.getElementById('downloadChart').addEventListener('click', () => {
            const link = document.createElement('a');
            link.href = myChart.toBase64Image();
            link.download = 'chart.png';
            link.click();
        });
        document.getElementById('send-email').addEventListener('click', sendEmailWithChart);
    }
});