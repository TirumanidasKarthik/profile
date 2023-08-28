

var about = document.getElementById('about');
var skills_table = document.getElementById('skills_table');
var experience = document.getElementById('experience_container');
var education = document.getElementById('education_container');
var certification = document.getElementById('certification_container');
var achievement = document.getElementById('achievement_container');



async function fill_about(){
    return (await fetch('data/bio.txt')).text();
}

async function fill_skills(){
    return (await fetch('data/skills.json')).json();
}

async function fill_experience(){
    return (await fetch('data/experience.json')).json();
}

async function fill_education(){
    return (await fetch('data/education.json')).json();
}

async function fill_certification(){
    return (await fetch('data/certification.json')).json();
}

async function fill_achievement(){
    return (await fetch('data/achievement.json')).json();
}




create_skills = (json) => {
            for(let head in json){
                var tr = document.createElement('tr');
                var th = document.createElement('th');
                var td = document.createElement('td');
                th.scope = 'row';
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
        title.className = 'card-title';
        //period.textContent = details['period'];
        var responsibilities = document.createElement('ul');
        responsibilities.className = 'list-group list-group-flush';
        for(let i=0; i < details['responsibilities'].length; i++){
            var item = document.createElement('li');
            item.textContent = details['responsibilities'][i];
            item.className = 'list-group-item';
            responsibilities.appendChild(item);
        }
        experience.className = '';
        experience.append(title, responsibilities);


    }
}

create_education = (json) => {
    for(let degree in json){
        var item = document.createElement('li');
        item.className = 'list-group-item';
        var para = document.createElement('p');
        var record = json[degree];
        var period_span = document.createElement('span');
        var data = degree;
        if(Object.hasOwn(record, 'group')){
            data += ' - ' + record['group'];
        }
        data += ' - ' + record['marks'];
        data += ' - ' + record['school'];
        period_span.textContent = record['period'];
        period_span.className = 'float-end';
        para.textContent = data;
        para.appendChild(period_span);
        item.appendChild(para);
        education.append(item);

    }
}


create_certification = (json) => {
    var certificates = json['certificates'];
    for(let i=0; i<certificates.length ; i++){
        var item = document.createElement('li');
        item.className = 'list-group-item';
        item.textContent = certificates[i];
        certification.appendChild(item);
    }
}


create_achievement = (json) => {
    var achievements = json['achievements'];
    for(let i=0; i<achievements.length ; i++){
        var item = document.createElement('li');
        item.className = 'list-group-item';
        item.textContent = achievements[i];
        achievement.appendChild(item);
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

    //load education
    fill_education().then(
        function(json){
            create_education(json);
        },
        function(error){
            console.log(error);
        }
    );


    //load certifications
    fill_certification().then(
        function(json){
            create_certification(json);
        },
        function(error){
            console.log(error);
        }
    )


     //load achievements
     fill_achievement().then(
        function(json){
            create_achievement(json);
        },
        function(error){
            console.log(error);
        }
    )

};
