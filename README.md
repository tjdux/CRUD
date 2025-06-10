![image]({https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white})
![image]({https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white})

## User API
|Method|Endpoint|Description|
|---|---|---|
|GET|`/users`|전체 유저 목록 조회|
|GET|`/users/:userId`|특정 유저 정보 조회|
|POST|`/users`|유저 생성|
|PUT|`/users/:userId`|유저 정보 수정|
|DELETE|`/users/:userId`|유저 삭제|
|GET|`/users/:userId/posts`|특정 유저의 게시글 조회|

## Post API
|Method|Endpoint|Description|
|GET|`/posts`|전체 게시글 조회|
|GET|`/posts/:postId`|특정 게시글 조회|
|POST|`/posts`|게시글 생성|
|PUT|`/posts/:postId`|게시글 수정|
|DELTE|`/posts/:postId`|게시글 삭제