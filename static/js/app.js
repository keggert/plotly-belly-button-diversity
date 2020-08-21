// Use D3 JSON to fetch data from JSON file
// Incoming data is internally referred to as incomingData

d3.json("./data/samples.json").then((data) => {
    console.log(data);

    // function filterMicrobes(microbe) {
    //     return microbe.otu_ids
    // };

    // var trace = {
    //     X: microbe.sample_values,
    //     y: microbe.otu_ids,
    //     type: "bar",
    //     orientation: "h"
    // };
});