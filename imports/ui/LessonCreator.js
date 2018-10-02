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
  <a href="#!"><i className="material-icons large ">volume_up</i></a>
  <a href="/lesson" className='right green-text'>Preview<i className="material-icons right">send</i></a>

        </div>

        

    <div className="col offset-m3 s12 m7">
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










  {/* <nav>  </nav> */}

<ul id="slide-out" className="sidenav sidenav-fixed">
  <li><div className="user-view">
    <div className="background">
      <img  width={300} src="https://static1.squarespace.com/static/557edb36e4b0c3993dee95d1/t/558172d3e4b07ca0ea5976c1/1538157488511/?format=1500w" />
    </div>
    {/* <a href="#user"><img className="circle" src="images/yuna.jpg" width={20}/></a> */}
    <br/>
    <a href="#name"><span className="white-text name"></span></a>
    <a href="#email"><span className="white-text email"></span></a>
  </div></li>
  <li><a href="#!"><i className="material-icons">add</i>New Lesson</a></li>
  <li><a href="#!"><i className="material-icons">help</i>Help</a></li>

  <li><div className="divider"></div></li>
  <li><a className="subheader">Utilities</a></li>
  <li><a href="#!"><i className="material-icons">star</i>tool</a></li>
  <li><a href="#!"><i className="material-icons">speaker_phone</i>tool</a></li>
  <li><a href="#!"><i className="material-icons">textsms</i>tool</a></li>
  <li><a href="#!"><i className="material-icons">trending_flat</i>tool</a></li>
  <li><a href="#!"><i className="material-icons">trending_up</i>tool</a></li>
  <li><a href="#!"><i className="material-icons">wb_incandescent</i>tool</a></li>
  <li><a href="#!"><i className="material-icons">wc</i>tool</a></li>
  <li><a href="#!"><i className="material-icons">weekend</i>tool</a></li>
  <li><a href="#!"><i className="material-icons">widgets</i>tool</a></li>
  <li><a href="#!"><i className="material-icons">wb_sunny</i>tool</a></li>
  <li><a href="#!"><i className="material-icons">warning</i>tool</a></li>
  <li><a href="#!"><i className="material-icons">vpn_key</i>tool</a></li>
  <li><a href="#!"><i className="material-icons">video_library</i>tool</a></li>
  <li><a href="#!"><i className="material-icons">settings_voice</i>tool</a></li>
  <li><a href="#!"><i className="material-icons">shop_two</i>tool</a></li>
  <li><a href="#!"><i className="material-icons">system_update</i>tool</a></li>
  <li><a href="#!"><i className="material-icons">traffic</i>tool</a></li>
  <li><a href="#!"><i className="material-icons">tram</i>tool</a></li>

  <li><a className="waves-effect" href="#!">Third Link With Waves</a></li>
</ul>
<a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
  





        </div>

            )
            }



}
