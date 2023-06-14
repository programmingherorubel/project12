const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.PAYEMNT_KEY);
const port = process.env.PORT || 9000
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.tdolxqi.mongodb.net/?retryWrites=true&w=majority`;


// middleware
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.use(express.json())


const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res
      .status(401)
      .send({ error: true, message: "unauthorized access" });
  }
  // bearer token
  const token = authorization.split(" ")[1];
  console.log(token);
  jwt.verify(token, process.env.JWT_TOKEN, (error, decoded) => {
    if (error) {
      return res
        .status(401)
        .send({ error: true, message: "unauthorized access" });
    }
    req.decoded = decoded;
    next();
  });
};






// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
     client.connect();
    console.log('database is runnning......')
    const database = client.db("project12");
    const usersCollection = database.collection("users");
    const courseCollection = database.collection("course");
    const cartCollection = database.collection("selectcourse")
    const paymentsCollection = database.collection("payments")


    // JWT
    app.post("/jwt", (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.JWT_TOKEN, {
        expiresIn: "2h",
      });
      // console.log({ token });
      res.send({ token });
    });

    // verifyAdmin
    // warning : use verifyJWT before using verifyAdmin
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      if (user?.role !== "admin") {
        return res
          .status(403)
          .send({ error: true, message: "forbidden access" });
      }
      next();
    };

    // check admin
    app.get("/users/admin/:email", verifyJWT, async (req, res) => {
      const email = req.params.email;
      if (req.decoded.email !== email) {
        return res.send({ admin: false });
      }
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      const result = { admin: user?.role === "admin" };
      res.send(result);
    });

    // verifyInstructor

    const verifyInstructor = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      if (user?.role !== "instractor") {
        return res
          .status(403)
          .send({ error: true, message: "forbidden access" });
      }
      next();
    };
// check instructor
    app.get("/users/instructor/:email", verifyJWT, async (req, res) => {
      const email = req.params.email;
      if (req.decoded.email !== email) {
        return res.send({ instractor: false });
      }
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      const result = { instractor: user?.role === "instractor" };
      res.send(result);
    });

    app.put('/users/:email', async (req, res) => {
      const email = req.params.email
      const user = req.body
      const query = { email: email }
      const options = { upsert: true }
      const updateDoc = {
        $set: user
      }
      const result = await usersCollection.updateOne(query, updateDoc, options)
      res.send(result)
    })

    app.get('/users', async (req, res) => {
      const result = await usersCollection.find({}).toArray()
      res.send(result)
    })

    // new course 
    app.post('/newcourse', async (req, res) => {
      const course = req.body
       const result = await courseCollection.insertOne(course)
      res.send(result)
    })

    app.get('/newcourse', async (req, res) => {
      const result = await courseCollection.find({}).toArray()
      res.send(result)
    })

    app.get('/newcourse/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await courseCollection.findOne(query)
      res.send(result)
    })

    app.put('/newcourse/approved/:id', async (req, res) => {
        const id = req.params.id;
        const filterData = { _id: new ObjectId(id)};
        const updateDoc = { $set: { status: "approved" } };
    
        const result = await courseCollection.updateOne(filterData, updateDoc);
        console.log(result)
        res.send(result)
      
    });
    app.put('/newcourse/denied/:id', async (req, res) => {
        const id = req.params.id;
        console.log(id)
        const filterData = { _id: new ObjectId(id)};
        const updateDoc = { $set: { status: "denied" } };
    
        const result = await courseCollection.updateOne(filterData, updateDoc);
        console.log(result)
        res.send(result)
      
    });

    // edit course collection 
    app.put('/newcourseupdate/:id',async(req,res)=>{
      const id = req.params.id 
      const data = req.body 
      const query = {_id:new ObjectId(id)}
      const updateDoc = {
        $set:{
          ...data
        }
      }
      const result = await courseCollection.updateOne(query,updateDoc)
      console.log(result)
      res.send(result)
    })
   
    // admin role input 
    app.put('/admin/:email',async(req,res)=>{
      const email = req.params.email
      const filterData  = {email:email}
      const updateDoc = {
        $set:{
          role:"admin"
        }
      } 
      const result = await usersCollection.updateOne(filterData,updateDoc)
      console.log(result)
      res.send(result)
    })
    // instractor role input 
    app.put('/instractor/:email',async(req,res)=>{
      const email = req.params.email
      const filterData  = {email:email}
      const updateDoc = {
        $set:{
          role:"instractor"
        }
      } 
      const result = await usersCollection.updateOne(filterData,updateDoc)
      console.log(result)
      res.send(result)
    })

  //  admin feedback 
  app.put('/feedback/:id',async(req,res)=>{
    const id = req.params.id 
    const info = req.body
    const filter = {_id:new ObjectId(id)}
    const updateDoc={
      $set:{
        feedback:info,
      }
    } 
    const result = await courseCollection.updateOne(filter,updateDoc)
    console.log(result)
    res.send(result)
  }) 
  
  // spacific instractor class 
app.get('/myclass/:email',async(req,res)=>{
  const email = req.params.email 
  const query = {departmentEmail:email}
  const result = await courseCollection.find(query).toArray()
  res.send(result)
})


// Edit course 
app.get('/editcourse/:id',async(req,res)=>{
  const id = req.params.id 
  const query = {_id: new ObjectId(id)}
  const result = await courseCollection.findOne(query)
  res.send(result)
})

// add to cart
app.post('/addtocart',async(req,res)=>{
    const selectCourse = req.body 
    const result = await cartCollection.insertOne(selectCourse)
    console.log(result)
    res.send(result)
})
app.get('/addtocart/:email',async(req,res)=>{
  const email = req.params.email 
  const query = {userEmail:email}
  const result = await cartCollection.find(query).toArray()
  res.send(result)
    
})

app.get('/addtocart/payment/:id',async (req,res)=>{
  const id = req.params.id 
  const query = {_id:new ObjectId(id)}
  const result = await cartCollection.findOne(query)
  res.send(result)
})

// payments
app.post('/payments',async(req,res)=>{
  const info = req.body 
  const id = info.beforePaymentClassId  
  const result = await paymentsCollection.insertOne(info)
  const qyirey = {_id:new ObjectId(id)}
  const deleteResult = await cartCollection.deleteOne(qyirey)

  res.send({result,deleteResult})
})

app.get('/payments/:email',async(req,res)=>{
  const email = req.params.email 
  const query = {email:email}
  const result = await paymentsCollection.find(query).toArray()
  res.send(result)
})

// create payment intent
app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;
  const amount = price * 100;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    payment_method_types: ["card"],
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.delete('/deleteclass/:id',async(req,res)=>{
  const id = req.params.id;
  const query = {_id:new ObjectId(id)}
  const reuslt = await courseCollection.deleteOne(query)
  res.send(reuslt)
})

  } finally {
    // await client.close()
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('project 12 running.....!')
})

app.listen(port, () => {
  console.log(`Examples app listening on port ${port}`)
})