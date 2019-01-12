// Apex Controller for JSONComp Lightning Component
public class JSONDemoController {

    // Method to return account details and related data
    @AuraEnabled
    public static String getAccountWithRelatedDataById(Id accountId) {
        // Initializing the response string
        String response = '';
        // Making a new instance of wrapper class
		ResponseJSONWrapper wrapper = new ResponseJSONWrapper();        
        // Getting the account list according to the account id
		List<Account> accountList = [SELECT Name, Industry, AnnualRevenue FROM Account WHERE Id=:accountId];
        // Forming the account object and setting the wrapper fields
        if(accountList!=null && accountList.size()>0) {
			Account accountObj = accountList.get(0);
            wrapper.id = accountObj.Id;
            wrapper.name = accountObj.Name;
            wrapper.industry = accountObj.Industry;
            wrapper.annualRevenue = accountObj.AnnualRevenue;
        }
        // Getting the contact list related to the account
        List<Contact> contactList = [SELECT Id, Name, Phone, Email FROM Contact WHERE AccountId =:accountId];
        // Getting the opportunity list related to the account
        List<Opportunity> opportunityList = [SELECT Id, Name, Amount, CloseDate FROM Opportunity WHERE AccountId =:accountId];
        // Setting the contact list and opportunity list in wrapper
        wrapper.contactList = contactList;
        wrapper.opportunityList = opportunityList;
        // Converting the wrapper into JSON string and sending as a response 
        return JSON.serialize(wrapper);
    }
    
    // Response JSON Wrapper Class
    public class ResponseJSONWrapper {
        public Id id;
        public String name;
        public String industry;
        public Decimal annualRevenue;
        public List<Contact> contactList;
        public List<Opportunity> opportunityList;
    }
}