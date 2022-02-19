# General response style (special one will be list in the route)

### Success: Return json obj as

```
  {
    status: "success"
  }
```

### Wrong credential(username/email, password/safety_pin...): (for login or change_pw route, check server terminal to see more detail about the error/exception)

### It can be also jwt expired.

```
  {
    status: "Unauthorized",
    message: "Wrong credential"
  }
```

### Data Error (illegal data which not existed in database):

```
  {
    status: "error",
    message: "Internal Data Error. Please contact admin.",
  }
```

### 500 internal (Server side error/crashed):

```
  {
    status: "failed",
    message: "Internal Server Error",
  }
```

### Data Validation Error (body/param):

```
{
    "status": "invalid data",
    "errors": [
        {
            "value": "415-888-888",
            "msg": "is not a valid phone number",
            "param": "phone",
            "location": "body"
        },
        {
          // error2
        },
        ...
·    ]
}
```

# Admin-Company Routes

## .../api/admin/signup POST

#### Create a new company account

body:

```
{
  "name": "Jimmy's Company",
  "address": "888 Broadway st. San Francisco CA. 94133",
  "email": "test@test.com",
  "phone": "415-888-8888",
  "password": "Abc12345#",
  "password_confirmation": "Abc12345#"
}
```

IF success it will return json object:

```
{
  "status": "success",
  "new_company":
    {
    "name": "Jimmy's Company",
    "address": "888 Broadway st. San Francisco CA. 94133",
    "email": "test@test.com",
    "phone": "415-888-8888"
    }
}
```

IF failed to validation it will return json object:

```
{
    "status": "invalid data",
    "errors": [
        {
            "value": "Abc12345@",
            "msg": "Password confirmation is not match with password",
            "param": "password",
            "location": "body"
        },
        {
            "value": "Abc12345#",
            "msg": "Password confirmation is not match with new password",
            "param": "password_confirmation",
            "location": "body"
        }
    ]
}
```

## .../api/admin/login POST

#### Login with a company account

body:

```
{
    "email": "test@test.com",
    "password": "Abc12345#"
}
```

if success:

```
{
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55X2lkIjoxLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE2NDI0NjQ0NjcsImV4cCI6MTY0MjQ2ODA2N30.sXlZJvj2lB0HLdIfX4AkLWACjkoUomSa-iea9G-FHns"
}
// The token is used for authorization:
// Add the Authorization header as
// Bearer + space + token
```

## .../api/admin PUT

#### Update basic info of company account

body:

```
{
    "name": "My company",
    "address": "878 Jackson st. San Francisco CA. 94133",
    "phone": "415-888-8888"
}
```

## .../api/admin/change_pw PUT

#### change the password of the company_account

body:

```
{
    "password": "Abc12345#",
    "new_password": "Abc12345$$"
}
```

## .../api/admin/ GET

#### get the company info (if logged in)

if success:

```
{
    "status": "success",
    "company": {
        "company_id": 1,
        "name": "My company",
        "email": "test@test.com",
        "address": "878 Jackson st. San Francisco CA. 94133",
        "phone": "415-888-888"
    }
}
```

# Admin-Group Routes

## .../api/admin/group POST

#### Create a new group

body:

```
{
      "name": "Walmart",
      "description": "A Walmart store in Bay Area."
}
```

if success:

```
{
    "status": "success",
    "new_group": {
        "group_id": 1,
        "name": "Walmart",
        "description": "A Walmart store in Bay Area.",
        "activated": false
    }
}
```

if failed by conflict group name(unique):

```
{
    "status": "conflict",
    "message": "Group name: Walgreen 893 is already existed"
}
```

## .../api/admin/group/all GET

#### Get all the groups of current company

if success:

```
{
    "status": "Success!",
    "groups": [
        {
            "group_id": 1,
            "name": "Walmart",
            "activated": false
        },
        {
            "group_id": 2,
            "name": "Walmart 2",
            "activated": false
        },
        {
            "group_id": 3,
            "name": "Walmart deactivated",
            "activated": false
        }
    ]
}
```

## .../api/admin/group/:group_id GET

