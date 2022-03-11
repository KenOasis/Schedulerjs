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

## .../api/group/dayoff POST

#### create a day off request for the logged-in employee

body

```
{
    "off_id": "1",
    "starts_at": "2022-02-23",
    "ends_at": "2022-02-25",
    "reason": "sicked"
}
```

if success:

```
{
    "status": "success",
    "off_record": {
        "off_record_id": 2,
        "requested_at": "2022-02-23T15:36:19.579Z",
        "off_id": 3,
        "starts_at": "2022-02-23",
        "ends_at": "2022-02-25",
        "reason": "sicked",
        "approved": null,
        "approved_by": null,
        "comment": null
    }
}
```

if conflict with other day off request:

```
{
    "status": "conflict",
    "message": "You already request day off between (inclusive) 2022-02-23 and 2022-02-25"
}
```

## .../api/group/dayoff/all GET

#### get the day off requests for the logged-in employee

if success:

```
{
    "status": "success",
    "off_records": [
        {
            "off_record_id": 2,
            "starts_at": "2022-02-23",
            "ends_at": "2022-02-25",
            "approved": null
        },
        {
            "off_record_id": 3,
            "starts_at": "2022-03-05",
            "ends_at": "2022-03-12",
            "approved": null
        }
    ]
}
```

## .../api/group/dayoff/:off_record_id PUT

#### Employee update a un-reviwed day off

off_record_id = 3

body:

```
{
    "off_id": "1",
    "starts_at": "2022-03-05",
    "ends_at": "2022-03-15",
    "reason": "I am tired of this job!"
}
```

if conflict with other day off request:

```
{
    "status": "conflict",
    "message": "You already request day off between (inclusive) 2022-03-05 and 2022-03-15"
}
```

if the record has been reviewed

```
{
    "status": "forbidden",
    "message": "Cannot updated the reviewed record"
}
```

## .../api/group/punch/record_time POST

#### record a punch record of the current employee

body

```
{
    "recorded_date": "2022-02-11",
    "recorded_time": "19:30:00"
}
```

## .../api/group/punch/:year&:month&:day GET

#### get the punch records of the current employee

if day !== 0, then return the punch_records of the date
year = 2022, month = 3, day = 10,
it returns

```
{
    "status": "success",
    "punch_records": [
        {
            "year": 2022,
            "month": 3,
            "day": 10,
            "day_of_week": "THU",
            "recorded_time": [
                {
                    "recorded_time": "08:00:00",
                    "is_modified": false
                },
                {
                    "recorded_time": "12:30:00",
                    "is_modified": false
                },
                {
                    "recorded_time": "13:00:00",
                    "is_modified": false
                },
                {
                    "recorded_time": "16:28:00",
                    "is_modified": false
                }
            ]
        }
    ]
}
```

if day = 0, it will return the punch_records of the whole month
year = 2022, month = 3, day = 0
it returns

```
{
    "status": "success",
    "punch_records": [
        {
            "year": 2022,
            "month": 3,
            "day": 9,
            "day_of_week": "WED",
            "recorded_time": [
                {
                    "recorded_time": "09:00:00",
                    "is_modified": false
                }
            ]
        },
        {
            "year": 2022,
            "month": 3,
            "day": 10,
            "day_of_week": "THU",
            "recorded_time": [
                {
                    "recorded_time": "08:00:00",
                    "is_modified": false
                },
                {
                    "recorded_time": "12:30:00",
                    "is_modified": false
                },
                {
                    "recorded_time": "13:00:00",
                    "is_modified": false
                },
                {
                    "recorded_time": "16:28:00",
                    "is_modified": false
                }
            ]
        }
    ]
}
```

## .../api/group/schedule/:year&:month&:day GET

#### Get the schedule of current employee

if day = 0, it return the schedule or dayoff (short-circuit) of the given month
for employee_id = 5, he has dayoff record from 2022-3-15 to 2022-3-22, and he get schedule
at 2022-3-20
(year=2022, month = 03, day = 0)

