// tslint:disable: no-string-literal
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/modules/shared/services/config-service/config.service';
import { Observable, of } from 'rxjs';
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

  parseDateForAPI(dateObj) {
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
  }

  generateReportRequestObject(dateObj) {
    // add the respective query parameters
    dateObj = this.parseDateForAPI(dateObj);
    const qString = this.createQueryString(dateObj);
    return {
      url: this.configSrvc.getUrl('getReportEndPoint') + qString,
    };
  }

  hitReportAPI(requestObject): Observable<any> {
    return this.httpSrvc.Get(requestObject.url).pipe(map(response => {
      console.log('recieved response as ', response);
      return {ok: true, data: response['data']};
    }));
  }

  createQueryString(data: object) {
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
    const columns = ['No', 'username'];
    const rows = [];
    Object.keys(data).forEach(username => {
      const userObject = {
        No: (rows.length + 1),
        username,
      };
      data[username].forEach(sessionObject => {
        if (sessionObject.hasOwnProperty('session_name')) {
          if (!columns.includes('session name')) {columns.push('session name');}
          userObject['session name'] = sessionObject['session_name'];
        }
        if (sessionObject.hasOwnProperty('session_created_at')) {
          if (!columns.includes('created on')) {columns.push('created on')};
          userObject['created on'] = sessionObject['session_created_at'];
        }
        /* if (sessionObject.hasOwnProperty('session_is_uploaded')) {
          if (!columns.includes('session uploaded')) {columns.push('session uploaded')};
          userObject['session uploaded'] = sessionObject['session_is_uploaded'];
        } */
        if (sessionObject.hasOwnProperty('pipeline')) {
          const questionDetails = [];
          if (sessionObject['pipeline']['pipeline_completed_count']) {
            questionDetails.push([...this.gatherQuestionDetails(sessionObject['pipeline']['pipeline_completed_details'], true)]);
          }
          if (sessionObject['pipeline']['pipeline_failed_count']) {
            questionDetails.push([...this.gatherQuestionDetails(sessionObject['pipeline']['pipeline_failure_details'], false)]);
          }
          if (!columns.includes('question id')) {columns.push('question id')};
          if (!columns.includes('question uploaded')) {columns.push('question uploaded')};
          if (!columns.includes('question uploaded on')) {columns.push('question uploaded on')};
          if (!columns.includes('pipeline succeeded')) {columns.push('pipeline succeeded')};
          if (!columns.includes('speech to text')) {columns.push('speech to text')};
          if (!columns.includes('language translation')) {columns.push('language translation')};
          if (!columns.includes('key phrases')) {columns.push('key phrases')};
          userObject['questions'] = questionDetails;
        }
      });
      rows.push(userObject);
    });
    return {columns, rows};
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
        newQuest['question uploaded on'] = question['question_recording_modified_on'];
      }
      newQuest['pipeline succeeded'] = pipelineSucceeded;
      if (question.hasOwnProperty('speech_to_text_transcript')) {
        newQuest['speech to text'] = question['speech_to_text_transcript'];
      }
      if (question.hasOwnProperty('translated_data')) {
        newQuest['language translation'] = question['translated_data'];
      }
      if (question.hasOwnProperty('key_phrase_data') ) {
        newQuest['key phrases'] = JSON.stringify(question['key_phrase_data']);
      }
      return newQuest;
    });
    return mappedQuestions;
  }

  parseDummyData() {
    return {
      columns: ['No', 'username', 'session name', 'created on', 'question id', 'question uploaded', 'question uploaded on', 'pipeline succeeded', 'speech to text', 'language translation', 'key phrases'],
      rows: [
        {
          No: 1,
          username: 'rishabh',
          'session name': 'new session 123',
          'created on': '10 dec 1996',
          'question id': '123',
          'question uploaded': true,
          'question uploaded on': '11 dec 1996',
          'pipeline succeeded': false,
          'speech to text': 'this is speech to text',
          'language translation': 'this is language translation',
          'key phrases': 'these are the key phrases'
        }
      ],
    };
  }
}
