// const express = require('express');
// const path = require('path');

// const supabaseClient = require('@supabase/supabase-js');
// const bodyParser = require('body-parser');
// const { isValidStateAbbreviation } = require('usa-state-validator');
// const dotenv = require('dotenv');
// dotenv.config();

// const app = express()
// const port = 3000;
// app.use(bodyParser.json());
// app.use(express.static(__dirname + '/public'));



// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseKey = process.env.SUPABASE_KEY;
// const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);


// app.get('/customers', async (req, res) => {
//     console.log("attempting to get all customers");

//     const { data, error } = await supabase
//   .from('customer').select();

//   if(error) {
//     console.log(`Error: ${error}`);
//     res.statusCode = 400
//     res.send(error);
//   }

//   res.send(data);
  
// });

// app.post('/customer', async(req,res) => {
//     console.log('Adding Customer')

//     console.log(req.body);
//     const firstName = req.body.firstName;
//     const lastName = req.body.lastName;
//     const state = req.body.state;

//         if(!isValidStateAbbreviation(state)) {
//             console.error(`State: ${state}, is Invalid`);
//             res.statusCode = 400;
//             res.header('Content-type', 'application/json')
//             const errorJson = {
//                 'message': `${state} is not a valid state`
//             }
            
//             res.send(JSON.stringify(errorJson));
//             return;


//         }

//     const { data, error } = await supabase
//   .from('customer')
//   .insert({customer_first_name: firstName, customer_last_name: lastName, customer_state: state,})
//   .select()

//   if(error) {
//     console.log(`Error: ${error}`);
//     res.statusCode = 500
//     res.send(error);
//   }

//     res.send(data);
// });

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// app.listen(port, () => {
//     console.log('App is alive on port', port);
// });
const supabaseClient = require('@supabase/supabase-js');
const bodyParser = require('body-parser');
const express = require('express');
const { isValidStateAbbreviation } = require('usa-state-validator');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

app.get('/', (req, res) => {
  res.sendFile('INST377-FinalProject/publicTrial/home.html', { root: __dirname });
});

app.get('/customers', async (req, res) => {
  console.log('Attempting to GET all customers');

  const { data, error } = await supabase.from('customer').select();

  if (error) {
    console.log('Error');
    res.send(error);
  } else {
    res.send(data);
  }
});

app.post('/customer', async (req, res) => {
  console.log('Adding Customer');

  console.log(req.body);
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var state = req.body.state;

  if (!isValidStateAbbreviation(state)) {
    console.log(`State ${state} is Invalid`);
    res.statusCode = 400;
    res.header('Content-Type', 'application/json');
    var errorJson = {
      message: `${state} is not a Valid State`,
    };
    res.send(JSON.stringify(errorJson));
    return;
  }

  const { data, error } = await supabase
    .from('customer')
    .insert({
      customer_first_name: firstName,
      customer_last_name: lastName,
      customer_state: state,
    })
    .select();

  if (error) {
    console.log('Error');
    res.send(error);
  } else {
    res.send(data);
  }
});

app.listen(port, () => {
  console.log('APP IS ALIVEEE');
});