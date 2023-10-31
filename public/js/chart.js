Chart.defaults.global.defaultFontFamily = "Short Stack";
Chart.defaults.global.defaultFontSize = 12;
Chart.defaults.global.defaultFontStyle = "normal";
Chart.defaults.global.defaultFontColor = "#777";

let myChart = document.getElementById("myChart").getContext("2d");

let day = [
	{ x: Date.parse("2023-10-25 00:00:00 GMT-0700"), y: 4 },
	{ x: Date.parse("2023-10-26 00:00:00 GMT-0700"), y: 8 },
	{ x: Date.parse("2023-10-27 00:00:00 GMT-0700"), y: 8 },
	{ x: Date.parse("2023-10-28 00:00:00 GMT-0700"), y: 6 },
	{ x: Date.parse("2023-10-29 00:00:00 GMT-0700"), y: 8 },
	{ x: Date.parse("2023-10-30 00:00:00 GMT-0700"), y: 6 },
	{ x: Date.parse("2023-10-31 00:00:00 GMT-0700"), y: 1 },
];

let week = [
	{ x: Date.parse("2023-10-01 00:00:00 GMT-0700"), y: 31 },
	{ x: Date.parse("2023-10-08 00:00:00 GMT-0700"), y: 26 },
	{ x: Date.parse("2023-10-15 00:00:00 GMT-0700"), y: 32 },
	{ x: Date.parse("2023-10-22 00:00:00 GMT-0700"), y: 26 },
	{ x: Date.parse("2023-10-29 00:00:00 GMT-0700"), y: 30 },
];

let month = [
	{ x: Date.parse("2023-07-01 00:00:00 GMT-0700"), y: 120 },
	{ x: Date.parse("2023-08-01 00:00:00 GMT-0700"), y: 115 },
	{ x: Date.parse("2023-09-01 00:00:00 GMT-0700"), y: 113 },
	{ x: Date.parse("2023-10-01 00:00:00 GMT-0700"), y: 124 },
];

const config = {
	type: "bar", //bar, horizontalBar, pie, line, doughnut, radar, polarArea
	data: {
		datasets: [
			{
				label: "Hours",
				data: day,
				backgroundColor: [
					"rgba(255, 94, 91, 0.5)",
					"rgba(245, 114, 44, 0.5)",
					"rgba(255, 212, 73, 0.5)",
					"rgba(69, 194, 71, 0.5)",
					"rgba(75, 192, 192, 0.5)",
					"rgba(88, 105, 200, 0.5)",
					"rgba(72, 0, 135, 0.5)",
				],
				borderWidth: 1,
				borderColor: "rgba(188, 188, 188, 1)",
				hoverBorderColor: "rgba(0, 0, 0, 1)",
			},
		],
	},
	options: {
		title: {
			display: true,
			text: "Hours Worked",
			fontSize: 20,
		},
		legend: {
			display: false,
		},
		tooltips: {
			enabled: false,
		},
		scales: {
			xAxes: [
				{
					type: "time",
					time: {
						unit: "day",
					},
					offset: true,
					bounds: "ticks",
					distribution: "series",
				},
			],
			yAxes: [
				{
					ticks: {
						beginAtZero: true,
					},
				},
			],
		},
	},
};

const hoursChart = new Chart(myChart, config);

/// Chart script ///

function timeFrame(period) {
	if (period.value == "day") {
		hoursChart.config.options.scales.xAxes[0].time.unit = period.value;
		hoursChart.config.data.datasets[0].data = day;
	} else if (period.value == "week") {
		hoursChart.config.options.scales.xAxes[0].time.unit = period.value;
		hoursChart.config.data.datasets[0].data = week;
	} else {
		hoursChart.config.options.scales.xAxes[0].time.unit = period.value;
		hoursChart.config.data.datasets[0].data = month;
	}
	hoursChart.update();
}