#### Get group info of given group_id

if success (group_id = 2):

```
{
    "status": "success",
    "group": {
        "group_id": 1,
        "name": "Walgreen 893",
        "description": "A Walgreen store in San Francisco Bay Area.",
        "activated": false
    }
}
```

## .../api/admin/group/:group_id PUT

#### Updated group info of given group_id

group_id = 2,
body

```
{
    "name": "Walgreen 00893",
    "description": "A Walgreen store in Bay Area.",
    "activated": true
}
```

#### it will be failed also if the name conflict with other group

# Admin-Role Routes

## .../api/admin/actions GET

#### Get all the assignable actions

if success:

```
{
    "status": "success",
    "actions": [
        {
            "action_id": 1,
            "key": "M0",
            "name": "General management functionality",
            "description": "General management functionality which all management role should have and do not need to be assigned to"
        },
        {
            "action_id": 2,
            "key": "M1",
            "name": "Reset Team member's password",
            "description": "Reset all group members' password. This should be the group leader's action."
        },
        {
            "action_id": 3,
            "key": "M2",
            "name": "Manage the day off request",
            "description": "Approved/Declined day off request  for the future."
        },
        {
            "action_id": 4,
            "key": "M3",
            "name": "Manage punch records",
            "description": "Adjusting the timestamp for the finished shift."
        },
        {
            "action_id": 5,
            "key": "M4",
            "name": "Manage Schedule",
            "description": "Creating, modifying, publishing, or deleting the unpublished incoming sheduled. This should be the group leader's action."
        }
    ]
}
```

## .../api/admin/role POST

#### Create a new role

body:

```
{
    "group_id": 1,
    "title": "Store Manager",
    "abbreviation": "STRM",
    "description": "The management leadership of the store.",
    "priority": 1,
    "actions": ["M0","M1","M2","M3","M4"]
}
```

if failed by conflict title or abbreviation:

```
{
    "status": "conflict",
    "message": "title: Store Manager is already existed in the group."
}
```

## .../api/admin/role/all/:group_id GET

#### Get all the roles of given group_id

if success (group_id = 1):

```
{
    "status": "success",
    "roles": [
        {
            "role_id": 2,
            "tilte": "Assitant Manager",
            "abbreviation": "ASM"
        },
        {
            "role_id": 1,
            "tilte": "Store Manager",
            "abbreviation": "STRM"
        }
    ]
}
```

## .../api/admin/role/:role_id GET

#### Get the role info of the given role_id

if success (role_id = 1):

```
{
    "status": "success",
    "role": {
        "role_id": 1,
        "abbreviation": "STRM",
        "description": "The management leadership of the store.",
        "priority": 1,
        "actions": [
            {
                "key": "M0",
                "name": "General management functionality",
                "description": "General management functionality which all management role should have and do not need to be assigned to"
            },
            {
                "key": "M1",
                "name": "Reset Team member's password",
                "description": "Reset all group members' password. This should be the group leader's action."
            },
            {
                "key": "M2",
                "name": "Manage the day off request",
                "description": "Approved/Declined day off request  for the future."
            },
            {
                "key": "M3",
                "name": "Manage punch records",
                "description": "Adjusting the timestamp for the finished shift."
            },
            {
                "key": "M4",
                "name": "Manage Schedule",
                "description": "Creating, modifying, publishing, or deleting the unpublished incoming sheduled. This should be the group leader's action."
            }
        ]
    }
}
```

## .../api/admin/role/:role_id PUT

#### Updated role info of the given role_id

now role_id = 1 (check example above)
body:

```
{
    "title": "Store Manager",
    "abbreviation": "STRM",
    "description": "The assitant management leadership of the store.",
    "priority": 1,
    "actions": ["M0","M1","M2","M3","M4"]
}
```

#### It will failed too if it has conflicted title/abbreviation

## .../api/admin/role/:role_id DELETE

#### Delete a role of given role_id if it is not currently assigned to any employee

if failed by conflict with employee assigned

```
{
    "status": "conflict",
    "message": "Cannot delete role which has been assigned to some employees.",
}
```

# Admin-Employee Routes

