import React, {Component} from 'react';



export default class Slides extends Component {


  componentDidMount(){
   

    $(document).ready(function(){
     // $('.sidenav').sidenav();
    
     document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.sidenav');
      var instances = M.Sidenav.init(elems, options);
      var instance = M.Sidenav.getInstance(elems);
      instance.open();

    });


    });
  
  }

  render() {
      return (
    

        <div>





         <div className="row">

            <div className='col offset-m3 m7 center'>
  {/* <a href="#!" class='pulse'><i className="material-icons large pulse">volume_up</i></a> */}
  <a class="btn-floating btn-large cyan pulse"><i class="material-icons large">volume_up</i></a>

        </div>

        <div className='col offset-m1 m3'>




     <ul class="collection with-header">
        <li class="collection-header"><h4>Spelling</h4></li>
        <li class="collection-item"><div>Page 1<a href="#!" class="secondary-content"><i class="material-icons">send</i></a></div></li>
        <li class="collection-item"><div>Page 2<a href="#!" class="secondary-content"><i class="material-icons">send</i></a></div></li>
        <li class="collection-item red-text"><div>Page 3<a href="#!" class="secondary-content"><i class="material-icons red-text">thumb_up</i></a></div></li>
        <li class="collection-item"><div>Page 4<a href="#!" class="secondary-content"><i class="material-icons">send</i></a></div></li>
        <li class="collection-item"><div>Page 5<a href="#!" class="secondary-content"><i class="material-icons">send</i></a></div></li>
        <li class="collection-item"><div>Page 6<a href="#!" class="secondary-content"><i class="material-icons">send</i></a></div></li>
        <li class="collection-item"><div>Page 7<a href="#!" class="secondary-content"><i class="material-icons">send</i></a></div></li>
      </ul>

        </div>

        

        



    <div className="col   m7">
      <div className="card">
        <div className="card-image">
          <img className='blur' height={250} src="http://wallpaintingmumbai.in/wp-content/uploads/2012/05/Gallery-Image-20.png" />
          <span className="card-title col s12 offset-m1">
  <a href="#!" className='white-text center '>
  <h1>A
  <i className="material-icons large red-text">trending_flat</i>A for Apple
  </h1>
 </a>

</span>

        </div>
        <div className="card-content">
          <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
        </div>
        <div className="card-action">
        <a className='green-text' href="#">A</a>
        <a className='red-text' href="#">B</a>
        <a className='green-text' href="#">C</a>
          <a className='yellow-text' href="#">C</a>
       
        </div>
      </div>
    </div>
  </div>


        </div>

            )
            }



}
