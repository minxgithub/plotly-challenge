# Plotly-Challenge

Human body meets and adapts to the microbial enviroment as soon as we were born. The Host-Microbe Symbiosis is fundamental of the development of the immunue system. The best example exists would be the abunance and diversity of the microbiome in the gastrointestinal tract. For this homework, we are looking at an interesting dataset about the microbial species (also called operational taxonomic units, or OTUs) obtained from the belly buttons!

153 test subjects were included in this study. The whole dataset is stored in a json file. `Test subject IDs` are stored in the `names` array, `Demographic info` are stored in the `metadata` array, and test results (`OTU IDs, labels and values`) are stored in the `samples` array. 

After reviewing all the data, Plotly JavaScript Graphing Library was employed to create an interactive and dynamic dashboard for selecting and visualizing each test object's demographic info, top 10 most found OTUs (in a bar chart), as well as all the OTUs that were found and their values (in a bubble chart with colors differentiated by IDs and sizes scaled by values).
