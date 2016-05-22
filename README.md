Simple Telegram Bot Boilerplate that allow you to switch between local app and deployed application on heroku.

When you start Bot locally, you server automatically reload if you change bot code.

### First:
Install heroku-cli  from https://devcenter.heroku.com/articles/heroku-command#installing-the-heroku-cli
### Then:
Create .env file with configuration like (you can copy .env.empty):

```TOKEN={ Your telegram bot token }```

```HEROKU_NAME={ Your heroku server name }```

```NPM_CONFIG_PRODUCTION={ use 'false' for install devDependencies from package.json }```


To start local use:
```
heroku local
```

For deploy your code:
```
git push heroku master
```
