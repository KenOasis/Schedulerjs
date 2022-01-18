# Admin-Company routes

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
