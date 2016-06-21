Simple Telegram Bot Boilerplate that allow to connect to different social providers ex.: facebook, vkontakte and switch between local app and deployed application on heroku.

When you start Bot locally, you server automatically reload if you change bot code.

### First:
Install heroku-cli  from https://devcenter.heroku.com/articles/heroku-command#installing-the-heroku-cli
### Then:
Create .env file with configuration like (you can copy .env.empty) and set heroku var (heroku config:set TOKEN={Your telegram bot token})

To start local use:
```
heroku local
```

For deploy your code:
```
git push heroku master
```
