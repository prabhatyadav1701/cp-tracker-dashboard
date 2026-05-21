// ======================
// GET HTML ELEMENTS
// ======================

const themeToggle = document.getElementById("themeToggle");

const addBtn = document.getElementById("addBtn");

const problemName = document.getElementById("problemName");

const difficulty = document.getElementById("difficulty");

const topic = document.getElementById("topic");

const problemsContainer = document.getElementById("problemsContainer");

const totalSolved = document.getElementById("totalSolved");

const easyCount = document.getElementById("easyCount");

const mediumCount = document.getElementById("mediumCount");

const hardCount = document.getElementById("hardCount");

const searchInput = document.getElementById("searchInput");

const filterTopic = document.getElementById("filterTopic");


// ======================
// ARRAY TO STORE PROBLEMS
// ======================

let problems = [];

// ======================
// PIE CHART
// ======================

const difficultyChartCanvas =
document.getElementById("difficultyChart");

const difficultyChart = new Chart(
    difficultyChartCanvas,
    {

    type: "pie",

    data: {

        labels: ["Easy", "Medium", "Hard"],

        datasets: [{

            data: [0, 0, 0],

            backgroundColor: [
                "green",
                "orange",
                "red"
            ]

        }]
    }

});

// ======================
// TOPIC BAR CHART
// ======================

const topicChartCanvas =
document.getElementById("topicChart");

const topicChart = new Chart(
    topicChartCanvas,
    {

    type: "bar",

    data: {

        labels: [

            "Array",
            "String",
            "Linked List",
            "Stack",
            "Queue",
            "Tree",
            "BST",
            "Heap",
            "Graph",
            "Trie",
            "DP",
            "Greedy"

        ],

        datasets: [{

            label: "Problems Solved",

            data: [
                0,0,0,0,0,0,0,0,0,0,0,0
            ]

        }]
    }

});

// ======================
// UPDATE DASHBOARD STATS
// ======================

function updateStats(){

    totalSolved.textContent = problems.length;

    let easy = 0;
    let medium = 0;
    let hard = 0;

    let arrayCount = 0;
    let stringCount = 0;
    let linkedListCount = 0;
    let stackCount = 0;
    let queueCount = 0;
    let treeCount = 0;
    let bstCount = 0;
    let heapCount = 0;
    let graphCount = 0;
    let trieCount = 0;
    let dpCount = 0;
    let greedyCount = 0;


    problems.forEach(function(problem){

        // ======================
        // DIFFICULTY COUNT
        // ======================

        if(problem.difficulty === "Easy"){

            easy++;

        }

        else if(problem.difficulty === "Medium"){

            medium++;

        }

        else if(problem.difficulty === "Hard"){

            hard++;

        }

        // ======================
        // TOPIC COUNT
        // ======================

        if(problem.topic === "Array"){

            arrayCount++;

        }

        else if(problem.topic === "String"){

            stringCount++;

        }

        else if(problem.topic === "Linked List"){

            linkedListCount++;

        }

        else if(problem.topic === "Stack"){

            stackCount++;

        }

        else if(problem.topic === "Queue"){

            queueCount++;

        }

        else if(problem.topic === "Tree"){

            treeCount++;

        }

        else if(problem.topic === "BST"){

            bstCount++;

        }

        else if(problem.topic === "Heap"){

            heapCount++;

        }

        else if(problem.topic === "Graph"){

            graphCount++;

        }

        else if(problem.topic === "Trie"){

            trieCount++;

        }

        else if(problem.topic ===
                "Dynamic Programming"){

            dpCount++;

        }

        else if(problem.topic === "Greedy"){

            greedyCount++;

        }

    });

    // ======================
    // UPDATE CARDS
    // ======================

    easyCount.textContent = easy;

    mediumCount.textContent = medium;

    hardCount.textContent = hard;

    // ======================
    // UPDATE PIE CHART
    // ======================

    difficultyChart.data.datasets[0].data = [

        easy,
        medium,
        hard

    ];

    difficultyChart.update();

    // ======================
    // UPDATE TOPIC CHART
    // ======================

    topicChart.data.datasets[0].data = [

        arrayCount,
        stringCount,
        linkedListCount,
        stackCount,
        queueCount,
        treeCount,
        bstCount,
        heapCount,
        graphCount,
        trieCount,
        dpCount,
        greedyCount

    ];

    topicChart.update();

}

// ======================
// CREATE PROBLEM CARD
// ======================