```
{
    "status": "success",
    "schedules": [
        {
            "employee_id": 5,
            "firstname": "John",
            "lastname": "Doe",
            "year": 2022,
            "month": 3,
            "day": 15,
            "dayoff": true,
            "scheduled": false
        },
        {
            "employee_id": 5,
            "firstname": "John",
            "lastname": "Doe",
            "year": 2022,
            "month": 3,
            "day": 16,
            "dayoff": true,
            "scheduled": false
        },
        {
            "employee_id": 5,
            "firstname": "John",
            "lastname": "Doe",
            "year": 2022,
            "month": 3,
            "day": 17,
            "dayoff": true,
            "scheduled": false
        },
        {
            "employee_id": 5,
            "firstname": "John",
            "lastname": "Doe",
            "year": 2022,
            "month": 3,
            "day": 18,
            "dayoff": true,
            "scheduled": false
        },
        {
            "employee_id": 5,
            "firstname": "John",
            "lastname": "Doe",
            "year": 2022,
            "month": 3,
            "day": 19,
            "dayoff": true,
            "scheduled": false
        },
        {
            "employee_id": 5,
            "firstname": "John",
            "lastname": "Doe",
            "year": 2022,
            "month": 3,
            "day": 20,
            "dayoff": false,
            "scheduled": true,
            "starts_at": "09:00:00",
            "ends_at": "17:30:00"
        },
        {
            "employee_id": 5,
            "firstname": "John",
            "lastname": "Doe",
            "year": 2022,
            "month": 3,
            "day": 21,
            "dayoff": true,
            "scheduled": false
        },
        {
            "employee_id": 5,
            "firstname": "John",
            "lastname": "Doe",
            "year": 2022,
            "month": 3,
            "day": 22,
            "dayoff": true,
            "scheduled": false
        }
    ]
}
```

if day !== 0, it will return the schedule of all group member
(year=2022, month = 03, day = 20)

```
{
    "status": "success",
    "schedules": [
        {
            "employee_id": 1,
            "firstname": "Jimmy",
            "lastname": "Tan",
            "scheduled": true,
            "dayoff": false,
            "starts_at": "08:00:00",
            "ends_at": "16:30:00"
        },
        {
            "employee_id": 4,
            "firstname": "John",
            "lastname": "Doe",
            "scheduled": false,
            "dayoff": false
        },
        {
            "employee_id": 5,
            "firstname": "John",
            "lastname": "Doe",
            "scheduled": true,
            "dayoff": false,
            "starts_at": "09:00:00",
            "ends_at": "17:30:00"
        }
    ]
}
```

## .../api/group/manage/group/employee_info/all

#### Get the employee_info of the current group

if success

```
{
    "status": "success",
    "employees": [
        {
            "employee_id": 1,
            "firstname": "Jimmy",
            "lastname": "Tan",
            "activated": true,
            "title": "Store Manager",
            "abbreviation": "STRM"
        },
        {
            "employee_id": 4,
            "firstname": "John",
            "lastname": "Doe",
            "activated": true,
            "title": "Assitant Manager",
            "abbreviation": "ASM"
        },
        {
            "employee_id": 5,
            "firstname": "John",
            "lastname": "Doe",
            "activated": true,
            "title": "Clerk",
            "abbreviation": "CLK"
        }
    ]
}
```

## .../api/group/manage/employee_info/:employee_id

#### Get the employee_info by the given employee_id

employee_id = 1

if success:

```
{
    "status": "success",
    "employee": {
        "username": "jtan886",
        "firstname": "Jimmy",
        "lastname": "Tan",
        "emergency_contact": "415-888-8888",
        "title": "Store Manager",
        "activated": true
    }
}
```

## .../api/group/manage/dayoff/all

#### get all the day off requests of the ACTIVATED group members

if success:

```
{
    "status": "success",
    "off_records": [
        {
            "employee_id": 1,
            "firstname": "Jimmy",
            "lastname": "Tan",
            "off_record_id": 2,
            "starts_at": "2022-02-23",
            "ends_at": "2022-02-25",
            "approved": null
        },
        {
            "employee_id": 1,
            "firstname": "Jimmy",
            "lastname": "Tan",
            "off_record_id": 3,
            "starts_at": "2022-03-05",
            "ends_at": "2022-03-12",
            "approved": null
        }
    ]
}
```

