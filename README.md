# Opinary Polls ReadME

## Launch Project
The Project only requires a live server to launch the project with no external dependencies


## Widget Documentation
Include the css file and js file from the widget folder in your html.

To configure your poll, add a `data-config` attribute and pass the path to a `.json` config file.

In the `config` file the object should include a `question` which is a string, a `pollID` which should be unique for each poll and an array called `options` which should contain objects for each poll option. Each poll option should include a unique `id` and `option` which is a string.

## Project Setup and Techical Decisions
I decided to keep it simple and just use basic `html`, `css` and `vanilla js` to enable it be easier to integrate into html pages. To make the configuration straightforward I decided to use a JSON file where the widget user can just pass json data and have the widget up and running.

Due to limited time, I didn't include unit test which doesn't affect the overall output but makes development process easier.
