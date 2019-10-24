import {
  Request,
  RestBindings,
  get,
  param,
} from '@loopback/rest';
import { inject } from '@loopback/context';

export class FirebaseAccessControllerController {
  firebase: any;

  db: any;

  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {
    this.firebase = require('firebase');
    if (!this.firebase.apps.length) {
      this.firebase.initializeApp({
        serviceAccount: './firebaseService.json',
        databaseURL: 'https://yabaze-profile.firebaseio.com/',
      });
    }
    this.db = this.firebase.database();
  }

  @get('/rest/v1/{userName}/{pageName}')
  async getSkills(
    @param.path.string('userName') userName: string,
    @param.path.string('pageName') pageName: string,
  ) {
    var ref = this.db.ref('/' + userName + '/' + pageName);

    var skills: any;
    var successMessage: String;

    ref.on(
      'value',
      function (snapshot: any) {
        skills = snapshot.val();
      },
      function (errorObject: any) {
        console.log('The read failed: ' + errorObject.code);
      },
    );

    if (skills == undefined) {
      successMessage = 'Data Not Found';
    } else {
      successMessage = 'Success';
    }

    return {
      data: skills,
      message: successMessage,
      date: new Date(),
      url: this.req.url,
    };
  }
}