## .../api/admin/employee POST

#### Create a new employee account

body:

```
{
    "role_id": 1,
    "username": "jtan886",
    "firstname": "Jimmy",
    "lastname": "Tan",
    "emergency_contact": "415-888-8888",
    "safety_pin": "1234"
}
```

if success:

```
{
    "status": "success",
    "new_employee": {
        "employee_id": 1,
        "username": "jtan886",
        "firstname": "Jimmy",
        "lastname": "Tan",
        "emergency_contact": "415-888-8888",
        "password": "R1hztF1I",
        "role_id": 1,
        "title": "Store Manager",
        "abbreviation": "STRM",
        "activated": true,
        "group_name": "Walmart"
    }
}
```

## .../api/admin/employee/all/:group_id GET

#### Get all employees belong to the given group with group_id

if success (group_id = 1):

```
{
    "status": "success",
    "employees": [
        {
            "employee_id": 1,
            "username": "jtan886",
            "firstname": "Jimmy",
            "lastname": "Tan",
            "activated": true,
            "title": "Store Manager"
        },
        {
            "employee_id": 4,
            "username": "jd111",
            "firstname": "John",
            "lastname": "Doe",
            "activated": true,
            "title": "Assitant Manager"
        },
        {
            "employee_id": 5,
            "username": "jd222",
            "firstname": "John",
            "lastname": "Doe",
            "activated": true,
            "title": "Clerk"
        }
    ]
}
```

## .../api/admin/employee/:employee_id GET

#### Get employee info of given employee_id

if success (employee_id = 1):

```
{
    "status": "success",
    "employee": {
        "employee_id": 1,
        "username": "jtan886",
        "firstname": "Jimmy",
        "lastname": "Tan",
        "emergency_contact": "415-888-8888",
        "role_id": 1,
        "group_id": 1,
        "activated": true
    }
}
```

## .../api/admin/employee/:employee_id PUT

#### Update the employee info of given employee_id

body:

```
{
    "firstname": "John",
    "lastname": "Doe",
    "emergency_contact": "415-888-8888",
    "activated": false,
    "role_id": 2
}
```

## .../api/admin/employee/reset_pw/:employee_id PUT

#### Reset the password of an employee account of given employee_id

if success (employee_id = 1):

```
{
    "status": "success",
    "password": "l5wxfvML"  // new random password
}
```

## .../api/admin/employee/set_sp/:employee_id PUT

#### (re)Set the safety_pin of an employee account of given employee_id

body:

```
{
    "safety_pin": "8888"
}
```

# Admin-Off Routes

## .../api/admin/off POST

#### Create a new off type

body:

```
{
    "name": "Regular day off",
    "description": "Unpaid day off."
}
```

if success:

```
{
    "status": "success",
    "off": {
        "off_id": 1,
        "company_id": 1,
        "name": "Regular day off",
        "description": "Unpaid day off."
    }
}
```

if conflict with name (must be unique):

```
{
    "status": "conflict",
    "message": "Off type with name Regular day off is already existed!"
}
```

## .../api/admin/off/all POST

#### Get all the off type of current company

if success:

```
{
    "status": "success",
    "offs": [
        {
            "off_id": 1,
            "name": "Regular day off",
            "description": "Unpaid day off."
        },
        {
            "off_id": 2,
            "name": "PTO",
            "description": "Paid time off in San Francisco County"
        },
        {
            "off_id": 3,
            "name": "Holiday",
            "description": "Holiday by law or local charts"
        }
    ]
}
```

## .../api/admin/off/:off_id GET

#### GET the off type info of given off_id

if success (off_id = 1):

```
{
    "status": "success",
    "off": {
        "off_id": 1,
        "company_id": 1,
        "name": "Regular day off",
        "description": "Unpaid day off."
    }
}
```

## .../api/admin/off/:off_id PUT

#### Update the off type info of given off_id

off_id = 3,
body:

```
{
    "name": "Holiday",
    "description": "Holiday which required by law or local custom"
}
```

if conflict with name (must be unique):

```
{
    "status": "conflict",
    "message": "Off type with name Holiday is already existed!"
}
```
