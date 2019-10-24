// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';

import { get } from '@loopback/rest';

export class SampleController {
  @get('/Sample')
  hello(): string {
    var admin = require("firebase-admin");
    var serviceAccount = require("./firebaseService.json");

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://yabaze-profile.firebaseio.com/"
    });


    var db = admin.database();
    var ref = db.ref("restricted_access/secret_document");
    ref.once("value", function (snapshot: any) {
      console.log(snapshot.val());
    });


    return "Mirakle Yabaze"
  }
}
