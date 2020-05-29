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
var table = document.querySelectorAll("table");
var stateName = [],stateActiveList = [],stateConfirmedList = [],stateDeathsList = [],stateRecoveredList = [],totalDateTimeline = [], totalConfirmedTimeline = []
var totalDeathTimeline = [],totalRecoveredTimeline = [],dailyConfirmedTimeline = [], dailyDeathTimeline = [],dailyRecoveredTimeline = [];
var wtotalDeathTimeline = [],wtotalRecoveredTimeline = [],wdailyConfirmedTimeline = [], wdailyDeathTimeline = [],wdailyRecoveredTimeline = [],wtotalConfirmedTimeline = []

var pievalC=[],pievalD=[],pievalR=[],wtotalDateTimeline =[]

fetch("https://corona-api.com/timeline").then((response) => {
  response.json().then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
        
        var worldTimeline = data.data
        worldTimeline.forEach((timeline)=>{
                 wtotalDateTimeline.push(timeline.date)
                 wtotalConfirmedTimeline.push(timeline.confirmed)
      wtotalDeathTimeline.push(timeline.deaths)
      wtotalRecoveredTimeline.push(timeline.recovered)
      wdailyConfirmedTimeline.push(timeline.new_confirmed)
      wdailyDeathTimeline.push(timeline.new_deaths)
      wdailyRecoveredTimeline.push(timeline.new_recovered)
        })


      

      overallStatsNumber[0].textContent = data.data[0].confirmed;
      overallStatsNumber[1].textContent = data.data[0].deaths;
      overallStatsNumber[2].textContent = data.data[0].recovered;
      overallStatsNumber[3].textContent = data.data[0].new_confirmed;
      overallStatsNumber[4].textContent = data.data[0].new_deaths;
      overallStatsNumber[5].textContent = data.data[0].new_recovered;
    } 
    wtotalDateTimeline.reverse()
    wtotalConfirmedTimeline.reverse()
    wtotalDeathTimeline.reverse()
    wtotalRecoveredTimeline.reverse()
    wdailyConfirmedTimeline.reverse()
    wdailyDeathTimeline.reverse()
    wdailyRecoveredTimeline.reverse()
    chartW.update();
    chartW1.update();
    chartW2.update();
    chartW3.update();
    chartW4.update();
    chartW5.update();
   
  });
});

