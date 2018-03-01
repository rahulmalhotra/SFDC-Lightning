({
    // Function called on initial page loading to get contact list from server
	getContactsList : function(component, event, helper) {
        // Helper function - fetchContacts called for interaction with server
		helper.fetchContacts(component, event, helper);
	},

    // Function used to create a new Contact
    newContact: function(component, event, helper) {
        // Global event force:createRecord is used
        var createContact = $A.get("e.force:createRecord");
        // Parameters like apiName and defaultValues are set
        createContact.setParams({
            "entityApiName": "Contact",
            "defaultFieldValues": {
                "AccountId": component.get("v.recordId")
            }
        });
        // Event fired and new contact dialog open
        createContact.fire();
    },

    // Function used to update the contacts
    editContacts: function(component, event, helper) {
        // Getting the button element
        var btn = event.getSource();
        // Getting the value in the name attribute
        var name = btn.get('v.name');
        // Getting the record view form and the record edit form elements
        var recordViewForm = component.find('recordViewForm');
        var recordEditForm = component.find('recordEditForm'); 
        // If button is edit
        if(name=='edit') {
            // Hiding the recordView Form and making the recordEdit form visible
            $A.util.addClass(recordViewForm,'formHide');
            $A.util.removeClass(recordEditForm,'formHide');
            // Changing the button name and label
            btn.set('v.name','save');
            btn.set('v.label','Save');
        }
        else if(name=='save') {
            // Getting the edit form fields to validate
            var contactFields = component.find("fieldToValidate");
            // Initialize the counter to zero - used to check validity of fields
            var blank=0;
            // If there are more than 1 fields
            if(contactFields.length!=undefined) {
                // Iterating all the fields
                var allValid = component.find('fieldToValidate').reduce(function (validSoFar, inputCmp) {
                // Show help message if single field is invalid
                inputCmp.showHelpMessageIfInvalid();
                // return whether all fields are valid or not
                return validSoFar && inputCmp.get('v.validity').valid;
                }, true);
                // If all fields are not valid increment the counter
                if (!allValid) {
                    blank++;
                }
            } else {
                // If there is only one field, get that field and check for validity (true/false)
                var allValid = component.find('fieldToValidate');
                // If field is not valid, increment the counter
                if (!allValid.get('v.validity').valid) {
                    blank++;
                }
            }
            // Call the helper method only when counter is 0
            if(blank==0) {
                // Calling saveContacts if the button is save
                helper.saveContacts(component, event, helper);                
            }
        }
    },
    
    // Function used to delete the contacts
    deleteContacts: function(component, event, helper) {
        // Calling removeContacts Helper Function
        helper.removeContacts(component, event, helper);
    },

    // Function used to open the contact modal
    openModal: function(component, event, helper) {
        var modal = component.find("contactModal");
        var modalBackdrop = component.find("contactModalBackdrop");
        $A.util.addClass(modal,"slds-fade-in-open");
        $A.util.addClass(modalBackdrop,"slds-backdrop_open");
    },

    // Function used to close the contact modal
    closeModal: function(component, event, helper) {
        var modal = component.find("contactModal");
        var modalBackdrop = component.find("contactModalBackdrop");
        $A.util.removeClass(modal,"slds-fade-in-open");
        $A.util.removeClass(modalBackdrop,"slds-backdrop_open");
    },

    // Function used to create new contact
    createContact: function(component, event, helper) {
        var isContactValid = component.validateContact(component, event, helper);
        if(isContactValid) {
           helper.insertContact(component, event, helper);
        }
    },

    // Function to validate new contact - Aura method used for the same
    validateContact: function(component, event, helper) {
        // Getting all fields and iterate them to check for validity
        var allValid = component.find('formFieldToValidate').reduce(function (validSoFar, inputCmp) {
            // Show help message if single field is invalid
            inputCmp.showHelpMessageIfInvalid();
            // Get the name of each field
            var name = inputCmp.get('v.name');
            // Check if name is emailField
            if(name=='emailField') {
                // Getting the value of that field
                var value = inputCmp.get('v.value');
                // If value is not equal to rahul@gmail.com, add custom validation
                if(value != 'rahul@gmail.com') {
                    // Focus on that field to make custom validation work
                    inputCmp.focus();
                    // Setting the custom validation
                    inputCmp.set('v.validity', {valid:false, badInput :true});
                }                
            }
            // Returning the final result of validations
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        // Returning Validate contact result in boolen
        return allValid;
    }

})