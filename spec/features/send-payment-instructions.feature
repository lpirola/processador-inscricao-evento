Feature: Send to subscribers instructions to make payment
	As a Organizer
	I want to send email with payment instructions
	So that I can control who will pay subscription

	Scenario: Subscriber has invalid email (Rules)
		Given Datasource has at least 1 row
		And Subscriber email is invalid
		When Organizer check if Subscriber fit rules
		Then Organizer must receive a email warning about spreadsheet error
		And Subscriber status should be set to 'Inválida'

	Scenario: Subscriber yet not received payment instructions (Rule 1)
		Given Datasource has at least 1 row
		And Subscriber email is valid and status is ''
		When Subscriber fit rules
		Then set Subscriber status to 'Boleto Enviado'
		And Subscriber should receive an email with payment instructions

	Scenario: Subscriber already receive payment instructions (Rule 1)
		Given Datasource has at least 1 row
		And Subscriber email is valid and status is 'Boleto Enviado'
		When Subscriber not fit rules
		Then Subscriber should not be changed
		And Subscriber status should be 'Boleto Enviado'
