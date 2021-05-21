
function bargraph(id_input) {
    //read the data
    d3.json("samples.json").then((data_json) => {
      //get the data of ids, sample values hover text ->labels
      var dataSamples = data_json.samples;
      // filter the data to only get the information associated with the input id
      var data_id = dataSamples.filter(x => x.id == id_input);
      //since it is an array get the first array of otu_ids
      var otu_ids = data_id[0].otu_ids;
      var otu_labels = data_id[0].otu_labels;
      var otu_values = data_id[0].sample_values;
      //format id to add OTU 
      var yValues = otu_ids.slice(0, 10).map(x => "OTU" + x).reverse()
      
      //create traces and layout
      var trace1 = {
        
      // filter top 10 values to show in the plot
        x: otu_values.slice(0, 10).reverse(),     
        y: yValues,    
        text: otu_labels.slice(0, 10).reverse(),     
        type: "bar", 
        orientation: "h",
        font: {
          color: '#ffffff'
        },
        marker: {
          color: 'rgb(255,162,29)',
          opacity: 0.6,
          line: {
            color: 'rgb(8,48,107)',
            width: 1.5
          }
        } 
      };
      var layout = {
        title: "Bacteria",
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        font: {
          color: '#ffffff'
        }
      };
      var data = [trace1];
      Plotly.newPlot("bar", data, layout);
  
      var bubbleData = {
        x: otu_ids,
        y: otu_values,
        text: otu_labels,
        mode: "markers",
        font: {
          color: '#ffffff'
        },
        marker: {
          size: otu_values,
          color: otu_ids,
          colorscale: 'YlGnBu'
        }
      }
  
      var bubbleLayout = {
        title: "Bacteria cultures",
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        margin: {
          t: 30
        },
        hovermode: "closest",
        xaxis: {
          title: "OTU Id"
        },
        font: {
          color: '#ffffff'
        }
      }
      Plotly.newPlot("bubble", [bubbleData], bubbleLayout)
    });
  };
  

//   function defaultfunction() {

//     d3.json("samples.json").then((data) => {
//       var names = data.names;

//       names.forEach((name) => {
//         d3.select("#selDataset").append("option").text(name).property("value", name);
//       });

//       bargraph(data.names[0]);
//     });
//   };
  
  // change graphs based on input in dropdown
  function optionChanged(inp) {
    bargraph(inp);
    // select class with panel-body
    var panel = d3.select(".panel-body");
    // empty contents on change
    panel.html("");
    demoInfo(inp);
  };

  //this is the default function one initialises that chooses a default option of the dropdown menu so graphs will always be shown
  defaultfunction();
  
  function demoInfo(id_inp) {  
    //read the data  
    d3.json("samples.json").then((dj) => {    
    //get the data of ids, sample values hover text ->labels
        var metadata = dj.metadata;
        // filter the data to only get the information associated with the input id
        var dataId = metadata.filter(x => x.id == id_inp);
        var results = dataId[0];
        htmlEntry = d3.select("#sample-metadata");
        Object.entries(results).forEach(([key, value]) => {
          htmlEntry.append("p").text(`${key}:${value}`)    });
      });
    };
  
  //drop down menu
  function defaultfunction() {
    //this populates the dropdown for users to choose
    d3.json("samples.json").then((data) => {
      var names = data.names;
      names.forEach((name) => {
        d3.select("#selDataset").append("option").text(name).property("value", name);    });
      //select one by default
      bargraph(data.names[0]);
      demoInfo(data.names[0]);
      
    });
  };
   