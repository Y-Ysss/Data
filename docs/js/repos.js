$(function() {
    $.getJSON('https://api.github.com/users/Yoseatlly/repos').then(function(data) {
    	let insertData = '';
        data.forEach(function(repos) {
        // console.log(repos.name + ', ' + repos.html_url + ', ' + repos.updated_at + ', ' + repos.created_at);
        insertData += '<div class="card"><div class="cardContents"><h2>'+repos.name+'<span class="date">'+repos.updated_at+'</span></h2></div><div class="cardContents"><h3>Hello</h3>' + repos.html_url + '</div></div>';
        });
        // console.log(insertData);
    });
});