var issuesContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");
//DOM refrenece for header span to display showing issues for:
var repoNameEl = document.querySelector('#repo-name');

getRepoName = () => {
    var queryString = document.location.search;
    // removed part of query string returned in var queryString
    var repoName = queryString.split('=')[1];
    console.log(repoName);
    // Updating var repoNameEl to whatever repo name was searched

    if (repoName) {
        repoNameEl.textContent = repoName;

        getRepoIssues(repoName);
    }else {
        document.location.replace("./index.html");
    }  
};

var getRepoIssues = function(repo) {
    console.log(repo);
    var apiURL = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    
    fetch(apiURL).then(function(response){
        if(response.ok) {
            response.json().then(function(data){
                // callback function to display issues
                displayIssues(data);

                //check if api has paginated issues
                if (response.headers.get("Link")){
                    console.log();
                }
            });
        }else {
            alert("There was a problem with you request!");
        }
    });
};

// accepts para issues
var displayIssues = function(issues) {
    //if there are not repos display
    if (issues.length === 0) {
        issuesContainerEl.textContent = "This repo has no open issues!";
        return;
    }


    //loop over the reponse data and create <a> el for each issue
    for (var i = 0; i < issues.length; i++) {
        // create a link element to take users to the issue on github
        // var issueEl was created meaningful here
        var issueEl = document.createElement("a");
        // then issueEl as given a class list
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        // to open the link in a new tab 
        issueEl.setAttribute("target", "_blank");

        // create span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;
    
        // append to container
        issueEl.appendChild(titleEl);
    
        // create a type element
        var typeEl = document.createElement("span");
    
        // check if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = ("Issue");
        }
        // append to container
        issueEl.appendChild(typeEl);

        // append to the dom
        issuesContainerEl.appendChild(issueEl);
    }

};

var displayWarning = function(repo) {
    //add text to warning container
    limitWarningEl.textContent = "To see more than 30 issues, visit ";

    // create link element
    var linkEl = document.createElement("a");
    linkEl.textContent = "GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues.");
    linkEl.setAttribute("target", "_blank");

    // append to warning container
    limitWarningEl.appendChild(linkEl)
;}



getRepoName();