import {Component, ViewChild} from '@angular/core';
import {BaseChartDirective} from "ng2-charts";
import {ChartData, ChartOptions, ChartType} from "chart.js";
import {AdminService} from "../../../admin/services/admin.service";
import {PartnerService} from "../../services/partner.service";

@Component({
  selector: 'partner-sales-revenue',
  templateUrl: './partner-sales-revenue.component.html',
  styleUrls: ['./partner-sales-revenue.component.scss']
})
export class PartnerSalesRevenueComponent {
    @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
// Define chart type correctly
    public chartType: ChartType = 'bar';
    totalRevenue: number;
    partnerId = 1;

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

    constructor(private partnerService: PartnerService) { }

    ngOnInit() {
        this.loadSalesRevenueData();  // Fetch data on initialization
    }

    // Function to load sales revenue data from the API
    loadSalesRevenueData() {
        this.partnerService.getDashboardStats(this.partnerId).subscribe((response: any) => {
            console.log("Total revenue:", response.totalRevenue);
            this.totalRevenue = response.totalRevenue;

            const currentMonth = new Date().getMonth();
            const monthlyRevenue = Array(12).fill(0);
            monthlyRevenue[currentMonth] = response.totalRevenue;

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
