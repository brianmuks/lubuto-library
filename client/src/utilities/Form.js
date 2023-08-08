// NOTE perform html form init-TextTrackList, etc







export const initModal =(selector)=>{
    $(document).ready(function () {
        $(selector).modal();
    });
}
export const intiToolTip =()=>{
    $(document).ready(function () {
        $('.tooltipped').tooltip();
    });

}


export const initSelectFields =()=>{
    $(document).ready(function () {
        $('select').formSelect();
    });
}

export const initAutocomplete =()=>{

    document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('.autocomplete');
         instances = M.Autocomplete.init(elems, options);
    });

}