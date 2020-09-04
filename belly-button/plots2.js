function filterMicrobes(sample) {
    d3.json("samples.json").then((data) => {
        console.log(data);
        var metadata = data.metadata;
        // Filter our data to get the desired sample number for the object
        var resultsArray = metadata.filter(sampleObject => sampleObject.id == sample);
        var microbe = resultsArray[0];
        // Use d3 to select the panel with an id of sample-metadata
        var panel = d3.select("#sample-metadata");
        // We need to use html("") to clear any existing data
        panel.html("");
        // We need to use object.entries to add each key and value pair to our panel
        Object.entries(microbe).forEach(([key, value]) => {
            panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
    });
}

function buildChart(sample) {
    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var resultsArray = samples.filter(sampleObject => sampleObject.id == sample);
        var microbe = resultsArray[0];


        // Bubble Chart Time
        var bubbleLayout = {
            title: "Top 10 Bacterial Cultures",
            margin: { t: 0},
            hovermode: "closest",
            xaxis: { title: "OTU ID"},
            margin: { t: 30}
        };

        var bubbleData = [
            {
                x: microbe.otu_ids,
                y: microbe.sample_values,
                text: microbe.otu_labels,
                mode: "markers",
                marker: {
                    size: microbe.sample_values,
                    color: microbe.otu_ids,
                    colorscale: "Earth"
                }
            }
        ];
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);

        var yticks = microbe.otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        var barData = [
          {
            y: yticks,
            x: microbe.sample_values.slice(0, 10).reverse(),
            text: microbe.otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h",
          }
        ];
    
        var barLayout = {
          title: "Top 10 Bacterial Cultures",
          margin: { t: 30, l: 150 }
        };
    
        Plotly.newPlot("bar", barData, barLayout);
      });
    }
    

function init() {
    // Grab a reference to our dropdown select element
    var dropdown = d3.select("#selDataset");

    // Use sample names list to populate select options
    d3.json("samples.json").then((data) => {
        var sampleName = data.names;

        sampleName.forEach((sample) => {
            dropdown
                .append("option")
                .text(sample)
                .property("value", sample);
        });

        // Use the first sample from the list to build initial plots
        const firstSample = sampleName[0];
        buildChart(firstSample);
        filterMicrobes(firstSample);
    });
}

function changeOptions(newSample) {
    // Fetch new data everytime a new sample gets selected
    buildChart(newSample);
    filterMicrobes(newSample);
}

// Initialize our dashboard
init();