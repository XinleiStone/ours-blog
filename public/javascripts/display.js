function getDisplay(id) {
    $.ajax({
        url: '/display',
        data: {id: id},
        type: "GET",
        success: function(dataFrom) {
            console.log(datas)
            console.log(dataFrom)
        },
        error: function(data) {
            console.log("error");
        }
    });
}