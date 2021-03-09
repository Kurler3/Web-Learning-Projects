const CLIENT_ID = "293777425729-ngm7125ujtpjmosiue8t926v7jr3qabg.apps.googleusercontent.com";

const DISCOVERY_DOCS = [
  'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'
];
const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

const authorizeButton = document.getElementById('authorize-button');
const signoutButton = document.getElementById('signout-button');

const content = document.getElementById('content');
const channelForm = document.getElementById('channel-form');
const channelInput = document.getElementById('channel-input');
const videoContainer = document.getElementById('video-container');

// Load auth2 Library

function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

function initClient(){
  
}