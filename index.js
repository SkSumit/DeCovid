// BULMA NAVBAR JQUERY
document.addEventListener("DOMContentLoaded", () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach((el) => {
      el.addEventListener("click", () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});

var overallStatsNumber = document.querySelectorAll("p.subtitle");
var worldStatsTable = document.querySelector("#worldStatsTable");
var indiaStatsTable = document.querySelector("#indiaStatsTable");
var table = document.querySelectorAll("table");


fetch("https://corona-api.com/timeline").then((response) => {
  response.json().then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
     for(i=0 ; i<6 ; i++){
      overallStatsNumber[i].textContent = data.data[0].confirmed;
     }
    }
  });
});

fetch("https://corona-api.com/countries").then((response) => {
  response.json().then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      const countries = data.data;
      // console.log(countries);

      countries.forEach((country, index) => {
        // console.log(country);
        // console.log(country.latest_data);
        // console.log(country.today);
        const row = table[0].insertRow(index + 1);
        row.innerHTML = `<th>${country.name}</th> 
        <td>${country.latest_data.confirmed}</td>
        <td>${country.today.confirmed}</td>
        <td>${country.latest_data.deaths}</td>
        <td>${country.today.deaths}</td>
        <td>${country.latest_data.recovered}</td>
         <td>${country.latest_data.critical}</td>`;
      });
    }
  });
});

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

var stateName = [];
var stateActiveList = [];
var stateConfirmedList = [];
var stateDeathsList = [];
var stateRecoveredList = [];
var stateColorList = [];
var totalDateTimeline = [];
var totalConfirmedTimeline = [];
var totalDeathTimeline = [];
var totalRecoveredTimeline = [];
var dailyConfirmedTimeline = [];
var dailyDeathTimeline = [];
var dailyRecoveredTimeline = [];
var pieConfirmed, pieDeaths, pieRecovered;

var dataChartOptions = {
  legend: {
    display: false,
  },
  scales: {
    yAxes: [
      {
        gridLines: {
          display: false,
          drawBorder: false,
        },
        distribution: "linear",
        ticks: {
          display: false, //this will remove only the label
        },
      },
    ],
    xAxes: [
      {
        gridLines: {
          display: false,
          drawBorder: false,
        },
        distribution: "linear",
        ticks: {
          display: false, //this will remove only the label
        },
      },
    ],
  },
};
// var myChartTCC = document.getElementById("myChartTCC").getContext("2d");

fetch("https://api.covid19india.org/data.json").then((response) => {
  response.json().then((data) => {
    var states = data.statewise;
    var totalTimeline = data.cases_time_series;

    // console.log(pieConfirmed,pieDeaths,pieRecovered)
    overallStatsNumber[6].textContent = data.statewise[0].confirmed;
    overallStatsNumber[7].textContent = data.statewise[0].deaths;
    overallStatsNumber[8].textContent = data.statewise[0].recovered;
    overallStatsNumber[9].textContent = data.statewise[0].deltaconfirmed;
    overallStatsNumber[10].textContent = data.statewise[0].deltadeaths;
    overallStatsNumber[11].textContent = data.statewise[0].deltarecovered;
    checker = data.statewise[0].deltarecovered;

    totalTimeline.forEach((timeline, index) => {
      // console.log(timeline)
      totalConfirmedTimeline.push(timeline.totalconfirmed);
      totalDateTimeline.push(timeline.date);
      totalDeathTimeline.push(timeline.totaldeceased);
      totalRecoveredTimeline.push(timeline.totalrecovered);
      dailyConfirmedTimeline.push(timeline.dailyconfirmed);
      dailyDeathTimeline.push(timeline.dailydeceased);
      dailyRecoveredTimeline.push(timeline.dailyrecovered);
    });

    states.forEach((state, index) => {
      stateName.push(state.state);
      stateActiveList.push(state.active);
      stateConfirmedList.push(state.confirmed);
      stateDeathsList.push(state.deaths);
      stateRecoveredList.push(state.recovered);
      stateColorList.push(getRandomColor());

      const row = table[1].insertRow(index + 1);
      row.innerHTML = `<th onclick="javascript:location.href='http://www.duolancers.codes'" >${state.state}</th> 
      <td>${state.confirmed}</td>
      <td>${state.deltaconfirmed}</td>
      <td>${state.deaths}</td>
      <td>${state.deltadeaths}</td>
      <td>${state.recovered}</td>
       <td>${state.deltarecovered}</td>`;
    });
    // console.log(data.cases_time_series);
    pieConfirmed = data.statewise[0].confirmed;
    pieDeaths = data.statewise[0].deaths;
    pieRecovered = data.statewise[0].recovered;

    stateName.shift();
    stateConfirmedList.shift();
    stateActiveList.shift();
    stateDeathsList.shift();
    stateRecoveredList.shift();
    // chartTCC.update();
    chart1.update();
    chart.update();
    chart2.update();
    chart3.update();
    chart4.update();
    chart5.update();
    chart6.update();
    pie.update();
    // doughnut_chart.update()
  })
})

