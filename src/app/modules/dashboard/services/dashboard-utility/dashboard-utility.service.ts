// tslint:disable: no-string-literal
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/modules/shared/services/config-service/config.service';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { HttpService } from 'src/app/modules/shared/services/http-service/http.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardUtilityService {

  constructor(
    private readonly configSrvc: ConfigService,
    private readonly httpSrvc: HttpService,
  ) { }

  /* parseDateForAPI(dateObj) {
    const newObj = {...dateObj};
    if (dateObj.hasOwnProperty('from')) {
      const fromArray = dateObj.from.split('/');
      newObj.from = `${fromArray[1]}/${fromArray[0]}/${fromArray[2]}`;
    }
    if (dateObj.hasOwnProperty('to')) {
      const toArray = dateObj.to.split('/');
      newObj.to = `${toArray[1]}/${toArray[0]}/${toArray[2]}`;
    }
    console.log('parsed date object ', newObj);
    return newObj;
  } */

  generateReportRequestObject(dateObj) {
    // add the respective query parameters
    try {
      // dateObj = this.parseDateForAPI(dateObj);
      const qString = this.createQueryString(dateObj);
      return {
        ok: true,
        url: this.configSrvc.getUrl('getReportEndPoint') + qString,
      };
    } catch (e) {
      return {ok: false, error: 'Unexpected Arguments supplied, check the date format you supplied'};
    }
  }

  hitReportAPI(requestObject): Observable<any> {
    return this.httpSrvc.Get(requestObject.url).pipe(map(response => {
      console.log('recieved response as ', response);
      return {ok: true, data: response['data']};
    }));
  }

  createQueryString(data: object) {
    console.log('creating query string now');
    if (!Object.keys.length) {
      return '';
    }
    return Object.keys(data).reduce((accumulator, currentKey, currentIdx) => {
      return `${accumulator}${currentKey}=${data[currentKey]}${(currentIdx !== Object.keys(data).length - 1) ? '&' : ''}`;
    }, '?');
  }

  /**
   * Process data for table. This function will parse the data object in a format needed for the table to display
   * @param dataObj
   */
  processDataForTable(dataObj) {
    console.log('data recieved to process is ', dataObj);
    if (dataObj && dataObj.hasOwnProperty('pipeline_information') && Object.keys(dataObj.pipeline_information).length) {
      const parsedData = this.parseData(dataObj.pipeline_information);
      console.log('parsed data as ', parsedData);
      return parsedData;
    } else {
      return {
        columns: [],
        rows: [],
      };
    }
  }

  parseData(data) {
    const columns = ['No', 'User Name'];
    const rows = [];
    Object.keys(data).forEach(username => {
      data[username].forEach(sessionObject => {
        const sessionByUserObject = {No: (rows.length + 1), username};
        if (sessionObject.hasOwnProperty('session_name')) {
          if (!columns.includes('session name')) {columns.push('session name');}
          sessionByUserObject['session name'] = sessionObject['session_name'];
        }
        if (sessionObject.hasOwnProperty('session_created_at')) {
          if (!columns.includes('Session Held On')) {columns.push('Session Held On')}
          sessionByUserObject['Session Held On'] = sessionObject['session_created_at'];
        }
        /* if (sessionObject.hasOwnProperty('session_is_uploaded')) {
          if (!columns.includes('session uploaded')) {columns.push('session uploaded')};
          sessionByUserObject['session uploaded'] = sessionObject['session_is_uploaded'];
        } */
        if (sessionObject.hasOwnProperty('pipeline')) {
          const questionDetails = [];
          if (sessionObject['pipeline']['pipeline_completed_count']) {
            questionDetails.push([...this.gatherQuestionDetails(sessionObject['pipeline']['pipeline_completed_details'], true)]);
          }
          if (sessionObject['pipeline']['pipeline_failed_count']) {
            questionDetails.push([...this.gatherQuestionDetails(sessionObject['pipeline']['pipeline_failure_details'], false)]);
          }
          if (!columns.includes('question id')) {columns.push('question id')}
          if (!columns.includes('question uploaded')) {columns.push('question uploaded')}
          if (!columns.includes('Question Synced On')) {columns.push('Question Synced On')}
          if (!columns.includes('pipeline succeeded')) {columns.push('pipeline succeeded')}
          if (!columns.includes('Hindi Text')) {columns.push('Hindi Text')}
          if (!columns.includes('English Text')) {columns.push('English Text')}
          if (!columns.includes('key phrases')) {columns.push('key phrases')}
          sessionByUserObject['questions'] = questionDetails;
          const idCounter = rows.length;
          const questionObjects = this.spanQuestions(username, sessionByUserObject, questionDetails[0], idCounter);
          questionObjects.forEach(q => rows.push(q));
        }
      });
    });
    return {columns, rows};
  }

  spanQuestions(username, sessionObject, questionsArray, idCounter) {
    console.log('spanQuestions data is ', {username, sessionObject, questionsArray});
    if (!questionsArray) {
      console.log('EMPTY');
      console.log(sessionObject);
      return [{
        No: idCounter + 1,
        'User Name': username,
        'session name': sessionObject['session name'],
        'Session Held On': sessionObject['Session Held On'].replace(',', ' at '),
        'question id': 'Not Available',
        'question uploaded': 'Not Available',
        'Question Synced On': 'Not Available',
        'pipeline succeeded': 'Not Available',
        'Hindi Text': '',
        'English Text': '',
        'key phrases': ''
      }];
    }
    const userBasedOnQuestionsObject = questionsArray.map((question, questionIdx) => {
      const newQuestObj = {
        No: idCounter + questionIdx + 1,
        'User Name': username,
        'session name': sessionObject['session name'],
        'Session Held On': sessionObject['Session Held On'].replace(',', ' at '),
        'question id': question['question id'],
        'question uploaded': question['question uploaded'],
        'Question Synced On': question['Question Synced On'].replace(',', ' at '),
        'pipeline succeeded': question['pipeline succeeded'],
        'Hindi Text': question['Hindi Text'],
        'English Text': question['English Text']
      };
      if (question.hasOwnProperty('key phrases')) {
        // newQuestObj['key phrases'] = question['key phrases'];
        if (question['key phrases']) {
          newQuestObj['key phrases'] = JSON.stringify(question['key phrases']);
        } else {
          newQuestObj['key phrases'] = '';
        }
      }
      return newQuestObj;
    });
    return [...userBasedOnQuestionsObject];
  }

  gatherQuestionDetails(questionArray, pipelineSucceeded) {
    const mappedQuestions = questionArray.map(question => {
      const newQuest = {};
      if (question.hasOwnProperty('question_id')) {
        newQuest['question id'] = question['question_id'];
      }
      if (question.hasOwnProperty('question_uploaded')) {
        newQuest['question uploaded'] = question['question_uploaded'];
      }
      if (question.hasOwnProperty('question_recording_modified_on')) {
        newQuest['Question Synced On'] = question['question_recording_modified_on'];
      }
      newQuest['pipeline succeeded'] = pipelineSucceeded;
      if (question.hasOwnProperty('speech_to_text_transcript')) {
        newQuest['Hindi Text'] = question['speech_to_text_transcript'];
      } else {
        newQuest['Hindi Text'] = 'FAILED';
      }
      if (question.hasOwnProperty('translated_data')) {
        newQuest['English Text'] = question['translated_data'];
      } else {
        newQuest['English Text'] = 'FAILED';
      }
      if (question.hasOwnProperty('key_phrase_data') ) {
        newQuest['key phrases'] = JSON.stringify(question['key_phrase_data']);
      } else {
        newQuest['key phrases'] = '';
      }
      return newQuest;
    });
    return mappedQuestions;
  }

  parseDummyData() {
    return {
      columns: ['No', 'User Name', 'session name', 'Session Held On', 'question id', 'question uploaded', 'Question Synced On', 'pipeline succeeded', 'Hindi Text', 'English Text', 'key phrases'],
      rows: [
        {
          No: 1,
          'User Name': 'rishabh',
          'session name': 'new session 123',
          'Session Held On': '10 dec 1996'.replace(',', ' at '),
          'question id': '123',
          'question uploaded': true,
          'Question Synced On': '11 dec 1996'.replace(',', ' at '),
          'pipeline succeeded': false,
          'Hindi Text': 'this is speech to text',
          'English Text': 'this is language translation',
          'key phrases': 'these are the key phrases'
        }
      ],
    };
  }
}
