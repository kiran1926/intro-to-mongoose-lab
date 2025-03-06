const Customer = require("./models/customer");
const prompt = require("prompt-sync")();

//create a new customer

const createCustomer = async () => {
  console.log("\nCreating a customer....");
  const customerData = {
    name: prompt("Enter customer name: "),
    age: parseInt(prompt("Enter customer age: "), 10),
  };
  try {
    const customer = await Customer.create(customerData);
    console.log("New customer created", customer);
  } catch (error) {
    console.log("\nError creating customer", error.message);
  }
};

//Read: view all cusotmers
const viewCustomers = async () => {
  try {
    const customers = await Customer.find({});
    if (customers.length === 0){
        console.log("There are no customers in the database.");
        return;
    }
    console.log("Below is a list of customers: ");
    customers.forEach((customer) => {
      console.log(
        `id: ${customer.id} -- Name: ${customer.name}, Age: ${customer.age}`
      );
    });
  } catch (error) {
    console.error("\nError getting customers: ", error.message);
  }
};

//update customer
const updateCustomer = async () => {
  await viewCustomers();

  const customerId = prompt(
    "\nCopy and paste the id of the customer you would like to update here: "
  );
  try {
    const customer = await Customer.findById(customerId);

    if (!customer) {
      console.log("\nCustomer not found");
      return;
    }

    const updateName = prompt("What is the customer's new name?");
    const updateAge = parseInt(prompt("What is the customer's new age? "), 10);

    customer.name = updateName;
    customer.age = updateAge;
    await customer.save();

    console.log("\nCustomer updated successfully!");
  } catch (error) {
    console.error("\nError updating customer: ", error.message);
  }
};

//delete customer

const deleteCustomer = async () => {
  await viewCustomers();

  const customerId = prompt(
    "\nCopy and paste the id of the customer you would like to delete here: "
  );
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(customerId);

    if (!deletedCustomer) {
      console.log("Customer not found");
      return;
    }
    console.log("\nCustomer deleted successfully!");
  } catch (error) {
    console.error("\nError deleting customer", error.message);
  }
};

//export
module.exports = {
  createCustomer,
  viewCustomers,
  updateCustomer,
  deleteCustomer,
};
