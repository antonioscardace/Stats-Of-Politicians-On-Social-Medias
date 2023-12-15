function getParamFromUrl(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
}

function refreshChart(this_button) {
    let id = $(this_button).closest('.line-chart').find('iframe').attr('id');
    $('#' + id).attr('src', $('#' + id).attr('src'));
}