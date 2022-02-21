
const request = require("supertest")
let base = "http://localhost:3000/api/v1"
const companyUrl = `${base}/company`
const authUrl = `${base}/auth`
const employeeUrl = `${base}/employee`
const testUser = {
  "Email": "test@test.com",
  "Password": "testPassword1"
}

const testCompany = {
  "Name": "TestCompany",
  "Email": "TestCompany@test.com"
}

const updatedTestCompany = {
  "Name": "TestCompany",
  "Email": "TestCompany@test.ie"
}

const testEmployee = {
  "Firstname": "Test",
  "Lastname": "test",
  "Email": "emptest@test.com",
  "CompanyName": "TestCompany" 
}

const unknownEmployee = {
  "Firstname": "Test",
  "Lastname": "test",
  "Email": "unknown@unknown.com",
  "CompanyName": "unknownCompany" 
}


const EXP_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InRlc3RAdGV4cCI6MTY0NTM5Njg0MH0.fVp9017n6BzxYlycI2wMz_0sOsWpeEpZ5gmOOeYer4E"



// Usr Registration Block
describe('User Registration', () => {
	it('Should return a 201 status code for creating a new user', async () => {
		const response = await request(authUrl)
			.post('/register')
      .send(testUser)

		expect(response.statusCode).toBe(201);
	});


  it('Should return a 400 status code for creating the user with same email', async () => {
		const response = await request(authUrl)
			.post('/register')
      .send({
        Email: 'test@test.com',
        Password: 'XXXXXX'
      })

		expect(response.statusCode).toBe(400);
	});


  it('Should return a 400 status code for creating the user without email', async () => {
		const response = await request(authUrl)
			.post('/register')
      .send({
        Password: 'XXXXXX'
      })

		expect(response.statusCode).toBe(400);
	});


  it('Should return a 400 status code for creating the user without password', async () => {
		const response = await request(authUrl)
			.post('/register')
      .send({
        Email: 'test1@test.com'
      })

		expect(response.statusCode).toBe(400);
	});


  it('Should return a 404 status code for invalid register route', async () => {
		const response = await request(authUrl)
			.post('/register123')
      .send(testUser)

		expect(response.statusCode).toBe(404);
	});
})


// User Login Block
describe('User Login', () => {
	it('Should return a 200 status code for creating a new user', async () => {
		const response = await request(authUrl)
			.post('/login')
      .send(testUser)
		expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined()
    
	});


  it('Should return a 400 status code for login without email', async () => {
		const response = await request(authUrl)
			.post('/login')
      .send({
        Password: 'XXXXXX'
      })

		expect(response.statusCode).toBe(400);
	});


  it('Should return a 400 status code for login without password', async () => {
		const response = await request(authUrl)
			.post('/login')
      .send({
        Email: 'nopass@pass.com'
      })

		expect(response.statusCode).toBe(400);
	});


  it('Should return a 404 status code for invalid register route', async () => {
		const response = await request(authUrl)
			.post('/login123')
      .send(testUser)

		expect(response.statusCode).toBe(404);
	});
})



// Create Company
describe('Create Company', () => {

	it('Should return a 201 status code for creating a new company', async () => {
    const loginResponse = await request(authUrl)
    .post("/login")
    .send(testUser)
    expect(loginResponse.statusCode).toBe(200)
    token = loginResponse.body.token
    const response = await request(companyUrl)
    .post('/')
    .set({
            "x-access-token": token 
    })
    .send(testCompany)

		  expect(response.statusCode).toBe(201);
	  });


  it('Should return a 400 status code for creating a duplicate company', async () => {
    const loginResponse = await request(authUrl)
    .post("/login")
    .send(testUser)
    expect(loginResponse.statusCode).toBe(200)
    token = loginResponse.body.token
    const response = await request(companyUrl)
    .post('/')
    .set({
            "x-access-token": token 
    })
    .send(testCompany)

    expect(response.statusCode).toBe(400);
    });

  it('Should return a 401 status code for creating a new company with expired token', async () => {
    const loginResponse = await request(authUrl)
    .post("/login")
    .send(testUser)
    expect(loginResponse.statusCode).toBe(200)
    token = loginResponse.body.token
    const response = await request(companyUrl)
    .post('/')
    .set({
            "x-access-token": EXP_JWT 
    })
    .send(testCompany)
    expect(response.statusCode).toBe(401);
    });

  it('Should return a 401 status code for creating a new company with invalid token', async () => {
    const loginResponse = await request(authUrl)
    .post("/login")
    .send(testUser)
    expect(loginResponse.statusCode).toBe(200)
    token = loginResponse.body.token
    const response = await request(companyUrl)
    .post('/')
    .set({
            "x-access-token": "INVALID_TOKEN" 
    })
    .send(testCompany)
    expect(response.statusCode).toBe(401);
    });


  it('Should return a 403 status code for creating a new company without token', async () => {
    const loginResponse = await request(authUrl)
    .post("/login")
    .send(testUser)
    expect(loginResponse.statusCode).toBe(200)
    token = loginResponse.body.token
    const response = await request(companyUrl)
    .post('/')
    .send(testCompany)

    expect(response.statusCode).toBe(403);
    });


  it('Should return a 400 status code for creating a new company without mandatory field', async () => {
    const loginResponse = await request(authUrl)
    .post("/login")
    .send(testUser)
    expect(loginResponse.statusCode).toBe(200)
    token = loginResponse.body.token
    
    const response = await request(companyUrl)
    .post('/')
    .set({
      "x-access-token": token 
    })
    .send({
      "Email": testCompany.Email
    })
    expect(response.statusCode).toBe(400);
    });
  

  it('Should return a 400 status code for creating a new company with invalid email', async () => {
    const loginResponse = await request(authUrl)
    .post("/login")
    .send(testUser)
    expect(loginResponse.statusCode).toBe(200)
    token = loginResponse.body.token
    
    const response = await request(companyUrl)
    .post('/')
    .set({
      "x-access-token": token 
    })
    .send({
      "Name": testCompany.Name,
      "Email": 123
    })
    expect(response.statusCode).toBe(400);
    });
    
  
})


