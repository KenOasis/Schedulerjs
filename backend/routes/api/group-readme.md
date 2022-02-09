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
    ]
}
```

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

## .../api/group/change_pw PUT

#### change the password of logged-in employee

body:

```
{
    "password": "m06RJLNg",
    "new_password": "Abc12345#"
}
```

## .../api/group/available POST

#### Set the available time of the logged-in employee

body:

```
{
    "effected_start": "2022-02-08",
    "effected_end": "2099-12-31",
    "available": [ // Cannot have duplicated day and at most 7 days (SUN to SAT)
        {
            "day": "SUN",
            "starts_at": "08:00:00",
            "ends_at": "20:00:00"
        },
        {
            "day": "MON",
            "starts_at": "08:00:00",
            "ends_at": "20:00:00"
        },
        {
            "day": "TUE",
            "starts_at": "08:00:00",
            "ends_at": "20:00:00"
        }
    ]

}
```

## .../api/group/available/:year&:month&:day GET

if success:

```

```

#### Get the available time of the logged-in employee
