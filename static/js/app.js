function init() {
    // D3 to fetch json file
    d3.json("data/samples.json").then((data) => {
        // fetch test subject IDs of all samples
        var subjectID = data.names;
        console.log(subjectID);

        // use D3 to select and append the values from each test subject/sample
        subjectID.forEach((sample) => {
            d3.select("#selDataset")
              .append("option")
              .text(sample)
              .property("value", sample);
        });

    // Initialise the Test Subject ID with the first test subject ID from the names list
    const firstSubjectID = subjectID[0];
    
    // Initialise the Demographic Info and Plots with the first test subject ID
    buildMetadata(firstSubjectID);
    buildCharts(firstSubjectID);
    });
}


function buildMetadata(sample) {
    // use D3 to fetch json file
    d3.json("data/samples.json").then((data) => {
        // fetch metadata array of all samples
        var metaData = data.metadata;
        console.log(metaData);

        // filter to get each sample's demographic info
        var metaArray = metaData.filter(object => object.id == sample);
        console.log(metaArray);
        
        // fetch demographic object
        var metaObject = metaArray[0];
        console.log(metaObject);

        // use D3 to select and append DOM element
        var demographicPanel = d3.select("#sample-metadata");
        demographicPanel.html("");
        Object.entries(metaObject).forEach(([key, value]) => {
            demographicPanel.append("h5").text(`${key}: ${value}`);
        });
    });
}


function buildCharts(sample) {

    // use D3 to fetch json file
    d3.json("data/samples.json").then((data) => {
        // fetch samples (list of dict) array of all samples
        var samples = data.samples;

        // filter to get each sample's "otu_ids", "otu_labels" and "sample_values"
        var filteredArray = samples.filter(object => object.id == sample);
        console.log(filteredArray);

        // fetch the object
        var filteredObject = filteredArray[0]
        console.log(filteredObject);

        // assign variables for building the charts
        var values = filteredObject.sample_values;
        var ids = filteredObject.otu_ids;
        var labels = filteredObject.otu_labels;

        // console.log(ids.slice(0, 10).reverse());

        // Building the Bar Chart
        var DataBar = [{
            x:values.slice(0,10).reverse(),
            y:ids.slice(0, 10).map(otu_id => `OTU ${otu_id}`).reverse(),
            text:labels.slice(0,10).reverse(),
            type:"bar",
            orientation:"h"
            }];
  
        var LayoutBar = {
            title: "Top 10 Operational Taxonomic Units (OTUs) Found",
            margin: { t: 30, l: 150 }
            };
  
        Plotly.newPlot("bar", DataBar, LayoutBar);

        // Building the Bubble Chart
        var DataBubble = [{
            x: ids,
            y: values,
            mode: "markers",
            marker: {
                size: values,
                color: ids,
                colorscale: "Earth"
                    },
            text: labels
            }];

        var LayoutBubble = {
            margin: { t: 0 },
            xaxis: { title: "OTU ID" },
            hovermode: "closest",
            };

        Plotly.plot("bubble", DataBubble, LayoutBubble);
    });
}
   
// Update New info and Plots by optionChanged function
function optionChanged(newSample) {
    buildCharts(newSample);
    buildMetadata(newSample);
}

// Initialise the dashboard
init();