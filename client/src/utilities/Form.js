// NOTE perform html form init-TextTrackList, etc







export const initModal =(selector)=>{
    $(document).ready(function () {
        $(selector).modal();
    });
}


export const initSelectFields =(selector)=>{
    $(document).ready(function () {
        $('select').formSelect();
    });
}

export const initAutocomplete =(selector)=>{

    document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('.autocomplete');
         instances = M.Autocomplete.init(elems, options);
    });

}