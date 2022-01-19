# Admin-Company Routes

## @.../api/admin/signup POST

#### Create a new company account

```
body:
{
  "name": "Jjtan886",
  "address": "888 Broadway st. San Francisco CA. 94133",
  "email": "test@test.com",
  "phone": "14151234567",
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
    "name": "Jjtan886",
    "address": "888 Broadway st. San Francisco CA. 94133",
    "email": "test@test.com",
    "phone": "14151234567"
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

if failed:

```
{
    "status": "Unauthorized",
    "message": "Wrong Credential!"
}
```

## .../api/admin PUT

#### Update basic info of company account

body:

```
{
    "name": "My company",
    "address": "878 Jackson st. San Francisco CA. 94133",
    "phone": "14158888888"
}
```

if success:

```
{
    "status": "success"
}
// For the following example: the "success" request will be the same as this if not specified.
```

otherwise:

```
{
    "status": "failed",
    "message": "Internal Server Error"
}

// For the following example: the failure request will be the same as this if not specified.
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

if failed:

```
{
    "status": "Unauthorized",
    "message": "Wrong Credential!"
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
        "phone": "14158888888"
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
        "description": "A Walmart store in Bay Area."
    }
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
            "description": "A Walmart store in Bay Area.",
            "activated": false
        },
        {
            "group_id": 2,
            "name": "Walgreen",
            "description": "A Walgreen store in Bay Area.",
            "activated": false
        }
    ]
}
```

## .../api/admin/group/:group_id GET

#### Get group info of given group_id

if success (group_id = 1):

```
{
    "status": "success",
    "group": {
        "group_id": 1,
        "name": "Walmart",
        "description": "A Walmart store in Bay Area.",
        "activated": false
    }
}
```

## .../api/admin/group/:group_id PUT

#### Updated group info of given group_id

body

```
{
    "name": "Walgreen 00893",
    "description": "A Walgreen store in Bay Area.",
    "activated": true
}
```

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
            "name": "Reset teams' password",
            "description": "Reset all group members' password. This should be the group leader's action."
        },
        {
            "action_id": 2,
            "name": "Record Timestamp",
            "description": "Record the timestamp when starting/ending shift/break."
        },
        {
            "action_id": 3,
            "name": "Setting available working time",
            "description": "Setting up the available working time frame for every weekday/weekend."
        },
        {
            "action_id": 4,
            "name": "Request day off",
            "description": "Request day off or vacation for the future."
        },
        {
            "action_id": 5,
            "name": "Adjusting timestamp",
            "description": "Adjusting the timestamp for the finished shift. This should be the group leader's action."
        },
        {
            "action_id": 6,
            "name": "Making Schedule",
            "description": "Creating, modifying, publishing, or deleting the incoming sheduled. This should be the group leader's action."
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
    "actions": [1,2,3,4,5,6]
}
```

if failed by conflict title or abbreviation:

```
{
    "status": "conflict",
    "message": "title: Store Manager 893 is already existed in the group."
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
                "action_id": 1,
                "name": "Reset teams' password",
                "description": "Reset all group members' password. This should be the group leader's action."
            },
            {
                "action_id": 2,
                "name": "Record Timestamp",
                "description": "Record the timestamp when starting/ending shift/break."
            },
            {
                "action_id": 3,
                "name": "Setting available working time",
                "description": "Setting up the available working time frame for every weekday/weekend."
            },
            {
                "action_id": 4,
                "name": "Request day off",
                "description": "Request day off or vacation for the future."
            },
            {
                "action_id": 5,
                "name": "Adjusting timestamp",
                "description": "Adjusting the timestamp for the finished shift. This should be the group leader's action."
            },
            {
                "action_id": 6,
                "name": "Making Schedule",
                "description": "Creating, modifying, publishing, or deleting the incoming sheduled. This should be the group leader's action."
            }
        ]
    }
}
```

## .../api/admin/role/:role_id PUT

#### Updated role info of the given role_id

body:

```
{
    "title": "Store Manager 893",
    "abbreviation": "STRM",
    "description": "The management leadership of the store.",
    "priority": 1,
    "actions": [1,2,3,4,5,6]
}
```

if failed by conflict title or abbreviation:

```
{
    "status": "conflict",
    "message": "title: Store Manager 893 is already existed in the group."
}
```

## .../api/admin/role/:role_id DELETE

#### Delete a role of given role_id if it is not currently assigned to any employee

if failed by conflict with employee assigned

```
{
    "status": "conflict",
    "message": "Cannot delete role which has assigned to some employees.",
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
    "safety_pin": "1234"   // Safety pin should be last 4 digits of SSID
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
        "password": "U20r0vV2",
        "role_id": 1,
        "title": "Store Manager 893",
        "abbreviation": "STRM",
        "activated": false
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
            "activated": false,
            "title": "Store Manager 893",
            "abbreviation": "STRM",
            "name": "Walgreen 00893"
        },
        {
            "employee_id": 2,
            "username": "alin999",
            "firstname": "Alin",
            "lastname": "Huang",
            "activated": false,
            "title": "Assitant Manager",
            "abbreviation": "ASM",
            "name": "Walgreen 00893"
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
        "role_id": 1,
        "activated": false
    }
}
```

## .../api/admin/employee/:employee_id PUT

#### Update the employee info of given employee_id

body:

```
{
    "firstname": "Jimmy",
    "lastname": "Tan",
    "activated": true,
    "role_id": 2
}
```

## .../api/admin/employee/reset_pw/employee_id PUT

#### Reset the password of an employee account of given employee_id

body:

```
{
    "safety_pin": "1234",
}
```

if success (employee_id = 1):

```
{
    "status": "success",
    "password": "l5wxfvML"  // new password
}
```

if failed (wrong safety_pin):

```
{
"status": "Unauthorized",
"message": "Wrong Credential!"
}
```

# Admin-Off Routes

## .../api/admin/off POST

#### Create a new off type

body:

```
{
    "name": "PTO",
    "description": "Paid time off of San Francisco Area."
}
```

if success:

```
{
    "status": "success",
    "off": {
        "off_id": 1,
        "company_id": 1,
        "name": "PTO",
        "description": "Paid time off of San Francisco Area."
    }
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
            "company_id": 1,
            "name": "PTO",
            "description": "Paid time off of San Francisco Area."
        },
        {
            "off_id": 2,
            "company_id": 1,
            "name": "Holiday",
            "description": "Legal Holiday."
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
        "name": "PTO",
        "description": "Paid time off of San Francisco Area."
    }
}
```

## .../api/admin/off/:off_id PUT

#### Update the off type info of given off_id

body:

```
{
    "name": "PTO SF",
    "description": "Paid time off of San Francisco Area"
}
```
