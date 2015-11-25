Feature: Config, read and process subscriptions
	As Developer
	I want to process all subscriptions made
	So every subscriber could be notify when necessary

	Scenario: SMTP server is not configured
		Given SMTP server details is not filled
		When Developer try to process all subscriptions
		Then a message must be output with information required
		And Process stopped

	Scenario: Datasource config is empty
		Given E-mail is configured and could be send
		And Datasource config is empty
		When Developer try to process all subscriptions
		Then Process must stop
		And output a message with information required

	Scenario: E-mail could not be send with SMTP server
		Given SMTP server details is filled
		When Developer try to process all subscriptions
		Then Process should stop
		And output a message with error details

	Scenario: Datasource is not acessible
		Given E-mail is configured and could be send
		And Datasource config is valid
		When Developer try to process all subscriptions
		Then Process should stop
		And output a message with error details

	Scenario: Datasource content is empty
		Given E-mail is configured and could be send
		And Datasource config is valid
		And Datasource size content is 0
		When Developer try to process all subscriptions
		Then Process should stop
		And output a message about datasource is empty

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
