const express = require('express');
const supabaseClient = require('@supabase/supabase-js');
const bodyParser = require('body-parser');
const { isValidStateAbbreviation } = require('usa-state-validator');

const app = express()
const port = 3000;
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));



const supabaseUrl = 'https://yadtiioojpewtugelshw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhZHRpaW9vanBld3R1Z2Vsc2h3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1MzAyOTAsImV4cCI6MjA2MzEwNjI5MH0.-JYhp5IK7WxLtq867z2pKE8SYL2AI6IDUhP8TdYFCHk';
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

app.get('/customers', async (req, res) => {
    console.log("attempting to get all customers");

    const { data, error } = await supabase
  .from('customer').select();

  if(error) {
    console.log(`Error: ${error}`);
    res.statusCode = 400
    res.send(error);
  }

  res.send(data);
  
});

app.post('/customer', async(req,res) => {
    console.log('Adding Customer')

    console.log(req.body);
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const state = req.body.state;

        if(!isValidStateAbbreviation(state)) {
            console.error(`State: ${state}, is Invalid`);
            res.statusCode = 400;
            res.header('Content-type', 'application/json')
            const errorJson = {
                'message': `${state} is not a valid state`
            }
            
            res.send(JSON.stringify(errorJson));
            return;


        }

    const { data, error } = await supabase
  .from('customer')
  .insert({customer_first_name: firstName, customer_last_name: lastName, customer_state: state,})
  .select()

  if(error) {
    console.log(`Error: ${error}`);
    res.statusCode = 500
    res.send(error);
  }

    res.send(data);
});

app.listen(port, () => {
    console.log('App is alive on port', port);
});