function createProblemCard(problem){

    const problemCard =
    document.createElement("div");

    problemCard.classList.add("problem-card");

    problemCard.innerHTML = `

        <h3>${problem.name}</h3>

        <p class="${problem.difficulty}">
            Difficulty: ${problem.difficulty}
        </p>

        <p>
            Topic: ${problem.topic}
        </p>

        <div class="card-buttons">

            <button class="editBtn">
                Edit
            </button>

            <button class="deleteBtn">
                Delete
            </button>

        </div>

    `;

    // ======================
    // DELETE BUTTON
    // ======================

    const deleteBtn =
    problemCard.querySelector(".deleteBtn");



    deleteBtn.addEventListener(
        "click",
        function(){

        // Remove Card

        problemCard.remove();

        // Remove From Array

        problems = problems.filter(
            function(p){

            return !(

                p.name === problem.name &&
                p.difficulty ===
                problem.difficulty &&
                p.topic === problem.topic

            );

        });

        // Update Local Storage

        localStorage.setItem(

            "problems",

            JSON.stringify(problems)

        );

        // Update Dashboard

        updateStats();

    });

    // ======================
    // EDIT BUTTON
    // ======================

    const editBtn =
    problemCard.querySelector(".editBtn");



    editBtn.addEventListener(
        "click",
        function(){

        // Fill Inputs

        problemName.value = problem.name;

        difficulty.value = problem.difficulty;

        topic.value = problem.topic;


        // Remove Old Problem

        problems = problems.filter(
            function(p){

            return !(

                p.name === problem.name &&
                p.difficulty ===
                problem.difficulty &&
                p.topic === problem.topic

            );

        });


        // Remove Card

        problemCard.remove();


        // Update Local Storage

        localStorage.setItem(

            "problems",

            JSON.stringify(problems)

        );


        // Update Dashboard

        updateStats();

    });
    // Add Card To Page

    problemsContainer.appendChild(problemCard);

}

// ======================
// ADD PROBLEM BUTTON
// ======================

addBtn.addEventListener(
    "click",
    function(){

    const name = problemName.value;

    const diff = difficulty.value;

    const top = topic.value;



    // ======================
    // VALIDATION
    // ======================

    if(name === "" ||
       diff === "" ||
       top === ""){

        alert("Please fill all fields");

        return;
    }

    // ======================
    // CREATE OBJECT
    // ======================

    const problemObj = {

        name: name,

        difficulty: diff,

        topic: top

    };
    // Push Into Array

    problems.push(problemObj);

    // Save To Local Storage

    localStorage.setItem(

        "problems",

        JSON.stringify(problems)

    );

    // Create Problem Card

    createProblemCard(problemObj);

    // Update Dashboard

    updateStats();

    // Clear Inputs

    problemName.value = "";

    difficulty.value = "";

    topic.value = "";

});

// ======================
// LOAD DATA AFTER REFRESH
// ======================

window.addEventListener(
    "load",
    function(){

    const storedProblems =
    localStorage.getItem("problems");



    if(storedProblems){

        problems =
        JSON.parse(storedProblems);



        problems.forEach(function(problem){

            createProblemCard(problem);

        });



        updateStats();

    }

});

// ======================
// SEARCH FUNCTIONALITY
// ======================

searchInput.addEventListener(
    "keyup",
    function(){

    const searchText =
    searchInput.value.toLowerCase();

    const allCards =
    document.querySelectorAll(".problem-card");



    allCards.forEach(function(card){

        const title =
        card.querySelector("h3")
        .textContent
        .toLowerCase();



        if(title.includes(searchText)){

            card.style.display = "block";

        }

        else{

            card.style.display = "none";

        }

    });

});

// ======================
// FILTER BY TOPIC
// ======================

filterTopic.addEventListener(
    "change",
    function(){

    const selectedTopic =
    filterTopic.value;

    const allCards =
    document.querySelectorAll(".problem-card");



    allCards.forEach(function(card){

        const topicText =
        card.querySelectorAll("p")[1]
        .textContent;



        if(

            selectedTopic === "All" ||

            topicText.includes(selectedTopic)

        ){

            card.style.display = "block";

        }

        else{

            card.style.display = "none";

        }

    });

});

// ======================
// DARK MODE
// ======================

themeToggle.addEventListener(
    "click",
    function(){

    document.body.classList.toggle(
        "dark-mode"
    );



    if(document.body.classList
       .contains("dark-mode")){

        localStorage.setItem(
            "theme",
            "dark"
        );

        themeToggle.textContent =
        "☀️ Light Mode";

    }

    else{

        localStorage.setItem(
            "theme",
            "light"
        );

        themeToggle.textContent =
        "🌙 Dark Mode";

    }

});

// ======================
// LOAD SAVED THEME
// ======================

const savedTheme =
localStorage.getItem("theme");



if(savedTheme === "dark"){

    document.body.classList.add(
        "dark-mode"
    );

    themeToggle.textContent =
    "☀️ Light Mode";

}