# VisitorRegistration
Visitor Registration project uses the MEAN stack technology for managing the visitors.

Description:
Currently this application works in 2 modes. 

• Visitor(Enroll)

• Administrator(Login)

Enroll: The visitor/user registers by entering all the necessary details and the badge is generated and printed(if required).

Login: This is mainly for the administrator mode. You need to enter the valid credentials in order to manage the enrolled visitors. Admin credentials are hardcoded for now(Username:"admin" and Password:12345)

Steps to be followed to run this Application:

• Install Node.js.(Go to http://nodejs.org)- version(4.4.7).

• Install Mongodb.(Go to http://mongodb.com)- version(3.2.8).

• Start Mongo server.(run command mongod on the terminal)(on mac run command sudo mongod).

• To install node modules, open command prompt as an administrator and navigate to the root folder(VisitorRegistration). Run "npm install".

• Run "npm install -g bower" to install bower. We use bower to install the client packages. Note:Bower is dependent on git. So remember to install git before you install bower.

• Run the command "bower install" to install the client packages mentioned in bower.json.

• Create a folder by name images under server folder. Under images create another folder by name upload, all the images added will be placed under this upload folder.

• Navigate to server folder(VisitorRegistration/server). Run the server using the command "node server.js".

• Server is listening on port 3000. Open a browser and enter "http://localhost:3000" to run the client.
