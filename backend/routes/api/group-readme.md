# Group Routes

## .../api/group/login POST

#### login as employee

body:

```
{
  "username": "jtan886",
  "password": "m06RJLNg"
}
```

if success return json obj:

```
{
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9pZCI6MSwidXNlcm5hbWUiOiJqdGFuODg2IiwiaWF0IjoxNjQ0MDc5MDUxLCJleHAiOjE2NDQwODI2NTF9.uspBIT4b8F_RVM4qtJgCb74Ez9pLFlmuIKdNr1bDLvI"
}
```

if credential wrong:

```
{
    "status": "Unauthorized",
    "message": "Wrong Credential!"
}
```

## .../api/group/employee_info GET

#### get the logged in employee info

if success:

```
{
    "status": "success",
    "employee": {
        "username": "jtan886",
        "firstname": "Jimmy",
        "lastname": "Tan",
        "title": "Store Manager",
        "emergency_contact": "415-888-8888"
    }
}
```

## .../api/group/emergency_contact PUT

#### update the emergency contact of logged in employee

body:

```
{
    "emergency_contact": "415-234-2345"
}
```

### .../api/group/change_pw PUT

#### change the password of logged in employee

body:

```
{
    "password": "m06RJLNg",
    "new_password": "Abc12345#"
}
```
