({
    // Function to fetch data from server called in initial loading of page
	fetchContacts : function(component, event, helper) {
        // Assign server method to action variable
        var action = component.get("c.getContactList");
        // Getting the account id from page
        var accountId = component.get("v.recordId");
        // Setting parameters for server method
        action.setParams({
            accountIds: accountId
        });
        // Callback function to get the response
        action.setCallback(this, function(response) {
            // Getting the response state
            var state = response.getState();
            // Check if response state is success
            if(state === 'SUCCESS') {
                // Getting the list of contacts from response and storing in js variable
                var contactList = response.getReturnValue();
                // Set the list attribute in component with the value returned by function
                component.set("v.contactList",contactList);
            }
            else {
                // Show an alert if the state is incomplete or error
                alert('Error in getting data');
            }
        });
        // Adding the action variable to the global action queue
        $A.enqueueAction(action);
	},

    // Function to update the contacts on server
    saveContacts: function(component, event, helper) {
        // Getting the contact list from lightning component
        var contactList = component.get("v.contactList");
        // Getting the recordViewForm and recordEditForm component
        var recordViewForm = component.find('recordViewForm');
        var recordEditForm = component.find('recordEditForm'); 
        // Initializing the toast event to show toast
        var toastEvent = $A.get('e.force:showToast');
        // Defining the action to save contact List ( will call the saveContactList apex controller )
        var saveAction = component.get("c.saveContactList");
        // setting the params to be passed to apex controller
        saveAction.setParams({ contactList: contactList });
        // callback action on getting the response from server
        saveAction.setCallback(this, function(response) {
            // Getting the state from response
            var state = response.getState();
            if(state === 'SUCCESS') {
                // Getting the response from server
                var dataMap = response.getReturnValue();
                // Checking if the status is success
                if(dataMap.status=='success') {
                    // Remove the formHide class
                    $A.util.removeClass(recordViewForm,'formHide');
                    // Add the formHide class
                    $A.util.addClass(recordEditForm,'formHide');
                    // Getting the button element
                    var btn = event.getSource();
                    // Setting the label and name of button back to edit
                    btn.set('v.name','edit');
                    btn.set('v.label','Edit');
                    // Setting the success toast which is dismissable ( vanish on timeout or on clicking X button )
                    toastEvent.setParams({
                        'title': 'Success!',
                        'type': 'success',
                        'mode': 'dismissable',
                        'message': dataMap.message
                    });
                    // Fire success toast event ( Show toast )
                    toastEvent.fire();            
                }
                // Checking if the status is error 
                else if(dataMap.status=='error') {
                    // Setting the error toast which is dismissable ( vanish on timeout or on clicking X button )
                    toastEvent.setParams({
                        'title': 'Error!',
                        'type': 'error',
                        'mode': 'dismissable',
                        'message': dataMap.message
                    });
                    // Fire error toast event ( Show toast )
                    toastEvent.fire();                
                }
            }
            else {
                // Show an alert if the state is incomplete or error
                alert('Error in getting data');
            }
        });
        $A.enqueueAction(saveAction);
    }    
})