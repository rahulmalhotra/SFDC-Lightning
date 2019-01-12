({
    // Function to fetch the account and related objects data from apex controller
	fetchAccountData : function(component, event, helper) {
        // Setting the name of method in apex controller which we need to call
		var fetchData = component.get('c.getAccountWithRelatedDataById');
        // Getting the accountId from component
        var recordId = component.get('v.recordId');
        // Setting the parameters to send to the apex controller method
        fetchData.setParams({
            accountId: recordId
        });
        // Defining the callback function to get the response
        fetchData.setCallback(this, function(response) {
            // Getting the state of response to check it was successfull or not
            var state = response.getState();
            if(state === 'SUCCESS') {
                // Parsing JSON string into js object
                var responseObj = JSON.parse(response.getReturnValue());
                // Forming the account object with the required data
                var account = {
                    name: responseObj.name,
                    industry: responseObj.industry,
                    annualRevenue: responseObj.annualRevenue
                };
                // Setting the aura attributes with proper data
                component.set('v.account', account);
                component.set('v.contacts', responseObj.contactList);
                component.set('v.opportunities', responseObj.opportunityList);
            } else {
                // Displaying the alert when call to apex was not successfull
                alert('Unable to fetch data from server');
            }
        });
        // Enqueued it as the global action
        $A.enqueueAction(fetchData);
	}
})