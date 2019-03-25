import React, { useState } from "react";



function Footer(){

    return (
        <footer className="page-footer orange footers">
            <div className="container">
                <div className="row">
                    <div className="col l6 s12">
                        <h5 className="white-text">Company Bio</h5>
                        <p className="grey-text text-lighten-4">
                            Doing the best to provide the best lessons
            </p>
                    </div>
                    <div className="col l3 s12">
                        <h5 className="white-text">Students</h5>
                        <ul>
                            <li>
                                <a className="white-text" href="#!">
                                    Learn
                </a>
                            </li>
                            <li>
                                <a className="white-text" href="#!">
                                    Languages
                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col l3 s12">
                        <h5 className="white-text">Teachers</h5>
                        <ul>
                            <li>
                                <a className="white-text" href="#!">
                                    Create Lessons
                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-copyright">
                <a className='white-text' href='https://web.facebook.com/manolivier' target='_blank'>
                    <div className="container">Created by OlivierJM & BrianMuks with ♥ </div>
            </a>
            </div>
        </footer>
    )


}

export default Footer