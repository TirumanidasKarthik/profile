

var about = document.getElementById('about');
var skills_table = document.getElementById('skills_table');
var experience = document.getElementById('experience_container');

async function fill_about(){
    return (await fetch('data/bio.txt')).text();
}

async function fill_skills(){
    return (await fetch('data/skills.json')).json();
}

async function fill_experience(){
    return (await fetch('data/experience.json')).json();
}




create_skills = (json) => {
    skills_table.className = '';
            for(let head in json){
                var tr = document.createElement('tr');
                var th = document.createElement('th');
                var td = document.createElement('td');
                var contents = json[head];
                var s = ''.concat(contents);
                s = s.replaceAll(',', ', ');
                td.textContent = s;
                th.textContent = head;
                tr.append(th, td);
                skills_table.appendChild(tr);
            }
}

create_experience = (json) => {

    for(let company in json){
        var title = document.createElement('h4');
        
        var details = json[company];
        //var period = document.createElement('h4');
        title.textContent = company + "  |  " + details['period'];
        //period.textContent = details['period'];
        var responsibilities = document.createElement('ul');
        for(let i=0; i < details['responsibilities'].length; i++){
            var item = document.createElement('li');
            item.textContent = details['responsibilities'][i];
            responsibilities.appendChild(item);
        }
        experience.className = '';
        experience.append(title, responsibilities);


    }
}


load_data = () => {
    fill_about().then(
        function(value){
            about.className = '';
            about.textContent = value;

        },
        function(error){
            console.log(error);
        }
    );

    // load skills
    fill_skills().then(
        function(json){
            create_skills(json);
            
        },
        function(error){
            console.log(error);
        }
    );

    //load experience
    fill_experience().then(
        function(json){
            create_experience(json);
        },
        function(error){
            console.log(error);
        }
    );
};
