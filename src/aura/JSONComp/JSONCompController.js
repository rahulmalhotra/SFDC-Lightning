({
    // Function called on initial page loading to get data from server
	doInit : function(component, event, helper) {
		// Helper function to fetch account and related objects data
        helper.fetchAccountData(component, event, helper);
	}
})