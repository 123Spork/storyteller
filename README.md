Storyteller
=======
Welcome welcome welcome to the discord robot that tells you a story. 

This is a node Typescript project designed to scan browser-based txt files. It then splices them into reasonably sized pages and then reads those pages out to your discord server.

Requirements
-----------
- You'll need a Discord webhook ID and Token for this to work, google that.
- This bot has been designed to be deployed through Heroku, if you want to deploy it anywhere else, raise a PR to support other deployment methods.

Node Setup
--------

```
npm install 
```
```
npm build
```
```
npm start
```

Heroku Setup
--------
1. Install the Heroku CLI beforehand and set up your project. 

2. Youll need a heroku worker dyno for this to deploy correctly (this project does not initialise a web server). Go to your terminal and run the following...
```
heroku scale web=0 service=1 -a <your app name>
```
3. Go to your project settings and begin to define your environment config for the worker. Here's what you can use...
```
DISCORD_WEBHOOK_ID : Your webhook ID. This is required.
DISCORD_WEBHOOK_TOKEN : Your webook token. This is required.
DISCORD_WEBHOOK_USER_NAME : Your bots username. Not required, defaults to "The Storyteller"
DISCORD_WEBHOOK_USER_AVATAR : Your bots avatar. Not required, defaults to a blank user icon.
REDIS_URL: Redis connection string. Required. Should be auto-set by Heroku.
STORY_URL: URL string for your story txt file. Not required. Defaults to Aesop's fables.
STORY_RESET_STATE : Flag to reset your story on restart. Not required. Defaults to false.
STORY_PAGE_SIZE_CHARS :  How many characters per story page. Not required. Defaults to 1900.
STORY_PAGE_DELAY_MS :  Bot chattyness delay in ms. Not required. Defaults to 20 seconds.
STORY_PAGE_INITIAL :  Initial page -1 to start your story off at. Not required. Defaults to -1.
```
4. Deploy your app.