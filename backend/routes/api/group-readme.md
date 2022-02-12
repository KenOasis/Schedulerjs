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

#### Get the available time of the logged-in employee

if day == 0 it will return all available time in that month
year = 2022, month = 2, day = 0,

```
{
    "status": "success",
    "available": [
        {
            "year": 2022,
            "month": 2,
            "day": 8,
            "day_of_week": "TUE",
            "starts_at": "08:00:00",
            "ends_at": "20:00:00"
        },
        {
            "year": 2022,
            "month": 2,
            "day": 13,
            "day_of_week": "SUN",
            "starts_at": "08:00:00",
            "ends_at": "20:00:00"
        },
        {
            "year": 2022,
            "month": 2,
            "day": 14,
            "day_of_week": "MON",
            "starts_at": "08:00:00",
            "ends_at": "20:00:00"
        },
        {
            "year": 2022,
            "month": 2,
            "day": 15,
            "day_of_week": "TUE",
            "starts_at": "08:00:00",
            "ends_at": "20:00:00"
        },
        {
            "year": 2022,
            "month": 2,
            "day": 20,
            "day_of_week": "SUN",
            "starts_at": "08:00:00",
            "ends_at": "20:00:00"
        },
        {
            "year": 2022,
            "month": 2,
            "day": 21,
            "day_of_week": "MON",
            "starts_at": "08:00:00",
            "ends_at": "20:00:00"
        },
        {
            "year": 2022,
            "month": 2,
            "day": 22,
            "day_of_week": "TUE",
            "starts_at": "08:00:00",
            "ends_at": "20:00:00"
        },
        {
            "year": 2022,
            "month": 2,
            "day": 27,
            "day_of_week": "SUN",
            "starts_at": "08:00:00",
            "ends_at": "20:00:00"
        },
        {
            "year": 2022,
            "month": 2,
            "day": 28,
            "day_of_week": "MON",
            "starts_at": "08:00:00",
            "ends_at": "20:00:00"
        }
    ]
}
```

if day !== 0, it will return the available time of that day:
year = 2022, month = 2, day = 28,

```
{
    "status": "success",
    "available": [
        {
            "year": 2022,
            "month": 2,
            "day": 28,
            "day_of_week": "MON",
            "starts_at": "08:00:00",
            "ends_at": "20:00:00"
        }
    ]
}
```

## .../api/group/manage/available/all/:year&:month&:day

#### get all the available time of all group members at the given date (M0)

year = 2022, month = 2, day = 8

if success:

```
{
    "status": "success",
    "date": "2022-2-8",
    "available": [
        {
            "employee_id": 2,
            "firstname": "John",
            "lastname": "Doe",
            "title": "Assitant Manager",
            "abbreviation": "ASM",
            "available": []
        },
        {
            "employee_id": 1,
            "firstname": "Jimmy",
            "lastname": "Tan",
            "title": "Store Manager",
            "abbreviation": "STRM",
            "available": [
                {
                    "year": 2022,
                    "month": 2,
                    "day": 8,
                    "day_of_week": "TUE",
                    "starts_at": "08:00:00",
                    "ends_at": "20:00:00"
                }
            ]
        },
        {
            "employee_id": 3,
            "firstname": "Jane",
            "lastname": "Doe",
            "title": "CLERK",
            "abbreviation": "CLK",
            "available": []
        }
    ]
}
```

## .../api/group/dayoff POST

#### create a day off request for the logged-in employee

body

```
{
    "requested_at": "2022-02-09 20:01:46",
    "off_id": "1",
    "starts_at": "2022-02-23",
    "ends_at": "2022-02-25",
    "reason": "sicked"
}
```

if success:

```
{
    "requested_at": "2022-02-09 20:01:46",
    "off_id": "1",
    "starts_at": "2022-02-23",
    "ends_at": "2022-02-25",
    "reason": "sicked"
}
```

if conflict with other day off request:

```
{
    "status": "conflict",
    "message": "You already request day off between (inclusive) 2022-02-23 and 2022-02-25"
}
```

## .../api/group/dayoff/ GET

#### get the day off requests for the logged-in employee

if success:

```
{
    "status": "success",
    "off_records": [
        {
            "off_record_id": 1,
            "requested_at": "2022-02-10T04:01:46.000Z",
            "off_id": 1,
            "employee_id": 1,
            "starts_at": "2022-02-10",
            "ends_at": "2022-02-18",
            "approved": null,
            "reason": "Road trip day",
            "approved_by": null,
            "comment": null
        },
        {
            "off_record_id": 7,
            "requested_at": "2022-02-10T04:01:46.000Z",
            "off_id": 1,
            "employee_id": 1,
            "starts_at": "2022-02-19",
            "ends_at": "2022-02-19",
            "approved": null,
            "reason": "Road trip day",
            "approved_by": null,
            "comment": null
        },
        {
            "off_record_id": 8,
            "requested_at": "2022-02-10T04:01:46.000Z",
            "off_id": 1,
            "employee_id": 1,
            "starts_at": "2022-02-20",
            "ends_at": "2022-02-22",
            "approved": null,
            "reason": "Road trip day",
            "approved_by": null,
            "comment": null
        },
        {
            "off_record_id": 9,
            "requested_at": "2022-02-10T04:01:46.000Z",
            "off_id": 1,
            "employee_id": 1,
            "starts_at": "2022-02-23",
            "ends_at": "2022-02-25",
            "approved": null,
            "reason": "sicked",
            "approved_by": null,
            "comment": null
        }
    ]
}
```

## .../api/group/manage/dayoff/all

#### get all the day off requests of the group

if success:

```
{
    "status": "success",
    "off_records": [
        {
            "off_record_id": 1,
            "employee_id": 1,
            "firstname": "Jimmy",
            "lastname": "Tan",
            "approved": null
        },
        {
            "off_record_id": 7,
            "employee_id": 1,
            "firstname": "Jimmy",
            "lastname": "Tan",
            "approved": null
        },
        {
            "off_record_id": 8,
            "employee_id": 1,
            "firstname": "Jimmy",
            "lastname": "Tan",
            "approved": null
        },
        {
            "off_record_id": 9,
            "employee_id": 1,
            "firstname": "Jimmy",
            "lastname": "Tan",
            "approved": null
        }
    ]
}
```

#### .../api/group/manage/dayoff/:off_record_id

## get the day off record by the off_record_id

off_record_id = 1

if success:

```
{
    "status": "success",
    "off_record": {
        "off_record_id": 1,
        "requested_at": "2022-02-10T04:01:46.000Z",
        "off_id": 1,
        "employee_id": 1,
        "starts_at": "2022-02-10",
        "ends_at": "2022-02-18",
        "approved": null,
        "reason": "Road trip day",
        "approved_by": null,
        "comment": null
    }
}
```