## .../api/group/manage/dayoff/:off_record_id

#### get the day off record by the off_record_id

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

## .../api/group/manage/dayoff/review/:off_record_id

#### Review a dayoff records

off_record_id = 1

body:

```
{
    "approved": "true",
    "comment": "Approved, Have a nice day off!"
}
```

## .../api/group/manage/available/all/:year&:month&:day

#### get all the available time of all ACTIVATED group members at the given date (M0)

year = 2022, month = 2, day = 8

if success:

```
{
    "status": "success",
    "date": "2022-2-8",
    "available": [
        {
            "employee_id": 1,
            "firstname": "Jimmy",
            "lastname": "Tan",
            "activated": true,
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
            "employee_id": 4,
            "firstname": "John",
            "lastname": "Doe",
            "activated": true,
            "title": "Assitant Manager",
            "abbreviation": "ASM",
            "available": []
        },
        {
            "employee_id": 5,
            "firstname": "John",
            "lastname": "Doe",
            "activated": true,
            "title": "Clerk",
            "abbreviation": "CLK",
            "available": []
        }
    ]
}
```

## .../api/group/manage/schedule POST

#### create a new schedule

body:

```
{
    "schedule_date": "2022-03-20",
    "shifts": [
        {
            "employee_id": 1,
            "starts_at": "08:00:00",
            "ends_at": "16:30:00"
        },
        {
            "employee_id": 4,
            "starts_at": "09:00:00",
            "ends_at": "17:30:00"
        },
        {
            "employee_id": 5,
            "starts_at": "09:00:00",
            "ends_at": "17:30:00"
        }
    ]
}
```

if success:

```
{
    "status": "success",
    "schedule_id": 5
}
```

if a schedule for the given date has existed in database:

```
{
    "status": "conflict",
    "message": "Schedule at 2022-03-20 is already existed"
}
```

## .../api/group/manage/schedule/:year&:month&:day GET

#### get schedule of given date

if (day === 0), it will return all the schedule_id of the month if the day has schedule
(year = 2022, month = 3, day = 0)

```
{
    "status": "success",
    "schedules": [
        {
            "year": 2022,
            "month": 3,
            "day": 20,
            "schedule_id": 5
        }
    ]
}
```

if (day !== 0), it will return the schedule of the given date
(year = 2022, month = 3, day = 20)

```
{
    "status": "success",
    "schedules": {
        "schedule_id": 5,
        "schedules": [
            {
                "employee_id": 1,
                "firstname": "Jimmy",
                "lastname": "Tan",
                "scheduled": true,
                "dayoff": false,
                "starts_at": "08:00:00",
                "ends_at": "16:30:00"
            },
            {
                "employee_id": 4,
                "firstname": "John",
                "lastname": "Doe",
                "scheduled": false,
                "dayoff": false
            },
            {
                "employee_id": 5,
                "firstname": "John",
                "lastname": "Doe",
                "scheduled": true,
                "dayoff": false,
                "starts_at": "09:00:00",
                "ends_at": "17:30:00"
            }
        ]
    }
}
```

## .../api/group/manage/schedule/:schedule_id PUT

#### update a schedule of given schedule_id

body:

```
{
    "shifts": [
        {
            "employee_id": 1,
            "starts_at": "08:00:00",
            "ends_at": "16:30:00"
        },
        {
            "employee_id": 5,
            "starts_at": "08:00:00",
            "ends_at": "16:45:00"
        }
    ]
}
```

#### it will update the shift and schedule table correctly by the given employee_id

if the given employee_id HAVE shift data of the given schedule, it will update the existed
data in shifts table
if the given employee_id HAVE NO shift data of the given schedule, it will create the data in shifts table
if the some shift data of the given schedule is NOT include in the body, they will deleted from the shifts table.