fetch("https://corona-api.com/countries").then((response) => {
  response.json().then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      const countries = data.data;
     
      countries.forEach((country, index) => {


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

//Options for ChartsJS
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


fetch("https://api.covid19india.org/data.json").then((response) => {
  response.json().then((data) => {
    var states = data.statewise;
    var totalTimeline = data.cases_time_series;
    
    overallStatsNumber[6].textContent = data.statewise[0].confirmed;
    overallStatsNumber[7].textContent = data.statewise[0].deaths;
    overallStatsNumber[8].textContent = data.statewise[0].recovered;
    overallStatsNumber[9].textContent = data.statewise[0].deltaconfirmed;
    overallStatsNumber[10].textContent = data.statewise[0].deltadeaths;
    overallStatsNumber[11].textContent = data.statewise[0].deltarecovered;
    

    totalTimeline.forEach((timeline, index) => {
     
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
      if(index==0){
        pievalC.push(state.confirmed)
        pievalD.push(state.deaths)
        pievalR.push(state.recovered)
        
      }
     

      const row = table[1].insertRow(index + 1);
      row.innerHTML = `<th onclick="javascript:location.href='/${stateName[index]}'" >${state.state}</th> 
      <td>${state.confirmed}</td>
      <td>${state.deltaconfirmed}</td>
      <td>${state.deaths}</td>
      <td>${state.deltadeaths}</td>
      <td>${state.recovered}</td>
       <td>${state.deltarecovered}</td>`;
    });

    stateName.shift();
    stateConfirmedList.shift();
    stateActiveList.shift();
    stateDeathsList.shift();
    stateRecoveredList.shift();
    
    chart1.update();
    chart.update();
    chart2.update();
    chart3.update();
    chart4.update();
    chart5.update();
    chart6.update();
    pie.update()
  
  })
})


var ctx = document.querySelectorAll(".myChart");
var ctxW = document.querySelectorAll(".myChartW");

var chart = new Chart(ctx[0], {
  // The type of chart we want to create
  type: "line",

  // The data for our dataset
  data: {
    labels: totalDateTimeline,
    datasets: [
      {
        label: "Confirmed Cases",
        backgroundColor: "#007bff",
        // fill: false,
        borderColor: "#007bff",
        data: totalConfirmedTimeline,
      },
    ],
  },

  // Configuration options go here
  options: dataChartOptions,
});

var chartW = new Chart(ctxW[0], {
  // The type of chart we want to create
  type: "line",

  // The data for our dataset
  data: {
    labels: wtotalDateTimeline,
    datasets: [
      {
        label: "Confirmed Cases",
        backgroundColor: "#007bff",
        // fill: false,
        borderColor: "#007bff",
        data: wtotalConfirmedTimeline,
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
        backgroundColor: "#ff073a",
        // fill: false,
        borderColor: "#ff073a",
        data:  wtotalConfirmedTimeline,
      },
    ],
  },

  // Configuration options go here
  options: dataChartOptions,
});

var chartW1 = new Chart(ctxW[1], {
  // The type of chart we want to create
  type: "line",

  // The data for our dataset
  data: {
    labels: wtotalDateTimeline,
    datasets: [
      {
        label: "Death Cases",
        backgroundColor: "#ff073a",
        // fill: false,
        borderColor: "#ff073a",
        data: wtotalDeathTimeline,
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
        backgroundColor: "#28a745",
        // fill: false,
        borderColor: "#28a745",
        data: totalRecoveredTimeline,
      },
    ],
  },

  // Configuration options go here
  options: dataChartOptions,
});

var chartW2 = new Chart(ctxW[2], {
  // The type of chart we want to create
  type: "line",

  // The data for our dataset
  data: {
    labels: wtotalDateTimeline,
    datasets: [
      {
        label: "Recovered Cases",
        backgroundColor: "#28a745",
        // fill: false,
        borderColor: "#28a745",
        data: wtotalRecoveredTimeline,
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
        backgroundColor: "#007bff",
        // fill: false,
        borderColor: "#007bff",
        data: dailyConfirmedTimeline,
      },
    ],
  },

  // Configuration options go here
  options: dataChartOptions,
});

var chartW3 = new Chart(ctxW[3], {
  // The type of chart we want to create
  type: "line",

  // The data for our dataset
  data: {
    labels: wtotalDateTimeline,
    datasets: [
      {
        label: "Confirmed Cases",
        backgroundColor: "#007bff",
        // fill: false,
        borderColor: "#007bff",
        data: wdailyConfirmedTimeline,
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
        backgroundColor: "#ff073a",
        // fill: false,
        borderColor: "#ff073a",
        data: dailyDeathTimeline,
      },
    ],
  },

  // Configuration options go here
  options: dataChartOptions,
});


var chartW4 = new Chart(ctxW[4], {
  // The type of chart we want to create
  type: "line",

  // The data for our dataset
  data: {
    labels: wtotalDateTimeline,
    datasets: [
      {
        label: "Death Cases",
        backgroundColor: "#ff073a",
        // fill: false,
        borderColor: "#ff073a",
        data: wdailyDeathTimeline,
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
        backgroundColor: "#28a745",
        // fill: false,
        borderColor: "#28a745",
        data: dailyRecoveredTimeline,
      },
    ],
  },

  // Configuration options go here
  options: dataChartOptions,
});


var chartW5 = new Chart(ctxW[5], {
  // The type of chart we want to create
  type: "line",

  // The data for our dataset
  data: {
    labels: wtotalDateTimeline,
    datasets: [
      {
        label: "Recovered Cases",
        backgroundColor: "#28a745",
        // fill: false,
        borderColor: "#28a745",
        data: wdailyRecoveredTimeline,
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
        backgroundColor: "#007bff",
        fill: false,
        borderColor: "#007bff",
        data: stateConfirmedList,
      },
      {
        label: "Death Cases",
        backgroundColor: "#ff073a",
        // fill: false,
        borderColor: "#ff073a",
        data: stateDeathsList,
      },
      {
        label: "Recovered Cases",
        backgroundColor: "#28a745",
        // fill: false,
        borderColor: "#28a745",
        data: stateRecoveredList,
      },
    ],
  },

  // Configuration options go here
  options: dataChartOptions,
});


var pie = new Chart(document.getElementById("doughnut-chart"), {
  type: "doughnut",
  data: {
    labels: ["Confirmed", "Deaths", "Recovered"],
    datasets: [
      {
        label: "Cases",
        backgroundColor: [
          "#007bff",
          "#ff073a",
          "#28a745",
          
        ],
        data: [pievalC,pievalD,pievalR],
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: "The division of total number of cases",
    },
    responsive: true,
    legend: {
      display: false
    },
  },
});
