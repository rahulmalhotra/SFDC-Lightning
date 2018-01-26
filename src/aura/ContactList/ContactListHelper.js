({
	fetchContacts : function(component, event, helper) {
		var action = component.get("c.getContactList");
        var accountId = component.get("v.recordId");
        action.setParams({
            accountIds: accountId
        });
        action.setCallback(this, function(data) {
            var contactList = data.getReturnValue();
            component.set("v.contactList",contactList);
        });
        $A.enqueueAction(action);
	}    
})