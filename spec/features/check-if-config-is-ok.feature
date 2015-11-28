Feature: Read and validate required configs to process subscriptions
	As Developer
	I want to check if configs are ok
	So I could process all subscriptions found

	Scenario: SMTP server is not configured
		Given SMTP server details is not filled
		When Developer try to check if configs are fine
		Then a message must be output with information required
		And Process stopped

	Scenario: E-mail could not be send with SMTP server
		Given SMTP server details is filled
		When Developer try to check if configs are fine
		Then Process should stop
		And output a message with error details

	Scenario: Datasource config is empty
		Given E-mail is configured
		And Datasource config is empty
		When Developer try to check if configs are fine
		Then Process must stop
		And output a message with information required

	Scenario: Datasource is not acessible
		Given E-mail is configured and could be send
		And Datasource config is valid
		When Developer try to check if configs are
		Then Process should stop
		And output a message with error details

	Scenario: Datasource content is empty
		Given E-mail is configured and could be send
		And Datasource config is valid
		And Datasource size content is 0
		When Developer try to process all subscriptions
		Then Process should stop
		And output a message about datasource is empty

	Scenario: Command Check done successfully
		Given Email is configured and could be send
		And Datasource is configured and is validated
		When Developer try to check if configs are ok
		Then Process should output a message with success details from configs tests
