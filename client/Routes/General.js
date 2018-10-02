import { Meteor } from 'meteor/meteor'
import React, {Component} from 'react';
import {mount} from 'react-mounter';


import Home from '../../imports/Home';
import NewLesson from '../../imports/NewLessons';
import ReadingTest from '../../imports/ReadingTest';
import ReadingLesson from '../../imports/ReadingLesson';
import LessonCreator from '../../imports/LessonCreator';
import LessonCreator1 from '../../imports/LessonCreator1';


// console.log('USER:',Meteor.user());

const adminRoutes = FlowRouter.group({
  triggersEnter: [() => {
    if (!(Meteor.loggingIn() || Meteor.userId())) {
      return FlowRouter.go('/');
    // the following will need the roles package installed, but you can let depend on something of your own
    } else  {
      //return FlowRouter.go('/view_events');
    }
  },
  ],
});


const userRoutes = FlowRouter.group({
  triggersEnter: [() => {

  },
  ],
});

FlowRouter.route('/', {
  name: 'Home',
  action() {
      mount(Home, {});
  }
});
FlowRouter.route('/new_lesson', {
  name: 'Home',
  action() {
      mount(NewLesson, {});
  }
});
FlowRouter.route('/reading_test', {
  name: 'Home',
  action() {
      mount(ReadingTest, {});
  }
});

FlowRouter.route('/reading_lesson', {
  name: 'Home',
  action() {
      mount(ReadingLesson, {});
  }
});

FlowRouter.route('/reading_creator', {
  name: 'Home',
  action() {
      mount(LessonCreator, {});
  }
});

FlowRouter.route('/lesson', {
  name: 'Home',
  action() {
      mount(LessonCreator1, {});
  }
});
