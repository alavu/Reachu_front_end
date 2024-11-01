import {Component, ViewChild} from '@angular/core';
import {ChartData, ChartDataset, ChartOptions, ChartType} from "chart.js";
import {AdminService} from "../../../services/admin.service";
import {BaseChartDirective} from "ng2-charts";


@Component({
  selector: 'sales-revenue-chart',
  templateUrl: './sales-revenue-chart.component.html',
  styleUrls: ['./sales-revenue-chart.component.scss']
})
export class SalesRevenueChartComponent {
    @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
// Define chart type correctly
    public chartType: ChartType = 'bar';
    totalRevenue: number;

    // Correct chart data structure
    public chartData: ChartData<'bar', number[], string> = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
        datasets: [
            {
                data: [],
                backgroundColor: '#007bff',
                borderColor: '#007bff',
                borderWidth: 1
            }
        ]
    };

    // Chart options
    public chartOptions: ChartOptions<'bar'> = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                max: 4000
            }
        }
    };

    constructor(private adminService: AdminService) { }

    ngOnInit() {
        this.loadSalesRevenueData();  // Fetch data on initialization
    }

    // Function to load sales revenue data from the API
    loadSalesRevenueData() {
        this.adminService.getTotalRevenue().subscribe(res => {
            console.log("Total revenue:", res.totalRevenue);
            this.totalRevenue = res.totalRevenue;

            const currentMonth = new Date().getMonth();
            const monthlyRevenue = Array(12).fill(0);
            monthlyRevenue[currentMonth] = res.totalRevenue;

            // this.chartData.datasets[0].data = [res.totalRevenue];  // Fill the chart with monthly revenue data
            this.chartData.datasets[0].data = monthlyRevenue;  // Fill the chart with monthly revenue data
            if (this.chart) {
                this.chart.update();  // This ensures the chart is redrawn with new data
            }
            // Force chart update after modifying data
        }, error => {
            console.error('Error fetching sales revenue data:', error);
        });
    }
}
