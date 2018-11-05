// NOTE perform html form init-TextTrackList, etc


export const initSideNav =()=>{
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, options);
  });
}