// console.log(stateColorList)
console.log(
  pieConfirmed,
  pieDeaths,
  pieRecovered,
  totalConfirmedTimeline,
  // checker
);
var ctx = document.querySelectorAll(".myChart");
// var ctx1 = document.querySelector("#myChart1");
// console.log(ctx1)

var chart = new Chart(ctx[0], {
  // The type of chart we want to create
  type: "line",

  // The data for our dataset
  data: {
    labels: totalDateTimeline,
    datasets: [
      {
        label: "Confirmed Cases",
        backgroundColor: "hsl(48, 100%, 67%)",
        // fill: false,
        borderColor: "hsl(48, 100%, 67%)",
        data: totalConfirmedTimeline,
      },
    ],
  },

  // Configuration options go here
  options: dataChartOptions,
});

var chart1 = new Chart(ctx[1], {
  // The type of chart we want to create
  type: "line",

  // The data for our dataset
  data: {
    labels: totalDateTimeline,
    datasets: [
      {
        label: "Death Cases",
        backgroundColor: "hsl(348, 100%, 61%)",
        // fill: false,
        borderColor: "hsl(348, 100%, 61%)",
        data: totalDeathTimeline,
      },
    ],
  },

  // Configuration options go here
  options: dataChartOptions,
});

var chart2 = new Chart(ctx[2], {
  // The type of chart we want to create
  type: "line",

  // The data for our dataset
  data: {
    labels: totalDateTimeline,
    datasets: [
      {
        label: "Recovered Cases",
        backgroundColor: "hsl(141, 71%, 48%)",
        // fill: false,
        borderColor: "hsl(141, 71%, 48%)",
        data: totalRecoveredTimeline,
      },
    ],
  },

  // Configuration options go here
  options: dataChartOptions,
});

var chart3 = new Chart(ctx[3], {
  // The type of chart we want to create
  type: "line",

  // The data for our dataset
  data: {
    labels: totalDateTimeline,
    datasets: [
      {
        label: "Confirmed Cases",
        backgroundColor: "hsl(48, 100%, 67%)",
        // fill: false,
        borderColor: "hsl(48, 100%, 67%)",
        data: dailyConfirmedTimeline,
      },
    ],
  },

  // Configuration options go here
  options: dataChartOptions,
});

var chart4 = new Chart(ctx[4], {
  // The type of chart we want to create
  type: "line",

  // The data for our dataset
  data: {
    labels: totalDateTimeline,
    datasets: [
      {
        label: "Death Cases",
        backgroundColor: "hsl(348, 100%, 61%)",
        // fill: false,
        borderColor: "hsl(348, 100%, 61%)",
        data: dailyDeathTimeline,
      },
    ],
  },

  // Configuration options go here
  options: dataChartOptions,
});

var chart5 = new Chart(ctx[5], {
  // The type of chart we want to create
  type: "line",

  // The data for our dataset
  data: {
    labels: totalDateTimeline,
    datasets: [
      {
        label: "Recovered Cases",
        backgroundColor: "hsl(141, 71%, 48%)",
        // fill: false,
        borderColor: "hsl(141, 71%, 48%)",
        data: dailyRecoveredTimeline,
      },
    ],
  },

  // Configuration options go here
  options: dataChartOptions,
});

var chart6 = new Chart(ctx[6], {
  // The type of chart we want to create
  type: "line",

  // The data for our dataset
  data: {
    labels: stateName,
    datasets: [
      {
        label: "Confirmed Cases",
        backgroundColor: "hsl(48, 100%, 67%)",
        fill: false,
        borderColor: "hsl(48, 100%, 67%)",
        data: stateConfirmedList,
      },
      {
        label: "Death Cases",
        backgroundColor: "hsl(348, 100%, 61%)",
        // fill: false,
        borderColor: "hsl(348, 100%, 61%)",
        data: stateDeathsList,
      },
      {
        label: "Recovered Cases",
        backgroundColor: "hsl(141, 71%, 48%)",
        // fill: false,
        borderColor: "hsl(141, 71%, 48%)",
        data: stateRecoveredList,
      },
    ],
  },

  // Configuration options go here
  options: dataChartOptions,
});

// var pie = document.getElementById("doughnut-chart")
var pie = new Chart(document.getElementById("doughnut-chart"), {
  type: "doughnut",
  data: {
    labels: ["Confirmed", "Deaths", "Recovered"],
    datasets: [
      {
        label: "Population (millions)",
        backgroundColor: [
          "#3e95cd",
          "#8e5ea2",
          "#3cba9f",
          "#e8c3b9",
          "#c45850",
        ],
        data: [pieConfirmed, pieDeaths, pieRecovered],
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: "Predicted world population (millions) in 2050",
    },
  },
});
