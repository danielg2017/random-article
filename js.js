$(document).ready(function () {
    $("#wiki-search").keyup(function (event) {
        if (event.keyCode == 13) {
            $("#wiki").click();
        }
    });
    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });
    $("#wiki").on("click", function () {
        var wikiSearch = $("#wiki-search").val();
        var url =
            "https://es.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + wikiSearch + "&callback=?";
        $.ajax({
            url: url,
            type: "GET",
            async: false,
            dataType: "json",
            success: function (data) {
                $("#output").html("");
                for (var i = 0; i < data[1].length; i++) {
                    $("#output").prepend(
                        "<li><a href=" +
                            data[3][i] +
                            ' target="_blank">' +
                            data[1][i] +
                            "</a><p>" +
                            data[2][i] +
                            "</p></li>"
                    );
                }
            },
            error: function (errorMessage) {
                alert("Error");
            },
        });
    });
});
