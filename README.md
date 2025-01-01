Project Documentation
Setup:-
 To run the application I use nodemon to automatic restart application
 Use this command to run application :
 npm start
Instructions:- Install these dependencies to smooth runing
 Bcryptjs
 Cookie-parser
 Dotenv
 Express
 Jsonwebtoken
 Mongoose
 Nodemon
 Zode for validation
API Overview:-
 For signup = http://localhost:2000/user/signup
 For login = http://localhost:2000/user/login
 For logout = http://localhost:2000/user/logout
 For view profile of authenticated user = http://localhost:2000/user/:id
 Authenticated user can update their Profile = http://localhost:2000/user/update/:id
 Admin can fetch all users by = http://localhost:2000/user/admin/allUsers
 Admin can edit profile by = http://localhost:2000/user/admin/update/:id
 Admin can create team for manager = http://localhost:2000/user/create-managerteam
Eg: {
 "managerId": "managerUserId",
 "teamMembers": ["userId1", "userId2","userId3"]}
 Admin can create task for user by = http://localhost:2000/task/create
 Admin can fetch task for user by = http://localhost:2000/task/fetch
 Admin can update task for user by = http://localhost:2000/task/update/id
 Admin can delete task for user by = http://localhost:2000/task/delete/id
 Admin can assign task to the user = http://localhost:2000/task/:userId/assign
 Admin can get assign task to the user = http://localhost:2000/task/:userId/tasks
 Admin can update the status of tasks = http://localhost:2000/task/status/:tasksId
 Manager can assign task to team user = 
http://localhost:2000/task/manager/:id/assign
 Manager can update task stats = http://localhost:2000/task/manager/status/:taskid
 Manager can update their team profile = 
http://localhost:2000/task/manager/:id/updateProfile
