Feature: Send to subscribers confirmation message
	As a Organizer
	I want to confirm payment subscription to Subscriber
	So I could have a control over who can attend

	Scenario: Subscriber made payment at bank (Rule 2)
		Given Datasource has at least 1 row
		And Subscriber email is valid
		And Subscriber status is 'Boleto Pago'
		When Organizer set that Subscriber make the payment
		Then Subscriber should receive an email with confirmation instructions
