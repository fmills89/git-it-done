// creating two vars to store a refrence to the form el w/ id of userform
// and to the input el w/ id username
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
// Creating vars and referencing DOM elements
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");



var getUserRepos = function(user) {
    // format the gitub api url
    var apiURL = "https://api.github.com/users/" + user + "/repos";
    // make a request to the url
    fetch(apiURL).then(function(response){
        // request was successful
        if (response.ok) {
        response.json().then(function(data){
            console.log(data);
            // when response data is converted to JSON, sent from
            // getUserRepos() to displayRepos()
            displayRepos(data, user);
        });
        } else {
            alert("Error: GitHub User Not Found");
        }
    })
    .catch(function(error) {
        // notice this `.catch()` getting chained onto the end of the .`then()` method
        alert("Unable to connect to GitHub");
    });
};

// function to be executed upon a form submissiom browser event
var formSubmitHandler = function(event) {
    event.preventDefault();
    console.log(event);

    var username = nameInputEl.value.trim();
    // updating formSubmitHandler() to get the value of the from <input> el and 
    // send it over to getUserRepos()
    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a GitHub username");
    }
};

// created function to display repos
var displayRepos = function(repos, searchTerm) {
    //check if api returned any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
    console.log(repos);
    console.log(searchTerm);
    // clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;
    // loop over repos
    for (var i = 0; i < repos.length; i++) {
        // format repo name
        var repoName = repos[i].owner.login + '/' + repos[i].name;

        // create a container for each repo
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        // create a span element to hold repo name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        // append to container
        repoEl.appendChild(titleEl);

        // create a status element 
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        //check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = 
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        //append to container
        repoEl.appendChild(statusEl);

        //apend container to the dom
        repoContainerEl.appendChild(repoEl);
}

};

// adding event listener to listen for submit on form
userFormEl.addEventListener("submit", formSubmitHandler);