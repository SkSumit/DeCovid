const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);
const stateName = urlParams.get("state");

var templateTitle = document.querySelector("#templateTitle");
var templateSubtitle = document.querySelector("#templateSubtitle");
templateTitle.textContent = stateName;
templateSubtitle.textContent = stateName;
var zones = [],
  confirmedTimeline = [],
  recoveredTimeline = [],
  deadTimeline = [],
  dateTimeline = [];
  dateTimeline1 = [];
  dateTimeline2 = [];
var stateCode;

var table = document.querySelector("#districtStatsTable");

fetch("https://api.covid19india.org/zones.json").then((response) => {
  response.json().then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      data.zones.forEach((element, index) => {
        if (element["state"] == stateName) {
          //    console.log(element.zone)
          zones.push(element.zone);
        }
      });
    }
  });
});

fetch("https://api.covid19india.org/v2/state_district_wise.json").then(
  (response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        var districtsList = [];
        var districts = [];
        data.forEach((element, index) => {
          // console.log(element.statecode);
          if (element["state"] == stateName) {
            districtsList.push(data[index].districtData);
            stateCode = data[index].statecode;
            console.log(stateCode);
          }
        });

        districtsList[0].forEach((district, index) => {
          //console.log(zones[index])
          // console.log(zones)
          const row = table.insertRow(index + 1);
          row.innerHTML = `<th>${district.district}</th> 
        <td>${district.confirmed}</td>
        <td>${district.delta.confirmed}</td>
        <td>${district.deceased}</td>
        <td>${district.delta.deceased}</td>
        <td>${district.recovered}</td>
         <td>${zones[index]}</td>`;
        });
      }
    });
  }
);

fetch("https://api.covid19india.org/states_daily.json").then((response) => {
  response.json().then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      var lowercasestatecode = stateCode.toLowerCase();

      // console.log(data.states_daily);
      data.states_daily.forEach((element, index) => {
        // console.log(element);
        if (element.status == "Confirmed") {
          // console.log(element);
          dateTimeline.push(element.date);
          // console.log(element[lowercasestatecode]);
          confirmedTimeline.push(element[lowercasestatecode]);
        }
        else if (element.status == "Deceased") {
          
          dateTimeline1.push(element.date);
          deadTimeline.push(element[lowercasestatecode]);
        }
        else{
          dateTimeline2.push(element.date);
          recoveredTimeline.push(element[lowercasestatecode]);
        }
      });
      chart.update();
      chart1.update();
      chart2.update();
    }
  });
});

var ctx = document.querySelectorAll(".myChart");
//console.log(ctx)

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

var chart = new Chart(ctx[0], {
  // The type of chart we want to create
  type: "line",

  // The data for our dataset
  data: {
    labels: dateTimeline,
    datasets: [
      {
        label: "Confirmed Cases",
        backgroundColor: "#007bff",
        // fill: false,
        borderColor: "#007bff",
        data: confirmedTimeline,
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
    labels: dateTimeline1,
    datasets: [
      {
        label: "Death Cases",
        backgroundColor: "#ff073a",
        // fill: false,
        borderColor: "#ff073a",
        data:  deadTimeline,
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
    labels: dateTimeline2,
    datasets: [
      {
        label: "Recovered Cases",
        backgroundColor: "#28a745",
        // fill: false,
        borderColor: "#28a745",
        data: recoveredTimeline,
      },
    ],
  },

  // Configuration options go here
  options: dataChartOptions,
});


function myFunction() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("districtStatsTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 1; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("th")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}




const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent ;

const comparer = (idx, asc) => (a, b) => ((v1, v2) => 
    v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
    )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));

// do the work...
document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {

  const table = th.closest('table');
 
  const tbody = table.querySelector('tbody');
  Array.from(tbody.querySelectorAll('tr'))
    .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
    .forEach(tr => tbody.appendChild(tr) );
})));