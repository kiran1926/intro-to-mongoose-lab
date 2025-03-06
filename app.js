const dotenv = require("dotenv"); //env import
dotenv.config();

const mongoose = require("mongoose"); //mongoose import

const prompt = require("prompt-sync")(); //user input import

const Customer = require("./models/customer"); // customer model import

const {
  createCustomer,
  viewCustomers,
  updateCustomer,
  deleteCustomer,
} = require("./queries");

//connect MongoDB
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected to MongoDB");

    const username = prompt("\nWhat is your name?");
    console.log("Hi", username);

    let exit = false;

    while (!exit) {
      const selection = prompt(`
            Welcome to the CRM
            
            What would you like to do ? 

            1. Create a customer
            2. View all customers
            3. Update a customer
            4. Delete a customer
            5. Quit
            
            Select the number of the action: 
            `);
        selection = parseInt(selection);
      switch (selection) {
        case "1":
          await createCustomer();
          break;
        case "2":
          await viewCustomers();
          break;
        case "3":
          await updateCustomer();
          break;
        case "4":
          await deleteCustomer();
          break;
        case "5":
          exit = true;
          console.log("\n Successfully logged out");
          break;
        default:
          console.log(
            "Wrong selection!! Please select from the above options numbers"
          );
      }
    }

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");

    process.exit();
  } catch (error) {
    console.error("MongoDb connection error: ", error);
    process.exit(1);
  }
};

connect();
