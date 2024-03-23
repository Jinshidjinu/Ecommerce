const AddressModel = require('../models/Address');
const userModel = require('../models/customer');
const OrderModel = require('../models/Orders');
const productModel = require('../models/products');

module.exports = {
   chartGET: async (req, res) => {
      try {
         // Fetch monthly signups data
         const monthlySignUpData = await userModel.aggregate([
            {
               $match: {
                  createdAt: {
                     $gte: new Date(new Date().getFullYear(), 0, 1), // Start of the current year
                     $lt: new Date(new Date().getFullYear() + 1, 0, 1) // Start of next year
                  }
               }
            },
            {
               $group: {
                  _id: {
                     month: { $month: '$createdAt' },
                     year: { $year: '$createdAt' },
                     day: { $dayOfMonth: '$createdAt' } // Include day of the month
                  },
                  count: { $sum: 1 } // Count documents for each month
               }
            },
            {
               $sort: { '_id.year': 1, '_id.month': 1 } // Sort by year and month
            }
         ]);

         // Format data for Chart.js for signups
         const chartData = {
            labels: [],
            data: [],
          
            
         };
         monthlySignUpData.forEach(month => {
            // Push formatted date to labels array
            chartData.labels.push(`${month._id.month}/${month._id.day}/${month._id.year}`);
            chartData.data.push(month.count); // Push count for the month
         });

         // Fetch monthly sales data
         const monthlySalesData = await OrderModel.aggregate([
            {
               $match: {
                  createdAt: {
                     $gte: new Date(new Date().getFullYear(), 0, 1), // Start of the current year
                     $lt: new Date(new Date().getFullYear() + 1, 0, 1) // Start of next year
                  }
               }
            },
            {
               $group: {
                  _id: {
                     month: { $month: '$createdAt' },
                     year: { $year: '$createdAt' },
                     day: { $dayOfMonth: '$createdAt' } // Include day of the month
                  },
                  count: { $sum: 1 } // Count documents for each month
               }
            },
            {
               $sort: { '_id.year': 1, '_id.month': 1 } // Sort by year and month
            }
         ]);

         // Format data for Chart.js for sales
         const salesData = {
            labels: [],
            data: [],
            

         };
         monthlySalesData.forEach(month => {
            // Push formatted date to labels array
            salesData.labels.push(`${month._id.month}/${month._id.day}/${month._id.year}`);
            salesData.data.push(month.count); // Push count for the month
         });
       
         res.status(200).json({ success: true, chartData: chartData, salesData: salesData });
 
      } catch (error) {
         console.log(error);
         res.status(500).json({ success: false, error: error.message });
      }
   }
};
