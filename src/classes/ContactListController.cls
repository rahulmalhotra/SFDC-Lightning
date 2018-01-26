public class ContactListController {
	
    @AuraEnabled
    public static List<Contact> getContactList(List<Id> accountIds) {
		List<Contact> contactList = [SELECT Id, Name, Email, Phone, AccountId FROM Contact WHERE AccountId in :accountIds];
        return contactList;
    }
}