
$('#menu-btn').click(function() {
    $('#menu').toggleClass('active')
  })

const signupCtx = document.getElementById('Chart');
const Ordersctx = document.getElementById('ChartOrders')

document.addEventListener('DOMContentLoaded', async () => {
    try {
       const response = await axios.get('/admin/chart');
       const chartData = response.data.chartData;
       const salesData =response.data.salesData
       const userCount = response.data.usersCount
 
       if (response.status === 200) {
          // Render signups bar chart
          new Chart(signupCtx, {
             type: 'bar',
             data: {
                labels: chartData.labels,
                datasets: [{
                   label: 'Signups',
                   data: chartData.data,
                   backgroundColor: 'darkblue',
                   borderColor: 'black',
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
 
          // Render sales line chart
          new Chart(Ordersctx, {
            type: 'line',
            data: {
               labels: salesData.labels,
               datasets: [{
                  label: 'Sales',
                  data: salesData.data,
                  backgroundColor: 'grey',    
                  borderColor: 'black',
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
      }
   } catch (error) {
      console.log(error);
    }
 });
 