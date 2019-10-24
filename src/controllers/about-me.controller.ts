// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';

import { get } from '@loopback/rest';

export class AboutMeController {
  constructor() { }

  @get('/cool')
  hello(): any {

    var firebase = require("firebase");
    firebase.initializeApp({
      serviceAccount: "./firebaseService.json",
      databaseURL: "https://yabaze-profile.firebaseio.com/"
    });  //by adding your credentials, you get authorized to read and write from the database


    /**
    * Loading Firebase Database and refering
    * to user_data Object from the Database
    */
    var db = firebase.database();
    var ref = db.ref("/yabaze/skills");  //Set the current directory you are working in

    /**
    * Setting Data Object Value
    */
    //ref.set();



    var aboutMe: any;

    ref.on("value", function (snapshot: any) {
      aboutMe = snapshot.val();
    }, function (errorObject: any) {
      console.log("The read failed: " + errorObject.code);
    });

    return aboutMe;
  }
}
