// NOTE perform html form init-TextTrackList, etc







export const initModal =(selector)=>{
    $(document).ready(function () {
        $(selector).modal();
    });
}

export const initAutocomplete =(selector)=>{
   return document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('.autocomplete');
        return instances = M.Autocomplete.init(elems, options);
    });

}