// Get Company
describe('Get Company', () => {
  it('Should return a 200 status code for get all registered companies', async () => {
    const loginResponse = await request(authUrl)
    .post("/login")
    .send(testUser)
    expect(loginResponse.statusCode).toBe(200)
    token = loginResponse.body.token
    const response = await request(companyUrl)
    .get('/')
    .set({
      "x-access-token": token 
    })
    expect(response.statusCode).toBe(200);
    });
  
  
  it('Should return a 200 status code for getting a given registered company', async () => {
    const response = await request(companyUrl)
    // let uri = "/" + testCompany.Name
    .get("/TestCompany")
    expect(response.statusCode).toBe(200);
  });

})



// Update Company
describe('Update Company', () => {
  it('Should return a 200 status code for updating a company', async () => {
    const loginResponse = await request(authUrl)
    .post("/login")
    .send(testUser)
    expect(loginResponse.statusCode).toBe(200)
    token = loginResponse.body.token
    const response = await request(companyUrl)
    .put('/')
    .set({
      "x-access-token": token 
    })
    .send(updatedTestCompany)
    expect(response.statusCode).toBe(200);
  });


  it('Should return a 404 status code for updating a unknown company', async () => {
    const loginResponse = await request(authUrl)
    .post("/login")
    .send(testUser)
    expect(loginResponse.statusCode).toBe(200)
    token = loginResponse.body.token
    const response = await request(companyUrl)
    .put('/')
    .set({
      "x-access-token": token 
    })
    .send({
      "Name": "unknownCompany",
      "Email": testCompany.Email
    })
    expect(response.statusCode).toBe(404);
    });

})


