Feature: Process subscriptions
	As Developer
	I want to process all subscriptions made
	So every subscriber could be notify when necessary

	Scenario: One Filter is not valid
		Given E-mail is configured and could be send
		And Datasource is configured, acessible and not empty
		And Filter is not a pattern
		When Developer try to process all subscriptions
		Then Process should stop
		And output a message with details of pattern error

	Scenario: Filter is empty
		Given E-mail is configured and could be send
		And Datasource is configured, acessible and not empty
		And Filter is not fulfilled
		When Developer try to process all subscriptions
		Then Process should stop
		And output a message with warning about missing filter

	Scenario: One Action is not valid
		Given E-mail is configured and could be send
		And Datasource is configured, acessible and not empty
		And Filters is valid
		And Actions is not a pattern
		When Developer try to process all subscriptions
		Then Process should stop
		And output a message with details of pattern error

	Scenario: Action is empty
		Given E-mail is configured and could be send
		And Datasource is configured, acessible and not empty
		And Datasource config is valid
		And Filters are not empty and validated
		And  Actions is not fulfilled
		When Developer try to process all subscriptions
		Then Process should stop
		And output a message with warning about missing action

	Scenario: Processing subscriptions is finished with success
		Given E-mail is configured and could be send
		And Datasource is configured, acessible and not empty
		And Filters are not empty and validated
		And Actions are not empty and validated
		When Developer try to process all subscriptions
		Then Datasource must be all processed
		And output a message with all success actions executed
