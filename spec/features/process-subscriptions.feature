Feature: Process subscriptions
	As Developer
	I want to process all subscriptions made
	So every subscriber could be notify when necessary

	Scenario: Rules has invalid options
		Given E-mail and Datasource is configured and valid
		And Rules has invalid options
		When Developer try to process all subscriptions
		Then Process should stop
		And output a message with details of pattern error

	Scenario: Rules is empty
		Given E-mail and Datasource is configured and valid
		And Rules is not fulfilled
		When Developer try to process all subscriptions
		Then Process should stop
		And output a message with warning about missing filter

	Scenario: Processing subscriptions is finished with success
		Given E-mail and Datasource is configured and valid
		And Rules are not empty and validated
		When Developer try to process all subscriptions
		Then Datasource must be all processed
		And output a message with all success actions executed
