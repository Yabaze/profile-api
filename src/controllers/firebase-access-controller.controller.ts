// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';
import { get } from '@loopback/rest'

export class FirebaseAccessControllerController {
  firebase: any;
  db: any;

  constructor() {
    this.firebase = require("firebase");
    this.firebase.initializeApp({
      serviceAccount: "./firebaseService.json",
      databaseURL: "https://yabaze-profile.firebaseio.com/"
    });
    this.db = this.firebase.database();

  }

  @get('/rest/v1/skills')
  getSkills(): any {

    var ref = this.db.ref("/yabaze/skills");

    var skills: any;

    ref.on("value", function (snapshot: any) {
      skills = snapshot.val();
    }, function (errorObject: any) {
      console.log("The read failed: " + errorObject.code);
    });

    return skills;
  }
}


