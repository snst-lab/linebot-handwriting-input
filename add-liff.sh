curl -X POST https://api.line.me/liff/v1/apps \
-H "Authorization: Bearer mVyjYwvrBW+7IMijBJS8oG9ZB4/Gl9PwEm+k4fnO+iH1wHouG2P7KXqav9UPJGSHQuN6QBGNH3L5QqCGi8Xe0cn0X7u0oYbcRpahn0YWNfl1gll7nn2EvedrR2nvwnxMPYZkJC/w9C9sV8RAstmUMAdB04t89/1O/w1cDnyilFU=" \
-H "Content-Type: application/json" \
-d '{
  "view":{
    "type":"compact",
    "url":"https://snst-lab.github.io/linebot-handwriting-input/public"
  }
}'