// Create Employee
describe('Create Employee for a Company', () => {

	it('Should return a 201 status code for creating a new employee for  company', async () => {
    const loginResponse = await request(authUrl)
    .post("/login")
    .send(testUser)
    expect(loginResponse.statusCode).toBe(200)
    token = loginResponse.body.token
    const response = await request(employeeUrl)
    .post('/')
    .set({
            "x-access-token": token 
    })
    .send(testEmployee)
		expect(response.statusCode).toBe(201);
	});


  it('Should return a 400 status code for creating a duplicate employee', async () => {
    const loginResponse = await request(authUrl)
    .post("/login")
    .send(testUser)
    expect(loginResponse.statusCode).toBe(200)
    token = loginResponse.body.token
    const response = await request(employeeUrl)
    .post('/')
    .set({
            "x-access-token": token 
    })
    .send(testEmployee)

    expect(response.statusCode).toBe(400);
  });


  it('Should return a 400 status code for creating a new employee with expired token', async () => {
    const loginResponse = await request(authUrl)
    .post("/login")
    .send(testUser)
    expect(loginResponse.statusCode).toBe(200)
    token = loginResponse.body.token
    const response = await request(employeeUrl)
    .post('/')
    .set({
            "x-access-token": EXP_JWT 
    })
    .send(testEmployee)
    expect(response.statusCode).toBe(401);
  });


  it('Should return a 401 status code for creating a new employee with invalid token', async () => {
    const loginResponse = await request(authUrl)
    .post("/login")
    .send(testUser)
    expect(loginResponse.statusCode).toBe(200)
    token = loginResponse.body.token
    const response = await request(employeeUrl)
    .post('/')
    .set({
            "x-access-token": "INVALID_TOKEN" 
    })
    .send(testEmployee)
    expect(response.statusCode).toBe(401);
  });


  it('Should return a 403 status code for creating a new employee without token', async () => {
    const loginResponse = await request(authUrl)
    .post("/login")
    .send(testUser)
    expect(loginResponse.statusCode).toBe(200)
    const response = await request(employeeUrl)
    .post('/')
    .send(testEmployee)
    expect(response.statusCode).toBe(403);
    });


  it('Should return a 400 status code for creating a new employee with unknown company', async () => {
    const loginResponse = await request(authUrl)
    .post("/login")
    .send(testUser)
    expect(loginResponse.statusCode).toBe(200)
    token = loginResponse.body.token
    
    const response = await request(employeeUrl)
    .post('/')
    .set({
      "x-access-token": token 
    })
    .send(unknownEmployee)
    expect(response.statusCode).toBe(400);
    });
  

  it('Should return a 400 status code for creating a new employee with invalid email', async () => {
    const loginResponse = await request(authUrl)
    .post("/login")
    .send(testUser)
    expect(loginResponse.statusCode).toBe(200)
    token = loginResponse.body.token
    
    const response = await request(employeeUrl)
    .post('/')
    .set({
      "x-access-token": token 
    })
    .send({
      "FirstName": testEmployee.Firstname,
      "Email": "123",
      "CompanyName": testEmployee.CompanyName

    })
    expect(response.statusCode).toBe(400);
  });

  it('Should return a 404 status code for creating a new employee with invalid route', async () => {
    const loginResponse = await request(authUrl)
    .post("/login")
    .send(testUser)
    expect(loginResponse.statusCode).toBe(200)
    token = loginResponse.body.token
    
    const response = await request(employeeUrl)
    .post('/xyz')
    .send(testEmployee)
    expect(response.statusCode).toBe(404);
  });
    

  it('Should return a 400 status code for creating a new employee without mandatory params', async () => {
    const loginResponse = await request(authUrl)
    .post("/login")
    .send(testUser)
    expect(loginResponse.statusCode).toBe(200)
    token = loginResponse.body.token
    
    const response = await request(employeeUrl)
    .post('/')
    .set({
      "x-access-token": token 
    })
    .send({
      "FirstName": testEmployee.Firstname,
      "Email": testEmployee.Email,

    })
    expect(response.statusCode).toBe(400);
  });
  
})


// Get Employee
describe('Get Employee Details', () => {
  it('Should return a 200 status code for get all registered employees', async () => {
    const loginResponse = await request(authUrl)
    .post("/login")
    .send(testUser)
    expect(loginResponse.statusCode).toBe(200)
    token = loginResponse.body.token
    const response = await request(employeeUrl)
    .get('/')
    .set({
      "x-access-token": token 
    })
    expect(response.statusCode).toBe(200);
    });
  
  
  it('Should return a 200 status code for getting all employees for a registered company', async () => {
    const loginResponse = await request(authUrl)
    .post("/login")
    .send(testUser)
    expect(loginResponse.statusCode).toBe(200)
    token = loginResponse.body.token
    const response = await request(employeeUrl)
    // let uri = "/" + testCompany.Name
    .get("/")
    .query({
      "company": testEmployee.CompanyName
    })
    .set({
      "x-access-token": token 
    })
    expect(response.statusCode).toBe(200);
  });

})


//Delete a Company and Employee will be removed automatically
describe('Delete a Company and Employee will be removed automatically', () => {
  it('Should return a 204 status code for removing a company', async () => {
    const loginResponse = await request(authUrl)
    .post("/login")
    .send(testUser)
    expect(loginResponse.statusCode).toBe(200)
    token = loginResponse.body.token
    companyName = testCompany.Name
    uri = `/${companyName}`
    const DeleteCompanyResponse = await request(companyUrl)
    .delete(uri)
    .set({
      "x-access-token": token 
    })
    .send()
    expect(DeleteCompanyResponse.statusCode).toBe(204)
    const GetEmployeeResponse = await request(employeeUrl)
    .get("/")
    .query({
      "company": testEmployee.CompanyName
    })
    .set({
      "x-access-token": token 
    })
    expect(GetEmployeeResponse.statusCode).toBe(200);

  });

})


//Deregister the User
describe('Deregister the User', () => {
  it('Should return a 204 status code for removing a admin user', async () => {
    const loginResponse = await request(authUrl)
    .post("/login")
    .send(testUser)
    expect(loginResponse.statusCode).toBe(200)
    token = loginResponse.body.token
    companyName = testCompany.Name
    const DeleteCompanyResponse = await request(authUrl)
    .delete('/deregister')
    .set({
      "x-access-token": token 
    })
    .send({
      'Email': testUser.Email
    })
    expect(DeleteCompanyResponse.statusCode).toBe(204)
  });

})


