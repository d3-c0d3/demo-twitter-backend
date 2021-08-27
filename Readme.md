run npm intall to install dependencies
run npm start to start the server


api-for-registration : http://localhost:3000/api/auth/register
<!--
    POST request required
    
    "username": "John",
    "email"   : "john@gmail.com",
    "password": "john'spassword"
 -->

api-for-login : http://localhost:3000/api/auth/login

<!-- 
    POST request required

    "username":"john",
    "password":"john'spassword"
 -->

api-for-messages : http://localhost:3000/api/auth/message

<!-- 
    POST request required

    "conversationId":"john & Molly's unique conversationId"
    "text":"Hello Molly"
 -->

api-for-tweets : http://localhost:3000/api/auth/tweet

1 create tweet
<!-- 
    POST request required
    "userID":"12345678910",
    "post"  :"Hello baby twitter "
 -->
2 get tweet 

<!-- 
GET request required
    fetch 
    http://localhost:3000/api/auth/tweet

 -->
3 update tweet

<!-- 
    PUT request required

    "postID":"post's unique id",
    "post":"Update my tweet"

 -->

 4 delete tweet

 <!-- 
 DELETE request required
 
 "postID":"post's unique id"

  -->