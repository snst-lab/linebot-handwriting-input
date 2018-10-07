"use strict";

const Linebot = function(app) {
  const linebot = require('linebot');
  const Database = require('nedb');
  const db={};
  db.botstatus = new Database({
      filename: '.database/botstatus',
      autoload: true
  });
  
  this.bot = linebot({
      channelId: process.env.CHANNEL_ID,
      channelSecret: process.env.CHANNEL_SECRET,
      channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
      verify: true
  });
  app.post('/', this.bot.parser());
  
  this.onMessageEvent = function (callback){
      this.bot.on('message',event => {
            this.setMessageTemplate(event);
            callback(event);
      });
  }
  
  this.setMessageTemplate = function(event){
    
      event.replyText = function(message){
           event.reply([{
              "type": "text",
              "text": message
           }]).then(data => {
                console.log('Success', data);
           }).catch(error => {
                console.log('Failed', error);
           });
      }
      
      event.replyFlex = function(/*title,label,uri*/){
           var obj = {
               "type": "flex",
                "altText": arguments[0],
                "contents": {
                    "type": "bubble",
                    "styles": {
                        "header": {
                            "backgroundColor": "#4169e1"
                        }
                    },
                    "header": {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                            {
                                "type": "text",
                                "text": arguments[0]
                            }
                        ]
                    },
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                            {
                                "type": "button",
                                "action": {
                                    "type": "uri",
                                    "label": arguments[1],
                                    "uri": arguments[2]
                                }
                            }
                        ]
                    }
                }
           };
    
          event.reply([obj]).then(data => {
                console.log('Success', data);
           }).catch(error => {
                console.log('Failed', error);
           });
        }
      }
}


const Route = function(app){
    app.use(express.static('public'));
    app.get("/", (req, res) => {
        res.sendFile(__dirname + '/public/index.html');
    });
    app.get("/result", (req, res) => {
        res.sendFile(__dirname + '/public/result.html');
    }); 
}


const Main = function(app){
    const route = new Route(app);
    const bot = new Linebot(app);

    this.onMessageEvent = function(event){
          switch(event.type){
             case 'message':
                if( event.message.text.match(/手書/)){
                    event.replyFlex(
                        "手書き入力ヘルパー",
                        "手書きパッドを開く",
                        "line://app/" + process.env.LIFF_ID,
                    );
                }
                break;
             default:
                return false;
                break;
          }
    }
    
    app.listen(process.env.PORT || 3000, () => {
        console.log('Server is running.');
    });
    bot.onMessageEvent(this.onMessageEvent);
}
const express = require('express');
new Main(express());