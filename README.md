# EngageXR

API service which is used for the Company Employee CRUD operations. 

Features it support:
1. Add Company
2. Update Company Details
3. Get Company Details by Name
4. Delete Company by Name
5. Create Employee for a Company
6. Update Employee details with EmpID (Autogenerated)
7. Get Employee Details by EmpID
8. Get All Employees
9. Get All Employees from a same company
10. Delete a Company (Automatically it will remove all the employees tagged with the same company)


How to run locally:
1. git clone https://github.com/shijith-thomas/EngageXR
2. git checkout dev
3. cd EngageXR
4. create a .env file 
   touch .env
5. edit the env file with
   PORT=3000
   TOKEN_KEY= XXXXXX (Refer Note)
6. npm run start
5. curl -X POST http://localhost:3000/api/v1/auth/register -d {Email: XXXX, Password: XXXXX}
6. curl -X POST http://localhost:3000/api/v1/auth/login -d {Email: XXXX, Password: XXXXX}
7. All the write calls requires a x-access-token in the header to get executed. 




Aditional Specs which are already covered:
1. Logs configured (Stream and file handling)
2. Cors implemented
3. Postman test collection extracted
4. Used Sequlize ORM for the DB intractions
5. JWT Authentication
5. Integration test for all API's


Additional Improvements:
1. Docker image and k8s for high availability
2. Security threats like DDOS and JSON threat protection
3. BDD test scnearios
4. Https protocol
5. Refresh Token
6. Eslint and Code Coverage





NOTE: Make sure the port 3000 is not LISTENING

How to check if the port is active:
1. netstat -ano | findstr :3000
2. If its LISTENING, then kill <pid>


NOTE: Make sure the port 3000 is not LISTENING

How to generate the TOKEN_KEY:
1. open cmd and type node
2. require('crypto').randomBytes(64).toString('hex')
3. The return base64 can be pasted for TOKEN_KEY in .env file





