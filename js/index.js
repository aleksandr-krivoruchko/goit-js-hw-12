const ctx = document.getElementById('myChart').getContext('2d');
const GLOBAL_MEAN_TEMPERATURE = 14;

fetchData()
.then(parseData)
.then(getLabelsAndHems)
.then(({years, north, south}) => {
	drawChart(years, north, south)
});

function fetchData() {
	return fetch('../graph.csv').then((res) => res.text());
}

function parseData(data) {
	return Papa.parse(data, {header: true}).data;
}

function getLabelsAndHems(data) {

	return data.reduce((acc, item) => {
		acc.years.push(item.Year);
		acc.north.push(Number(item.NHem) + GLOBAL_MEAN_TEMPERATURE);
		acc.south.push(Number(item.SHem) + GLOBAL_MEAN_TEMPERATURE);
	return acc;
}, {years:[], north:[], south:[]})
}

function drawChart(years, north, south) {
	new Chart(ctx, {
    type: 'line',
    data: {
        labels: years,
        datasets: [{
            label: '# North Temps',
            data: north,
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1
        },
		{
            label: '# South Temps',
            data: south,
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
        }],
    },
    options: {
        scales: {
            y: {
					ticks: {
                    callback: function(value) {
                        return value + '*C';
                    }
                },
                beginAtZero: false,
            }
        }
    }
});
}