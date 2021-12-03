var issuesContainerEl = document.querySelector("#issues-container");

var getRepoIssues = function(repo) {
    console.log(repo);
    var apiURL = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    
    fetch(apiURL).then(function(response){
        if(response.ok) {
            response.json().then(function(data){
                // callback function to display issues
                displayIssues(data);
            });
        }else {
            alert("There was a problem with you request!");
        }
    });
};

getRepoIssues("facebook/react");


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