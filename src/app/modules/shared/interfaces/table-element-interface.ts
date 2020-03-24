export interface TableElementInterface {
    No: number;
    username: string;
    'session name': string;
    'created on': string | Date;
    'question id': string | number;
    'question uploaded': boolean;
    'question uploaded on': string | Date;
    'pipeline suceeded': boolean | string;
    'speech to text': any;
    'language translation': any;
    'key phrases': any;
}
