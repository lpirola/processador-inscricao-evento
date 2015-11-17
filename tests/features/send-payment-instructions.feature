Feature: Send to subscribers instructions to make payment
	As a Organizer
	I want to send email with payment instructions
	So that I can control who will pay subscription

	Scenario: Subscriber not found
		Given the spreadsheet is valid resource
		And the spreadsheet has 0 Subscribers
		When Organizer check if Subscription receive payment instrutions
		Then Organizer must receive a email warning spreadsheet is empty

	Scenario: Subscriber has invalid email
		Given the spreadsheet is valid resource
		And the spreadsheet has more than 0 Subscribers
		And Subscriber email is invalid
		When Organizer check if Subscriber receive payment instructions
		Then Organizer must receive a email warning about spreadsheet error
		And Subscriber status should be set to 'Inválida'

	Scenario: Subscriber could not receive email
		Given the spreadsheet is valid resource
		And the spreadsheet has more than 0 Subscribers
		And Subscriber email is valid
		And Subscriber status is 'Registrada'
		When Organizer check if Subscriber receive payment instructions
		Then Organizer must receive a warning that a user could not receive email

	Scenario: Subscriber yet not received payment instructions
		Given the spreadsheet is a valid resource
		And the spreadsheet has more than 0 Subscribers
		And Subscriber email is valid
		And Subscriber status is 'Registrada'
		When Organizer check if Subscriber receive payment instructions
		Then send an email with payment instructions to Subscriber
		And set Subscriber status to 'Boleto Enviado'

	Scenario: Subscriber already receive payment instructions
		Given the spreadsheet is valid resource
		And the spreadsheet has more than 0 Subscribers
		And Subscriber email is valid
		And Subscriber status is 'Boleto Enviado'
		When Organizer check if Subscriber receive payment instructions
		Then Subscriber should not be changed
		And Subscriber status should be 'Boleto Enviado'

