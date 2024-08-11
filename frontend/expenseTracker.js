async function addExpense(event) {
    event.preventDefault();

    const emailParams = new URLSearchParams(window.location.search);
    const email = emailParams.get('email'); // Retrieve the email parameter

    const category = document.getElementById('category').value;
    //   const petrol=document.getElementById().value;

    const amount = document.getElementById('amount').value;

    try {

        const resp = await axios.post('http://localhost:8000/expense/addExpense', {
            category,
            amount,
            email
        },
            {
                headers:
                {
                    'Authorization': localStorage.getItem('token')
                }
            }
        )


        alert(resp.data.message);

       displayExpense()

    }

    catch (err) {
        alert(err.data.message);
    }

}

async function deleteUser(Id) {
    try {
        // DELETE request to delete user


        
        const res = await axios.delete(`http://localhost:8000/expense/deleteExpense/${Id}`);
        window.alert(res.data.message);


        // Display updated user details
     displayUsers();
    } catch (error) {

        alert(error.response.message);
    }
}

async function displayExpense(curr_page = 1) {
    try {
        const perPage = localStorage.getItem('perPage')
        // const curPage=localStorage.getItem('curPage')
        const response = await axios.get(`http://localhost:8000/expense/fetchExpense?page=${curr_page}&perPage=${perPage}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        });


        // Handle premium user UI changes
        if (response.data.IsPremium === true) {
            document.getElementById('razorPay').style.visibility = "hidden";
            document.getElementById('message').innerHTML = "You are a premium user now";
            document.getElementById('leaderBoard').innerHTML = `<p><button onclick="showLeader()">Show LeaderBoard</button></p>`;

            const downloadBtn = document.createElement("button");
            downloadBtn.textContent = "Download Expense Report";
            downloadBtn.onclick = downLoad;
            document.getElementById('leaderBoard').appendChild(downloadBtn);
        }
     console.log(response.data)

        // Display fetched expenses
        const expenses = response.data.expenses;
        const userList = document.getElementById('ExpenseList');
        userList.innerHTML = '';

        if (!expenses || expenses.length === 0) {
            const noExpensesMsg = document.createElement('div');
            noExpensesMsg.innerHTML = `<h3>No Expenses Found!</h3>`;
            userList.appendChild(noExpensesMsg);
        } else {
            expenses.forEach(expense => {
                const itemElement = document.createElement('div');
                itemElement.innerHTML = `
                    <p>Expense Item: ${expense.expenseName}
                       Amount: ${expense.amount}
                       <button onclick="deleteUser('${expense._id}')">Delete</button>
                    </p>
                `;
                userList.appendChild(itemElement);
            });
        }

        // Update pagination buttons based on response
        const totalPages = response.data.totalPages;
        const currentPage = response.data.currentPage;

        appendPaginationButtons(currentPage, totalPages);

    } catch (error) {
        alert('Error fetching expenses');
        // Handle error if needed
    }
}

function appendPaginationButtons(currentPage, totalPages) {
    const perPageContainer = document.getElementById('page');
    perPageContainer.innerHTML = ''; // Clear existing content

    if (currentPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.addEventListener('click', function () {
            displayExpense(currentPage - 1);
        });
        perPageContainer.appendChild(prevButton);
    }

    if (currentPage < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.addEventListener('click', function () {
            displayExpense(currentPage + 1);
        });
        perPageContainer.appendChild(nextButton);
    }
}

//RAZORPAY INTEGRARTION

document.getElementById('razorPay').addEventListener('click', async function (e) {
    e.preventDefault();

    initiateRazorpayPayment(e);

});

function initiateRazorpayPayment(e) {

    e.preventDefault();

    const key_id = "rzp_test_rirQjmZBf6uf04"

    // Generate a unique order ID (You can handle this server-side)
    axios.post('http://localhost:8000/expense/create-RazorPayId')
        .then(function (response) {
            const { data } = response;
            const options = {
                key: key_id,
                amount: data.amount,  // Amount in paisa
                currency: data.currency,
                order_id: data.id,
                handler: async function (response) {
                    alert('Payment successful');

                    const up = await UpdateOrderStatus(response)

                    document.getElementById('razorPay').style.visibility = "hidden"
                    document.getElementById('message').innerHTML = "You are premium user now"


                    // Handle payment success here
                },
            };
            const rzp = new Razorpay(options);
            rzp.open();
        })
        .catch(function (error) {
            alert("Payment failed , pls try again")
        });
}



async function UpdateOrderStatus(response) {
    try {
        const paymentDetails = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            // token:response.data.token
        };

        const resp = await axios.post('http://localhost:8000/expense/updateOrder', paymentDetails, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })


        alert(resp.data.message)
    }
    catch (e) {
        alert(e.response.data.message)
    }

}


async function showLeader() {
    try {
        const response = await axios.get('http://localhost:8000/premium/fetch-leaderBoard', {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })

        const leaderboardData = Array.isArray(response.data) ? response.data : [response.data];

        const leaderboardElement = document.getElementById('Leader');


        leaderboardElement.innerHTML = '';

        const headingElement = document.createElement('h2');
        headingElement.textContent = 'Leaderboard';


        // Append the heading to the leaderboard container
        leaderboardElement.appendChild(headingElement);

        // Create elements to display leaderboard
        leaderboardData.forEach(entry => {
            const entryElement = document.createElement('div');

            const expenseDisplay = entry.totalExpense !== null && entry.totalExpense !== undefined ? entry.totalExpense : 0;

            entryElement.textContent = `
            Name:-${entry.name}  Expense:-${expenseDisplay}`; // Example data structure based on previous query
            leaderboardElement.appendChild(entryElement);
        });








    }

    catch (error) {

        alert("Oops some error")

    }
}

async function downLoad(event) {
    event.preventDefault();
    try {

        const p1 = await axios.get('http://localhost:8000/premium/download-report', {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
        const downloadUrl = p1.data.url

        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = `expense_report.txt`; // Specify the default filename for download
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);



    }

    catch (error) {


        alert(error.response.data.message)
    }
}

function logout() {
    localStorage.clear()

    // Redirect to the login page or home page
    window.location.href = 'existinguser.html'; // Adj
}


function handlePerPageChange() {

    const perPage = document.getElementById('perPage').value;

    localStorage.setItem('perPage', perPage);
    // Store perPage preference in localStorage
   displayExpense()
}


document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');

    const logoutButton = document.getElementById('logoutButton');
    if (token) {
        logoutButton.style.display = 'block';
        logoutButton.addEventListener('click', logout);
    } else {
        logoutButton.style.display = 'none';
    }

  displayExpense();

    document.getElementById('perPage').addEventListener('change', handlePerPageChange);
});

