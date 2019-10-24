// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';


import { get } from '@loopback/rest';

export class HelloController {
  @get('/hello')
  hello(): string {
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
    var ref = db.ref("/yabaze-profile");  //Set the current directory you are working in

    /**
    * Setting Data Object Value
    */
    ref.set([
      {
        id: 20,
        name: "Jane Doe",
        email: "jane@doe.com",
        website: "https://jane.foo.bar"
      },
      {
        id: 21,
        name: "John doe",
        email: "john@doe.com",
        website: "https://foo.bar"
      }
    ]);

    /**
    * Pushing New Value
    * in the Database Object
    */
    ref.push({
      id: 22,
      name: "Jane Doe",
      email: "jane@doe.com",
      website: "https://jane.foo.bar"
    });

    return 'Hello world!';
  }
}
