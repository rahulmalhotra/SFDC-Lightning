// Apex Controller for Contact List Lightning Component
public class ContactListController {
	
    @AuraEnabled
    public static List<Contact> getContactList(List<Id> accountIds) {
    	// Getting the list of contacts from where Id is in accountIds
		List<Contact> contactList = [SELECT Id, FirstName, LastName, Email, Phone, AccountId FROM Contact WHERE AccountId in :accountIds];
		// Returning the contact list
        return contactList;
    }

    @AuraEnabled
    public static Map<String,String> saveContactList(List<Contact> contactList) {
    	// Forming a  string map to return response
        Map<String,String> resultMap = new Map<String,String>();
        // Adding try catch for exception handling
        try {
        	// Updating the Contact List
            update contactList;
            // Setting the success status and message in resultMap
            resultMap.put('status', 'success');
	        resultMap.put('message', 'Contacts Updated Successfully');        
    	}
    	catch(Exception e) {
            // Setting the success status and message in resultMap
            resultMap.put('status', 'error');
			resultMap.put('message',e.getMessage());
    	}
    	// Returning the result string map
        return resultMap;
    }
}