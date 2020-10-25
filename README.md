# Blog App using Microservices 
The repo is basically a learning path for microservices implementation. So first things first, Here we are going to create a simple toy project of creating a blog app. 
Where , each major feature is divided into microservices and there is an event bus and query service which helps in asynchronous interaction between the microservices.

## React App 
There is a simple react app  to interact with the services created usingg create-react-app named client, createPost component creates the posts, CommentCreate component creates the comments. Both Comments and posts are fetched from the backend using postShow component but ListComments shows the comments. Since we are not making use of any database , the posts and comments will be lost once we restart the service 

## Services 
The services basically are the express apps inside whiich the routes are defined and following is the list of routes handled by each service.

## 1. Post Service 

Request | Route | request body | response 
--------|-----|-----------------|--------
Get      | /posts| None          | {id1:{id1,title1},id2:{id2,title2}}
posts     | /posts| {id:postid,title:'title of the post'} | {id:title}

## 2. Comment Service 

Request | Route | request body | response 
--------|-------|--------------| ---------
get     | /comments| None | {postid:[{id1,comment1},{id2, comment2}]}
post    | /comments | {id:commentId,content:'comment text',postId:postid} | {postid:[{id1,comment1},{id2, comment2}]
post     | /events  | {type:CommentUpdated, data:comentObj} | {}

## 3. Query Service 
Request  | Route  | request body    |  response
---------|---------|----------------|-----------------
get       | /posts  | None | [{postid:{postid,title,comments:[{id, comment1}...]}}]
post      | /events  | {type:commentCreated|postCreated, data:commmentobj | postobj}| {}

We do have an event bus which communicates between the services whenever an event is created, and the communication happens through the axios call. We do have routes for the 
event service as well. 

## 4 Event Bus 
Request  | Route  | request body    |  response
---------|---------|----------------|-----------------
post      | /events  | {type:commentCreated|postCreated, data:commmentobj | postobj}| {status:'ok'}

## 5 Comment Moderation service 
Now if we want to moderate some comments on the comment service we make use of the moderation service, so when the comment is created , the comment service sends the CommentCreated event to all the other services , which includes comment moderation service as well via event bus. This service reads the post request and if the type of the event is CommentCreated, it has the logic for checking if we have to allow the comment or reject it. After doing it , it sends the event commentModerated to Comments service via event bus through axios call , where the comment service after reading the post call from the event bus changes the status to comment updated. 
Request  | Route  | request body    |  response
---------|---------|----------------|-----------------
post     | /events  | {type:CommentModerated, data:comentObj} | {}


## The flow 

### Example 1 
new post gets created -> axios post call from react app(front end) is made to  -> post service -> post service sends an PostCreated post axios call to event bus -> event bus notifies all the services about the PostCreated event including post sservice itself through series of axios post calls -> query service using a special datastructure constructs the post and comments and binds them together  

### Example 2
new comment gets created -> axios post call from react app(front end) is made to  -> comment service -> comment service sends an CommentCreated post axios call to event bus -> event bus notifies all the services about the CommentCreated event including Comment service itself through series of axios post calls -> query service using a special datastructure constructs the post and comments and binds them together

### Example 3
get post requst is sent from postShow react component  -> axios get call from react app(front end) is made to  -> query service -> query service sends the special datastructure which has both posts and the corresponding comments to each posts  
