# Web-APIs
Fetching information on web APIs

Fetching is the process of retrieving the content from a URL across the web. Before your search results are displayed, your browser first needs to fetch the contents of the page located at the URL. As you might imagine, this process is done asynchronously. Your browser does not wait for a fetch request to return before it allows you to do anything. It will fetch the requested page, allow you to switch tabs or type in other queries, and then after the fetch resolves it will display the content.

This is an application that collects weather data (through fetching) for universities using various third-party web interfaces to collect information that will be either passed along as arguments to other interfaces or analyzed on its own. By combining these web services and chaining and creating promise objects, we have created a single asynchronous application for university data analysis. In the main method is an application that my team has made that takes in the user's preferred weather (lowest temp to highest temp) and their preferred college systems (University of California's, University of Massachusetts', etc) and returns a list of potential matches of specific universities within those systems. It would be a tool for people trying to narrow down the schools they are applying to by considering their preferences. 
