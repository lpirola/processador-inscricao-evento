Feature: Send to subscribers confirmation message
	As a Organizer
	I want to confirm payment subscription to Subscriber
	So I could have a control over who can attend

	Scenario: Subscriber made payment at bank
		Given the spreadsheet is a valid resource
		And the spreadsheet has more than 0 Subscribers
		And Subscriber email is valid
		And Subscriber status is 'Boleto Pago'
		When Organizer check if Subscriber make the payment
		Then Subscriber should receive an email with confirmation instructions
