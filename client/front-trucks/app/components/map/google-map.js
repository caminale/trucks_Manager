/*global google */

import Component from '@ember/component';


export default Component.extend({
  latitude: 48,
  longitude: 2.34,
  myZoom: 6,
  steps: '',
  lat: 0,
  lng: 0,
  myIcon: {
    url: "/assets/images/camtar.png",
    size: new google.maps.Size(60,60),
    scaledSize: new google.maps.Size(40,40),
    anchor: new google.maps.Point(15, 15),
    origin: new google.maps.Point(0, 0),
    labelOrigin: new google.maps.Point(30, 15),
  },
  actions: {
    simulationMarkers : async function() {
      const steps = this.get('subStep').content;
      console.log(steps)
      let delay = 1000;
      let index = 0;
      let i = 0;
      let subStepsPos = [];
      let subStepsDuration = [];

      const nextSubsteps = ( index, steps ) => {
        let positions = [];
        let durations = [];
        try {
          steps[index].__data.steps.map((subStep) => {
            //push all position substeps
            positions.push(subStep.start_location);
            //push all duration substeps
            durations.push(subStep.duration.value)
          });
        }catch (err) {
          console.log(err);
        }
        return {positions, durations};
      };
      const setNewPositions = (lat, lng) => {
        this.set('lat', lat);
        this.set('lng', lng);
      };
      let timerId = setTimeout(function managerTimer() {
        if (i === 0) {
          subStepsPos = nextSubsteps(index,steps).positions;
          subStepsDuration = nextSubsteps(index,steps).durations;
          console.log(subStepsPos);
        }
        if (i < subStepsPos.length) {
          //browse the array, to the end to go on next substep
          setNewPositions(subStepsPos[i].lat, subStepsPos[i].lng);
          console.log(subStepsPos[i].lat);
          delay = 1000+subStepsDuration[i];
          i++;
        }
        else {
          //when arrived to the end of the array, increment index to go on next step
          i = 0;
          index++;
        }
        timerId = setTimeout(managerTimer, delay);

      }, delay);

    }
  }
});

