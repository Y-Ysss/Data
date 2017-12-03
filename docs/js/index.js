$(function() {

    loadMain('home');
    rippleEffect();
    // let func = {
    //     home: function() {},
    //     about: function() {},
    //     page1: function() {}
    // };

    $('a').click(function() {
        loadMain($(this).attr("id"));
    });


    // $(document).on("click",".cardMore", function() {
    //     const parent = $(this).parent();
    //     const repos = parent.attr('repos');
    //     parent.addClass('cardMax');
    //     console.log(repos);

    // });

});

function loadMain(name) {
    $('#bodyMain').load('html/' + name + '.html', function() {
        $(this).children('.card').animate({
            'margin-top': '1rem',
            'opacity': 1
        }, 500);
    });
}

function setMarkdown(dataUrl) {
    marked.setOptions({
        langPrefix: ''
    });
    $.ajax({
        url: dataUrl
    }).then(
        function(data) {
            let markdownHtml = marked(data);
            $('#mdPreview').append(markdownHtml);
            $('#mdPreview pre code').each(function(i, e) {
                hljs.highlightBlock(e, e.className);
            });
            // $('#mdPreview').css('display', 'inherit');
        },
        function() {
            console.log('Error');
        }
    );
}

function getRepos(dataUrl) {
    const token = "?access_token=f39459812151ac2ca1d564274106f3197f72164e";
    $.getJSON(dataUrl + token).then(function(data) {
        let insertData = '';
        data.forEach(function(repos) {
            let date = (repos.updated_at).replace('T', ' ').slice(0, -1);
            let desc = repos.description === null ? '' : repos.description + '<br>';
            let strLang = '';
            $.ajaxSetup({
                async: false
            });
            $.getJSON(repos.languages_url + token).then(function(list) {
                if (list.length !== 0) {
                    Object.keys(list).forEach(function(lang) {
                        strLang += '<span class="chip" >' + lang + '</span>';
                    });
                }
            });
            $.ajaxSetup({
                async: true
            });
            insertData += '<div repos="' + repos.id + '" class="card"><div class="cardTitle"><span class="ch2">' + repos.name + '</span><span class="sub">Update:' + date + '</span>' + strLang + '</div><div class="cardContents">' + desc + '<a href="' + repos.html_url + '"></a></div></div>';
        });
        $('.loader').hide();
        $('.loaderLabel').hide();
        $('#bodyMain').append(insertData);
        $('.card').animate({
            'margin-top': '1rem',
            'opacity': 1
        }, 500);
    });
}