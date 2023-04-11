//INSERTING DOCUMENTS IN ZEN PROGRAMME DATABASE

//topics collection
db.topics.insertMany[
    {
      "topicId": 1,
      "topicTitle": "React props",
      "date": "16-10-2020"
    },
    {
      "topicId": 2,
      "topicTitle": "React States",
      "date": "20-10-2020"
    },
    {
      "topicId": 3,
      "topicTitle": "Intro to SQL",
      "date": "12-11-2020"
    },
    {
      "topicId": 4,
      "topicTitle": "MongoDB Connections",
      "date": "20-11-2020"
    }
  ]

//tasks collection
db.tasks.insertMany[
    {
      "taskId": 1,
      "taskTitle": "Add To Cart",
      "date": "16-10-2020"
    },
    {
      "taskId": 2,
      "taskTitle": "Toggle Button",
      "date": "20-10-2020"
    },
    {
      "taskId": 4,
      "taskTitle": "SQL Bolt",
      "date": "12-11-2020"
    },
    {
        "taskId": 3,
        "taskTitle": "Zen Class programme",
        "date": "20-11-2020"
      }
  ]
  
  
//mentors collection
  db.mentors.insertMany[
    {
      "id": 1,
      "name": "Vidhya",
      "mentee-count": 25
    },
    {
      "id": 2,
      "name": "Sangeetha Shanmugam",
      "mentee-count": 30
    },
    {
      "id": 3,
      "name": "Naresh",
      "mentee-count": 7
    },
    {
        "id": 4,
        "name": "Sunny",
        "mentee-count": 10
      }
  ]
  
  
//companies collection
db.companies.insertMany[
    {
      "id": 1,
      "companyName": "Zoho Corporation",
      "dateAppeared": "25-10-2020"
    },
    {
      "id": 2,
      "companyName": "Infosys",
      "dateAppeared": "30-10-2020"
    },
    {
      "id": 3,
      "companyName": "Accenture",
      "dateAppeared": "7-10-2020"
    },
    {
        "id": 4,
        "companyName": "Wipro",
        "dateAppeared": "10-10-2020"
      }
  ]
  
  
//users collection
db.users.insertMany[
    {
      "userId": 1,
      "name": "Gopinath",
      "placementAppearedDate": "30-10-2020",
      "codekataSubmission" : 75
    },
    {
      "userId": 2,
      "name": "Karthigayani",
      "placementAppearedDate": "25-10-2020",
      "codekataSubmission" : 300
    },
    {
      "userId": 3,
      "name": "Abdul",
      "placementAppearedDate": "7-10-2020",
      "codekataSubmission" : 60
    },
    {
        "userId": 4,
        "name": "Deepa",
        "placementAppearedDate": "10-10-2020",
        "codekataSubmission" : 65
      }
  ]   



// 1.Find all the topics and tasks which are thought in the month of October

//CREATING A JOINED VIEW
db.createView( "October-Month", "topics", [
    {
       $lookup:
          {
             from: "tasks",
             localField: "date",
             foreignField: "date",
             as: "taskDocs"
          }
    },
    {
       $project:
          {
            _id: 0,
            topicId: 1,
            date: 1,
            taskId: "$Oct_Month.taskId",
            topicTitle: 1,
            taskTitle: "$Oct_Month.taskTitle"
          }
    },
       { $unwind: "$taskId" }, { $unwind: "$taskTitle" }
 ] )


 //QUERY THE VIEW

 db.October-Month.find({
    date:{
        $gte: "01-10-2020",
        $lte: "31-10-2020"
    }
 })

// 2.Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020

db.companies.find({ dateAppeared: { $gt: "15-10-2020",  $lt: "31-10-2020" } })


// 3.Find all the company drives and students who are appeared for the placement.


//CREATING A JOINED VIEW
db.createView( "students", "users", [
    {
        $lookup: {
          "from": "companies",
          "localField": "placementAppearedDate",
          "foreignField": "dateAppeared",
          "as": "companies_docs"
        }
      },
      {
        $project: {
          _id: 0,
          name: 1,
          placementAppearedDate: 1,
          companyName: "$companies_docs.companyName"
        }
      },
      {
        $unwind: "$companyName"
      }
 ] )

//QUERY THE VIEW

db.students.find({}) 

// 4.Find the number of problems solved by the user in codekata

db.users.find({},
    {
      "_id": 0,
      "name": 1,
      "codekataSubmission": 1
    })

// 5.Find all the mentors with who has the mentee's count more than 15

db.mentors.find({menteeCount: { $gt: 15 } })

